import React from 'react';
import PageTemplate from '../components/PageTemplate';

// Features Page Component
const FeaturesPage = () => {
  return (
    <PageTemplate 
      title="Features" 
      description="Discover how the CCO Platform eliminates administrative overhead and keeps vibe coders in their creative flow."
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-midnight-blue dark:text-cosmic-latte">Features that Preserve Your Creative Flow</h1>
        
        <p className="lead mb-12 text-cosmic-grey dark:text-nebula-white">
          The CCO Platform is designed specifically for vibe coders who prioritize maintaining their creative flow over administrative tasks. Our features work together to eliminate the overhead that disrupts your coding experience.
        </p>
        
        {/* Feature 1: Real-time Meeting Assistance */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-6">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="bg-electric-indigo bg-opacity-10 dark:bg-opacity-20 p-6 rounded-full aspect-square flex items-center justify-center">
                <svg className="w-16 h-16 text-electric-indigo dark:text-electric-indigo" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="w-full md:w-2/3 lg:w-3/4">
              <h2 className="text-midnight-blue dark:text-cosmic-latte">Real-time Meeting Assistance</h2>
              <p className="text-cosmic-grey dark:text-nebula-white">
                Our AI seamlessly integrates with your Zoom, Google Meet, and Microsoft Teams calls to provide real-time assistance during client and team meetings, ensuring nothing important is missed.
              </p>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-electric-indigo dark:text-electric-indigo" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-cosmic-grey dark:text-nebula-white">
                    <span className="font-medium text-midnight-blue dark:text-cosmic-latte">Real-time tips:</span> Receive contextual prompts during client discussions, helping you ask the right questions and gather all the information needed for implementation.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-electric-indigo dark:text-electric-indigo" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-cosmic-grey dark:text-nebula-white">
                    <span className="font-medium text-midnight-blue dark:text-cosmic-latte">Automatic transcription:</span> Get searchable, timestamped transcripts of all your meetings without any manual effort.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-electric-indigo dark:text-electric-indigo" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-cosmic-grey dark:text-nebula-white">
                    <span className="font-medium text-midnight-blue dark:text-cosmic-latte">Action item extraction:</span> AI automatically identifies and tracks action items from your meetings, so nothing falls through the cracks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature 2: Automated Documentation Generation */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-6">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="bg-electric-indigo bg-opacity-10 dark:bg-opacity-20 p-6 rounded-full aspect-square flex items-center justify-center">
                <svg className="w-16 h-16 text-electric-indigo dark:text-electric-indigo" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="w-full md:w-2/3 lg:w-3/4">
              <h2 className="text-midnight-blue dark:text-cosmic-latte">Automated Documentation Generation</h2>
              <p className="text-cosmic-grey dark:text-nebula-white">
                Say goodbye to manual documentation. Our platform automatically generates comprehensive documentation from your meetings, saving you hours of administrative work.
              </p>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-electric-indigo dark:text-electric-indigo" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-cosmic-grey dark:text-nebula-white">
                    <span className="font-medium text-midnight-blue dark:text-cosmic-latte">Meeting notes:</span> Automatically generate structured meeting notes with key points, decisions, and action items.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-electric-indigo dark:text-electric-indigo" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-cosmic-grey dark:text-nebula-white">
                    <span className="font-medium text-midnight-blue dark:text-cosmic-latte">Product Requirements Documents (PRDs):</span> Create comprehensive PRDs from client discussions without manual effort.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-electric-indigo dark:text-electric-indigo" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-cosmic-grey dark:text-nebula-white">
                    <span className="font-medium text-midnight-blue dark:text-cosmic-latte">Technical specifications:</span> Transform client requirements into detailed technical specifications that you can implement right away.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature 3: Starter Code Repository Generation */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-6">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="bg-electric-indigo bg-opacity-10 dark:bg-opacity-20 p-6 rounded-full aspect-square flex items-center justify-center">
                <svg className="w-16 h-16 text-electric-indigo dark:text-electric-indigo" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="w-full md:w-2/3 lg:w-3/4">
              <h2 className="text-midnight-blue dark:text-cosmic-latte">Starter Code Repository Generation</h2>
              <p className="text-cosmic-grey dark:text-nebula-white">
                Transform client discussions directly into starter code repositories. Skip the setup and get straight to the creative coding work.
              </p>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-electric-indigo dark:text-electric-indigo" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-cosmic-grey dark:text-nebula-white">
                    <span className="font-medium text-midnight-blue dark:text-cosmic-latte">Framework selection:</span> AI analyzes project requirements and suggests optimal tech stack and framework choices.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-electric-indigo dark:text-electric-indigo" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-cosmic-grey dark:text-nebula-white">
                    <span className="font-medium text-midnight-blue dark:text-cosmic-latte">IDE integration:</span> Repositories are automatically created and opened in your preferred IDE, ready for you to start coding.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-electric-indigo dark:text-electric-indigo" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-cosmic-grey dark:text-nebula-white">
                    <span className="font-medium text-midnight-blue dark:text-cosmic-latte">Boilerplate code:</span> Generate boilerplate code based on project requirements, saving hours of setup time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature 4: Vibe Coder Marketplace */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-6">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="bg-electric-indigo bg-opacity-10 dark:bg-opacity-20 p-6 rounded-full aspect-square flex items-center justify-center">
                <svg className="w-16 h-16 text-electric-indigo dark:text-electric-indigo" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
            </div>
            <div className="w-full md:w-2/3 lg:w-3/4">
              <h2 className="text-midnight-blue dark:text-cosmic-latte">Vibe Coder Marketplace</h2>
              <p className="text-cosmic-grey dark:text-nebula-white">
                Our unique marketplace connects vibe coders with clients who value their intuitive approach to development, using our innovative evaluation process.
              </p>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-electric-indigo dark:text-electric-indigo" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-cosmic-grey dark:text-nebula-white">
                    <span className="font-medium text-midnight-blue dark:text-cosmic-latte">Chief Cognitive Officer interview:</span> Our unique evaluation process allows clients to assess your problem-solving approach without disrupting your creative flow.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-electric-indigo dark:text-electric-indigo" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-cosmic-grey dark:text-nebula-white">
                    <span className="font-medium text-midnight-blue dark:text-cosmic-latte">Client matching:</span> Our platform intelligently matches you with clients who appreciate your particular vibe coding style and skills.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-electric-indigo dark:text-electric-indigo" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-cosmic-grey dark:text-nebula-white">
                    <span className="font-medium text-midnight-blue dark:text-cosmic-latte">Project management:</span> We handle all the administrative aspects of client projects, allowing you to focus solely on the creative coding work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature 5: CCO Personalization */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-6">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="bg-electric-indigo bg-opacity-10 dark:bg-opacity-20 p-6 rounded-full aspect-square flex items-center justify-center">
                <svg className="w-16 h-16 text-electric-indigo dark:text-electric-indigo" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="w-full md:w-2/3 lg:w-3/4">
              <h2 className="text-midnight-blue dark:text-cosmic-latte">CCO Personalization</h2>
              <p className="text-cosmic-grey dark:text-nebula-white">
                Train your CCO to adapt to your unique workflow and coding style by integrating with your favorite tools and data sources.
              </p>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-electric-indigo dark:text-electric-indigo" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-cosmic-grey dark:text-nebula-white">
                    <span className="font-medium text-midnight-blue dark:text-cosmic-latte">GitHub integration:</span> Connect to your repositories to give your CCO context about your coding style and project history.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-electric-indigo dark:text-electric-indigo" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-cosmic-grey dark:text-nebula-white">
                    <span className="font-medium text-midnight-blue dark:text-cosmic-latte">Slack and Discord integration:</span> Your CCO can participate in your team channels, providing assistance and summarizing discussions.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-electric-indigo dark:text-electric-indigo" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-cosmic-grey dark:text-nebula-white">
                    <span className="font-medium text-midnight-blue dark:text-cosmic-latte">Notion and Confluence integration:</span> Your CCO can access your company's knowledge base to provide context-aware assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature 6: Centralized Dashboard */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-6">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="bg-electric-indigo bg-opacity-10 dark:bg-opacity-20 p-6 rounded-full aspect-square flex items-center justify-center">
                <svg className="w-16 h-16 text-electric-indigo dark:text-electric-indigo" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
            </div>
            <div className="w-full md:w-2/3 lg:w-3/4">
              <h2 className="text-midnight-blue dark:text-cosmic-latte">Centralized Dashboard</h2>
              <p className="text-cosmic-grey dark:text-nebula-white">
                Access all your meeting transcripts, documents, and code repositories in one place, with powerful search capabilities.
              </p>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-electric-indigo dark:text-electric-indigo" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-cosmic-grey dark:text-nebula-white">
                    <span className="font-medium text-midnight-blue dark:text-cosmic-latte">Universal search:</span> Find anything from any meeting or document with our powerful semantic search capabilities.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-electric-indigo dark:text-electric-indigo" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-cosmic-grey dark:text-nebula-white">
                    <span className="font-medium text-midnight-blue dark:text-cosmic-latte">Project organization:</span> Automatically organize your resources by project, client, and date for easy access.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-electric-indigo dark:text-electric-indigo" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-cosmic-grey dark:text-nebula-white">
                    <span className="font-medium text-midnight-blue dark:text-cosmic-latte">Sharing capabilities:</span> Easily share resources with clients or team members with customizable permissions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-gradient-to-r from-electric-indigo to-neon-teal dark:from-electric-indigo/80 dark:to-neon-teal/80 p-8 rounded-lg text-white mt-12 text-center shadow-lg">
          <h2 className="text-white dark:text-cosmic-latte font-bold">Ready to eliminate administrative overhead?</h2>
          <p className="text-white dark:text-cosmic-latte dark:text-opacity-95 max-w-2xl mx-auto my-4">
            Join the community of vibe coders who are using the CCO Platform to stay in their creative flow state and deliver exceptional work.
          </p>
          <a href="/landing/pricing" className="inline-block mt-4 bg-white dark:bg-cosmic-latte text-electric-indigo dark:text-electric-indigo px-6 py-3 rounded-md font-medium hover:bg-opacity-90 dark:hover:bg-opacity-90 transition-all">
            Sign Up for CCO
          </a>
        </div>
      </div>
    </PageTemplate>
  );
};

export default FeaturesPage; 