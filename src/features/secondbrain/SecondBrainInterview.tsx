import React, { useState, useEffect } from 'react';
import { SecondBrain, SecondBrainMessage } from '../../types';
import { UserIcon, SparklesIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface SecondBrainInterviewProps {
  secondBrain: SecondBrain;
  onHire: (secondBrainId: string) => Promise<void>;
  onClose: () => void;
}

export const SecondBrainInterview: React.FC<SecondBrainInterviewProps> = ({
  secondBrain,
  onHire,
  onClose,
}) => {
  const [messages, setMessages] = useState<SecondBrainMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHiring, setIsHiring] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize with a welcome message
  useEffect(() => {
    const initialMessage: SecondBrainMessage = {
      id: 'welcome-1',
      secondBrainId: secondBrain.id,
      role: 'secondBrain',
      content: `Hello! I'm ${secondBrain.name}, your potential Chief Cognitive Officer. I specialize in ${secondBrain.expertise.slice(0, 3).join(', ')}${secondBrain.expertise.length > 3 ? ` and ${secondBrain.expertise.length - 3} more areas` : ''}. How can I assist with your cognitive needs today?`,
      timestamp: new Date().toISOString(),
    };
    
    setMessages([initialMessage]);
  }, [secondBrain]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage: SecondBrainMessage = {
      id: `user-${Date.now()}`,
      secondBrainId: secondBrain.id,
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a response based on the user's message
      let responseContent = '';
      const lowerCaseInput = inputValue.toLowerCase();
      
      if (lowerCaseInput.includes('experience') || lowerCaseInput.includes('background')) {
        responseContent = `I have extensive experience in ${secondBrain.expertise.join(', ')}. ${secondBrain.briefBio}`;
      } else if (lowerCaseInput.includes('cost') || lowerCaseInput.includes('price') || lowerCaseInput.includes('pricing')) {
        responseContent = `My rates are $${secondBrain.pricing.hourly}/hour for ongoing work, or $${secondBrain.pricing.project} for project-based engagements. I'm flexible with payment structures based on your specific needs.`;
      } else if (lowerCaseInput.includes('hire') || lowerCaseInput.includes('work') || lowerCaseInput.includes('join')) {
        responseContent = `I'd be delighted to work with you! You can hire me by clicking the "Hire CCO" button below. After that, we can discuss your specific requirements in more detail.`;
      } else {
        responseContent = `Thank you for your question. I'm specialized in ${secondBrain.expertise.slice(0, 3).join(', ')}. I've worked with ${secondBrain.hireCount} clients so far, maintaining a rating of ${secondBrain.rating}/5 from ${secondBrain.ratingCount} reviews. Would you like to know more about how I can help with your specific needs?`;
      }
      
      const aiResponse: SecondBrainMessage = {
        id: `ai-${Date.now()}`,
        secondBrainId: secondBrain.id,
        role: 'secondBrain',
        content: responseContent,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (err) {
      console.error('Error generating response:', err);
      setError('Failed to generate a response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleHire = async () => {
    setIsHiring(true);
    setError(null);
    
    try {
      await onHire(secondBrain.id);
      
      // Add a confirmation message
      const hireConfirmation: SecondBrainMessage = {
        id: `hire-${Date.now()}`,
        secondBrainId: secondBrain.id,
        role: 'secondBrain',
        content: `Excellent! I'm excited to be your new Chief Cognitive Officer. I'll be in touch shortly to begin our collaboration. Thank you for choosing me!`,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, hireConfirmation]);
      
      // Wait a moment before closing
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err) {
      console.error('Error hiring CCO:', err);
      setError('Failed to complete hiring process. Please try again.');
    } finally {
      setIsHiring(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user' 
                    ? 'bg-electric-indigo text-nebula-white rounded-tr-none' 
                    : 'bg-cosmic-grey border border-stardust/20 text-nebula-white rounded-tl-none'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-stardust/20">
                    {message.role === 'user' ? (
                      <UserIcon className="w-4 h-4 text-nebula-white" />
                    ) : (
                      <SparklesIcon className="w-4 h-4 text-electric-indigo" />
                    )}
                  </div>
                  <span className="text-xs font-medium">
                    {message.role === 'user' ? 'You' : secondBrain.name}
                  </span>
                  <span className="text-xs text-stardust ml-auto">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-cosmic-grey border border-stardust/20 text-nebula-white rounded-tl-none">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-stardust/20">
                    <SparklesIcon className="w-4 h-4 text-electric-indigo" />
                  </div>
                  <span className="text-xs font-medium">{secondBrain.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-electric-indigo animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-electric-indigo animate-pulse delay-150"></div>
                  <div className="w-2 h-2 rounded-full bg-electric-indigo animate-pulse delay-300"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="px-4 py-2 bg-electric-crimson/10 border-t border-electric-crimson/20">
          <p className="text-sm text-electric-crimson">{error}</p>
        </div>
      )}
      
      {/* Input area */}
      <div className="border-t border-stardust/20 p-4 bg-obsidian">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything..."
              className="w-full bg-cosmic-grey border border-stardust/20 rounded-lg py-3 pl-4 pr-12 text-nebula-white placeholder-stardust focus:outline-none focus:ring-2 focus:ring-electric-indigo/50"
              disabled={isLoading || isHiring}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading || isHiring}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-stardust hover:text-electric-indigo disabled:text-stardust/50 disabled:hover:text-stardust/50 transition-colors"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-stardust/20 rounded-md text-stardust hover:text-nebula-white hover:border-stardust/40 transition-colors"
            >
              Cancel
            </button>
            
            <button
              onClick={handleHire}
              disabled={isHiring}
              className={`px-4 py-2 rounded-md bg-electric-indigo text-nebula-white flex items-center gap-2 ${
                isHiring ? 'opacity-70 cursor-not-allowed' : 'hover:bg-electric-indigo/90'
              }`}
            >
              {isHiring ? (
                <>
                  <div className="w-4 h-4 border-2 border-nebula-white/20 border-t-nebula-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <SparklesIcon className="w-4 h-4" />
                  <span>Hire CCO</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 