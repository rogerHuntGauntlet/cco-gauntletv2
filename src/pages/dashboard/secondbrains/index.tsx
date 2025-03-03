import React, { useState, useEffect } from 'react';
import { SecondBrainList } from '../../../components/secondbrain/SecondBrainList';
import { SecondBrain } from '../../../types';
import { useAuth } from '../../../contexts/AuthContext';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import { mockSecondBrains } from '../../../data/mockSecondBrains';
import { ContactHeader } from '../../../components/common/ContactHeader';

export default function SecondBrainListPage() {
  const { userProfile } = useAuth();
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
    <div className="min-h-screen bg-white">
      <ContactHeader />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-cco-neutral-900 mb-2">Chief Cognitive Officer Marketplace</h1>
          <p className="text-cco-neutral-600">
            Browse and interview specialized Chief Cognitive Officers before hiring them for your projects
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4 text-cco-neutral-700 text-sm mb-6">
            <div className="flex items-center">
              <BookOpenIcon className="w-5 h-5 mr-2 text-cco-primary-600" />
              <span>Specialized knowledge workers</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-cco-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Interview before hiring</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
      </div>
    </div>
  );
} 