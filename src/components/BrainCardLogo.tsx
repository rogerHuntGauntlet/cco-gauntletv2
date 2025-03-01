import React, { useState } from 'react';

interface BrainCardLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const BrainCardLogo: React.FC<BrainCardLogoProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Size mappings
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <div 
      className={`relative flex items-center justify-center bg-slate-800 rounded-lg overflow-hidden ${sizeClasses[size]} ${className} transform ${isHovered ? 'scale-110' : ''}`}
      style={{ 
        boxShadow: isHovered 
          ? '0 0 18px rgba(0, 255, 255, 0.7), 0 0 6px rgba(0, 200, 255, 0.9) inset' 
          : '0 0 12px rgba(0, 255, 255, 0.5), 0 0 4px rgba(0, 200, 255, 0.8) inset',
        borderRadius: '10px',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${isHovered ? 'from-cyan-400/40 to-blue-500/40' : 'from-cyan-500/30 to-blue-600/30'}`} />
      <img 
        src="/assets/icons/brain-card-rounded.png"
        alt="CCO Brain Card Logo" 
        className="w-full h-full object-contain p-1 z-10"
        style={{ 
          filter: isHovered 
            ? 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.4)) brightness(1.1)' 
            : 'drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3))',
          transition: 'all 0.3s ease'
        }}
      />
    </div>
  );
};

export default BrainCardLogo; 