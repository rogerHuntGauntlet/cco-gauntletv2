import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  FolderIcon,
  CloudIcon,
  ServerIcon,
  DocumentIcon,
  CogIcon,
  CommandLineIcon,
  SparklesIcon,
  PlusCircleIcon,
  CheckCircleIcon,
  XMarkIcon,
  ChatBubbleLeftIcon,
  PaperClipIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

// Custom SVG icons for Google Drive and Dropbox
const GoogleDriveIcon = () => (
  <svg viewBox="0 0 87.3 78.4" className="w-full h-full">
    <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5l5.4 9.35z" fill="#0066DA"/>
    <path d="M43.65 25L29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0-1.2 4.5h27.45l16.2-28z" fill="#00AC47"/>
    <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.85L73.55 76.8z" fill="#EA4335"/>
    <path d="M43.65 25L57.4 1.2c-1.35-.8-2.9-1.2-4.5-1.2H34.4c-1.6 0-3.15.45-4.5 1.2l13.75 23.8z" fill="#00832D"/>
    <path d="M59.85 53H32.4l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h45.5c1.6 0 3.15-.45 4.5-1.2L59.85 53z" fill="#2684FC"/>
    <path d="M73.4 26.5l-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25l16.2 28h27.45c0-1.55-.4-3.1-1.2-4.5l-12.7-22z" fill="#FFBA00"/>
  </svg>
);

const DropboxIcon = () => (
  <svg viewBox="0 0 43 40" className="w-full h-full">
    <path d="M12.6 0L0 8.3l8.7 7 12.6-8.3L12.6 0zm17.8 0l-12.6 8.3 12.6 8.3 8.7-7L30.4 0zM0 23.6l12.6 8.3 8.7-7-12.6-8.3L0 23.6zm30.4 1.3L17.8 33.2l8.7 7 12.6-8.3-8.7-7zm-13.9 2l-8.7 7L12.6 40l8.7-7-4.8-6.1z" fill="#0061FF"/>
  </svg>
);

// Add new service icons
const SalesforceIcon = () => (
  <svg viewBox="0 0 48 32" className="w-full h-full">
    <path d="M11.5 16.3c-.3-.4-.7-.7-1.2-.9-.5-.2-1.1-.3-1.7-.3-.4 0-.8.1-1.2.2-.4.1-.7.3-1 .5-.3.2-.5.5-.7.8-.2.3-.3.7-.3 1.1 0 .4.1.8.3 1.1.2.3.4.6.7.8.3.2.6.4 1 .5.4.1.8.2 1.2.2.6 0 1.2-.1 1.7-.3.5-.2.9-.5 1.2-.9.3-.4.5-.8.7-1.3.1-.5.2-1 .2-1.5h-1.5c0 .4-.1.7-.2 1-.1.3-.2.5-.4.7z" fill="#00A1E0"/>
  </svg>
);

const OneDriveIcon = () => (
  <svg viewBox="0 0 48 32" className="w-full h-full">
    <path d="M27.8 12.3c-.2-1.1-.7-2.1-1.4-2.9-.7-.8-1.6-1.4-2.7-1.9-1-.4-2.2-.6-3.4-.6-1.6 0-3 .3-4.3 1-1.3.7-2.3 1.6-3 2.8-.7 1.2-1.1 2.7-1.1 4.3 0 1.6.4 3 1.1 4.2.7 1.2 1.7 2.2 3 2.8 1.3.7 2.7 1 4.3 1 1.2 0 2.4-.2 3.4-.6 1.1-.4 2-1 2.7-1.9.7-.8 1.2-1.8 1.4-2.9h-3.2c-.2.6-.5 1.2-1 1.6-.5.4-1 .8-1.7 1-.7.2-1.4.3-2.1.3-1.1 0-2-.2-2.9-.7-.9-.5-1.5-1.1-2-1.9-.5-.8-.7-1.8-.7-2.9 0-1.1.2-2.1.7-2.9.5-.8 1.1-1.5 2-1.9.9-.5 1.8-.7 2.9-.7.7 0 1.4.1 2.1.3.7.2 1.2.5 1.7 1 .5.4.8 1 1 1.6h3.2z" fill="#0078D4"/>
  </svg>
);

