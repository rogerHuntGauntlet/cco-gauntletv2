import { NextApiRequest, NextApiResponse } from 'next';
import { BedrockClient, ListFoundationModelsCommand } from '@aws-sdk/client-bedrock';
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import getConfig from 'next/config';

// Get server config
const { serverRuntimeConfig } = getConfig() || { serverRuntimeConfig: {} };

// Safely get credentials with removed secrets
const safeCredentials = {
  region: serverRuntimeConfig.AWS_REGION || process.env.AWS_REGION || 'us-east-1',
  accessKeyIdPrefix: (serverRuntimeConfig.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || '').substring(0, 5) + '...',
  hasSecretKey: !!(serverRuntimeConfig.AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY),
  modelId: serverRuntimeConfig.DEFAULT_BEDROCK_MODEL || process.env.DEFAULT_BEDROCK_MODEL || 'anthropic.claude-v2',
  hasInferenceProfile: !!(serverRuntimeConfig.BEDROCK_INFERENCE_PROFILE_ARN || process.env.BEDROCK_INFERENCE_PROFILE_ARN),
};

// Initialize Bedrock clients
const bedrockClient = new BedrockClient({
  region: serverRuntimeConfig.AWS_REGION || process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: serverRuntimeConfig.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: serverRuntimeConfig.AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const bedrockRuntimeClient = new BedrockRuntimeClient({
  region: serverRuntimeConfig.AWS_REGION || process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: serverRuntimeConfig.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: serverRuntimeConfig.AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const FALLBACK_MODELS = [
  'anthropic.claude-v2',
  'anthropic.claude-instant-v1',
  'amazon.titan-text-express-v1',
  'amazon.titan-text-lite-v1',
  'cohere.command-text-v14',
  'meta.llama2-13b-chat-v1'
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // For security, check for a debug password or token
  // This is just a simple protection to avoid exposing credentials in production
  const debugPassword = req.query.debug_key;
  if (debugPassword !== 'local_debug_only') {
    return res.status(403).json({ error: 'Debug key required' });
  }

  try {
    // Collect test results
    const results: any = {
      credentials: safeCredentials,
      tests: {},
      availableModels: [],
      modelTestResults: {}
    };

    // Test 1: List foundation models
    try {
      console.log('Attempting to list foundation models...');
      const command = new ListFoundationModelsCommand({});
      const response = await bedrockClient.send(command);
      results.tests.listModels = {
        success: true,
        message: `Found ${response.modelSummaries?.length || 0} models`
      };
      
      // Save available models
      results.availableModels = response.modelSummaries?.map(model => ({
        modelId: model.modelId,
        modelName: model.modelName,
        provider: model.providerName
      })) || [];
      
      console.log(`Available models: ${results.availableModels.length}`);
    } catch (error: any) {
      results.tests.listModels = {
        success: false,
        message: error.message || 'Unknown error',
        error: error.toString()
      };
      console.error('Error listing models:', error);
    }

    // Test 2: Try to invoke each fallback model
    for (const modelId of FALLBACK_MODELS) {
      try {
        console.log(`Testing model: ${modelId}...`);
        
        // Prepare a minimal request body based on the model
        let requestBody: any;
        
        if (modelId.includes('claude')) {
          if (modelId.includes('claude-v2') || modelId.includes('claude-instant')) {
            // Older Claude format
            requestBody = {
              prompt: '\n\nHuman: Hello, are you available?\n\nAssistant:',
              max_tokens_to_sample: 10,
              temperature: 0,
              stop_sequences: ["\n\nHuman:", "\n\nAssistant:"]
            };
          } else {
            // Newer Claude format
            requestBody = {
              anthropic_version: "bedrock-2023-05-31",
              max_tokens: 10,
              messages: [{ role: 'user', content: 'Hello, are you available?' }],
              temperature: 0
            };
          }
        } else if (modelId.includes('amazon.titan')) {
          requestBody = {
            inputText: 'User: Hello, are you available?\nAssistant:',
            textGenerationConfig: {
              maxTokenCount: 10,
              temperature: 0,
              topP: 0.9
            }
          };
        } else if (modelId.includes('cohere')) {
          requestBody = {
            prompt: 'USER: Hello, are you available?\nASSISTANT:',
            max_tokens: 10,
            temperature: 0
          };
        } else if (modelId.includes('meta.llama')) {
          requestBody = {
            prompt: '<s>[INST] Hello, are you available? [/INST]',
            max_gen_len: 10,
            temperature: 0
          };
        } else {
          // Skip unknown models
          results.modelTestResults[modelId] = {
            success: false,
            message: 'Unknown model format'
          };
          continue;
        }
        
        // Create and send the invoke command
        const command = new InvokeModelCommand({
          modelId,
          body: JSON.stringify(requestBody),
          contentType: 'application/json',
          accept: 'application/json'
        });
        
        const response = await bedrockRuntimeClient.send(command);
        const responseText = new TextDecoder().decode(response.body);
        
        results.modelTestResults[modelId] = {
          success: true,
          message: 'Model is accessible',
          responseStart: responseText.substring(0, 50) + '...'
        };
        
        console.log(`Model ${modelId} test successful`);
      } catch (error: any) {
        results.modelTestResults[modelId] = {
          success: false,
          message: error.message || 'Unknown error',
          error: error.toString()
        };
        console.error(`Error testing model ${modelId}:`, error);
      }
    }

    // Return all test results
    return res.status(200).json(results);
  } catch (error: any) {
    console.error('Error in debug endpoint:', error);
    return res.status(500).json({
      error: 'Debug test failed',
      message: error.message || 'Unknown error'
    });
  }
} 