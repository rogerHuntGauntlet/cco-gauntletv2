import React from 'react';
import Link from 'next/link';
import { SecondBrain } from '../../types';
import { SparklesIcon } from '@heroicons/react/24/outline';

interface SecondBrainListProps {
  secondBrains: SecondBrain[];
  isLoading: boolean;
}

export const SecondBrainList: React.FC<SecondBrainListProps> = ({ 
  secondBrains, 
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric-indigo"></div>
      </div>
    );
  }

  if (secondBrains.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-cosmic-grey dark:text-stardust">
          No Chief Cognitive Officers available at the moment. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {secondBrains.map((brain) => (
        <Link 
          href={`/marketplace/${brain.id}`} 
          key={brain.id}
          className="group"
        >
          <div className="bg-cosmic-latte dark:bg-cosmic-grey dark:bg-opacity-10 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col">
            <div className="p-6 flex-grow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-midnight-blue dark:text-cosmic-latte group-hover:text-electric-indigo dark:group-hover:text-neon-teal transition-colors">
                    {brain.name}
                  </h3>
                  <p className="text-cosmic-grey dark:text-stardust text-sm">
                    {brain.expertise[0]}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-electric-indigo to-neon-teal text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                  <SparklesIcon className="w-3 h-3 mr-1" />
                  {brain.status}
                </div>
              </div>
              
              <p className="text-cosmic-grey dark:text-stardust text-sm mb-4 line-clamp-3">
                {brain.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {brain.expertise.slice(0, 3).map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-cosmic-latte dark:bg-cosmic-grey dark:bg-opacity-20 text-cosmic-grey dark:text-stardust text-xs px-2.5 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {brain.expertise.length > 3 && (
                  <span className="text-cosmic-grey dark:text-stardust text-xs px-2 py-1">
                    +{brain.expertise.length - 3} more
                  </span>
                )}
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-cosmic-grey dark:border-stardust border-opacity-10 dark:border-opacity-10 flex justify-between items-center">
              <div className="text-cosmic-grey dark:text-stardust text-sm">
                {brain.hireCount} hires
              </div>
              <span className="text-electric-indigo dark:text-neon-teal font-medium text-sm group-hover:underline">
                View Profile
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}; 