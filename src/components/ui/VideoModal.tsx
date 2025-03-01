import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { XMarkIcon, ArrowsPointingInIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  className?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoSrc,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Set isMounted to true after mount to avoid hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything if not mounted yet (for SSR compatibility)
  if (!isMounted) return null;
  
  // Don't render anything if the modal is closed
  if (!isOpen) return null;
  
  // Handle toggling expanded state
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Get modal classes based on expanded state
  const getModalClasses = () => {
    if (isExpanded) {
      return 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-all duration-500 ease-in-out';
    } else {
      return 'fixed bottom-4 right-4 z-50 transition-all duration-500 ease-in-out';
    }
  };
  
  // Get video container classes based on expanded state
  const getVideoContainerClasses = () => {
    if (isExpanded) {
      return 'w-full max-w-[80%] max-h-[80vh] bg-black rounded-lg shadow-xl transform scale-100 transition-all duration-500 ease-in-out ' + className;
    } else {
      return 'w-64 h-36 bg-black rounded-lg shadow-xl transform scale-100 transition-all duration-500 ease-in-out ' + className;
    }
  };
  
  return ReactDOM.createPortal(
    <div 
      className={getModalClasses()}
      onClick={(e) => {
        // Only close when clicking on the backdrop in expanded mode
        if (isExpanded && e.target === e.currentTarget) {
          setIsExpanded(false); // Shrink instead of closing completely
        }
      }}
    >
      <div 
        className={getVideoContainerClasses()}
        aria-modal="true"
        role="dialog"
      >
        <div className="relative h-full">
          {/* Video */}
          <video
            ref={videoRef}
            className="w-full h-full rounded-lg object-cover"
            src={videoSrc}
            controls
            autoPlay={isExpanded}
            muted={!isExpanded}
          />
          
          {/* Controls overlay */}
          <div className="absolute top-2 right-2 flex space-x-2">
            <button
              onClick={toggleExpanded}
              className="p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors"
              aria-label={isExpanded ? 'Minimize video' : 'Maximize video'}
            >
              {isExpanded ? (
                <ArrowsPointingInIcon className="w-5 h-5" />
              ) : (
                <ArrowsPointingOutIcon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors"
              aria-label="Close video"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}; 