import React, { useState } from 'react';
import { PhoneIcon, EnvelopeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface ContactHeaderProps {
  className?: string;
}

export const ContactHeader: React.FC<ContactHeaderProps> = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // TODO: Implement your email subscription logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCall = () => {
    window.location.href = 'tel:+17813202501';
  };

  return (
    <div className={`bg-obsidian dark:bg-cosmic-grey dark:bg-opacity-90 shadow-md ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Back to Dashboard Button */}
          <Link 
            href="/dashboard" 
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-nebula-white hover:text-white transition-colors duration-200"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Link>

          <div className="flex flex-1 items-center justify-center gap-4">
            <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2 max-w-md">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-stardust" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="block w-full pl-10 pr-3 py-2 border border-stardust/20 rounded-md leading-5 bg-cosmic-grey/50 placeholder-stardust text-nebula-white focus:outline-none focus:ring-1 focus:ring-electric-indigo focus:border-electric-indigo sm:text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-electric-indigo hover:bg-electric-indigo/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-electric-indigo disabled:opacity-50 transition-colors duration-200"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            
            <button
              onClick={handleCall}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-neon-teal hover:bg-neon-teal/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-teal transition-colors duration-200"
            >
              <PhoneIcon className="h-5 w-5 mr-2" />
              Call Us
            </button>

            {/* Sign in/Register Button */}
            <Link
              href="/auth/signin"
              className="inline-flex items-center px-6 py-2 border border-electric-indigo text-sm font-medium rounded-md shadow-sm text-electric-indigo hover:bg-electric-indigo hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-electric-indigo transition-colors duration-200"
            >
              Sign in / Register
            </Link>
          </div>
        </div>
        {message && (
          <p className={`mt-2 text-sm ${message.includes('wrong') ? 'text-electric-crimson' : 'text-neon-teal'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}; 