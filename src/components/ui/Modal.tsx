import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  showCloseButton = true,
  size = 'md'
}) => {
  // Don't render anything if the modal is closed
  if (!isOpen) return null;
  
  // Prevent scrolling on the body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);
  
  // Size classes
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
    full: 'max-w-full mx-4'
  };
  
  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        // Close when clicking on the backdrop (outside the modal)
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className={`w-full ${sizeClasses[size]} bg-white rounded-lg shadow-xl ${className}`}
        aria-modal="true"
        role="dialog"
      >
        {title && (
          <div className="bg-gradient-to-r from-cco-purple-500 to-cco-primary-600 p-4 md:p-6 rounded-t-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
              {showCloseButton && (
                <Button 
                  variant="ghost"
                  onClick={onClose}
                  className="text-white hover:bg-white/20"
                >
                  <XMarkIcon className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
        )}
        
        <div className={!title ? 'rounded-t-lg' : ''}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}; 