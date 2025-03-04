import React, { useState } from 'react';
import { SecondBrain } from '../../types';
import { SecondBrainCard } from './SecondBrainCard';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface SecondBrainListProps {
  secondBrains: SecondBrain[];
  isLoading?: boolean;
}

export function SecondBrainList({ secondBrains, isLoading = false }: SecondBrainListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    expertise: [] as string[],
    minRating: 0,
    maxPrice: 1000,
    status: 'all',
  });
  
  // Filter Chief Cognitive Officers based on search query and filters
  const filteredSecondBrains = secondBrains.filter(brain => {
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = brain.name.toLowerCase().includes(query);
      const matchesDescription = brain.description.toLowerCase().includes(query);
      const matchesExpertise = brain.expertise.some(tag => tag.toLowerCase().includes(query));
      
      if (!(matchesName || matchesDescription || matchesExpertise)) {
        return false;
      }
    }
    
    // Apply other filters only if they're active
    if (filters.minRating > 0 && (!brain.rating || brain.rating < filters.minRating)) {
      return false;
    }
    
    if (filters.status !== 'all' && brain.status !== filters.status) {
      return false;
    }
    
    if (brain.pricing.hourly && brain.pricing.hourly > filters.maxPrice) {
      return false;
    }
    
    if (filters.expertise.length > 0) {
      const hasExpertise = filters.expertise.some(expertise => 
        brain.expertise.includes(expertise)
      );
      if (!hasExpertise) return false;
    }
    
    return true;
  });
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="mb-8">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <MagnifyingGlassIcon className="h-5 w-5 text-cco-neutral-400" />
          </div>
          <input
            type="text"
            placeholder="Search Chief Cognitive Officers by name, description, or expertise..."
            className="block w-full rounded-lg border border-cco-neutral-300 pl-11 pr-12 py-3 shadow-sm focus:border-cco-primary-500 focus:ring-cco-primary-500 focus:outline-none text-cco-neutral-800"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            <button className="text-cco-neutral-500 hover:text-cco-neutral-700 focus:outline-none">
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {filteredSecondBrains.length > 0 ? (
        <div className="flex flex-col sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {filteredSecondBrains.map((brain) => (
            <SecondBrainCard key={brain.id} secondBrain={brain} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-72 bg-white rounded-lg border border-cco-neutral-200 shadow-sm p-8">
          <MagnifyingGlassIcon className="h-12 w-12 text-cco-neutral-400 mb-5" />
          <h3 className="text-xl font-medium text-cco-neutral-900">No Chief Cognitive Officers found</h3>
          <p className="text-cco-neutral-600 text-center mt-3 max-w-md">
            We couldn't find any Chief Cognitive Officers matching your search criteria. Try adjusting your filters or search terms.
          </p>
        </div>
      )}
    </div>
  );
} 