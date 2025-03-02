import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SecondBrainInterview } from '../../../components/secondbrain/SecondBrainInterview';
import { SecondBrain } from '../../../types';
import { useAuth } from '../../../contexts/AuthContext';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { ChevronLeftIcon, SparklesIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { mockSecondBrains } from '../../../data/mockSecondBrains';

export default function SecondBrainDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { userProfile } = useAuth();
  
  const [secondBrain, setSecondBrain] = useState<SecondBrain | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!id) return;
    
    // In a real app, this would be an API call
    const fetchSecondBrain = async () => {
      try {
        setIsLoading(true);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Find the Chief Cognitive Officer in our mock data
        const found = mockSecondBrains.find(brain => brain.id === id);
        
        if (found) {
          setSecondBrain(found);
        } else {
          setError('Chief Cognitive Officer not found');
        }
      } catch (error) {
        console.error('Error fetching Chief Cognitive Officer:', error);
        setError('Failed to load Chief Cognitive Officer');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSecondBrain();
  }, [id]);
  
  const handleHire = async (secondBrainId: string) => {
    try {
      // Call the API to hire the Chief Cognitive Officer
      const response = await fetch('/api/secondbrains/hire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secondBrainId,
          userId: userProfile?.email || 'anonymous',
        }),
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to hire Chief Cognitive Officer');
      }
      
      console.log('Hired Chief Cognitive Officer:', data);
      return Promise.resolve();
    } catch (error) {
      console.error('Error hiring Chief Cognitive Officer:', error);
      return Promise.reject(error);
    }
  };
  
  const handleClose = () => {
    router.push('/dashboard/secondbrains');
  };
  
  // Loading state with proper CCO aesthetic
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-midnight-blue">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-electric-indigo opacity-20 blur-xl animate-pulse"></div>
            <LoadingSpinner size="lg" className="text-electric-indigo relative z-10" />
          </div>
          <p className="text-nebula-white font-medium text-sm tracking-wide">
            Connecting to Chief Cognitive Officer...
          </p>
        </div>
      </div>
    );
  }
  
  // Error state with proper branding
  if (error || !secondBrain) {
    return (
      <div className="min-h-screen bg-obsidian py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto rounded-lg overflow-hidden">
          <div className="p-8 bg-cosmic-grey border-l-4 border-electric-crimson shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="rounded-full bg-electric-crimson/20 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-electric-crimson" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-nebula-white">Connection Error</h2>
            </div>
            
            <p className="text-stardust mb-8">{error || 'Chief Cognitive Officer not found in the neural network'}</p>
            
            <Link href="/dashboard/secondbrains" className="inline-block">
              <button className="h-10 px-5 rounded-md bg-electric-indigo hover:bg-electric-indigo/90 text-nebula-white transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-electric-indigo/50">
                <ChevronLeftIcon className="w-5 h-5" />
                <span>Return to CCO Directory</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Main layout following the design guide
  return (
    <div className="min-h-screen bg-midnight-blue">
      {/* Top nav bar */}
      <header className="h-16 border-b border-stardust/20 bg-obsidian px-4 sm:px-6 lg:px-8">
        <div className="h-full max-w-screen-2xl mx-auto flex items-center justify-between">
          <Link href="/dashboard/secondbrains">
            <button className="h-10 px-4 flex items-center gap-2 text-nebula-white hover:text-neon-teal focus:outline-none focus:text-neon-teal transition-colors duration-200">
              <ChevronLeftIcon className="w-5 h-5" />
              <span className="font-medium">Back to CCO Directory</span>
            </button>
          </Link>
          
          <div className="flex items-center gap-2">
            <div className="relative h-9 w-9 flex items-center justify-center">
              <div className="absolute inset-0 bg-electric-indigo opacity-20 rounded-full animate-pulse"></div>
              <SparklesIcon className="h-5 w-5 text-electric-indigo relative z-10" />
            </div>
            <span className="font-semibold text-nebula-white hidden sm:block">
              CCO <span className="text-electric-indigo">Interview</span> Portal
            </span>
          </div>
        </div>
      </header>
      
      {/* Main content area */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          {/* Mobile layout - Info card on top, chat below */}
          <div className="block lg:hidden mb-6">
            <div className="bg-cosmic-grey rounded-lg p-6 shadow-lg border border-stardust/10">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-teal to-electric-indigo flex items-center justify-center">
                    <span className="text-nebula-white text-xl font-bold">
                      {secondBrain.name.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-electric-indigo rounded-full w-6 h-6 flex items-center justify-center">
                    <SparklesIcon className="h-4 w-4 text-nebula-white" />
                  </div>
                </div>
                
                <h1 className="text-xl font-semibold text-nebula-white text-center mb-2">{secondBrain.name}</h1>
                <p className="text-stardust text-sm mb-4 text-center">{secondBrain.status === 'available' ? 'Available for hire' : secondBrain.status === 'busy' ? 'Currently busy' : 'Temporarily unavailable'}</p>
                
                <div className="w-full border-t border-stardust/20 pt-4 mt-2">
                  <h2 className="text-neon-teal text-sm uppercase font-medium tracking-wider mb-3">Expertise</h2>
                  <div className="flex flex-wrap justify-center gap-2">
                    {secondBrain.expertise.slice(0, 3).map((skill, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded bg-electric-indigo/20 text-nebula-white">
                        {skill}
                      </span>
                    ))}
                    {secondBrain.expertise.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded bg-stardust/20 text-stardust">
                        +{secondBrain.expertise.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop grid layout - Side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* CCO info sidebar - Only visible on desktop */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="bg-cosmic-grey rounded-lg p-6 shadow-lg border border-stardust/10">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-teal to-electric-indigo flex items-center justify-center">
                      <span className="text-nebula-white text-xl font-bold">
                        {secondBrain.name.charAt(0)}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-electric-indigo rounded-full w-6 h-6 flex items-center justify-center">
                      <SparklesIcon className="h-4 w-4 text-nebula-white" />
                    </div>
                  </div>
                  
                  <h1 className="text-xl font-semibold text-nebula-white text-center mb-2">{secondBrain.name}</h1>
                  <p className="text-stardust text-sm mb-4 text-center">{secondBrain.status === 'available' ? 'Available for hire' : secondBrain.status === 'busy' ? 'Currently busy' : 'Temporarily unavailable'}</p>
                  
                  <div className="w-full border-t border-stardust/20 pt-4 mt-2">
                    <h2 className="text-neon-teal text-sm uppercase font-medium tracking-wider mb-3">Expertise</h2>
                    <div className="flex flex-wrap justify-center gap-2">
                      {secondBrain.expertise.slice(0, 3).map((skill, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded bg-electric-indigo/20 text-nebula-white">
                          {skill}
                        </span>
                      ))}
                      {secondBrain.expertise.length > 3 && (
                        <span className="text-xs px-2 py-1 rounded bg-stardust/20 text-stardust">
                          +{secondBrain.expertise.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main interview area - Adjusted height for mobile */}
            <div className="lg:col-span-9">
              <div className="bg-cosmic-grey/80 backdrop-filter backdrop-blur-sm rounded-lg overflow-hidden border border-stardust/10 shadow-xl h-[calc(100vh-16rem)] sm:h-[calc(100vh-16rem)] md:h-[calc(100vh-14rem)] lg:h-[calc(100vh-11rem)]">
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto">
                    <SecondBrainInterview 
                      secondBrain={secondBrain}
                      onHire={handleHire}
                      onClose={handleClose}
                    />
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
} 