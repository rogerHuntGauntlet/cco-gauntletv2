import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SecondBrainInterview } from '../../../components/secondbrain/SecondBrainInterview';
import { SecondBrain } from '../../../types';
import { useAuth } from '../../../contexts/AuthContext';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
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
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (error || !secondBrain) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-cco-neutral-900 mb-4">Error</h2>
        <p className="text-cco-neutral-700 mb-6">{error || 'Chief Cognitive Officer not found'}</p>
        <Link href="/dashboard/secondbrains">
          <button className="text-cco-primary-600 hover:text-cco-primary-700 font-medium flex items-center justify-center">
            <ChevronLeftIcon className="w-5 h-5 mr-1" />
            Back to Chief Cognitive Officers
          </button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto h-[calc(100vh-80px)] px-4 py-6">
      <div className="bg-cco-neutral-100 h-full rounded-xl overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="p-4 bg-white border-b border-cco-neutral-200">
            <Link href="/dashboard/secondbrains">
              <button className="text-cco-neutral-700 hover:text-cco-primary-600 font-medium flex items-center">
                <ChevronLeftIcon className="w-5 h-5 mr-1" />
                Back to Chief Cognitive Officers
              </button>
            </Link>
          </div>
          
          <div className="flex-1 overflow-hidden p-4">
            <SecondBrainInterview 
              secondBrain={secondBrain}
              onHire={handleHire}
              onClose={handleClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 