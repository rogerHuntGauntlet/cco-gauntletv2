import { BedrockRuntimeClient, InvokeModelCommand, InvokeModelWithResponseStreamCommand } from '@aws-sdk/client-bedrock-runtime';
import getConfig from 'next/config';

// Get server side config
const { serverRuntimeConfig } = getConfig() || { serverRuntimeConfig: {} };

// Initialize the Bedrock client with the credentials from the environment variables or server config
const bedrockClient = new BedrockRuntimeClient({
  region: serverRuntimeConfig.AWS_REGION || process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: serverRuntimeConfig.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: serverRuntimeConfig.AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

// Get inference profile ARN if available
const INFERENCE_PROFILE_ARN = serverRuntimeConfig.BEDROCK_INFERENCE_PROFILE_ARN || 
  process.env.BEDROCK_INFERENCE_PROFILE_ARN || '';

// Default models to try in order of preference
// Add models from different providers to increase chances of having access to at least one
const FALLBACK_MODELS = [
  'anthropic.claude-v2',
  'anthropic.claude-instant-v1',
  'amazon.titan-text-express-v1',
  'amazon.titan-text-lite-v1',
  'cohere.command-text-v14',
  'meta.llama2-13b-chat-v1'
];

// Default model to use if not specified and no inference profile is available
const DEFAULT_MODEL = serverRuntimeConfig.DEFAULT_BEDROCK_MODEL || 
  process.env.DEFAULT_BEDROCK_MODEL || FALLBACK_MODELS[0];

interface AnthropicMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface AnthropicRequest {
  anthropic_version: string;
  max_tokens: number;
  messages: AnthropicMessage[];
  temperature?: number;
  top_p?: number;
  top_k?: number;
  stop_sequences?: string[];
  system?: string;
}

interface ChatCompletionOptions {
  modelId?: string;
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
  useInferenceProfile?: boolean;
}

/**
 * Sends a message to AWS Bedrock for AI processing
 */
export async function sendMessageToBedrock(
  messages: AnthropicMessage[],
  options: ChatCompletionOptions = {}
) {
  // Determine if we should use an inference profile (preferring the passed option, then checking if ARN exists)
  const useInferenceProfile = options.useInferenceProfile !== undefined 
    ? options.useInferenceProfile 
    : !!INFERENCE_PROFILE_ARN;
  
  // Use either the provided model ID, inference profile ARN, or default model
  let modelId = useInferenceProfile && INFERENCE_PROFILE_ARN 
    ? INFERENCE_PROFILE_ARN 
    : (options.modelId || DEFAULT_MODEL);
  
  // Keep track of which models we've already tried
  const triedModels = new Set<string>();
  
  // We'll keep trying different models until one works or we run out of options
  let lastError = null;
  
  // Try the specified model first, then fall back to others if necessary
  while (true) {
    try {
      // Avoid trying the same model twice
      if (triedModels.has(modelId)) {
        throw new Error(`Already tried model ${modelId}`);
      }
      
      triedModels.add(modelId);
      
      const isInferenceProfile = modelId.includes('inference-profile');
      const isClaudeV2 = modelId.includes('claude-v2') || modelId.includes('claude-instant');
      const isAmazonTitan = modelId.includes('amazon.titan');
      const isCohere = modelId.includes('cohere');
      const isLlama = modelId.includes('meta.llama');
      
      // Prepare the request body based on the model
      let requestBody: any;

      if (modelId.includes('claude') || isInferenceProfile) {
        // Claude-specific request format
        const systemPrompt = options.systemPrompt || ''; 
        
        // For Claude v2 and Instant models, use the older prompt format
        if (isClaudeV2 && !isInferenceProfile) {
          // Older Claude models (V2, Instant) use the prompt format
          const formattedMessages = formatMessagesForOlderClaude(messages, systemPrompt);
          requestBody = {
            prompt: formattedMessages,
            max_tokens_to_sample: options.maxTokens || 2048,
            temperature: options.temperature || 0.7,
            stop_sequences: ["\n\nHuman:", "\n\nAssistant:"],
          };
        } else {
          // Newer Claude models (3, 3 Opus, etc.) use the messages format
          // This also works for inference profiles with Claude models
          requestBody = {
            anthropic_version: "bedrock-2023-05-31",
            max_tokens: options.maxTokens || 4096,
            messages: messages,
            temperature: options.temperature || 0.7,
          };
          
          if (systemPrompt) {
            requestBody.system = systemPrompt;
          }
        }
      } else if (isAmazonTitan) {
        // Amazon Titan format
        const systemPrompt = options.systemPrompt || '';
        const formattedMessages = formatMessagesForTitan(messages, systemPrompt);
        
        requestBody = {
          inputText: formattedMessages,
          textGenerationConfig: {
            maxTokenCount: options.maxTokens || 2048,
            temperature: options.temperature || 0.7,
            topP: 0.9,
          }
        };
      } else if (isCohere) {
        // Cohere format
        const systemPrompt = options.systemPrompt || '';
        
        requestBody = {
          prompt: formatMessagesForCohere(messages, systemPrompt),
          max_tokens: options.maxTokens || 2048,
          temperature: options.temperature || 0.7,
        };
      } else if (isLlama) {
        // Llama format  
        const systemPrompt = options.systemPrompt || '';
        
        requestBody = {
          prompt: formatMessagesForLlama(messages, systemPrompt),
          max_gen_len: options.maxTokens || 2048,
          temperature: options.temperature || 0.7,
        };
      } else {
        throw new Error(`Unsupported model: ${modelId}`);
      }

      // Log the model being used
      console.log(`Trying model: ${modelId}`);
      console.log(`Inference profile: ${isInferenceProfile ? 'Yes' : 'No'}`);

      // Create the command to invoke the model
      const command = new InvokeModelCommand({
        modelId,
        body: JSON.stringify(requestBody),
        contentType: 'application/json',
        accept: 'application/json',
      });

      // Send the request to AWS Bedrock
      const response = await bedrockClient.send(command);
      
      // Parse the response
      const responseBody = JSON.parse(new TextDecoder().decode(response.body));
      
      console.log(`Success with model: ${modelId}`);
      
      // Format the response based on the model version
      if (isClaudeV2 && !isInferenceProfile) {
        // Older Claude models return a completion
        return {
          content: [{
            text: responseBody.completion
          }],
          model: modelId
        };
      } else if (isAmazonTitan) {
        return {
          content: [{
            text: responseBody.results?.[0]?.outputText || responseBody.outputText || ''
          }],
          model: modelId
        };
      } else if (isCohere) {
        return {
          content: [{
            text: responseBody.generations?.[0]?.text || responseBody.text || ''
          }],
          model: modelId
        };
      } else if (isLlama) {
        return {
          content: [{
            text: responseBody.generation || ''
          }],
          model: modelId
        };
      }
      
      // For newer Claude models and inference profiles
      return {
        ...responseBody,
        model: modelId
      };
    } catch (error) {
      console.error(`Error with model ${modelId}:`, error);
      lastError = error;
      
      // Try the next model in the list if we haven't already tried them all
      const nextModel = FALLBACK_MODELS.find(model => !triedModels.has(model));
      
      if (!nextModel) {
        console.error('All models failed. Last error:', lastError);
        throw new Error(`No available models found. Please check your AWS Bedrock permissions: ${lastError.message}`);
      }
      
      console.log(`Falling back to next model: ${nextModel}`);
      modelId = nextModel;
    }
  }
}

// Format messages for Claude 2 which uses a different format
function formatMessagesForOlderClaude(messages: AnthropicMessage[], systemPrompt: string): string {
  let formattedPrompt = '';
  
  // Add system prompt if provided
  if (systemPrompt) {
    formattedPrompt += systemPrompt + '\n\n';
  }
  
  // Format messages as a conversation
  for (const message of messages) {
    if (message.role === 'user') {
      formattedPrompt += `\n\nHuman: ${message.content}`;
    } else if (message.role === 'assistant') {
      formattedPrompt += `\n\nAssistant: ${message.content}`;
    }
    // System messages are handled through the separate systemPrompt
  }
  
  // Add the final assistant prefix to prompt the model to respond
  formattedPrompt += '\n\nAssistant:';
  
  return formattedPrompt;
}

// Format messages for Amazon Titan models
function formatMessagesForTitan(messages: AnthropicMessage[], systemPrompt: string): string {
  let formattedPrompt = '';
  
  // Add system prompt if provided
  if (systemPrompt) {
    formattedPrompt += 'System: ' + systemPrompt + '\n\n';
  }
  
  // Format messages as a conversation
  for (const message of messages) {
    if (message.role === 'user') {
      formattedPrompt += `User: ${message.content}\n`;
    } else if (message.role === 'assistant') {
      formattedPrompt += `Assistant: ${message.content}\n`;
    }
  }
  
  // Add the final assistant marker
  formattedPrompt += 'Assistant:';
  
  return formattedPrompt;
}

// Format messages for Cohere models
function formatMessagesForCohere(messages: AnthropicMessage[], systemPrompt: string): string {
  let formattedPrompt = '';
  
  // Add system prompt if provided
  if (systemPrompt) {
    formattedPrompt += systemPrompt + '\n\n';
  }
  
  // Format messages as a conversation
  for (const message of messages) {
    if (message.role === 'user') {
      formattedPrompt += `USER: ${message.content}\n`;
    } else if (message.role === 'assistant') {
      formattedPrompt += `ASSISTANT: ${message.content}\n`;
    }
  }
  
  // Add the final assistant marker
  formattedPrompt += 'ASSISTANT:';
  
  return formattedPrompt;
}

// Format messages for Llama models
function formatMessagesForLlama(messages: AnthropicMessage[], systemPrompt: string): string {
  let formattedPrompt = '';
  
  // Add system prompt if provided
  if (systemPrompt) {
    formattedPrompt += '<s>[INST] <<SYS>>\n' + systemPrompt + '\n<</SYS>>\n\n';
  } else {
    formattedPrompt += '<s>[INST] ';
  }
  
  // Format messages as a conversation
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    if (message.role === 'user') {
      if (i === 0 && !systemPrompt) {
        formattedPrompt += message.content;
      } else {
        formattedPrompt += `[/INST] ${message.content} [INST] `;
      }
    } else if (message.role === 'assistant') {
      formattedPrompt += `${message.content}`;
    }
  }
  
  // Close the instruction tag
  formattedPrompt += ' [/INST]';
  
  return formattedPrompt;
}

export function formatMessagesForBedrock(
  messages: { role: string; content: string }[]
): AnthropicMessage[] {
  return messages.map(message => ({
    role: message.role as 'user' | 'assistant' | 'system',
    content: message.content
  }));
} 