const NotionIcon = () => (
  <svg viewBox="0 0 48 32" className="w-full h-full">
    <path d="M14 25.5c1.4 1.1 2.9 1.6 4.4 1.6 1.6 0 2.9-.4 4-1.3 1.1-.9 1.6-2.1 1.6-3.7v-9.6h-3v9.4c0 .8-.2 1.4-.7 1.9-.4.5-1.1.7-1.9.7-.9 0-1.7-.3-2.4-.8v-11.2h-3v13h.9z" fill="#000000"/>
  </svg>
);

const BoxIcon = () => (
  <svg viewBox="0 0 48 32" className="w-full h-full">
    <path d="M24 8.4l8.3 4.8v9.6L24 27.6l-8.3-4.8v-9.6L24 8.4zM24 6L13.7 12v12L24 30l10.3-6V12L24 6z" fill="#0061D5"/>
  </svg>
);

// Add mock data for files
const mockFiles = {
  'google-drive': [
    { id: 'gd1', name: 'Q4 Financial Report.xlsx', type: 'spreadsheet', lastModified: '2024-03-15', size: '2.4 MB' },
    { id: 'gd2', name: 'Marketing Strategy 2024.docx', type: 'document', lastModified: '2024-03-14', size: '1.8 MB' },
    { id: 'gd3', name: 'Product Roadmap.pdf', type: 'pdf', lastModified: '2024-03-13', size: '3.2 MB' },
    { id: 'gd4', name: 'Team Meeting Notes.docx', type: 'document', lastModified: '2024-03-12', size: '956 KB' },
    { id: 'gd5', name: 'Customer Feedback Analysis.xlsx', type: 'spreadsheet', lastModified: '2024-03-11', size: '1.5 MB' }
  ],
  'dropbox': [
    { id: 'db1', name: 'Design Assets.zip', type: 'archive', lastModified: '2024-03-15', size: '45.2 MB' },
    { id: 'db2', name: 'Project Timeline.pdf', type: 'pdf', lastModified: '2024-03-14', size: '2.1 MB' },
    { id: 'db3', name: 'Client Presentation.pptx', type: 'presentation', lastModified: '2024-03-13', size: '8.4 MB' },
    { id: 'db4', name: 'API Documentation.md', type: 'document', lastModified: '2024-03-12', size: '234 KB' },
    { id: 'db5', name: 'User Research.pdf', type: 'pdf', lastModified: '2024-03-11', size: '4.7 MB' }
  ],
  'templates': [
    { id: 't1', name: 'Invoice Template.docx', type: 'document', lastModified: '2024-03-15', size: '125 KB' },
    { id: 't2', name: 'Project Proposal Template.pptx', type: 'presentation', lastModified: '2024-03-14', size: '2.8 MB' },
    { id: 't3', name: 'Monthly Report Template.xlsx', type: 'spreadsheet', lastModified: '2024-03-13', size: '890 KB' },
    { id: 't4', name: 'Contract Template.pdf', type: 'pdf', lastModified: '2024-03-12', size: '1.2 MB' },
    { id: 't5', name: 'Email Templates.docx', type: 'document', lastModified: '2024-03-11', size: '456 KB' }
  ]
};

// File type icons mapping
const fileTypeIcons: Record<string, React.ReactNode> = {
  spreadsheet: <DocumentIcon className="w-5 h-5 text-green-600" />,
  document: <DocumentIcon className="w-5 h-5 text-blue-600" />,
  pdf: <DocumentIcon className="w-5 h-5 text-red-600" />,
  presentation: <DocumentIcon className="w-5 h-5 text-orange-600" />,
  archive: <DocumentIcon className="w-5 h-5 text-purple-600" />,
};

