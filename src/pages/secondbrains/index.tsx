import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { SecondBrainList } from '../../components/secondbrain/SecondBrainList';
import { SecondBrain } from '../../types';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import { mockSecondBrains } from '../../data/mockSecondBrains';

export default function SecondBrainsPage() {
  const [secondBrains, setSecondBrains] = useState<SecondBrain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate fetching data
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchSecondBrains = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1200));
        setSecondBrains(mockSecondBrains);
      } catch (error) {
        console.error('Error fetching Chief Cognitive Officers:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSecondBrains();
  }, []);
  
  return (
    <div className="min-h-screen bg-white dark:bg-midnight-blue">
      <Head>
        <title>Chief Cognitive Officer Marketplace | CCO VibeCoder Platform</title>
        <meta
          name="description"
          content="Browse and interview specialized Chief Cognitive Officers before hiring them for your projects"
        />
      </Head>
      
      <header className="sticky top-0 z-30 bg-white dark:bg-midnight-blue border-b border-cosmic-grey dark:border-stardust border-opacity-10 dark:border-opacity-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          
          
          <div className="flex items-center space-x-6">
            <Link 
              href="/landing/signin" 
              className="bg-gradient-to-r from-electric-indigo to-neon-teal text-white px-6 py-2 rounded-md font-medium hover:from-electric-indigo/90 hover:to-neon-teal/90 transition-all"
            >
              Build Your Chief Cognitive Officer
            </Link>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-midnight-blue dark:text-cosmic-latte mb-4">
              Chief Cognitive Officer Marketplace
            </h1>
            <p className="text-xl text-cosmic-grey dark:text-stardust max-w-2xl mx-auto">
              Browse our specialized AI Chief Cognitive Officers - become an MVP client to access our state-of-the-art AI platform
            </p>
          </div>
          
          <div className="bg-white dark:bg-cosmic-grey dark:bg-opacity-10 rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-wrap items-center justify-center gap-6 text-cosmic-grey dark:text-stardust text-sm mb-8">
              <div className="flex items-center">
                <BookOpenIcon className="w-5 h-5 mr-2 text-electric-indigo" />
                <span>Specialized knowledge workers</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-neon-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Interview before hiring</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Verified expertise</span>
              </div>
            </div>
            
            <SecondBrainList 
              secondBrains={secondBrains} 
              isLoading={isLoading} 
            />
          </div>
          
          <div className="bg-gradient-to-r from-electric-indigo to-neon-teal rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Want to access our full AI platform?</h2>
            <p className="mb-6">
              Our state-of-the-art AI platform is currently available exclusively to MVP clients.
              Contact us to learn how to become an MVP client and unlock the full potential of CCO.
            </p>
            <Link 
              href="/landing/signin" 
              className="inline-block bg-white text-electric-indigo px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </main>
      
      <footer className="bg-white dark:bg-midnight-blue border-t border-cosmic-grey dark:border-stardust border-opacity-10 dark:border-opacity-10 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-cosmic-grey dark:text-stardust text-sm">
            © {new Date().getFullYear()} CCO. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
} 