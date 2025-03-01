import { generateObject, generateText } from 'ai';
import { z } from 'zod';

import { o3MiniModel } from './providers';

/**
 * A wrapper around generateObject that handles different models correctly.
 * For o1-mini, it uses generateText instead of generateObject to avoid response_format issues.
 */
export async function safeGenerateObject<T extends z.ZodType>({
  model = o3MiniModel,
  system,
  prompt,
  schema,
  abortSignal,
}: {
  model?: any;
  system?: string;
  prompt: string;
  schema: T;
  abortSignal?: AbortSignal;
}) {
  // Check if we're using o1-mini model
  const isO1Mini = process.env.OPENAI_MODEL === 'o1-mini' || 
                  (!process.env.OPENAI_MODEL && 'o1-mini');

  if (isO1Mini) {
    // For o1-mini, use generateText instead of generateObject
    // and manually parse the response
    const result = await generateText({
      model,
      system,
      prompt: `${prompt}\n\nYou must respond with a valid JSON object that matches this schema: ${JSON.stringify(schema.shape)}\n\nDo not include any text before or after the JSON object. Only respond with the JSON object.`,
      abortSignal,
    });

    const cleanedText = result.text
      .trim()
      .replace(/^```(?:json)?\s*/, '')
      .replace(/```$/, '');

    try {
      // Parse the cleaned text as JSON
      const parsedResult = JSON.parse(cleanedText);
      
      // Validate against the schema
      const validatedResult = schema.parse(parsedResult);
      
      return {
        object: validatedResult as z.infer<T>,
      };
    } catch (error) {
      console.error('Error parsing JSON response:', error, 'Cleaned text:', cleanedText);
      throw new Error('Failed to parse response as JSON');
    }
  } else {
    // For other models, use generateObject as normal
    return generateObject({
      model,
      system,
      prompt,
      schema,
      abortSignal,
    });
  }
} 