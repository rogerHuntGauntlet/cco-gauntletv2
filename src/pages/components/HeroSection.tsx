import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';

const HeroSection: FC = () => {
  return (
    <section className="pt-12 pb-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-br from-nebula-white to-cosmic-latte dark:from-midnight-blue dark:to-obsidian transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Text content - optimized for mobile first */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-midnight-blue dark:text-cosmic-latte mb-4 sm:mb-6 leading-tight">
              Hire an <span className="text-electric-indigo">Cognitive Officer</span>
            </h1>
            <p className="text-lg sm:text-xl text-cosmic-grey dark:text-nebula-white mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
              Eliminate administrative overhead and stay in your coding flow. Let CCO handle your meetings, documentation, and project kickoffs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/secondbrains" 
                className="bg-electric-indigo hover:bg-opacity-90 text-nebula-white px-6 sm:px-8 py-3 rounded-md font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 text-center"
              >
                Get Started
              </Link>
              <Link 
                href="/secondbrains" 
                className="border border-electric-indigo text-electric-indigo hover:text-midnight-blue hover:border-midnight-blue dark:border-digital-lavender dark:text-digital-lavender dark:hover:text-nebula-white dark:hover:border-nebula-white px-6 sm:px-8 py-3 rounded-md font-medium transition-all text-center"
              >
                How It Works
              </Link>
            </div>
          </div>
          
          {/* Visual content - redesigned for better mobile experience */}
          <div className="w-full lg:w-1/2 relative mt-10 lg:mt-0">
            <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[480px] mx-auto max-w-md lg:max-w-full">
              {/* Mobile-optimized background */}
              <div className="absolute inset-0 bg-gradient-to-br from-electric-indigo via-neon-teal to-digital-lavender opacity-10 dark:opacity-20 rounded-2xl animate-pulse"></div>
              
              {/* Central icon with enhanced mobile visibility */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full sm:w-3/4 h-3/4">
                <div className="w-full h-full relative">
                  {/* Decorative elements - visible on all screen sizes */}
                  <div className="absolute top-10 right-10 w-16 h-16 bg-electric-indigo/20 rounded-full animate-pulse hidden sm:block"></div>
                  <div className="absolute bottom-10 left-10 w-20 h-20 bg-neon-teal/20 rounded-full animate-pulse delay-300 hidden sm:block"></div>
                  
                  {/* Main icon - enlarged for mobile */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-20 h-20 sm:w-24 sm:h-24 text-electric-indigo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Mobile-only decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-electric-indigo/10 rounded-full animate-pulse sm:hidden"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 