import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import Link from 'next/link';
import { SecondBrain } from '../../types';
import { StarIcon, ChartBarIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface SecondBrainCardProps {
  secondBrain: SecondBrain;
}

export function SecondBrainCard({ secondBrain }: SecondBrainCardProps) {
  // Generate stars based on rating
  const renderRating = () => {
    if (!secondBrain.rating) return null;
    
    const stars = [];
    const fullStars = Math.floor(secondBrain.rating);
    const hasHalfStar = secondBrain.rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<StarIconSolid key={i} className="w-5 h-5 text-yellow-500" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<StarIconSolid key={i} className="w-5 h-5 text-yellow-500" />);
      } else {
        stars.push(<StarIcon key={i} className="w-5 h-5 text-yellow-500" />);
      }
    }
    
    return (
      <div className="flex items-center">
        <div className="flex mr-1.5">{stars}</div>
        <span className="text-sm font-medium text-cco-neutral-600">
          ({secondBrain.ratingCount || 0})
        </span>
      </div>
    );
  };
  
  // Get availability status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'text-green-600 bg-green-100';
      case 'busy':
        return 'text-amber-600 bg-amber-100';
      case 'unavailable':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Format status text with proper capitalization
  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };
  
  return (
    <Card hover={true} className="h-full bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-6 flex flex-col h-full">
        {/* Header section */}
        <div className="flex items-start mb-3">
          <div className="w-14 h-14 rounded-full bg-cco-neutral-200 flex-shrink-0 overflow-hidden shadow-sm">
            {secondBrain.avatar ? (
              <img 
                src={secondBrain.avatar} 
                alt={secondBrain.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-cco-primary-200 flex items-center justify-center text-cco-primary-700 text-xl font-semibold">
                {secondBrain.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="ml-4 flex-1">
            <h3 className="font-semibold text-lg text-cco-neutral-900 line-clamp-1">{secondBrain.name}</h3>
            <p className="text-sm text-cco-neutral-600">by {secondBrain.ownerName}</p>
            {renderRating()}
          </div>
        </div>
        
        {/* Description section */}
        <p className="text-sm text-cco-neutral-700 mt-2 mb-4 line-clamp-3 flex-grow">
          {secondBrain.description}
        </p>
        
        {/* Tags/Expertise section */}
        <div className="flex flex-wrap gap-2 mb-5">
          {secondBrain.expertise.slice(0, 3).map(tag => (
            <span key={tag} className="px-2.5 py-1 bg-cco-primary-100 text-cco-primary-700 rounded-full text-xs font-medium">
              {tag}
            </span>
          ))}
          {secondBrain.expertise.length > 3 && (
            <span className="px-2.5 py-1 bg-cco-neutral-100 text-cco-neutral-700 rounded-full text-xs font-medium">
              +{secondBrain.expertise.length - 3}
            </span>
          )}
        </div>
        
        {/* Footer section */}
        <div className="pt-4 mt-auto border-t border-cco-neutral-200">
          {/* Stats row */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <BriefcaseIcon className="w-4 h-4 mr-1.5 text-cco-neutral-500" />
              <span className="text-sm font-medium text-cco-neutral-700">{secondBrain.hireCount} hires</span>
            </div>
            <div className="flex items-center">
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(secondBrain.status)}`}>
                {formatStatus(secondBrain.status)}
              </span>
            </div>
          </div>
          
          {/* Price/Action row */}
          <div className="flex justify-between items-center">
            {secondBrain.pricing.hourly && (
              <span className="text-lg font-semibold text-cco-neutral-900">
                ${secondBrain.pricing.hourly}/hr
              </span>
            )}
            <Link href={`/dashboard/secondbrains/${secondBrain.id}`}>
              <Button variant="accent" size="sm" className="px-5 py-2">Interview</Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
} 