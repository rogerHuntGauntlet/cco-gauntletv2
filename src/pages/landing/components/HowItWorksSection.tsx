import React from 'react';
import type { FC } from 'react';

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const HowItWorksSection: FC = () => {
  const features: Feature[] = [
    {
      id: 1,
      title: 'Smart Meeting Management',
      description: 'CCO schedules, prepares for, and follows up on meetings automatically, saving you valuable time.',
      icon: (
        <svg className="w-10 h-10 text-electric-indigo" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Documentation Assistant',
      description: 'CCO helps you create, update, and maintain documentation with minimal input from you.',
      icon: (
        <svg className="w-10 h-10 text-electric-indigo" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Project Kickoff Framework',
      description: 'Get your projects started right with templates, checklists, and automated setup procedures.',
      icon: (
        <svg className="w-10 h-10 text-electric-indigo" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 md:px-12 lg:px-24 bg-nebula-white dark:bg-obsidian transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-midnight-blue dark:text-cosmic-latte mb-4">How CCO Works</h2>
          <p className="text-cosmic-grey dark:text-nebula-white max-w-2xl mx-auto">
            CCO integrates with your workflow to reduce cognitive overhead and keep you focused on what matters most: writing great code.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="bg-white dark:bg-midnight-blue p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="mb-4 p-3 rounded-full bg-nebula-white dark:bg-obsidian inline-block">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-midnight-blue dark:text-cosmic-latte mb-2">
                {feature.title}
              </h3>
              <p className="text-cosmic-grey dark:text-nebula-white">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 