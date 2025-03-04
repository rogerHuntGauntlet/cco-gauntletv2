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
  // Map size to dimensions and corresponding logo files
  const sizeMap = {
    'xs': { class: 'w-4 h-4', logo: '/branding/ui/logo-nav-small.png' },
    'sm': { class: 'w-5 h-5', logo: '/branding/ui/logo-nav-small.png' },
    'md': { class: 'w-6 h-6', logo: '/branding/ui/logo-nav.png' },
    'lg': { class: 'w-8 h-8', logo: '/branding/ui/logo-nav.png' },
    'xl': { class: 'w-12 h-12', logo: '/branding/ui/logo-header.png' }
  };

  // Map roundness to Tailwind classes
  const roundnessMap = {
    'slight': 'rounded-md',
    'medium': 'rounded-lg',
    'full': 'rounded-full'
  };

  const dimensions = sizeMap[size].class;
  const roundedClass = roundnessMap[roundness];

  return (
    <div className={`${dimensions} ${roundedClass} overflow-hidden flex-shrink-0 ${className}`}>
      <img 
        src={sizeMap[size].logo}
        alt="CCO Logo" 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default RoundedIcon; 