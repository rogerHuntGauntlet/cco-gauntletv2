import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage, VibeAssistantContext } from '../types/chat';
import { createProject, createMeeting, createDocument } from '../lib/firebase';
import { useAuth } from './AuthContext';

interface AIContextProps {
  messages: ChatMessage[];
  isLoading: boolean;
  context: VibeAssistantContext;
  sendMessage: (message: string) => Promise<void>;
  clearMessages: () => void;
  hasEnoughInfoForGeneration: boolean;
  generateResource: () => Promise<void>;
  currentModel: string;
}

const AIContext = createContext<AIContextProps | undefined>(undefined);

interface AIProviderProps {
  children: ReactNode;
}

export const AIProvider: React.FC<AIProviderProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uuidv4(),
      role: 'assistant',
      content: "Hi there! I'm your VIBE assistant. How can I enhance your flow state today?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState<VibeAssistantContext>({
    intentType: 'unknown',
    confidenceScore: 0,
    collectedData: {},
    missingFields: []
  });
  const [currentModel, setCurrentModel] = useState<string>('default');

  // Determine if we have enough info to generate something
  const hasEnoughInfoForGeneration = useCallback(() => {
    return context.confidenceScore >= 0.8 && context.missingFields.length === 0;
  }, [context]);

  // Send a message to the AI
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Add user message to the list
    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Format messages for the API
      const messageHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      messageHistory.push({ role: 'user', content });

      // Call the API endpoint
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messageHistory,
          context
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();

      // Update the current model if it was returned
      if (data.model) {
        setCurrentModel(data.model);
      }

      // If the response indicates a fallback model was used, notify the user
      let responseContent = data.message;
      if (data.usedFallback) {
        // Format the model name nicely
        const modelName = formatModelName(data.model);
        
        // Add fallback notification to the message
        responseContent = `${responseContent}\n\n_Note: I'm currently using ${modelName} as my language model. Some advanced features may be limited._`;
      }

      // Add assistant's response to messages
      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Update context with new information extracted from the conversation
      if (data.updatedContext) {
        setContext(data.updatedContext);
      }
    } catch (error) {
      console.error('Error communicating with AI:', error);
      
      // Display error message with more helpful information
      const errorMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: "I'm sorry, I'm having trouble accessing my language capabilities right now. This may be due to connectivity issues or service limitations. Please check your OpenAI API key configuration and try again in a moment.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, context]);

  // Clear all messages and reset context
  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: uuidv4(),
        role: 'assistant',
        content: "Hi there! I'm your VIBE assistant. How can I enhance your flow state today?",
        timestamp: new Date()
      }
    ]);
    setContext({
      intentType: 'unknown',
      confidenceScore: 0,
      collectedData: {},
      missingFields: []
    });
    setCurrentModel('default');
  }, []);

  // Generate a resource (meeting, project, document) based on the collected information
  const generateResource = useCallback(async () => {
    if (!hasEnoughInfoForGeneration()) {
      console.error('Not enough information to generate a resource');
      return;
    }

    setIsLoading(true);

    try {
      const resourceType = context.intentType;
      const data = context.collectedData;
      let result = null;

      // Get the current user ID or use a default
      const userId = currentUser?.uid || 'system';

      // Actually create the resource in Firebase based on type
      if (resourceType === 'project') {
        // Create project in Firebase
        const projectData = {
          name: data.title,
          description: data.description || 'Project created by VIBE Assistant',
          status: 'planning',
          priority: 'medium',
          startDate: new Date().toISOString(),
          dueDate: data.deadline || '',
          progress: 0,
          teamMembers: [],
          tags: [],
          userId: userId // Use the actual user ID
        };

        result = await createProject(projectData);
        console.log('Project created in Firebase:', result);
      } else if (resourceType === 'meeting') {
        // Create meeting in Firebase
        const meetingData = {
          title: data.title,
          description: data.description || 'Meeting created by VIBE Assistant',
          date: data.date || new Date().toISOString().split('T')[0],
          time: data.time || '09:00 AM',
          duration: data.duration || 60,
          participantIds: [userId]
        };

        result = await createMeeting(meetingData);
        console.log('Meeting created in Firebase:', result);
      } else if (resourceType === 'document') {
        // Create document in Firebase
        const documentData = {
          title: data.title,
          content: '',
          documentType: data.documentType || 'general',
          createdBy: userId,
          tags: []
        };

        result = await createDocument(documentData);
        console.log('Document created in Firebase:', result);
      }

      // Check for errors
      if (result && result.error) {
        throw new Error(result.error);
      }

      // Add confirmation message
      const confirmationMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: `I've created a new ${resourceType} called "${data.title}". You can find it in your ${resourceType}s dashboard.`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, confirmationMessage]);

      // Reset the context for a new conversation
      setContext({
        intentType: 'unknown',
        confidenceScore: 0,
        collectedData: {},
        missingFields: []
      });
    } catch (error) {
      console.error('Error generating resource:', error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: `I'm sorry, I couldn't create the ${context.intentType} right now. Let's try again?`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [context, hasEnoughInfoForGeneration, currentUser]);

  // Helper function to format the model name for display
  const formatModelName = (modelId: string): string => {
    if (!modelId) return 'a backup model';
    
    // Format OpenAI model names
    if (modelId.includes('gpt-3.5-turbo')) return 'GPT-3.5 Turbo';
    if (modelId.includes('gpt-4')) {
      if (modelId.includes('turbo')) return 'GPT-4 Turbo';
      if (modelId.includes('vision')) return 'GPT-4 Vision';
      if (modelId.includes('32k')) return 'GPT-4 32K';
      return 'GPT-4';
    }
    
    // Legacy format for compatibility with Bedrock models if they're still referenced
    if (modelId.includes('claude-v2')) return 'Claude 2';
    if (modelId.includes('claude-instant')) return 'Claude Instant';
    if (modelId.includes('titan')) return 'Amazon Titan';
    if (modelId.includes('cohere')) return 'Cohere Command';
    if (modelId.includes('llama')) return 'Llama 2';
    
    // Extract just the model name without the full path/ARN
    const parts = modelId.split('/');
    const lastPart = parts[parts.length - 1];
    
    return lastPart || modelId;
  };

  return (
    <AIContext.Provider 
      value={{
        messages,
        isLoading,
        context,
        sendMessage,
        clearMessages,
        hasEnoughInfoForGeneration: hasEnoughInfoForGeneration(),
        generateResource,
        currentModel
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
}; 