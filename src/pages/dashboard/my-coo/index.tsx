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

// Types
interface Node {
  id: string;
  type: 'cco' | 'data' | 'analytics' | 'ai' | 'integration';
      label: string;
  icon: React.ReactNode;
  x: number;
  y: number;
}

interface NodeStyle {
  color: string;
  connectionColor: string;
}

// Node type styles
const nodeStyles: Record<Node['type'], NodeStyle> = {
  cco: { color: '#1a1a1a', connectionColor: '#666666' },
  data: { color: '#3B82F6', connectionColor: '#93C5FD' },
  analytics: { color: '#10B981', connectionColor: '#6EE7B7' },
  ai: { color: '#8B5CF6', connectionColor: '#C4B5FD' },
  integration: { color: '#EC4899', connectionColor: '#F9A8D4' }
};

const NodeMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<Node[]>(() => {
    // Calculate initial circular layout
    const radius = 280;
    const centerX = 0;
    const centerY = 0;
    
    // CCO at center
    const ccoNode: Node = {
      id: 'cco',
      type: 'cco',
      label: 'Chief Cognitive Officer',
      icon: <CogIcon className="w-6 h-6" />,
      x: centerX,
      y: centerY
    };
    
    // Data source nodes in a circle
    const dataNodes: Node[] = [
      {
        id: 'google-drive',
        type: 'data',
        label: 'Google Drive',
        icon: <GoogleDriveIcon />,
        x: centerX + radius * Math.cos(0),
        y: centerY + radius * Math.sin(0)
      },
      {
        id: 'dropbox',
        type: 'data',
        label: 'Dropbox',
        icon: <DropboxIcon />,
        x: centerX + radius * Math.cos((2 * Math.PI) / 3),
        y: centerY + radius * Math.sin((2 * Math.PI) / 3)
      },
      {
        id: 'templates',
        type: 'data',
        label: 'Templates',
        icon: <ServerIcon className="w-6 h-6" />,
        x: centerX + radius * Math.cos((4 * Math.PI) / 3),
        y: centerY + radius * Math.sin((4 * Math.PI) / 3)
      }
    ];
    
    return [ccoNode, ...dataNodes];
  });
  
  const [dragging, setDragging] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Update dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current?.parentElement) {
        const { width, height } = svgRef.current.parentElement.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Handle node dragging
  const handleMouseDown = (nodeId: string, e: React.MouseEvent) => {
    setDragging(nodeId);
      e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      const svg = svgRef.current;
      if (svg) {
        const point = svg.createSVGPoint();
        point.x = e.clientX;
        point.y = e.clientY;
        const ctm = svg.getScreenCTM();
        if (ctm) {
          const svgPoint = point.matrixTransform(ctm.inverse());
          setNodes(prev => prev.map(node =>
            node.id === dragging
              ? { ...node, x: svgPoint.x, y: svgPoint.y }
              : node
          ));
        }
      }
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  // Calculate curved path between nodes
  const getConnectionPath = (source: Node, target: Node) => {
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const dr = Math.sqrt(dx * dx + dy * dy) * 1.2;
    return `M ${source.x},${source.y} A ${dr},${dr} 0 0,1 ${target.x},${target.y}`;
  };

  return (
    <div className="w-full h-full bg-white relative">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`${-dimensions.width/2} ${-dimensions.height/2} ${dimensions.width} ${dimensions.height}`}
        className="absolute inset-0"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <defs>
          {/* Gradient for CCO node */}
          <linearGradient id="cco-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#333333" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Particle filter */}
          <filter id="particle-glow">
            <feGaussianBlur stdDeviation="1" />
          </filter>

          {/* File icon symbol */}
          <symbol id="file-icon" viewBox="0 0 24 24">
            <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  fill="none" />
            <path d="M14 2V8H20" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  fill="none" />
          </symbol>
        </defs>

        {/* Connection lines */}
        {nodes.map(node => {
          if (node.id === 'cco') return null;
          const cco = nodes.find(n => n.id === 'cco')!;
          return (
            <g key={`connection-${node.id}`}>
              {/* Base connection line */}
              <path
                d={getConnectionPath(node, cco)}
                stroke={nodeStyles[node.type].connectionColor}
                strokeWidth={2}
                fill="none"
                opacity={0.2}
                className="transition-all duration-200"
              />
              {/* Animated file icons */}
              {[0, 1, 2].map((i) => (
                <g key={`file-${i}`}>
                  <use
                    href="#file-icon"
                    width="28"
                    height="28"
                    stroke={nodeStyles[node.type].connectionColor}
                    style={{ transform: 'translate(-14px, -14px)' }}
                  >
                    <animateMotion
                      dur="3s"
                      repeatCount="indefinite"
                      begin={`${i * 1}s`}
                      path={getConnectionPath(node, cco)}
                    />
                    <animate
                      attributeName="opacity"
                      values="0.9;0.3;0.9"
                      dur="3s"
                      repeatCount="indefinite"
                      begin={`${i * 1}s`}
                    />
                  </use>
                </g>
              ))}
            </g>
          );
        })}
          
          {/* Nodes */}
        {nodes.map(node => (
          <g
              key={node.id}
            transform={`translate(${node.x},${node.y})`}
            onMouseDown={(e) => handleMouseDown(node.id, e)}
            style={{ cursor: 'grab' }}
            className="transition-transform duration-200"
          >
            {/* Node circle */}
            <circle
              r={node.id === 'cco' ? 80 : 60}
              fill={node.id === 'cco' ? 'url(#cco-gradient)' : nodeStyles[node.type].color}
              className="filter drop-shadow-lg"
              filter="url(#glow)"
              opacity={node.id === 'cco' ? 1 : 0.5}
            />
            
            {/* Icon */}
            <foreignObject
              x={-24}
              y={node.id === 'cco' ? -55 : -35}
              width={48}
              height={48}
              className="pointer-events-none"
            >
              <div className="flex items-center justify-center w-full h-full">
                {React.cloneElement(node.icon as React.ReactElement, {
                  className: `w-12 h-12 ${node.id === 'cco' ? 'text-white' : 'text-white'}`
                })}
              </div>
            </foreignObject>

            {/* Label - Split into multiple lines for CCO */}
            {node.id === 'cco' ? (
              <>
                <text
                  y={15}
                  textAnchor="middle"
                  className="text-lg font-medium select-none pointer-events-none fill-white"
                >
                  Chief
                </text>
                <text
                  y={40}
                  textAnchor="middle"
                  className="text-lg font-medium select-none pointer-events-none fill-white"
                >
                  Cognitive
                </text>
                <text
                  y={65}
                  textAnchor="middle"
                  className="text-lg font-medium select-none pointer-events-none fill-white"
                >
                  Officer
                </text>
              </>
            ) : (
              <text
                y={35}
                textAnchor="middle"
                className={`${node.id === 'google-drive' ? 'text-sm' : 'text-lg'} font-medium select-none pointer-events-none fill-white`}
              >
                {node.label}
              </text>
            )}
          </g>
        ))}
                  </svg>
              </div>
  );
};

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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services = [
    {
      id: 'salesforce',
      name: 'Salesforce',
      icon: <SalesforceIcon />,
      category: 'crm',
      description: 'Connect your Salesforce instance to analyze customer data and interactions.'
    },
    {
      id: 'onedrive',
      name: 'OneDrive',
      icon: <OneDriveIcon />,
      category: 'storage',
      description: 'Access and analyze documents stored in Microsoft OneDrive.'
    },
    {
      id: 'notion',
      name: 'Notion',
      icon: <NotionIcon />,
      category: 'workspace',
      description: 'Import and analyze your Notion workspace documents and databases.'
    },
    {
      id: 'box',
      name: 'Box',
      icon: <BoxIcon />,
      category: 'storage',
      description: 'Connect your Box account to analyze enterprise content.'
    },
    {
      id: 'slack',
      name: 'Slack',
      icon: <ChatBubbleLeftIcon className="w-6 h-6" />,
      category: 'communication',
      description: 'Analyze communication patterns and knowledge from Slack channels.'
    },
    {
      id: 'jira',
      name: 'Jira',
      icon: <CommandLineIcon className="w-6 h-6" />,
      category: 'project',
      description: 'Connect Jira to analyze project data and team workflows.'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'storage', name: 'Storage' },
    { id: 'crm', name: 'CRM' },
    { id: 'workspace', name: 'Workspace' },
    { id: 'communication', name: 'Communication' },
    { id: 'project', name: 'Project Management' }
  ];

  const filteredServices = services.filter(service => 
    (selectedCategory === 'all' || service.category === selectedCategory) &&
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[800px] max-h-[80vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Connect a New Service</h2>
            <p className="text-sm text-gray-500 mt-1">Choose a service to connect to your Chief Cognitive Officer</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Search and Categories */}
        <div className="px-6 py-4 border-b">
          <div className="flex space-x-4">
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
          <div className="flex space-x-2 mt-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCategory === category.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                } transition-colors`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-2 gap-4">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100">
                  {service.icon}
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-900 group-hover:text-blue-500 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {service.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="px-3 py-1.5 text-sm text-blue-500 hover:text-blue-700 font-medium">
                  Connect →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50 rounded-b-xl">
          <p className="text-sm text-gray-500">
            Need help connecting a service? <a href="#" className="text-blue-500 hover:text-blue-700">View documentation</a>
          </p>
        </div>
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

// Main page component
export default function MyCOOPage() {
  return (
    <>
      <Head>
        <title>My COO | CCO VibeCoder Platform</title>
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
                My Chief Cognitive Officer
              </h1>
              <p className="mt-2 text-gray-600 leading-relaxed">
                Connect and manage your external data sources here. Your Chief Cognitive Officer can analyze and chat with documents from Google Drive, Dropbox, and other connected services, helping you extract insights and information efficiently.
              </p>
            </motion.div>

          <ConnectedDevices />

          <div className="bg-white rounded-xl p-4 h-[calc(100vh-280px)]">
            <NodeMap />
                  </div>
                </div>
      </DashboardLayout>
    </>
  );
} 