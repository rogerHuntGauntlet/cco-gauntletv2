import React, { useState } from 'react';
import PageTemplate from './page-template';
import Link from 'next/link';

const DocumentationPage = () => {
  // State for search input
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState('getting-started');
  
  // Documentation categories and content
  const categories = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: 'core-concepts',
      name: 'Core Concepts',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      id: 'api-reference',
      name: 'API Reference',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      id: 'integrations',
      name: 'Integrations',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      )
    },
    {
      id: 'tutorials',
      name: 'Tutorials',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      )
    },
    {
      id: 'faq',
      name: 'FAQ',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];
  
  // Dummy documentation sections
  const sections = {
    'getting-started': [
      {
        id: 'installation',
        title: 'Installation',
        content: (
          <div>
            <p className="mb-4">
              Get started with CCO by installing our CLI tool or SDK for your specific environment. We support multiple platforms and integration methods.
            </p>
            
            <h3 className="text-lg font-medium text-midnight-blue dark:text-cosmic-latte mb-3">Using npm</h3>
            <div className="bg-obsidian text-nebula-white p-3 rounded-md font-mono text-sm mb-4">
              npm install @cco/client
            </div>
            
            <h3 className="text-lg font-medium text-midnight-blue dark:text-cosmic-latte mb-3">Using yarn</h3>
            <div className="bg-obsidian text-nebula-white p-3 rounded-md font-mono text-sm mb-4">
              yarn add @cco/client
            </div>
            
            <h3 className="text-lg font-medium text-midnight-blue dark:text-cosmic-latte mb-3">Authentication</h3>
            <p className="mb-4">
              After installation, you need to authenticate to start using CCO. Create an API key in your dashboard and use it to authenticate:
            </p>
            <div className="bg-obsidian text-nebula-white p-3 rounded-md font-mono text-sm mb-4">
              npx cco auth --api-key=your_api_key
            </div>
            
            <h3 className="text-lg font-medium text-midnight-blue dark:text-cosmic-latte mb-3">Next Steps</h3>
            <p>
              Once installed, check out the <a href="#" className="text-electric-indigo hover:underline">Quick Start</a> guide or <a href="#" className="text-electric-indigo hover:underline">Core Concepts</a> to learn how to make the most of CCO.
            </p>
          </div>
        )
      },
      {
        id: 'quickstart',
        title: 'Quick Start',
        content: (
          <div>
            <p className="mb-4">
              This quick start guide will help you set up your first meeting with CCO and generate documentation from it.
            </p>
            
            <h3 className="text-lg font-medium text-midnight-blue dark:text-cosmic-latte mb-3">1. Initialize a new project</h3>
            <div className="bg-obsidian text-nebula-white p-3 rounded-md font-mono text-sm mb-4">
              npx cco init my-project
            </div>
            <p className="mb-4">This will create a new CCO project with default settings.</p>
            
            <h3 className="text-lg font-medium text-midnight-blue dark:text-cosmic-latte mb-3">2. Configure your calendar access</h3>
            <div className="bg-obsidian text-nebula-white p-3 rounded-md font-mono text-sm mb-4">
              npx cco connect --calendar
            </div>
            <p className="mb-4">Follow the prompts to connect your Google Calendar, Microsoft Outlook, or other calendar service.</p>
            
            <h3 className="text-lg font-medium text-midnight-blue dark:text-cosmic-latte mb-3">3. Schedule your first AI-powered meeting</h3>
            <div className="bg-obsidian text-nebula-white p-3 rounded-md font-mono text-sm mb-4">
              npx cco meeting create --title="Project Kickoff" --participants="johndoe@example.com,janedoe@example.com"
            </div>
            <p className="mb-4">CCO will suggest available times based on participants' calendars and handle the scheduling.</p>
            
            <h3 className="text-lg font-medium text-midnight-blue dark:text-cosmic-latte mb-3">4. Let CCO handle your meeting</h3>
            <p className="mb-4">During the meeting, CCO will automatically record, transcribe, and extract key information.</p>
            
            <h3 className="text-lg font-medium text-midnight-blue dark:text-cosmic-latte mb-3">5. Generate documentation</h3>
            <div className="bg-obsidian text-nebula-white p-3 rounded-md font-mono text-sm mb-4">
              npx cco docs generate --meeting="Project Kickoff" --format=markdown
            </div>
            <p>Your meeting documentation will be generated in your project directory, ready to be shared with your team.</p>
          </div>
        )
      }
    ],
    'core-concepts': [
      {
        id: 'meeting-assistant',
        title: 'Meeting Assistant',
        content: (
          <div>
            <p className="mb-4">
              Learn how CCO's AI-powered meeting assistant works to make your meetings more productive and valuable.
            </p>
            
            <h3 className="text-lg font-medium text-midnight-blue dark:text-cosmic-latte mb-3">Overview</h3>
            <p className="mb-4">
              The Meeting Assistant is CCO's core feature that handles the entire lifecycle of your meetings, from scheduling to documentation.
            </p>
            
            <h3 className="text-lg font-medium text-midnight-blue dark:text-cosmic-latte mb-3">Key Features</h3>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Intelligent scheduling based on participants' availability and preferences</li>
              <li>Real-time transcription with speaker identification</li>
              <li>Key point extraction and action item detection</li>
              <li>Automatic follow-up and reminder generation</li>
              <li>Integration with task management systems</li>
            </ul>
            
            <h3 className="text-lg font-medium text-midnight-blue dark:text-cosmic-latte mb-3">Architecture</h3>
            <p className="mb-4">
              The Meeting Assistant uses a combination of speech recognition, natural language processing, and specialized AI models to understand the context and content of your meetings.
            </p>
            
            <h3 className="text-lg font-medium text-midnight-blue dark:text-cosmic-latte mb-3">Customization</h3>
            <p>
              You can customize the behavior of the Meeting Assistant through your project configuration file or by passing options to the CLI commands. See the <a href="#" className="text-electric-indigo hover:underline">Configuration Guide</a> for details.
            </p>
          </div>
        )
      }
    ],
    'api-reference': [
      {
        id: 'authentication',
        title: 'Authentication',
        content: (
          <div>
            <p className="mb-4">
              Learn how to authenticate your API requests to the CCO platform.
            </p>
            
            <h3 className="text-lg font-medium text-midnight-blue dark:text-cosmic-latte mb-3">API Keys</h3>
            <p className="mb-4">
              All API requests must include an API key for authentication. You can generate API keys in your CCO dashboard.
            </p>
            
            <h3 className="text-lg font-medium text-midnight-blue dark:text-cosmic-latte mb-3">Authentication Methods</h3>
            <p className="mb-4">
              There are two ways to authenticate your API requests:
            </p>
            
            <h4 className="font-medium text-midnight-blue dark:text-cosmic-latte mb-2">1. Authorization Header</h4>
            <div className="bg-obsidian text-nebula-white p-3 rounded-md font-mono text-sm mb-4">
              Authorization: Bearer YOUR_API_KEY
            </div>
            
            <h4 className="font-medium text-midnight-blue dark:text-cosmic-latte mb-2">2. Query Parameter</h4>
            <div className="bg-obsidian text-nebula-white p-3 rounded-md font-mono text-sm mb-4">
              https://api.cco.dev/v1/meetings?api_key=YOUR_API_KEY
            </div>
            
            <h3 className="text-lg font-medium text-midnight-blue dark:text-cosmic-latte mb-3">API Key Security</h3>
            <p>
              Keep your API keys secure and never expose them in client-side code. We recommend using environment variables to store your API keys.
            </p>
          </div>
        )
      }
    ]
  };
  
  // Get the sections for the selected category
  const selectedSections = sections[selectedCategory] || [];

  return (
    <PageTemplate 
      title="Documentation" 
      description="Comprehensive documentation for the CCO platform. Learn how to use our AI-powered meeting assistant, API, and integrations."
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-midnight-blue dark:text-cosmic-latte mb-4">CCO Documentation</h1>
          <p className="text-cosmic-grey dark:text-nebula-white max-w-3xl mx-auto">
            Everything you need to know about CCO's features, API, and integrations. Get started quickly or dive deep into advanced topics.
          </p>
          
          {/* Search box */}
          <div className="mt-6 max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-obsidian text-midnight-blue dark:text-nebula-white border border-cosmic-grey dark:border-stardust border-opacity-20 dark:border-opacity-20 focus:outline-none focus:ring-2 focus:ring-electric-indigo"
              />
              <div className="absolute right-3 top-3 text-cosmic-grey dark:text-stardust">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-obsidian rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-medium text-midnight-blue dark:text-cosmic-latte mb-4">Documentation</h2>
              <nav>
                <ul className="space-y-1">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                          selectedCategory === category.id
                            ? 'bg-electric-indigo bg-opacity-10 text-electric-indigo'
                            : 'text-cosmic-grey dark:text-nebula-white hover:bg-electric-indigo hover:bg-opacity-5 hover:text-electric-indigo'
                        }`}
                      >
                        <span className="mr-2">{category.icon}</span>
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
              
              <div className="mt-8">
                <h3 className="text-sm font-medium text-midnight-blue dark:text-cosmic-latte uppercase tracking-wider mb-3">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/landing/community" className="text-cosmic-grey dark:text-nebula-white hover:text-electric-indigo dark:hover:text-electric-indigo text-sm flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Community Forum
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/cco-platform" className="text-cosmic-grey dark:text-nebula-white hover:text-electric-indigo dark:hover:text-electric-indigo text-sm flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      GitHub Repository
                    </a>
                  </li>
                  <li>
                    <a href="/landing/changelog" className="text-cosmic-grey dark:text-nebula-white hover:text-electric-indigo dark:hover:text-electric-indigo text-sm flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      Changelog
                    </a>
                  </li>
                  <li>
                    <a href="/landing/support" className="text-cosmic-grey dark:text-nebula-white hover:text-electric-indigo dark:hover:text-electric-indigo text-sm flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      Support
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-obsidian rounded-xl shadow-sm p-6">
              {selectedSections.length > 0 ? (
                <div>
                  {selectedSections.map((section, index) => (
                    <div key={section.id} className={index > 0 ? 'mt-12' : ''}>
                      <h2 className="text-2xl font-bold text-midnight-blue dark:text-cosmic-latte mb-4" id={section.id}>
                        {section.title}
                      </h2>
                      <div className="prose prose-lg dark:prose-invert max-w-none text-cosmic-grey dark:text-nebula-white">
                        {section.content}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 mx-auto text-cosmic-grey dark:text-stardust opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-midnight-blue dark:text-cosmic-latte">No content available</h3>
                  <p className="mt-2 text-cosmic-grey dark:text-nebula-white">
                    The documentation for this section is currently under development.
                  </p>
                </div>
              )}
              
              {/* Feedback section */}
              <div className="mt-12 border-t border-cosmic-grey dark:border-stardust border-opacity-10 dark:border-opacity-10 pt-8">
                <h3 className="text-lg font-medium text-midnight-blue dark:text-cosmic-latte mb-2">Was this helpful?</h3>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 border border-electric-indigo text-electric-indigo rounded-md hover:bg-electric-indigo hover:text-white transition-colors">
                    Yes, thanks!
                  </button>
                  <button className="px-4 py-2 border border-cosmic-grey dark:border-stardust border-opacity-30 dark:border-opacity-30 text-cosmic-grey dark:text-nebula-white rounded-md hover:border-electric-indigo hover:text-electric-indigo transition-colors">
                    Not really
                  </button>
                </div>
                <p className="mt-4 text-sm text-cosmic-grey dark:text-stardust">
                  Have suggestions for improving this documentation? <a href="/landing/contact" className="text-electric-indigo hover:underline">Let us know</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Need help CTA */}
        <div className="mt-12 bg-gradient-to-r from-electric-indigo to-neon-teal rounded-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Need more help?</h2>
            <p className="mb-6 opacity-90">
              Our support team is ready to assist you with any questions or issues you may have about using CCO.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/landing/support" className="bg-white text-electric-indigo px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all">
                Contact Support
              </Link>
              <Link href="/landing/community" className="bg-transparent border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:bg-opacity-10 transition-all">
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default DocumentationPage; 