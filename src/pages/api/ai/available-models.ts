import { NextApiRequest, NextApiResponse } from 'next';
import { BedrockClient, ListFoundationModelsCommand } from '@aws-sdk/client-bedrock';
import getConfig from 'next/config';

// Get server config
const { serverRuntimeConfig } = getConfig() || { serverRuntimeConfig: {} };

// Initialize Bedrock client
const bedrockClient = new BedrockClient({
  region: serverRuntimeConfig.AWS_REGION || process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: serverRuntimeConfig.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: serverRuntimeConfig.AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Create the command to list foundation models
    const command = new ListFoundationModelsCommand({});

    // Send the request to AWS Bedrock
    const response = await bedrockClient.send(command);
    
    // Extract just the model IDs and provider names for simplicity
    const models = response.modelSummaries?.map(model => ({
      modelId: model.modelId,
      modelName: model.modelName,
      provider: model.providerName,
      responseStreamingSupported: model.responseStreamingSupported,
      inputModalities: model.inputModalities,
      outputModalities: model.outputModalities,
      customizationsSupported: model.customizationsSupported
    })) || [];

    // Get provisioned throughput models (inference profiles)
    // Inference profiles would need a different API call which we'll skip for simplicity

    // Return the available models
    return res.status(200).json({
      models,
      region: serverRuntimeConfig.AWS_REGION || process.env.AWS_REGION || 'us-east-1'
    });

  } catch (error: any) {
    console.error('Error retrieving available models:', error);
    
    // Return a meaningful error
    return res.status(500).json({
      error: 'Failed to retrieve available models',
      message: error.message || 'Unknown error',
      hint: 'Make sure your AWS credentials have access to Bedrock and the ListFoundationModels permission'
    });
  }
} 