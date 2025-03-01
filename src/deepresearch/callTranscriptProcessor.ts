import { generateText } from 'ai';
import { o3MiniModel } from './ai/providers';
import { generateCompanyPrompt } from './ai/companyPromptGenerator';

/**
 * Processes a call transcript.
 * For now, this function simply logs and returns the transcript.
 * Later, we'll add extraction logic.
 *
 * @param transcript - The full text of the call transcript.
 * @returns The raw transcript.
 */
export function processTranscript(transcript: string): string {
    console.log("Received transcript:", transcript);
    return transcript;
  }

/**
 * Extracts important details from a call transcript using an OpenAI model.
 * @param transcript - The call transcript text.
 * @returns A promise that resolves to an object with the extracted details:
 *          { companyName?: string; keyTopics: string[] }
 */
export async function extractTranscriptDetails(transcript: string): Promise<{ companyName?: string; keyTopics: string[] }> {
  // Create a prompt for extraction
  const prompt = `
Given the following call transcript, extract the company name mentioned (if any) and a list of key topics discussed.
Return ONLY a valid JSON object with the following keys (and nothing else):
  - "companyName": a string (or null if none found)
  - "keyTopics": an array of strings.
Do not include any extra text, code fences, or commentary.

Transcript:
"""${transcript}"""
  `;
  
  let result;
  try {
    // Call the OpenAI model to generate a response
    result = await generateText({
      model: o3MiniModel,
      prompt,
      system: "You are an assistant skilled at extracting structured data from text. Always respond with valid JSON only.",
    });
    
    // Enhanced cleaning logic to ensure valid JSON
    let cleanedText = result.text.trim();
    
    // Remove markdown code fences
    cleanedText = cleanedText.replace(/^```(?:json)?\s*/, '').replace(/```$/, '');
    
    // Extract only the JSON part (from first { to last })
    const firstBrace = cleanedText.indexOf('{');
    const lastBrace = cleanedText.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      cleanedText = cleanedText.substring(firstBrace, lastBrace + 1);
    }
    
    // Parse the cleaned text as JSON
    const extracted = JSON.parse(cleanedText);
    
    // Ensure the expected structure
    return {
      companyName: extracted.companyName === null ? undefined : extracted.companyName,
      keyTopics: Array.isArray(extracted.keyTopics) ? extracted.keyTopics : []
    };
  } catch (error) {
    console.error("Error extracting transcript details:", error, "Response:", result?.text);
    // Return default values in case of error
    return { companyName: undefined, keyTopics: [] };
  }
}

/**
 * Determines the research prompt based on extracted transcript details.
 * @param details - An object containing an optional companyName and an array of keyTopics.
 * @returns A complete research prompt as a string.
 */
export function determineResearchPrompt(details: { companyName?: string; keyTopics: string[] }): string {
  if (details.companyName && details.companyName.trim() !== "") {
    // If a company name is found, generate a company-specific research prompt.
    return generateCompanyPrompt(details.companyName);
  } else if (details.keyTopics && details.keyTopics.length > 0) {
    // If no company name but key topics are present, generate a generic prompt.
    return `You are a research assistant. Based on the key topics discussed: ${details.keyTopics.join(", ")}, perform a comprehensive analysis covering relevant aspects.`;
  } else {
    // Fallback generic prompt.
    return "You are a research assistant. Perform a comprehensive analysis on the provided topic.";
  }
}

/**
 * Infers a unified research query from a call transcript using an OpenAI model.
 * @param transcript - The call transcript text.
 * @returns A promise that resolves to a string containing the unified research query.
 */
export async function inferUnifiedResearchQuery(transcript: string): Promise<string> {
  // Create a prompt for generating a unified research query
  const prompt = `
Given the following call transcript, analyze the content and determine the three most important research questions that should be explored further. Then, collapse these questions into one comprehensive research query. Return ONLY a valid JSON object with the following key:
  - "unifiedQuery": a string containing the comprehensive research query.
Do not include any extra text, markdown formatting, or commentary.

Transcript:
"""${transcript}"""
  `;
  
  let result;
  try {
    // Call the OpenAI model to generate a response
    result = await generateText({
      model: o3MiniModel,
      prompt,
      system: "You are an expert research assistant. Always respond with valid JSON only.",
    });
    
    // Clean the output
    let cleanedText = result.text.trim();
    
    // Remove markdown code fences
    cleanedText = cleanedText.replace(/^```(?:json)?\s*/, '').replace(/```$/, '');
    
    // Extract only the JSON part (from first { to last })
    const firstBrace = cleanedText.indexOf('{');
    const lastBrace = cleanedText.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      cleanedText = cleanedText.substring(firstBrace, lastBrace + 1);
    }
    
    // Parse the cleaned text as JSON
    const extracted = JSON.parse(cleanedText);
    
    // Return the unified query
    return extracted.unifiedQuery || "You are a research assistant. Please perform a comprehensive analysis on the provided transcript.";
  } catch (error) {
    console.error("Error inferring unified research query:", error, "Response:", result?.text);
    // Return fallback query in case of error
    return "You are a research assistant. Please perform a comprehensive analysis on the provided transcript.";
  }
}