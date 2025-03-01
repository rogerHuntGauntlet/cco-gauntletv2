export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface VibeAssistantContext {
  intentType: 'meeting' | 'project' | 'document' | 'unknown';
  confidenceScore: number;
  collectedData: {
    title?: string;
    description?: string;
    participants?: string[];
    date?: string;
    time?: string;
    duration?: number;
    projectName?: string;
    documentType?: string;
    priority?: 'low' | 'medium' | 'high';
    actionItems?: string[];
    keyPoints?: string[];
    tags?: string[];
    deadline?: string;
    [key: string]: any;
  };
  missingFields: string[];
}

export interface AIPromptConfig {
  systemPrompt: string;
  initialMessages: ChatMessage[];
}

export const defaultSystemPrompt = `You are VIBE Assistant, a helpful AI that assists users with generating meetings, projects, and documents based on conversations.

As the conversation progresses, your primary objective is to identify the user's intent:
1. Meeting creation - collect details like title, date, time, duration, participants
2. Project creation - collect details like name, description, deadline, team members
3. Document creation - collect details like title, type, content requirements, deadline

For each potential intent, maintain a running confidence score and track what information you've collected vs. what's still missing.

When you have enough information (>80% confidence and most required fields), proactively suggest creating the appropriate resource. Required fields:
- Meeting: title, date, time, duration
- Project: name, description, deadline
- Document: title, type

Always be helpful, conversational, and focus on collecting the necessary information without being pushy. Use natural conversation to extract what you need.`;

export const assistantIntentMappings = {
  meeting: {
    requiredFields: ['title', 'date', 'time', 'duration'],
    optionalFields: ['participants', 'projectName', 'description', 'agenda', 'location', 'recurring']
  },
  project: {
    requiredFields: ['title', 'description', 'deadline'],
    optionalFields: ['participants', 'priority', 'tags', 'milestones', 'budget']
  },
  document: {
    requiredFields: ['title', 'documentType'],
    optionalFields: ['description', 'deadline', 'tags', 'content', 'audience', 'purpose']
  }
}; 