// Chat message type
interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// FileModal Component
const FileModal: React.FC<{
  serviceId: string;
  isOpen: boolean;
  onClose: () => void;
}> = ({ serviceId, isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const serviceName = {
    'google-drive': 'Google Drive',
    'dropbox': 'Dropbox',
    'templates': 'Templates'
  }[serviceId];

  const filteredFiles = mockFiles[serviceId as keyof typeof mockFiles].filter(
    file => file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: `I can help you analyze and understand any document in your ${serviceName}. What would you like to know?`,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Add initial AI greeting when modal opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessage: ChatMessage = {
        id: 'initial',
        content: `Hello! I'm your AI assistant for ${serviceName}. I can help you analyze and work with any of your documents. What would you like to know?`,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages([initialMessage]);
    }
  }, [isOpen, serviceName]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[80vw] max-w-5xl h-[80vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-900">{serviceName}</h2>
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-green-500 animate-pulse"></div>
              <span className="ml-2 text-sm text-gray-600">Connected</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-1 min-h-0">
          {/* File List */}
          <div className="w-1/2 border-r flex flex-col">
            <div className="px-6 py-4 border-b">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search files..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center p-3 rounded-lg mb-2 hover:bg-gray-50 border border-gray-100 transition-all"
                >
                  {fileTypeIcons[file.type]}
                  <div className="ml-3 flex-1">
                    <div className="font-medium text-gray-900">{file.name}</div>
                    <div className="text-sm text-gray-500">
                      {file.lastModified} • {file.size}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Interface */}
          <div className="w-1/2 flex flex-col bg-gray-50">
            <div className="px-6 py-4 bg-white border-b">
              <div className="font-medium text-gray-900">
                Chat with your {serviceName} Assistant
              </div>
            </div>
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-6 space-y-4"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-900 shadow-sm'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-white border-t">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={`Ask anything about your ${serviceName} files...`}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                >
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ConnectServiceModal Component
const ConnectServiceModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'connect'>('upload');
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const popularServices = [
    {
      id: 'google-drive',
      name: 'Google Drive',
      icon: <GoogleDriveIcon />,
      color: '#0066DA'
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      icon: <DropboxIcon />,
      color: '#0061FF'
    },
    {
      id: 'onedrive',
      name: 'OneDrive',
      icon: <OneDriveIcon />,
      color: '#0078D4'
    },
    {
      id: 'notion',
      name: 'Notion',
      icon: <NotionIcon />,
      color: '#000000'
    }
  ];

  const otherServices = [
    {
      id: 'salesforce',
      name: 'Salesforce',
      icon: <SalesforceIcon />,
      color: '#00A1E0'
    },
    {
      id: 'slack',
      name: 'Slack',
      icon: <ChatBubbleLeftIcon className="w-6 h-6" />,
      color: '#4A154B'
    },
    {
      id: 'box',
      name: 'Box',
      icon: <BoxIcon />,
      color: '#0061D5'
    },
    {
      id: 'jira',
      name: 'Jira',
      icon: <CommandLineIcon className="w-6 h-6" />,
      color: '#0052CC'
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadingFiles(Array.from(e.target.files));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setUploadingFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadingFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    // Simulate upload success
    alert(`Uploading ${uploadingFiles.length} file(s)`);
    setUploadingFiles([]);
    onClose();
  };

  const handleConnect = (serviceId: string) => {
    // Simulate connection flow
    alert(`Connecting to ${serviceId}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[600px] max-h-[80vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Add content to your CCO</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-3 text-center font-medium text-sm ${
              activeTab === 'upload'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Upload Files
          </button>
          <button
            onClick={() => setActiveTab('connect')}
            className={`flex-1 py-3 text-center font-medium text-sm ${
              activeTab === 'connect'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Connect Services
          </button>
        </div>

        {/* Upload Files Tab */}
        {activeTab === 'upload' && (
          <div className="p-6">
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              
              <div className="mb-4">
                <CloudIcon className="w-12 h-12 mx-auto text-gray-400" />
              </div>
              
              <p className="mb-2 text-sm text-gray-600">
                Drag and drop files here, or{' '}
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() => fileInputRef.current?.click()}
                >
                  browse
                </button>
              </p>
              <p className="text-xs text-gray-500">
                Support for documents, spreadsheets, PDFs, images, and more
              </p>
            </div>

            {/* File List */}
            {uploadingFiles.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Files to upload ({uploadingFiles.length})
                </h3>
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {uploadingFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center">
                        <DocumentIcon className="w-5 h-5 text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 truncate max-w-[300px]">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024).toFixed(0)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveFile(index)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleUpload}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Upload {uploadingFiles.length} file{uploadingFiles.length !== 1 ? 's' : ''}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Connect Services Tab */}
        {activeTab === 'connect' && (
          <div className="p-6 overflow-y-auto">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Popular services</h3>
              <div className="grid grid-cols-2 gap-3">
                {popularServices.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleConnect(service.id)}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <div className="w-10 h-10 flex items-center justify-center mr-3">
                      {service.icon}
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Connect {service.name}</p>
                      <p className="text-xs text-gray-500">Log in to access your files</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Other services</h3>
              <div className="grid grid-cols-2 gap-3">
                {otherServices.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleConnect(service.id)}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <div className="w-10 h-10 flex items-center justify-center mr-3">
                      {service.icon}
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Connect {service.name}</p>
                      <p className="text-xs text-gray-500">Log in to access your files</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Update ConnectedDevices component
const ConnectedDevices: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showConnectModal, setShowConnectModal] = useState(false);

  const connectedServices = [
    {
      id: 'google-drive',
      name: 'Google Drive',
      icon: <GoogleDriveIcon />,
      status: 'Connected',
      lastSync: '2m'
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      icon: <DropboxIcon />,
      status: 'Connected',
      lastSync: '5m'
    },
    {
      id: 'templates',
      name: 'Templates',
      icon: <ServerIcon className="w-5 h-5" />,
      status: 'Connected',
      lastSync: 'now'
    }
  ];

  return (
    <>
      <div className="bg-white rounded-xl px-6 py-4 shadow-sm mb-4">
        <div className="flex items-center space-x-6">
          <h2 className="text-lg font-semibold text-gray-900 shrink-0">Connected Services</h2>
          
          <div className="flex items-center gap-3 flex-grow">
            {connectedServices.map((service) => (
              <div
                key={service.id}
                className="flex items-center bg-gray-50 rounded-lg px-3 py-1.5 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => setSelectedService(service.id)}
              >
                <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-white rounded-md shadow-sm">
                  {service.icon}
                </div>
                {service.id === 'templates' && (
                  <span className="text-sm text-gray-700 ml-2">{service.name}</span>
                )}
                <div className="flex items-center ml-2">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-xs text-gray-400 ml-1">{service.lastSync}</span>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setShowConnectModal(true)}
            className="flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 shrink-0"
          >
            <PlusCircleIcon className="w-5 h-5" />
            <span className="ml-1 text-sm">Connect</span>
          </button>
        </div>
      </div>

      {selectedService && (
        <FileModal
          serviceId={selectedService}
          isOpen={true}
          onClose={() => setSelectedService(null)}
        />
      )}

      <ConnectServiceModal
        isOpen={showConnectModal}
        onClose={() => setShowConnectModal(false)}
      />
    </>
  );
};

// Import our new CCONodeMap component
import dynamic from 'next/dynamic';

// Use dynamic import with ssr: false to avoid React Flow hydration issues
const CCONodeMap = dynamic(
  () => import('../../../components/CCONodeMap'),
  { ssr: false }
);

// Main page component
export default function MyCOOPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  // List of connected services - this is the same data used in ConnectedDevices
  const connectedServices = [
    { id: 'google-drive', name: 'Google Drive' },
    { id: 'dropbox', name: 'Dropbox' },
    { id: 'templates', name: 'Templates' }
  ];
  
  // Handle clicking on a service node in the node map
  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId);
  };
  
  return (
    <>
      <Head>
        <title>My CCO | CCO VibeCoder Platform</title>
        <meta name="description" content="Integrate with external services and import data" />
      </Head>
      
      <DashboardLayout>
        <div className="space-y-4">
            <motion.div 
              className="bg-white rounded-xl p-4 shadow"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
            >
              <h1 className="text-xl font-bold text-gray-900">
                My Chief Cognitive Officer (coming soon)
              </h1>
              <p className="mt-2 text-gray-600 leading-relaxed">
                Connect and manage your external data sources here. Your Chief Cognitive Officer can analyze and chat with documents from Google Drive, Dropbox, and other connected services, helping you extract insights and information efficiently.
              </p>
            </motion.div>

          <ConnectedDevices />

          <div className="bg-white rounded-xl p-4 h-[calc(100vh-280px)]">
            {/* Replace the old NodeMap with our new CCONodeMap */}
            <CCONodeMap 
              connectedServices={connectedServices}
              onServiceClick={handleServiceClick}
            />
          </div>
        </div>
        
        {/* File modal when a service is selected */}
        {selectedService && (
          <FileModal
            serviceId={selectedService}
            isOpen={true}
            onClose={() => setSelectedService(null)}
          />
        )}
      </DashboardLayout>
    </>
  );
} 