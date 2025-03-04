import React from 'react';
import PageTemplate from './page-template';

const RoadmapPage = () => {
  return (
    <PageTemplate 
      title="Product Roadmap" 
      description="Explore the future of CCO, our upcoming features, and long-term vision for revolutionizing developer workflows."
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-midnight-blue dark:text-cosmic-latte">CCO Roadmap</h1>
        
        <p className="lead mt-4 text-cosmic-grey dark:text-nebula-white">
          Our vision for the future of CCO is ambitious and evolving. Here's a glimpse of what we're working on and where we're headed.
        </p>

        {/* Current Quarter */}
        <div className="mt-12 border-l-4 border-electric-indigo pl-6">
          <h2 className="text-electric-indigo font-bold text-xl">Q2 2025 - Current Quarter</h2>
          <div className="mt-4 space-y-4">
            <div className="bg-white dark:bg-obsidian p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-3"></div>
                <h3 className="text-midnight-blue dark:text-cosmic-latte font-medium">Enhanced Documentation Generation</h3>
              </div>
              <p className="mt-2 text-cosmic-grey dark:text-nebula-white">
                Improve the quality and format of documentation generated from meetings, adding better code snippet handling and customizable templates.
              </p>
            </div>
            
            <div className="bg-white dark:bg-obsidian p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-yellow-500 mr-3"></div>
                <h3 className="text-midnight-blue dark:text-cosmic-latte font-medium">JIRA Integration</h3>
              </div>
              <p className="mt-2 text-cosmic-grey dark:text-nebula-white">
                Seamlessly create and assign JIRA tickets directly from meeting notes with AI-powered task identification and priority suggestions.
              </p>
            </div>
            
            <div className="bg-white dark:bg-obsidian p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-blue-500 mr-3"></div>
                <h3 className="text-midnight-blue dark:text-cosmic-latte font-medium">Meeting Scheduling Assistant</h3>
              </div>
              <p className="mt-2 text-cosmic-grey dark:text-nebula-white">
                AI-powered scheduling assistant that recommends optimal meeting times and automatically sends calendar invites with appropriate context.
              </p>
            </div>
          </div>
        </div>
        
        {/* Q3 2025 */}
        <div className="mt-12 border-l-4 border-electric-indigo pl-6">
          <h2 className="text-electric-indigo font-bold text-xl">Q3 2025</h2>
          <div className="mt-4 space-y-4">
            <div className="bg-white dark:bg-obsidian p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-purple-500 mr-3"></div>
                <h3 className="text-midnight-blue dark:text-cosmic-latte font-medium">Code Repository Integration</h3>
              </div>
              <p className="mt-2 text-cosmic-grey dark:text-nebula-white">
                Direct integration with GitHub, GitLab, and Bitbucket for contextualized meeting notes and documentation based on repository content.
              </p>
            </div>
            
            <div className="bg-white dark:bg-obsidian p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-purple-500 mr-3"></div>
                <h3 className="text-midnight-blue dark:text-cosmic-latte font-medium">Advanced IDE Plugins</h3>
              </div>
              <p className="mt-2 text-cosmic-grey dark:text-nebula-white">
                Native plugins for VS Code, JetBrains IDEs, and other popular development environments to access CCO directly from your coding environment.
              </p>
            </div>
            
            <div className="bg-white dark:bg-obsidian p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-purple-500 mr-3"></div>
                <h3 className="text-midnight-blue dark:text-cosmic-latte font-medium">Team Performance Analytics</h3>
              </div>
              <p className="mt-2 text-cosmic-grey dark:text-nebula-white">
                Aggregated insights about team meeting efficiency, action item completion rates, and workflow bottlenecks with AI-suggested optimizations.
              </p>
            </div>
          </div>
        </div>
        
        {/* Q4 2025 */}
        <div className="mt-12 border-l-4 border-electric-indigo pl-6">
          <h2 className="text-electric-indigo font-bold text-xl">Q4 2025</h2>
          <div className="mt-4 space-y-4">
            <div className="bg-white dark:bg-obsidian p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-gray-500 mr-3"></div>
                <h3 className="text-midnight-blue dark:text-cosmic-latte font-medium">Multi-language Support</h3>
              </div>
              <p className="mt-2 text-cosmic-grey dark:text-nebula-white">
                Support for real-time translation and transcription in major global languages to facilitate international team collaboration.
              </p>
            </div>
            
            <div className="bg-white dark:bg-obsidian p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-gray-500 mr-3"></div>
                <h3 className="text-midnight-blue dark:text-cosmic-latte font-medium">Advanced Knowledge Graph</h3>
              </div>
              <p className="mt-2 text-cosmic-grey dark:text-nebula-white">
                Build a team knowledge graph that connects meeting data, codebase context, documentation, and decisions for highly contextualized recommendations.
              </p>
            </div>
            
            <div className="bg-white dark:bg-obsidian p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-gray-500 mr-3"></div>
                <h3 className="text-midnight-blue dark:text-cosmic-latte font-medium">Enterprise SSO Integration</h3>
              </div>
              <p className="mt-2 text-cosmic-grey dark:text-nebula-white">
                Enterprise-grade security features including Single Sign-On (SSO) integration with major identity providers and comprehensive access controls.
              </p>
            </div>
          </div>
        </div>
        
        {/* 2026 */}
        <div className="mt-12 border-l-4 border-electric-indigo pl-6">
          <h2 className="text-electric-indigo font-bold text-xl">2026 and Beyond</h2>
          <div className="mt-4 space-y-4">
            <div className="bg-white dark:bg-obsidian p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-gray-300 mr-3"></div>
                <h3 className="text-midnight-blue dark:text-cosmic-latte font-medium">Predictive Development Insights</h3>
              </div>
              <p className="mt-2 text-cosmic-grey dark:text-nebula-white">
                AI-powered prediction of potential bottlenecks, bugs, and architecture issues based on meeting discussions and codebase patterns.
              </p>
            </div>
            
            <div className="bg-white dark:bg-obsidian p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-gray-300 mr-3"></div>
                <h3 className="text-midnight-blue dark:text-cosmic-latte font-medium">Full Autonomous Meeting Management</h3>
              </div>
              <p className="mt-2 text-cosmic-grey dark:text-nebula-white">
                AI that can independently organize, run, and document meetings with minimal human intervention, including handling routine check-ins and status updates.
              </p>
            </div>
            
            <div className="bg-white dark:bg-obsidian p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-gray-300 mr-3"></div>
                <h3 className="text-midnight-blue dark:text-cosmic-latte font-medium">Code Generation from Requirements</h3>
              </div>
              <p className="mt-2 text-cosmic-grey dark:text-nebula-white">
                Advanced code generation capabilities that can translate client requirements and meeting discussions directly into functional code prototypes.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-midnight-blue dark:text-cosmic-latte">Help Shape Our Roadmap</h2>
          <p className="mt-4 text-cosmic-grey dark:text-nebula-white">
            Our roadmap is dynamic and influenced by our users' needs. We welcome your input on what features would most benefit your development workflow.
          </p>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <a href="/landing/contact" className="bg-gradient-to-r from-electric-indigo to-neon-teal text-white px-6 py-3 rounded-md font-medium hover:opacity-90 transition-all text-center">
              Request a Feature
            </a>
            <a href="/landing/community" className="bg-white dark:bg-obsidian border border-electric-indigo text-electric-indigo px-6 py-3 rounded-md font-medium hover:bg-electric-indigo hover:text-white transition-all text-center">
              Join Our Community
            </a>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-electric-indigo to-neon-teal p-8 rounded-lg text-white mt-12">
          <h2 className="text-white">Ready to get started?</h2>
          <p className="text-white opacity-90">
            Start using CCO today and be part of our journey to transform developer workflows.
          </p>
          <a href="/auth/register" className="inline-block mt-4 bg-white text-electric-indigo px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all">
            Sign Up for Free
          </a>
        </div>
      </div>
    </PageTemplate>
  );
};

export default RoadmapPage; 