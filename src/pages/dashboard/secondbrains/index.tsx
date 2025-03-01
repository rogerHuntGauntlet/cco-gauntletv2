import React, { useState, useEffect } from 'react';
import { SecondBrainList } from '../../../components/secondbrain/SecondBrainList';
import { SecondBrain } from '../../../types';
import { useAuth } from '../../../contexts/AuthContext';
import { BookOpenIcon, SparklesIcon, ChatBubbleLeftRightIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { mockSecondBrains } from '../../../data/mockSecondBrains';

export default function SecondBrainListPage() {
  const { userProfile } = useAuth();
  const [secondBrains, setSecondBrains] = useState<SecondBrain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  
  // Get unique expertise areas from all second brains
  const allExpertiseAreas = Array.from(
    new Set(
      mockSecondBrains.flatMap(brain => brain.expertise)
    )
  ).sort();
  
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
  
  // Filter second brains based on search and selected expertise
  const filteredSecondBrains = secondBrains.filter(brain => {
    // Filter by search query
    const matchesSearch = searchQuery === '' || 
      brain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brain.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brain.expertise.some(skill => 
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
    // Filter by selected expertise
    const matchesExpertise = selectedExpertise.length === 0 ||
      selectedExpertise.some(expertise => 
        brain.expertise.includes(expertise)
      );
      
    return matchesSearch && matchesExpertise;
  });
  
  const toggleExpertise = (expertise: string) => {
    setSelectedExpertise(prev => 
      prev.includes(expertise) 
        ? prev.filter(item => item !== expertise) 
        : [...prev, expertise]
    );
  };
  
  return (
    <div className="min-h-screen bg-midnight-blue">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        {/* Header section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-nebula-white mb-2">Chief Cognitive Officer Directory</h1>
              <p className="text-stardust max-w-2xl">
                Browse and interview specialized Chief Cognitive Officers with expertise matched to your project needs
              </p>
            </div>
            
            {/* Search input */}
            <div className="mt-4 md:mt-0 w-full md:w-auto">
              <div className="relative max-w-md md:max-w-xs w-full">
                <input
                  type="text"
                  placeholder="Search by name or expertise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-lg bg-cosmic-grey border border-stardust/20 focus:border-electric-indigo focus:outline-none focus:ring-1 focus:ring-electric-indigo text-nebula-white text-sm placeholder-stardust"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stardust"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      
        {/* Main content with sidebar layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar filters */}
          <aside className="lg:col-span-3">
            <div className="bg-cosmic-grey rounded-lg p-4 shadow-lg sticky top-24">
              <h2 className="text-neon-teal text-sm uppercase font-medium tracking-wider mb-4">Filter by Expertise</h2>
              
              <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                {allExpertiseAreas.map((expertise) => (
                  <div key={expertise} className="flex items-center">
                    <button
                      onClick={() => toggleExpertise(expertise)}
                      className={`flex items-center w-full px-2 py-1.5 rounded text-sm ${
                        selectedExpertise.includes(expertise)
                          ? 'bg-electric-indigo/20 text-electric-indigo'
                          : 'text-nebula-white hover:bg-cosmic-grey/50'
                      }`}
                    >
                      <div className={`w-4 h-4 mr-2 rounded border flex-shrink-0 ${
                        selectedExpertise.includes(expertise)
                          ? 'border-electric-indigo bg-electric-indigo/20'
                          : 'border-stardust'
                      }`}>
                        {selectedExpertise.includes(expertise) && (
                          <SparklesIcon className="h-3 w-3 text-electric-indigo" />
                        )}
                      </div>
                      <span className="truncate">{expertise}</span>
                    </button>
                  </div>
                ))}
              </div>
              
              {selectedExpertise.length > 0 && (
                <button
                  onClick={() => setSelectedExpertise([])}
                  className="mt-4 text-xs text-electric-indigo hover:text-neon-teal transition-colors w-full text-center py-1"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </aside>
          
          {/* Main content area */}
          <div className="lg:col-span-9">
            {/* Features banner */}
            <div className="bg-obsidian rounded-lg mb-6 p-4 shadow-lg">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-electric-indigo/20">
                    <BookOpenIcon className="w-5 h-5 text-electric-indigo" />
                  </div>
                  <span className="text-sm text-nebula-white">Specialized expertise</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-neon-teal/20">
                    <ChatBubbleLeftRightIcon className="w-5 h-5 text-neon-teal" />
                  </div>
                  <span className="text-sm text-nebula-white">Interview before hiring</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-digital-lavender/20">
                    <ShieldCheckIcon className="w-5 h-5 text-digital-lavender" />
                  </div>
                  <span className="text-sm text-nebula-white">Verified capabilities</span>
                </div>
              </div>
            </div>
            
            {/* Results count and sorting */}
            <div className="flex justify-between items-center mb-6 px-1">
              <div className="text-sm text-stardust">
                {isLoading ? 'Loading...' : `Showing ${filteredSecondBrains.length} Chief Cognitive Officers`}
              </div>
              
              <div className="flex items-center">
                <span className="text-sm text-stardust mr-2 hidden sm:inline">Sort by:</span>
                <select className="bg-cosmic-grey border border-stardust/20 text-nebula-white rounded px-2 py-1 text-sm">
                  <option value="rating">Highest Rated</option>
                  <option value="expertise">Expertise Match</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
            
            {/* Second Brains List */}
            <SecondBrainList 
              secondBrains={filteredSecondBrains} 
              isLoading={isLoading} 
            />
          </div>
        </div>
      </div>
    </div>
  );
} 