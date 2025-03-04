import React from 'react';
import PageTemplate from './page-template';
import Link from 'next/link';

const ChangelogPage = () => {
  // Sample changelog data with releases
  const releases = [
    {
      version: 'v1.2.0',
      date: 'April 14, 2025',
      title: 'Enhanced Meeting Transcription & JIRA Integration',
      description: 'This release brings major improvements to our meeting transcription accuracy and adds native JIRA integration.',
      changes: [
        {
          type: 'feature',
          title: 'JIRA Integration',
          description: 'Seamlessly create and assign JIRA tickets directly from meeting notes with AI-powered task identification.'
        },
        {
          type: 'improvement',
          title: 'Enhanced Transcription Engine',
          description: 'Completely rebuilt transcription engine with 30% better accuracy for technical discussions and multiple speakers.'
        },
        {
          type: 'improvement',
          title: 'Action Item Detection',
          description: 'Improved AI model for identifying action items and commitments in meeting transcripts.'
        },
        {
          type: 'fix',
          title: 'Calendar Sync Issues',
          description: 'Fixed bugs related to Google Calendar recurring meeting synchronization.'
        },
        {
          type: 'feature',
          title: 'Custom Documentation Templates',
          description: 'Added ability to create and use custom templates for meeting documentation exports.'
        }
      ]
    },
    {
      version: 'v1.1.2',
      date: 'March 28, 2025',
      title: 'Bug Fixes & Performance Improvements',
      description: 'This release focuses on stability improvements and bug fixes reported by our users.',
      changes: [
        {
          type: 'fix',
          title: 'Meeting Recording Reliability',
          description: 'Fixed issues with meeting recording occasionally failing on calls longer than 60 minutes.'
        },
        {
          type: 'fix',
          title: 'Documentation Export',
          description: 'Fixed bug in Markdown export where code blocks weren\'t formatted correctly.'
        },
        {
          type: 'improvement',
          title: 'Performance Optimization',
          description: 'Optimized API response times for large meeting transcripts.'
        },
        {
          type: 'fix',
          title: 'Microsoft Teams Integration',
          description: 'Resolved authentication issues with Microsoft Teams integration.'
        }
      ]
    },
    {
      version: 'v1.1.0',
      date: 'March 10, 2025',
      title: 'Microsoft Teams Integration & Enhanced CLI',
      description: 'Added support for Microsoft Teams and significantly enhanced our command-line interface.',
      changes: [
        {
          type: 'feature',
          title: 'Microsoft Teams Integration',
          description: 'CCO now integrates directly with Microsoft Teams for meeting scheduling, recording, and transcription.'
        },
        {
          type: 'feature',
          title: 'Enhanced CLI Capabilities',
          description: 'Completely revamped CLI with improved documentation generation, configuration options, and interactive mode.'
        },
        {
          type: 'improvement',
          title: 'Meeting Summary Quality',
          description: 'Improved AI model for generating more concise and accurate meeting summaries.'
        },
        {
          type: 'feature',
          title: 'Custom Glossary',
          description: 'Added support for custom technical glossaries to improve transcription of domain-specific terminology.'
        },
        {
          type: 'improvement',
          title: 'User Interface Updates',
          description: 'Refreshed dashboard interface with improved meeting analytics and reporting.'
        }
      ]
    },
    {
      version: 'v1.0.1',
      date: 'February 24, 2025',
      title: 'Initial Bug Fixes',
      description: 'Our first maintenance release addressing several bugs reported after the initial launch.',
      changes: [
        {
          type: 'fix',
          title: 'User Authentication',
          description: 'Fixed issues with user session persistence and improved error messaging for authentication failures.'
        },
        {
          type: 'fix',
          title: 'Google Calendar Sync',
          description: 'Resolved synchronization issues with Google Calendar.'
        },
        {
          type: 'improvement',
          title: 'Documentation',
          description: 'Expanded API documentation with more examples and clearer instructions.'
        },
        {
          type: 'fix',
          title: 'Email Notifications',
          description: 'Fixed formatting issues in email notifications and added missing meeting links.'
        }
      ]
    },
    {
      version: 'v1.0.0',
      date: 'February 15, 2025',
      title: 'Initial Release',
      description: 'The first public release of CCO, introducing our core meeting assistant features.',
      changes: [
        {
          type: 'feature',
          title: 'AI-Powered Meeting Assistant',
          description: 'Introducing the core CCO platform with meeting transcription, summarization, and action item extraction.'
        },
        {
          type: 'feature',
          title: 'Google Calendar Integration',
          description: 'Seamless integration with Google Calendar for meeting scheduling and management.'
        },
        {
          type: 'feature',
          title: 'Documentation Generation',
          description: 'Automatic generation of meeting documentation in multiple formats (Markdown, HTML, PDF).'
        },
        {
          type: 'feature',
          title: 'Developer API',
          description: 'RESTful API for integrating CCO capabilities into your own workflows and applications.'
        },
        {
          type: 'feature',
          title: 'Command-Line Interface',
          description: 'Powerful CLI for interacting with CCO directly from your terminal.'
        }
      ]
    }
  ];

  // Function to render change type badge
  const renderBadge = (type) => {
    switch (type) {
      case 'feature':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            New Feature
          </span>
        );
      case 'improvement':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Improvement
          </span>
        );
      case 'fix':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            Bug Fix
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <PageTemplate 
      title="Changelog" 
      description="Stay up to date with the latest features, improvements, and bug fixes in the CCO platform."
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-midnight-blue dark:text-cosmic-latte mb-4">Changelog</h1>
          <p className="text-cosmic-grey dark:text-nebula-white max-w-3xl mx-auto">
            We're constantly improving CCO with new features, performance improvements, and bug fixes. 
            Stay up to date with all the changes and see what's new.
          </p>
        </div>
        
        {/* Release timeline */}
        <div className="relative border-l-2 border-electric-indigo border-opacity-30 dark:border-opacity-30 pl-8 space-y-12 mb-16">
          {releases.map((release, index) => (
            <div key={release.version} className={`relative ${index === 0 ? 'pt-1' : ''}`}>
              {/* Timeline marker */}
              <div className="absolute -left-10 mt-1.5 w-4 h-4 rounded-full bg-electric-indigo border-4 border-white dark:border-obsidian"></div>
              
              {/* Version badge */}
              <div className="mb-3 flex items-start">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-electric-indigo text-white">
                  {release.version}
                </span>
                <span className="ml-3 text-cosmic-grey dark:text-stardust text-sm">
                  {release.date}
                </span>
              </div>
              
              {/* Release header */}
              <h2 className="text-xl font-bold text-midnight-blue dark:text-cosmic-latte mb-2">
                {release.title}
              </h2>
              <p className="text-cosmic-grey dark:text-nebula-white mb-6">
                {release.description}
              </p>
              
              {/* Changes */}
              <div className="space-y-4">
                {release.changes.map((change, changeIndex) => (
                  <div key={changeIndex} className="bg-white dark:bg-obsidian rounded-lg p-4 shadow-sm">
                    <div className="flex items-start">
                      {renderBadge(change.type)}
                      <h3 className="text-midnight-blue dark:text-cosmic-latte font-medium ml-2">
                        {change.title}
                      </h3>
                    </div>
                    <p className="text-cosmic-grey dark:text-nebula-white mt-2">
                      {change.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Earlier releases and roadmap */}
        <div className="bg-white dark:bg-obsidian rounded-xl p-8 mb-16">
          <h2 className="text-xl font-bold text-midnight-blue dark:text-cosmic-latte mb-4">
            Looking for earlier releases?
          </h2>
          <p className="text-cosmic-grey dark:text-nebula-white mb-6">
            Our complete changelog with all previous versions is available in our GitHub repository.
          </p>
          <a 
            href="https://github.com/cco-platform/cco/releases" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-electric-indigo font-medium hover:underline"
          >
            View all releases on GitHub →
          </a>
        </div>
        
        {/* Roadmap CTA */}
        <div className="bg-gradient-to-r from-electric-indigo to-neon-teal rounded-xl p-8 text-white">
          <div className="md:flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">What's coming next?</h2>
              <p className="opacity-90 mb-6 md:mb-0">
                Check out our product roadmap to see what features we're working on next.
              </p>
            </div>
            <Link href="/landing/roadmap" className="inline-block bg-white text-electric-indigo px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all whitespace-nowrap">
              View Roadmap
            </Link>
          </div>
        </div>
        
        {/* Subscribe to updates */}
        <div className="mt-16 text-center">
          <h2 className="text-xl font-bold text-midnight-blue dark:text-cosmic-latte mb-4">
            Stay updated
          </h2>
          <p className="text-cosmic-grey dark:text-nebula-white mb-6 max-w-xl mx-auto">
            Subscribe to our newsletter to get notifications about new releases and upcoming features.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow px-4 py-3 rounded-md bg-white dark:bg-obsidian text-midnight-blue dark:text-nebula-white border border-cosmic-grey dark:border-stardust border-opacity-20 dark:border-opacity-20 focus:outline-none focus:ring-2 focus:ring-electric-indigo"
            />
            <button className="bg-electric-indigo text-white px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default ChangelogPage; 