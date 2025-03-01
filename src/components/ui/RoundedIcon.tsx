import React from 'react';

interface RoundedIconProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const RoundedIcon: React.FC<RoundedIconProps> = ({ className = '', size = 'md' }) => {
  // Map size to dimensions
  const sizeMap = {
    'xs': 'w-4 h-4',
    'sm': 'w-5 h-5',
    'md': 'w-6 h-6',
    'lg': 'w-8 h-8',
    'xl': 'w-12 h-12'
  };

  const dimensions = sizeMap[size];

  return (
    <div className={`${dimensions} rounded-lg overflow-hidden flex-shrink-0 ${className}`}>
      <img 
        src="/Untitled design.png" 
        alt="Icon" 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default RoundedIcon; 