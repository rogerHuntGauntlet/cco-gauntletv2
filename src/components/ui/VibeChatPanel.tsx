import React, { useState, useRef, useEffect } from 'react';
import { XMarkIcon, PaperAirplaneIcon, TrashIcon, BoltIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { useAI } from '../../contexts/AIContext';
import { format } from 'date-fns';

interface VibeChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VibeChatPanel({ isOpen, onClose }: VibeChatPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const [panelWidth, setPanelWidth] = useState(384); // Default width of 384px
  const [isResizing, setIsResizing] = useState(false);
  const [showModelInfo, setShowModelInfo] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { 
    messages, 
    isLoading, 
    sendMessage, 
    clearMessages, 
    context,
    hasEnoughInfoForGeneration,
    generateResource,
    currentModel
  } = useAI();

  // Format model name for display
  const formatModelName = (modelId: string): string => {
    if (!modelId || modelId === 'default') return 'Default AI';
    if (modelId === 'unknown') return 'Unknown Model';
    
    // Format OpenAI model names
    if (modelId.includes('gpt-3.5-turbo')) return 'GPT-3.5 Turbo';
    if (modelId.includes('gpt-4')) {
      if (modelId.includes('turbo')) return 'GPT-4 Turbo';
      if (modelId.includes('vision')) return 'GPT-4 Vision';
      if (modelId.includes('32k')) return 'GPT-4 32K';
      return 'GPT-4';
    }
    
    // Legacy format for compatibility with Bedrock models if they're still referenced
    if (modelId.includes('claude-v2')) return 'Claude 2';
    if (modelId.includes('claude-instant')) return 'Claude Instant';
    if (modelId.includes('titan')) return 'Amazon Titan';
    if (modelId.includes('cohere')) return 'Cohere Command';
    if (modelId.includes('llama')) return 'Llama 2';
    
    // Extract just the model name without the full path/ARN
    const parts = modelId.split('/');
    const lastPart = parts[parts.length - 1];
    
    return lastPart || modelId;
  };

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      // Calculate new width (distance from right edge of screen to cursor)
      const newWidth = window.innerWidth - e.clientX;
      
      // Set minimum and maximum widths
      if (newWidth >= 280 && newWidth <= 1200) {
        setPanelWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const toggleModelInfo = () => {
    setShowModelInfo(!showModelInfo);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-y-0 right-0 bg-white shadow-xl z-50 flex flex-col border-l border-cco-neutral-200 transition-transform duration-300 ease-in-out transform translate-x-0 animate-slide-in"
      style={{ width: `${panelWidth}px` }}
    >
      {/* Resize handle */}
      <div 
        ref={resizeRef}
        className="absolute inset-y-0 left-0 w-1 bg-transparent hover:bg-cco-primary-300 cursor-ew-resize group"
        onMouseDown={startResizing}
      >
        <div className="absolute inset-y-0 left-0 w-1 bg-cco-primary-400 opacity-0 group-hover:opacity-50"></div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-cco-neutral-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cco-primary-500 to-cco-accent-500 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
              <path d="M12 12L2 12" />
              <path d="M12 12l4.3-4.3" />
              <path d="M12 12l4.3 4.3" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-cco-neutral-900">VIBE Assistant</h3>
            {currentModel !== 'default' && (
              <div className="flex items-center">
                <button 
                  onClick={toggleModelInfo}
                  className="text-xs text-cco-neutral-500 hover:text-cco-primary-600 flex items-center"
                >
                  <span>{formatModelName(currentModel)}</span>
                  <InformationCircleIcon className="w-3 h-3 ml-1" />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button 
            onClick={clearMessages}
            className="p-1 rounded-md text-cco-neutral-700 hover:bg-cco-neutral-100"
            title="Clear conversation"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-cco-neutral-700 hover:bg-cco-neutral-100"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Model Info Tooltip - shows when model info is clicked */}
      {showModelInfo && (
        <div className="bg-cco-neutral-800 text-white p-3 text-xs rounded shadow-lg mx-4 mt-2">
          <p className="font-semibold mb-1">Active AI Model: {formatModelName(currentModel)}</p>
          <p>Model ID: {currentModel}</p>
          <p className="mt-2 text-cco-neutral-300">
            The AI model is provided by OpenAI. You can change the default model in your environment settings.
          </p>
        </div>
      )}
      
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cco-neutral-50">
        {messages.map(message => (
          <div 
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] rounded-lg px-4 py-2 ${
                message.role === 'user' 
                  ? 'bg-cco-primary-100 text-cco-neutral-900' 
                  : 'bg-white border border-cco-neutral-200 text-cco-neutral-900'
              }`}
            >
              <p className="whitespace-pre-line">{message.content}</p>
              <p className="text-xs mt-1 text-cco-neutral-500">
                {format(message.timestamp, 'h:mm a')}
              </p>
            </div>
          </div>
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-cco-neutral-200 rounded-lg px-4 py-2">
              <div className="flex space-x-2">
                <div className="h-2 w-2 bg-cco-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="h-2 w-2 bg-cco-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <div className="h-2 w-2 bg-cco-primary-500 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Context info bar - shows when enough info is collected */}
      {hasEnoughInfoForGeneration && (
        <div className="bg-cco-primary-50 p-2 border-t border-cco-primary-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BoltIcon className="w-5 h-5 text-cco-primary-600 mr-2" />
              <span className="text-sm text-cco-primary-800">
                Ready to create a new {context.intentType}
              </span>
            </div>
            <button
              onClick={generateResource}
              className="px-3 py-1 bg-cco-primary-600 text-white rounded-md text-sm hover:bg-cco-primary-700"
            >
              Generate
            </button>
          </div>
        </div>
      )}
      
      {/* Input area */}
      <form onSubmit={handleSubmit} className="border-t border-cco-neutral-200 p-4">
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Message VIBE assistant..."
            className="flex-1 px-4 py-2 rounded-md border border-cco-neutral-300 focus:outline-none focus:ring-2 focus:ring-cco-primary-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className={`p-2 rounded-md ${
              inputValue.trim() && !isLoading
                ? 'bg-cco-primary-500 text-white hover:bg-cco-primary-600' 
                : 'bg-cco-neutral-200 text-cco-neutral-500'
            }`}
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
} 