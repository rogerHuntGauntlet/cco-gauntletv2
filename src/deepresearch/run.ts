import * as fs from 'fs/promises';
import * as readline from 'readline';

import { deepResearch, writeFinalReport } from './deep-research';
import { generateFeedback } from './feedback';
import { OutputManager } from './output-manager';
import { generateCompanyPrompt } from './ai/companyPromptGenerator';
import { processTranscript, extractTranscriptDetails, determineResearchPrompt, inferUnifiedResearchQuery } from './callTranscriptProcessor';

const output = new OutputManager();

// Helper function for consistent logging
function log(...args: any[]) {
  output.log(...args);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Helper function to get user input
function askQuestion(query: string): Promise<string> {
  return new Promise(resolve => {
    rl.question(query, answer => {
      resolve(answer);
    });
  });
}

// Helper function to check if the query is explicitly a company research query
function isCompanyQuery(query: string): boolean {
  // Normalize the query
  const normalizedQuery = query.trim().toLowerCase();
  
  // Check if the query explicitly starts with "company:" or "company name:"
  if (/^company(?:\s*name)?:\s*(.+)/i.test(normalizedQuery)) {
    console.log(`Detected explicit company query format: "${query}"`);
    return true;
  }
  
  // List of well-known companies to check against
  const wellKnownCompanies = [
    'google', 'apple', 'microsoft', 'amazon', 'facebook', 'meta', 'tesla', 
    'twitter', 'x', 'ibm', 'intel', 'amd', 'nvidia', 'samsung', 'sony', 
    'oracle', 'sap', 'salesforce', 'adobe', 'netflix', 'spotify', 'uber', 
    'lyft', 'airbnb', 'slack', 'zoom', 'tiktok', 'snapchat', 'pinterest',
    'linkedin', 'openai', 'anthropic', 'xai', 'cohere', 'midjourney'
  ];
  
  // Check if the query is exactly a company name or contains it with minimal other text
  for (const company of wellKnownCompanies) {
    // Check for exact match or if the query starts with the company name
    if (normalizedQuery === company || 
        normalizedQuery.startsWith(company + ' ') || 
        normalizedQuery.includes('about ' + company) ||
        normalizedQuery.includes('research ' + company)) {
      console.log(`Detected known company name: "${company}" in query: "${query}"`);
      return true;
    }
  }
  
  // Check if the query ends with common company identifiers
  if (/\b(?:inc\.?|corp\.?|corporation|llc|ltd\.?|limited|gmbh|co\.?|company)\b/i.test(normalizedQuery)) {
    console.log(`Detected company identifier in query: "${query}"`);
    return true;
  }
  
  // Check if the query is about a company or organization
  if (/\b(?:company|organization|business|enterprise|firm|corporation)\b/i.test(normalizedQuery)) {
    console.log(`Detected company-related term in query: "${query}"`);
    return true;
  }
  
  console.log(`Query not detected as a company query: "${query}"`);
  return false;
}

// Extract company name from the query
function extractCompanyName(query: string): string {
  // Check for explicit company prefix
  const companyPrefixMatch = query.match(/^company(?:\s*name)?:\s*(.+)/i);
  if (companyPrefixMatch && companyPrefixMatch[1]) {
    return companyPrefixMatch[1].trim();
  }
  
  // Normalize the query
  const normalizedQuery = query.trim().toLowerCase();
  
  // List of well-known companies to check against
  const wellKnownCompanies = [
    'google', 'apple', 'microsoft', 'amazon', 'facebook', 'meta', 'tesla', 
    'twitter', 'x', 'ibm', 'intel', 'amd', 'nvidia', 'samsung', 'sony', 
    'oracle', 'sap', 'salesforce', 'adobe', 'netflix', 'spotify', 'uber', 
    'lyft', 'airbnb', 'slack', 'zoom', 'tiktok', 'snapchat', 'pinterest',
    'linkedin', 'openai', 'anthropic', 'xai', 'cohere', 'midjourney'
  ];
  
  // Check if the query contains a known company name
  for (const company of wellKnownCompanies) {
    if (normalizedQuery === company || 
        normalizedQuery.startsWith(company + ' ') || 
        normalizedQuery.includes('about ' + company) ||
        normalizedQuery.includes('research ' + company)) {
      return company.charAt(0).toUpperCase() + company.slice(1); // Return with first letter capitalized
    }
  }
  
  // Extract company name from queries with company identifiers
  const companyWithIdentifierMatch = query.match(/\b([A-Za-z0-9\s]+)\b(?:\s+(?:Inc\.?|Corp\.?|Corporation|LLC|Ltd\.?|Limited|GmbH|Co\.?|Company))/i);
  if (companyWithIdentifierMatch && companyWithIdentifierMatch[1]) {
    return companyWithIdentifierMatch[1].trim();
  }
  
  // If no specific format is detected, use the whole query
  // Remove common prefixes like "about" or "research"
  return query.replace(/^(?:about|research|company|information about|tell me about)\s+/i, '').trim();
}

// run the agent
async function run() {
  // Get call transcript
  const transcript = await askQuestion('Please paste the call transcript: ');
  const processedTranscript = processTranscript(transcript);
  
  // Use the new unified research query approach
  const researchPrompt = await inferUnifiedResearchQuery(processedTranscript);
  console.log("Generated Unified Research Query:", researchPrompt);

  const breadth = 4;
  const depth = 2;

  log(`Creating research plan...`);

  log('\nResearching your topic...');

  log('\nStarting research with progress tracking...\n');
  
  const { learnings, visitedUrls } = await deepResearch({
    query: researchPrompt,
    breadth,
    depth,
    onProgress: (progress) => {
      output.updateProgress(progress);
    },
  });

  log(`\n\nLearnings:\n\n${learnings.join('\n')}`);
  log(
    `\n\nVisited URLs (${visitedUrls.length}):\n\n${visitedUrls.join('\n')}`,
  );
  log('Writing final report...');

  const report = await writeFinalReport({
    prompt: researchPrompt,
    learnings,
    visitedUrls,
  });

  // Save report to file
  await fs.writeFile('output.md', report, 'utf-8');

  console.log(`\n\nFinal Report:\n\n${report}`);
  console.log('\nReport has been saved to output.md');
  rl.close();
}

run().catch(console.error);
