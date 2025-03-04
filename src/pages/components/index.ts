// Export all onboarding components
export { default as ProgressSteps } from './ProgressSteps';
export { default as IntroductionStep } from './IntroductionStep';
export { default as DataSourcesStep } from './DataSourcesStep';
export { default as CustomizeStep } from './CustomizeStep';
export { default as ConfirmationStep } from './ConfirmationStep';
export { default as VoiceInteractionStep } from './VoiceInteractionStep';

// Export types explicitly instead of using export *
export type { DataSource, Preferences } from './types'; 

// This empty export prevents Next.js from treating this file as a page
export default function NotAPage() {
  return null;
} 