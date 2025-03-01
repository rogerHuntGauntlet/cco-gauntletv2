export interface DataSource {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
}

export interface Preferences {
  notificationFrequency: string;
  dataPrivacy: string;
  aiSuggestions: boolean;
}

export interface UserData {
  name: string;
  email: string;
  isAuthenticated: boolean;
  dataSources?: string[];
  preferences?: Preferences;
  userProject?: string;
  onboardingComplete: boolean;
}

// This empty export prevents Next.js from treating this file as a page
export default function NotAPage() {
  return null;
} 