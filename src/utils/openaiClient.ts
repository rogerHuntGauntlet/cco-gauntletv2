import getConfig from 'next/config';
import OpenAI from 'openai';

// Get server side config
const { serverRuntimeConfig } = getConfig() || { serverRuntimeConfig: {} };

// Initialize the OpenAI client with the API key from environment variables or server config
const openai = new OpenAI({
  apiKey: serverRuntimeConfig.OPENAI_API_KEY || process.env.OPENAI_API_KEY || '',
});

// Default model to use if not specified
const DEFAULT_MODEL = serverRuntimeConfig.DEFAULT_OPENAI_MODEL || 
  process.env.DEFAULT_OPENAI_MODEL || 'gpt-3.5-turbo';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatCompletionOptions {
  modelId?: string;
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
}

/**
 * Sends a message to OpenAI for AI processing
 */
export async function sendMessageToOpenAI(
  messages: Message[],
  options: ChatCompletionOptions = {}
) {
  try {
    // Use either the provided model ID or default model
    const modelId = options.modelId || DEFAULT_MODEL;
    
    // Process system prompt if provided
    if (options.systemPrompt && !messages.some(msg => msg.role === 'system')) {
      messages = [
        { role: 'system', content: options.systemPrompt },
        ...messages
      ];
    }
    
    console.log(`Sending request to OpenAI API with model: ${modelId}`);

    // Send the request to OpenAI
    const response = await openai.chat.completions.create({
      model: modelId,
      messages: messages,
      max_tokens: options.maxTokens || 1024,
      temperature: options.temperature || 0.7,
    });
    
    console.log(`Success with model: ${modelId}`);
    
    // Return the response in a standardized format
    return {
      content: [{
        text: response.choices[0]?.message.content || ''
      }],
      model: modelId
    };
  } catch (error) {
    console.error(`Error with OpenAI model:`, error);
    throw error;
  }
}

export function formatMessagesForOpenAI(
  messages: { role: string; content: string }[]
): Message[] {
  return messages.map(message => ({
    role: message.role as 'user' | 'assistant' | 'system',
    content: message.content
  }));
} 