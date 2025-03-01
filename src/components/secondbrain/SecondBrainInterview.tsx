import React, { useState, useRef, useEffect } from 'react';
import { SecondBrain, SecondBrainMessage } from '../../types';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { 
  PaperAirplaneIcon, 
  MicrophoneIcon, 
  StopIcon,
  BriefcaseIcon,
  XMarkIcon,
  CheckIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';

interface SecondBrainInterviewProps {
  secondBrain: SecondBrain;
  onHire: (secondBrainId: string) => Promise<void>;
  onClose: () => void;
}

export function SecondBrainInterview({ 
  secondBrain, 
  onHire,
  onClose 
}: SecondBrainInterviewProps) {
  const { userProfile } = useAuth();
  const [messages, setMessages] = useState<SecondBrainMessage[]>([
    {
      id: '1',
      secondBrainId: secondBrain.id,
      role: 'secondBrain',
      content: `Hello! I'm ${secondBrain.name}, a Chief Cognitive Officer specialized in ${secondBrain.expertise.join(', ')}. ${secondBrain.briefBio} How can I help you today?`,
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHireConfirmation, setShowHireConfirmation] = useState(false);
  const [isHiring, setIsHiring] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the bottom when messages update
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    
    // Add user message
    const userMessage: SecondBrainMessage = {
      id: `user-${Date.now()}`,
      secondBrainId: secondBrain.id,
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Simulate API call to get Chief Cognitive Officer response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response - in a real app this would come from your LLM API
      const secondBrainMessage: SecondBrainMessage = {
        id: `sb-${Date.now()}`,
        secondBrainId: secondBrain.id,
        role: 'secondBrain',
        content: generateMockResponse(inputValue, secondBrain, messages.length),
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, secondBrainMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      const errorMessage: SecondBrainMessage = {
        id: `error-${Date.now()}`,
        secondBrainId: secondBrain.id,
        role: 'secondBrain',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleHireConfirm = async () => {
    setIsHiring(true);
    try {
      await onHire(secondBrain.id);
      // Add confirmation message
      const hireMessage: SecondBrainMessage = {
        id: `system-${Date.now()}`,
        secondBrainId: secondBrain.id,
        role: 'secondBrain',
        content: `Thank you for hiring me! ${secondBrain.ownerName} has been notified and will get in touch with you soon.`,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, hireMessage]);
    } catch (error) {
      console.error('Error hiring Chief Cognitive Officer:', error);
    } finally {
      setIsHiring(false);
      setShowHireConfirmation(false);
    }
  };
  
  // Helper function to generate mock responses
  const generateMockResponse = (userInput: string, brain: SecondBrain, messageCount: number): string => {
    const input = userInput.toLowerCase();
    
    // First few exchanges are more introductory
    if (messageCount < 3) {
      if (input.includes('experience') || input.includes('background')) {
        return `I have extensive experience in ${brain.expertise.join(', ')}. My specialties include deep research, content generation, and problem-solving in these domains. I've assisted ${brain.hireCount} clients so far with various projects.`;
      }
      
      if (input.includes('cost') || input.includes('price') || input.includes('rate')) {
        return `My rates are ${brain.pricing.hourly ? '$' + brain.pricing.hourly + '/hour' : 'negotiable'} for hourly work, and ${brain.pricing.project ? '$' + brain.pricing.project : 'variable'} for project-based work depending on scope. I'm flexible and can discuss pricing options that work for your specific needs.`;
      }
      
      return `I'd be happy to discuss how I can assist with your projects. My approach combines deep expertise in ${brain.expertise.slice(0, 2).join(' and ')}, along with a collaborative process to ensure your goals are met. Can you tell me more about what you're looking to achieve?`;
    }
    
    // More specific responses for later in the conversation
    if (input.includes('portfolio') || input.includes('work') || input.includes('previous')) {
      return `I've worked on various projects including market research reports, content strategy, and technical documentation. One recent project involved ${brain.expertise[0]} analysis for a client in the ${brain.expertise.includes('finance') ? 'finance' : 'technology'} sector, which resulted in a 30% improvement in their decision-making process.`;
    }
    
    if (input.includes('process') || input.includes('work together') || input.includes('collaborate')) {
      return `My process is collaborative and iterative. We'll start with a detailed discovery session to understand your requirements, then I'll create an action plan with clear deliverables and timelines. We'll have regular check-ins to ensure everything stays on track, and I'll adapt based on your feedback throughout the project.`;
    }
    
    if (input.includes('time') || input.includes('availability') || input.includes('schedule')) {
      return `I'm currently ${brain.status === 'available' ? 'available to take on new projects' : brain.status === 'busy' ? 'quite busy but may have limited availability' : 'not available for new projects'}. Typically, I can dedicate ${brain.status === 'available' ? '20-30' : '10-15'} hours per week to your project, and I'm flexible with scheduling calls across different time zones.`;
    }
    
    // Default responses for other queries
    const defaultResponses = [
      `That's a great question. Based on my experience with ${brain.expertise[0]}, I would approach this by first analyzing the core requirements and then developing a strategic plan that aligns with your objectives.`,
      `I see this as an opportunity to leverage my expertise in ${brain.expertise.slice(0, 2).join(' and ')}. The key would be to identify the specific challenges you're facing and then apply proven methodologies to address them efficiently.`,
      `From my perspective, this would involve a multi-faceted approach. I'd start by conducting a thorough assessment, then develop targeted strategies based on my knowledge of ${brain.expertise[0]} to deliver optimal results for your specific context.`
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };
  
  return (
    <>
      <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-cco-primary-700 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-cco-primary-200 flex-shrink-0 overflow-hidden mr-3">
              {secondBrain.avatar ? (
                <img 
                  src={secondBrain.avatar} 
                  alt={secondBrain.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-cco-primary-200 flex items-center justify-center text-cco-primary-700 font-semibold">
                  {secondBrain.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h2 className="font-semibold">{secondBrain.name}</h2>
              <p className="text-xs text-cco-primary-100">by {secondBrain.ownerName}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-cco-accent-600 text-white hover:bg-cco-accent-700"
              onClick={() => setShowHireConfirmation(true)}
            >
              <BriefcaseIcon className="w-4 h-4 mr-1" />
              Hire
            </Button>
            <button 
              className="text-white hover:text-cco-primary-100"
              onClick={onClose}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-cco-neutral-50">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user' 
                      ? 'bg-cco-primary-600 text-white rounded-br-none' 
                      : 'bg-white border border-cco-neutral-200 rounded-bl-none'
                  }`}
                >
                  <div className="text-sm">{message.content}</div>
                  <div className={`text-xs mt-1 text-right ${
                    message.role === 'user' ? 'text-cco-primary-100' : 'text-cco-neutral-500'
                  }`}>
                    {format(new Date(message.timestamp), 'h:mm a')}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-cco-neutral-200 rounded-lg rounded-bl-none p-3 max-w-[80%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-cco-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-cco-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-cco-primary-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={endOfMessagesRef} />
          </div>
        </div>
        
        {/* Input */}
        <div className="border-t border-cco-neutral-200 p-3 bg-white">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-full border border-cco-neutral-300 px-4 py-2 focus:ring-cco-primary-500 focus:border-cco-primary-500 focus:outline-none"
              disabled={isLoading}
            />
            <button
              type="button"
              className="p-2 rounded-full text-cco-neutral-500 hover:text-cco-primary-600 hover:bg-cco-primary-50"
            >
              <MicrophoneIcon className="w-5 h-5" />
            </button>
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className={`p-2 rounded-full ${
                !inputValue.trim() || isLoading
                  ? 'bg-cco-neutral-200 text-cco-neutral-500'
                  : 'bg-cco-primary-600 text-white hover:bg-cco-primary-700'
              }`}
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
      
      {/* Hire Confirmation Modal */}
      {showHireConfirmation && (
        <Modal
          isOpen={showHireConfirmation}
          title="Confirm Hiring"
          onClose={() => setShowHireConfirmation(false)}
        >
          <div className="p-4">
            <p className="text-cco-neutral-700 mb-4">
              Are you sure you want to hire <span className="font-semibold">{secondBrain.name}</span>? 
              The owner will be notified and can contact you to discuss the next steps.
            </p>
            {secondBrain.pricing.hourly && (
              <p className="text-sm text-cco-neutral-600 mb-4">
                Rate: ${secondBrain.pricing.hourly}/hour
              </p>
            )}
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowHireConfirmation(false)}
                disabled={isHiring}
              >
                <XMarkIcon className="w-4 h-4 mr-1" />
                Cancel
              </Button>
              <Button
                variant="accent"
                onClick={handleHireConfirm}
                disabled={isHiring}
              >
                {isHiring ? (
                  <>
                    <ArrowPathIcon className="w-4 h-4 mr-1 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckIcon className="w-4 h-4 mr-1" />
                    Confirm Hire
                  </>
                )}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
} 