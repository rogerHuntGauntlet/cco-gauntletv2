import React from 'react';

interface RoundedIconProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  roundness?: 'slight' | 'medium' | 'full';
}

const RoundedIcon: React.FC<RoundedIconProps> = ({ 
  className = '', 
  size = 'md',
  roundness = 'medium'
}) => {
  // Map size to dimensions
  const sizeMap = {
    'xs': 'w-4 h-4',
    'sm': 'w-5 h-5',
    'md': 'w-6 h-6',
    'lg': 'w-8 h-8',
    'xl': 'w-12 h-12'
  };

  // Map roundness to Tailwind classes
  const roundnessMap = {
    'slight': 'rounded-md',
    'medium': 'rounded-lg',
    'full': 'rounded-full'
  };

  const dimensions = sizeMap[size];
  const roundedClass = roundnessMap[roundness];

  return (
    <div className={`${dimensions} ${roundedClass} overflow-hidden flex-shrink-0 ${className}`}>
      <img 
        src="/Untitled design.png" 
        alt="Icon" 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default RoundedIcon; 