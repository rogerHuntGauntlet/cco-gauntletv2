import { NextApiRequest, NextApiResponse } from 'next';
import { sendMessageToOpenAI, formatMessagesForOpenAI } from '../../../utils/openaiClient';
import { defaultSystemPrompt } from '../../../types/chat';
import getConfig from 'next/config';

// Get server config
const { serverRuntimeConfig } = getConfig() || { serverRuntimeConfig: {} };

// Default model setting from the environment
const DEFAULT_MODEL = serverRuntimeConfig.DEFAULT_OPENAI_MODEL || 
  process.env.DEFAULT_OPENAI_MODEL || 'gpt-3.5-turbo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, context } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Prepare system prompt with context if available
    let systemPrompt = defaultSystemPrompt;
    
    if (context) {
      // Add context information to the system prompt
      systemPrompt += `\n\nCurrent conversation context:
Intent type: ${context.intentType || 'unknown'}
Confidence: ${context.confidenceScore || 0}
Collected data: ${JSON.stringify(context.collectedData || {})}
Missing fields: ${JSON.stringify(context.missingFields || [])}`;
    }

    // Format messages for OpenAI
    const formattedMessages = formatMessagesForOpenAI(messages);

    // Log basic request details for debugging
    console.log(`Sending request to OpenAI API with ${formattedMessages.length} messages`);

    // Define options for the OpenAI client
    const options = {
      systemPrompt,
      temperature: 0.7,
      maxTokens: 1024,
    };

    try {
      // Send to OpenAI
      const response = await sendMessageToOpenAI(formattedMessages, options);

      // Extract the assistant's response
      let assistantResponse = '';
      let modelUsed = response.model || 'unknown';
      
      // Handle response format
      if (response.content && Array.isArray(response.content) && response.content.length > 0) {
        assistantResponse = response.content[0].text || '';
      } else {
        console.error('Unexpected response format from OpenAI:', JSON.stringify(response, null, 2));
        return res.status(500).json({ error: 'Failed to parse AI response' });
      }

      // Log which model was used
      console.log(`Response generated using model: ${modelUsed}`);

      // Analyze the response to update context
      const updatedContext = analyzeResponseForContext(assistantResponse, context || createDefaultContext());

      // Send successful response
      return res.status(200).json({
        message: assistantResponse,
        updatedContext,
        model: modelUsed,
        usedFallback: false // OpenAI doesn't use fallback models like AWS Bedrock
      });
    } catch (error: any) {
      // General error handling
      console.error('Error in OpenAI chat endpoint:', error);
      return res.status(500).json({
        error: 'Failed to process request',
        message: "I'm sorry, there was a problem processing your request. Please try again."
      });
    }
  } catch (error) {
    console.error('Unexpected error in chat API:', error);
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
}

// Helper function to analyze the assistant's response to update the context
function analyzeResponseForContext(response: string, currentContext: any) {
  const newContext = { ...currentContext };
  
  // Basic logic to detect intent from response
  // In a real implementation, this would be much more sophisticated
  if (response.toLowerCase().includes('meeting') && newContext.intentType === 'unknown') {
    newContext.intentType = 'meeting';
    newContext.confidenceScore = Math.min(newContext.confidenceScore + 0.2, 1.0);
  } else if (response.toLowerCase().includes('project') && newContext.intentType === 'unknown') {
    newContext.intentType = 'project';
    newContext.confidenceScore = Math.min(newContext.confidenceScore + 0.2, 1.0);
  } else if (response.toLowerCase().includes('document') && newContext.intentType === 'unknown') {
    newContext.intentType = 'document';
    newContext.confidenceScore = Math.min(newContext.confidenceScore + 0.2, 1.0);
  }
  
  // If we already have an intent type, increase confidence
  if (newContext.intentType !== 'unknown') {
    newContext.confidenceScore = Math.min(newContext.confidenceScore + 0.1, 1.0);
  }
  
  // Extract data points based on patterns in the response
  // This is a simplified version, in reality you'd use more advanced NLP techniques
  
  // Extract date
  const dateMatch = response.match(/\b\d{1,2}\/\d{1,2}\/\d{4}\b|\b\d{4}-\d{1,2}-\d{1,2}\b/);
  if (dateMatch && !newContext.collectedData.date) {
    newContext.collectedData.date = dateMatch[0];
  }
  
  // Extract time
  const timeMatch = response.match(/\b\d{1,2}:\d{2}\s*(?:AM|PM)?\b/i);
  if (timeMatch && !newContext.collectedData.time) {
    newContext.collectedData.time = timeMatch[0];
  }
  
  // Extract title pattern (e.g., "title: Something" or "called Something")
  const titleMatch = response.match(/title[:\s]+([^,.]+)/i) || response.match(/called\s+["']?([^"',.]+)["']?/i);
  if (titleMatch && !newContext.collectedData.title && titleMatch[1]) {
    newContext.collectedData.title = titleMatch[1].trim();
  }
  
  // Extract duration (for meetings)
  const durationMatch = response.match(/(?:for|duration[:\s]+)(\d+)\s*(?:hour|hr|minute|min)/i);
  if (durationMatch && !newContext.collectedData.duration && durationMatch[1]) {
    // Convert to minutes
    const value = parseInt(durationMatch[1], 10);
    if (durationMatch[0].toLowerCase().includes('hour')) {
      newContext.collectedData.duration = value * 60;
    } else {
      newContext.collectedData.duration = value;
    }
  }
  
  // Extract description
  const descriptionMatch = response.match(/description[:\s]+([^.]+)/i);
  if (descriptionMatch && !newContext.collectedData.description && descriptionMatch[1]) {
    newContext.collectedData.description = descriptionMatch[1].trim();
  }
  
  // Extract document type
  if (newContext.intentType === 'document') {
    const documentTypeMatch = response.match(/document\s+type[:\s]+([^,.]+)/i) || 
                              response.match(/type\s+of\s+document[:\s]+([^,.]+)/i);
    if (documentTypeMatch && !newContext.collectedData.documentType && documentTypeMatch[1]) {
      newContext.collectedData.documentType = documentTypeMatch[1].trim();
    }
  }
  
  // Extract deadline (for projects and documents)
  const deadlineMatch = response.match(/deadline[:\s]+([^,.]+)/i) || 
                        response.match(/due\s+(?:by|date)[:\s]+([^,.]+)/i);
  if (deadlineMatch && !newContext.collectedData.deadline && deadlineMatch[1]) {
    newContext.collectedData.deadline = deadlineMatch[1].trim();
  }
  
  // Update missing fields based on collected data
  newContext.missingFields = getMissingFields(newContext);
  
  return newContext;
}

// Helper function to get missing fields based on intent type
function getMissingFields(context: any) {
  const missingFields = [];
  const { intentType, collectedData } = context;
  
  // Check for required fields based on intent type
  if (intentType === 'meeting') {
    if (!collectedData.title) missingFields.push('title');
    if (!collectedData.date) missingFields.push('date');
    if (!collectedData.time) missingFields.push('time');
    if (!collectedData.duration) missingFields.push('duration');
  } else if (intentType === 'project') {
    if (!collectedData.title) missingFields.push('title');
    if (!collectedData.description) missingFields.push('description');
    if (!collectedData.deadline) missingFields.push('deadline');
  } else if (intentType === 'document') {
    if (!collectedData.title) missingFields.push('title');
    if (!collectedData.documentType) missingFields.push('documentType');
  }
  
  return missingFields;
}

// Create default context for new conversations
function createDefaultContext() {
  return {
    intentType: 'unknown',
    confidenceScore: 0,
    collectedData: {},
    missingFields: []
  };
} 