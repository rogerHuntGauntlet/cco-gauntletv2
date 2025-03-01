import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { DataIntegrationNodeEditor } from '../../../components/dashboard/DataIntegrationNodeEditor';
import { integrationWorkflows } from '../../../utils/mockData';
import { 
  PlusIcon, 
  ArrowPathIcon, 
  PauseIcon, 
  PlayIcon,
  CommandLineIcon,
  LightBulbIcon,
  ChevronRightIcon,
  DocumentDuplicateIcon,
  CloudArrowUpIcon,
  CubeTransparentIcon,
  BoltIcon,
  ArrowPathRoundedSquareIcon,
  SparklesIcon,
  FolderIcon,
  CloudIcon,
  DocumentIcon,
  TableCellsIcon,
  PhotoIcon,
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { IntegrationWorkflow, NodeType, IntegrationNode } from '../../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { DndProvider, useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Template type with proper node structure
type IntegrationTemplate = {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  category: string;
  complexity: string;
  estimatedTime: string;
  nodes: Array<{
    id: string;
    serviceId: string;
    position: { x: number; y: number };
    data: {
      label: string;
      type: NodeType;
      icon: string;
      connected: boolean;
      config: Record<string, unknown>;
    };
  }>;
};

// Example templates with proper node structure
const INTEGRATION_TEMPLATES: IntegrationTemplate[] = [
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'Connect and sync your Google Drive files. Automatically backup and organize documents in real-time.',
    icon: <FolderIcon className="w-6 h-6" />,
    category: 'Cloud Storage',
    complexity: 'Simple',
    estimatedTime: '5 min',
    nodes: [
      {
        id: 'drive-source',
        serviceId: 'google-drive',
        position: { x: 100, y: 100 },
        data: {
          label: 'Google Drive',
          type: 'source',
          icon: 'drive',
          connected: false,
          config: {
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            watchInterval: 300 // 5 minutes
          }
        }
      },
      {
        id: 'file-processor',
        serviceId: 'processor',
        position: { x: 300, y: 100 },
        data: {
          label: 'File Processor',
          type: 'transform',
          icon: 'file',
          connected: false,
          config: {
            fileTypes: ['document', 'spreadsheet', 'pdf'],
            maxSize: 100 * 1024 * 1024 // 100MB
          }
        }
      },
      {
        id: 'storage',
        serviceId: 'storage',
        position: { x: 500, y: 100 },
        data: {
          label: 'Storage',
          type: 'destination',
          icon: 'database',
          connected: false,
          config: {
            compression: true,
            versioning: true
          }
        }
      }
    ]
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    description: 'Integrate with Dropbox to automatically sync and manage files across your organization.',
    icon: <CloudIcon className="w-6 h-6" />,
    category: 'Cloud Storage',
    complexity: 'Simple',
    estimatedTime: '5 min',
    nodes: [
      {
        id: 'dropbox-source',
        serviceId: 'dropbox',
        position: { x: 100, y: 100 },
        data: {
          label: 'Dropbox',
          type: 'source',
          icon: 'dropbox',
          connected: false,
          config: {
            path: '/',
            watchChanges: true
          }
        }
      },
      {
        id: 'file-processor',
        serviceId: 'processor',
        position: { x: 300, y: 100 },
        data: {
          label: 'File Processor',
          type: 'transform',
          icon: 'file',
          connected: false,
          config: {
            fileTypes: ['document', 'spreadsheet', 'pdf'],
            maxSize: 100 * 1024 * 1024 // 100MB
          }
        }
      },
      {
        id: 'storage',
        serviceId: 'storage',
        position: { x: 500, y: 100 },
        data: {
          label: 'Storage',
          type: 'destination',
          icon: 'database',
          connected: false,
          config: {
            compression: true,
            versioning: true
          }
        }
      }
    ]
  },
  {
    id: 'data-warehouse',
    name: 'Data Warehouse ETL',
    description: 'Extract, transform, and load data into your warehouse with scheduled runs.',
    icon: <CloudArrowUpIcon className="w-6 h-6" />,
    category: 'Data Integration',
    complexity: 'Advanced',
    estimatedTime: '20 min',
    nodes: [
      {
        id: 'extract',
        serviceId: 'extract',
        position: { x: 100, y: 100 },
        data: {
          label: 'Extract',
          type: 'source',
          icon: 'database',
          connected: false,
          config: {}
        }
      },
      {
        id: 'transform',
        serviceId: 'transform',
        position: { x: 300, y: 100 },
        data: {
          label: 'Transform',
          type: 'transform',
          icon: 'code',
          connected: false,
          config: {}
        }
      },
      {
        id: 'load',
        serviceId: 'warehouse',
        position: { x: 500, y: 100 },
        data: {
          label: 'Load',
          type: 'destination',
          icon: 'warehouse',
          connected: false,
          config: {}
        }
      }
    ]
  },
  {
    id: 'api-integration',
    name: 'API Integration',
    description: 'Connect and orchestrate multiple APIs with automatic retries and error handling.',
    icon: <CubeTransparentIcon className="w-6 h-6" />,
    category: 'API Management',
    complexity: 'Simple',
    estimatedTime: '5 min',
    nodes: [
      {
        id: 'api1',
        serviceId: 'api',
        position: { x: 100, y: 100 },
        data: {
          label: 'API 1',
          type: 'source',
          icon: 'api',
          connected: false,
          config: {}
        }
      },
      {
        id: 'api2',
        serviceId: 'api',
        position: { x: 300, y: 100 },
        data: {
          label: 'API 2',
          type: 'destination',
          icon: 'api',
          connected: false,
          config: {}
        }
      }
    ]
  }
] as const;

// Keyboard shortcuts configuration
const SHORTCUTS = {
  CREATE_WORKFLOW: 'n',
  TOGGLE_TIPS: 't',
  FOCUS_SEARCH: '/',
  SAVE_WORKFLOW: 's',
} as const;

// Type for workflow status (using the type from IntegrationWorkflow)
type WorkflowStatus = IntegrationWorkflow['status'];

// Update IntegrationWorkflow type to use the correct status type
type StrictIntegrationWorkflow = Omit<IntegrationWorkflow, 'status'> & {
  status: WorkflowStatus;
};

// Empty template with proper node structure
const EMPTY_TEMPLATE: IntegrationTemplate = {
  id: 'empty',
  name: 'Empty Workflow',
  description: 'Start from scratch',
  icon: <PlusIcon className="w-6 h-6" />,
  category: 'Custom',
  complexity: 'Custom',
  estimatedTime: 'N/A',
  nodes: []
};

// Create a function to convert template to workflow
const createWorkflowFromTemplate = (template: IntegrationTemplate): IntegrationWorkflow => {
  const workflow: IntegrationWorkflow = {
    id: template.id,
    name: template.name,
    description: template.description,
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    nodes: template.nodes.map(node => ({ ...node })),
    edges: []
  };
  return workflow;
};

// Update the mock workflows to have the correct type structure
const mockWorkflows: IntegrationWorkflow[] = [
  {
    id: 'mock-1',
    name: 'Customer Data Sync',
    description: 'Synchronize customer data between CRM and data warehouse',
    status: 'active' as const,
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z',
    nodes: [
      {
        id: 'source-1',
        serviceId: 'crm',
        position: { x: 100, y: 100 },
        data: {
          label: 'CRM',
          type: 'source' as const,
          icon: 'database',
          connected: true,
          config: {}
        }
      },
      {
        id: 'destination-1',
        serviceId: 'warehouse',
        position: { x: 300, y: 100 },
        data: {
          label: 'Warehouse',
          type: 'destination' as const,
          icon: 'database',
          connected: true,
          config: {}
        }
      }
    ],
    edges: []
  },
  {
    id: 'mock-2',
    name: 'Sales Analytics Pipeline',
    description: 'Process and analyze sales data in real-time',
    status: 'paused' as const,
    createdAt: '2024-03-14T15:30:00Z',
    updatedAt: '2024-03-15T09:00:00Z',
    nodes: [
      {
        id: 'source-2',
        serviceId: 'sales',
        position: { x: 100, y: 100 },
        data: {
          label: 'Sales Data',
          type: 'source' as const,
          icon: 'chart',
          connected: true,
          config: {}
        }
      },
      {
        id: 'transform-2',
        serviceId: 'transform',
        position: { x: 300, y: 100 },
        data: {
          label: 'Transform',
          type: 'transform' as const,
          icon: 'code',
          connected: true,
          config: {}
        }
      },
      {
        id: 'destination-2',
        serviceId: 'analytics',
        position: { x: 500, y: 100 },
        data: {
          label: 'Analytics',
          type: 'destination' as const,
          icon: 'chart',
          connected: true,
          config: {}
        }
      }
    ],
    edges: []
  }
];

interface DraggableTemplateCardProps {
  template: IntegrationTemplate;
  onSelect: () => void;
}

interface DragItem {
  template: IntegrationTemplate;
}

// Modify the DraggableTemplateCard component to show only logos
const DraggableTemplateCard: React.FC<DraggableTemplateCardProps> = ({ template, onSelect }) => {
  const [{ isDragging }, drag] = useDrag<DragItem, void, { isDragging: boolean }>(() => ({
    type: 'template',
    item: { template },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  return (
    <div
      ref={drag}
      className={`group cursor-pointer bg-white border border-cco-neutral-200 rounded-full p-3 hover:shadow-md transition-all ${
        isDragging ? 'opacity-50' : ''
      }`}
      style={{
        boxShadow: isDragging ? '0 20px 25px -5px rgb(0 0 0 / 0.1)' : undefined
      }}
      onClick={onSelect}
      title={template.name}
    >
      <motion.div 
        className="flex items-center justify-center w-10 h-10 rounded-full bg-cco-primary-50 text-cco-primary-600"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        {template.icon}
      </motion.div>
    </div>
  );
};

// Add mock synced files data
const MOCK_SYNCED_FILES = {
  'google-drive': [
    {
      id: 'doc1',
      name: 'Q1 2024 Strategy Planning.docx',
      type: 'document',
      lastModified: '2024-03-18T14:30:00Z',
      size: '2.4 MB',
      icon: <DocumentIcon className="w-5 h-5" />,
      status: 'synced'
    },
    {
      id: 'sheet1',
      name: 'Sales Pipeline Analysis.xlsx',
      type: 'spreadsheet',
      lastModified: '2024-03-17T09:15:00Z',
      size: '1.8 MB',
      icon: <TableCellsIcon className="w-5 h-5" />,
      status: 'synced'
    },
    {
      id: 'pres1',
      name: 'Investor Pitch Deck.pptx',
      type: 'presentation',
      lastModified: '2024-03-16T16:45:00Z',
      size: '5.2 MB',
      icon: <DocumentIcon className="w-5 h-5" />,
      status: 'syncing'
    },
    {
      id: 'img1',
      name: 'Product Screenshots',
      type: 'folder',
      lastModified: '2024-03-15T11:20:00Z',
      size: '45 MB',
      icon: <FolderIcon className="w-5 h-5" />,
      status: 'synced'
    }
  ],
  'dropbox': [
    {
      id: 'proj1',
      name: 'Project Assets',
      type: 'folder',
      lastModified: '2024-03-18T13:00:00Z',
      size: '156 MB',
      icon: <FolderIcon className="w-5 h-5" />,
      status: 'synced'
    },
    {
      id: 'doc2',
      name: 'Technical Documentation.pdf',
      type: 'document',
      lastModified: '2024-03-17T15:30:00Z',
      size: '3.1 MB',
      icon: <DocumentIcon className="w-5 h-5" />,
      status: 'synced'
    },
    {
      id: 'img2',
      name: 'Brand Guidelines.ai',
      type: 'image',
      lastModified: '2024-03-16T10:45:00Z',
      size: '8.7 MB',
      icon: <PhotoIcon className="w-5 h-5" />,
      status: 'syncing'
    },
    {
      id: 'sheet2',
      name: 'Resource Allocation.xlsx',
      type: 'spreadsheet',
      lastModified: '2024-03-15T14:20:00Z',
      size: '1.2 MB',
      icon: <TableCellsIcon className="w-5 h-5" />,
      status: 'synced'
    }
  ]
};

// Add the FileSync component
const FileSyncView: React.FC<{ provider: 'google-drive' | 'dropbox' }> = ({ provider }) => {
  const files = MOCK_SYNCED_FILES[provider];
  const providerName = provider === 'google-drive' ? 'Google Drive' : 'Dropbox';
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search files..."
              className="pl-10 pr-4 py-2 border border-cco-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cco-primary-500 w-64"
            />
            <MagnifyingGlassIcon className="w-5 h-5 text-cco-neutral-400 absolute left-3 top-2.5" />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-cco-primary-500 text-white rounded-lg hover:bg-cco-primary-600 transition-colors">
            <ArrowUpTrayIcon className="w-5 h-5" />
            <span>Upload</span>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-cco-neutral-600">Last synced 2 minutes ago</span>
          <button className="p-2 hover:bg-cco-neutral-100 rounded-full transition-colors">
            <ArrowPathIcon className="w-5 h-5 text-cco-neutral-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-3 bg-white rounded-xl border border-cco-neutral-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-cco-neutral-200 bg-cco-neutral-50">
            <h3 className="font-medium text-cco-neutral-900">Synced Files from {providerName}</h3>
          </div>
          <div className="divide-y divide-cco-neutral-100">
            {files.map((file) => (
              <div
                key={file.id}
                onClick={() => setSelectedFile(file.id)}
                className={`flex items-center justify-between px-4 py-3 hover:bg-cco-neutral-50 cursor-pointer ${
                  selectedFile === file.id ? 'bg-cco-neutral-50' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-cco-neutral-600">{file.icon}</div>
                  <div>
                    <p className="text-sm font-medium text-cco-neutral-900">{file.name}</p>
                    <p className="text-xs text-cco-neutral-500">
                      {file.size} • Modified {new Date(file.lastModified).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {file.status === 'syncing' ? (
                    <span className="flex items-center space-x-1 text-xs text-cco-primary-600">
                      <ArrowPathIcon className="w-4 h-4 animate-spin" />
                      <span>Syncing</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1 text-xs text-cco-neutral-600">
                      <CheckCircleIcon className="w-4 h-4 text-green-500" />
                      <span>Synced</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2 bg-white rounded-xl border border-cco-neutral-200">
          <div className="px-4 py-3 border-b border-cco-neutral-200 bg-cco-neutral-50 flex items-center justify-between">
            <h3 className="font-medium text-cco-neutral-900">File Assistant</h3>
            <ChatBubbleLeftRightIcon className="w-5 h-5 text-cco-neutral-600" />
          </div>
          <div className="p-4">
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-cco-neutral-100 flex items-center justify-center mb-3">
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-cco-neutral-400" />
              </div>
              <h4 className="text-sm font-medium text-cco-neutral-900 mb-1">
                Chat with your files
              </h4>
              <p className="text-xs text-cco-neutral-600 max-w-sm mx-auto">
                Select a file to start a conversation. Ask questions, request summaries, or get insights about your documents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add new types for the workspace
type Position = { x: number; y: number };

type ConnectionType = 'data' | 'control' | 'parameter';

type Connection = {
  id: string;
  sourceNodeId: string;
  sourcePortId: string;
  targetNodeId: string;
  targetPortId: string;
  type: ConnectionType;
  points?: Position[];
};

type Port = {
  id: string;
  type: 'input' | 'output';
  label: string;
  dataType: string;
};

type WorkspaceNode = {
  id: string;
  type: string;
  position: Position;
  data: {
    label: string;
    icon: string;
    color?: string;
    description?: string;
    ports: Port[];
    [key: string]: any;
  };
  width?: number;
  height?: number;
  selected?: boolean;
  dragging?: boolean;
};

type Workspace = {
  nodes: WorkspaceNode[];
  connections: Connection[];
  scale: number;
  offset: Position;
};

// Add new component for modern workspace
const ModernWorkspace: React.FC<{ 
  initialWorkflow?: IntegrationWorkflow, 
  onSave?: (workflow: IntegrationWorkflow) => void 
}> = ({ initialWorkflow }) => {
  const [workspace, setWorkspace] = useState<Workspace>({
    nodes: initialWorkflow?.nodes.map(node => ({
      id: node.id,
      type: node.data.type,
      position: node.position,
      data: {
        ...node.data,
        ports: [
          { id: `${node.id}-in-1`, type: 'input', label: 'Input', dataType: 'any' },
          { id: `${node.id}-out-1`, type: 'output', label: 'Output', dataType: 'any' }
        ]
      }
    })) || [],
    connections: initialWorkflow?.edges.map((edge, index) => ({
      id: `connection-${index}`,
      sourceNodeId: edge.source,
      sourcePortId: `${edge.source}-out-1`,
      targetNodeId: edge.target,
      targetPortId: `${edge.target}-in-1`,
      type: 'data'
    })) || [],
    scale: 1,
    offset: { x: 0, y: 0 }
  });
  
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [connectionInProgress, setConnectionInProgress] = useState<{ nodeId: string, portId: string, position: Position } | null>(null);
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  const [nodePalette, setNodePalette] = useState<boolean>(false);
  const [showContextMenu, setShowContextMenu] = useState<{ position: Position, nodeId?: string } | null>(null);
  
  // Container ref for pointer positions
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Handle mouse move events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / workspace.scale - workspace.offset.x;
        const y = (e.clientY - rect.top) / workspace.scale - workspace.offset.y;
        setMousePosition({ x, y });
        
        if (draggedNode) {
          setWorkspace(prev => ({
            ...prev,
            nodes: prev.nodes.map(node => 
              node.id === draggedNode 
                ? { 
                    ...node, 
                    position: { 
                      x: x - dragOffset.x, 
                      y: y - dragOffset.y 
                    },
                    dragging: true
                  } 
                : node
            )
          }));
        }
      }
    };
    
    const handleMouseUp = () => {
      if (draggedNode) {
        setWorkspace(prev => ({
          ...prev,
          nodes: prev.nodes.map(node => 
            node.id === draggedNode 
              ? { ...node, dragging: false } 
              : node
          )
        }));
        setDraggedNode(null);
      }
      
      if (connectionInProgress) {
        // Find if there's any port under the mouse to connect to
        setConnectionInProgress(null);
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggedNode, dragOffset, workspace.scale, workspace.offset, connectionInProgress]);
  
  // Add a new node
  const addNode = (nodeType: string, position: Position) => {
    const newNode: WorkspaceNode = {
      id: `node-${Math.random().toString(36).substring(2, 9)}`,
      type: nodeType,
      position,
      data: {
        label: nodeType.charAt(0).toUpperCase() + nodeType.slice(1),
        icon: nodeType === 'source' ? 'database' : nodeType === 'transform' ? 'code' : 'cloud',
        ports: [
          { id: `node-${Math.random().toString(36).substring(2, 9)}-in-1`, type: 'input', label: 'Input', dataType: 'any' },
          { id: `node-${Math.random().toString(36).substring(2, 9)}-out-1`, type: 'output', label: 'Output', dataType: 'any' }
        ]
      }
    };
    
    setWorkspace(prev => ({
      ...prev,
      nodes: [...prev.nodes, newNode]
    }));
    
    return newNode.id;
  };
  
  // Start dragging a node
  const startDraggingNode = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    const node = workspace.nodes.find(n => n.id === nodeId);
    if (!node) return;
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / workspace.scale - workspace.offset.x;
      const y = (e.clientY - rect.top) / workspace.scale - workspace.offset.y;
      
      setDragOffset({
        x: x - node.position.x,
        y: y - node.position.y
      });
      
      setDraggedNode(nodeId);
      
      if (!selectedNodeIds.includes(nodeId)) {
        setSelectedNodeIds([nodeId]);
      }
    }
  };
  
  // Select a node
  const selectNode = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (e.shiftKey) {
      setSelectedNodeIds(prev => 
        prev.includes(nodeId) 
          ? prev.filter(id => id !== nodeId) 
          : [...prev, nodeId]
      );
    } else {
      setSelectedNodeIds([nodeId]);
    }
    
    // Update workspace with selected state
    setWorkspace(prev => ({
      ...prev,
      nodes: prev.nodes.map(node => ({
        ...node,
        selected: e.shiftKey 
          ? node.id === nodeId 
            ? !node.selected 
            : node.selected 
          : node.id === nodeId
      }))
    }));
  };
  
  // Start creating a connection
  const startConnection = (nodeId: string, portId: string, portType: 'input' | 'output', e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const position = {
        x: (e.clientX - rect.left) / workspace.scale - workspace.offset.x,
        y: (e.clientY - rect.top) / workspace.scale - workspace.offset.y
      };
      
      setConnectionInProgress({
        nodeId,
        portId,
        position
      });
    }
  };
  
  // Handle clicking on the workspace
  const handleWorkspaceClick = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left click
      // Deselect all if clicking on empty space
      setSelectedNodeIds([]);
      setWorkspace(prev => ({
        ...prev,
        nodes: prev.nodes.map(node => ({
          ...node,
          selected: false
        }))
      }));
      setShowContextMenu(null);
    } else if (e.button === 2) { // Right click
      // Show context menu
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const position = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
        setShowContextMenu({ position });
      }
      e.preventDefault();
    }
  };
  
  // Calculate connection path
  const getConnectionPath = (connection: Connection) => {
    const sourceNode = workspace.nodes.find(n => n.id === connection.sourceNodeId);
    const targetNode = workspace.nodes.find(n => n.id === connection.targetNodeId);
    
    if (!sourceNode || !targetNode) return '';
    
    // Simple straight line path
    const sourceX = sourceNode.position.x + 150; // Assuming node width is 150
    const sourceY = sourceNode.position.y + 30; // Approximate port position
    const targetX = targetNode.position.x;
    const targetY = targetNode.position.y + 30;
    
    // Create a bezier curve
    const dx = Math.abs(targetX - sourceX);
    const controlPointOffset = Math.min(dx * 0.5, 150);
    
    return `M ${sourceX} ${sourceY} C ${sourceX + controlPointOffset} ${sourceY}, ${targetX - controlPointOffset} ${targetY}, ${targetX} ${targetY}`;
  };
  
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Delete selected nodes
      if (e.key === 'Delete' && selectedNodeIds.length > 0) {
        setWorkspace(prev => ({
          ...prev,
          nodes: prev.nodes.filter(node => !selectedNodeIds.includes(node.id)),
          connections: prev.connections.filter(
            conn => !selectedNodeIds.includes(conn.sourceNodeId) && !selectedNodeIds.includes(conn.targetNodeId)
          )
        }));
        setSelectedNodeIds([]);
      }
      
      // Copy/paste nodes
      if (e.key === 'c' && e.ctrlKey && selectedNodeIds.length > 0) {
        // Implement copy
      }
      
      if (e.key === 'v' && e.ctrlKey) {
        // Implement paste
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedNodeIds]);
  
  // Zoom functionality
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.min(Math.max(workspace.scale * scaleFactor, 0.1), 3);
      
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / workspace.scale;
        const y = (e.clientY - rect.top) / workspace.scale;
        
        const newOffset = {
          x: workspace.offset.x - (x - workspace.offset.x) * (scaleFactor - 1),
          y: workspace.offset.y - (y - workspace.offset.y) * (scaleFactor - 1)
        };
        
        setWorkspace(prev => ({
          ...prev,
          scale: newScale,
          offset: newOffset
        }));
      }
    }
  };

  return (
    <div className="w-full h-[calc(100vh-180px)] overflow-hidden relative">
      {/* Node Palette */}
      <div className="absolute left-4 top-4 z-10 bg-white rounded-lg shadow-lg p-2 flex flex-col gap-2">
        <button 
          className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
          onClick={() => addNode('source', { x: 100, y: 100 })}
          title="Add source node"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
        </button>
        <button 
          className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
          onClick={() => addNode('transform', { x: 300, y: 100 })}
          title="Add transform node"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="16 3 21 3 21 8" />
            <line x1="4" y1="20" x2="21" y2="3" />
            <polyline points="21 16 21 21 16 21" />
            <line x1="15" y1="15" x2="21" y2="21" />
            <line x1="4" y1="4" x2="9" y2="9" />
          </svg>
        </button>
        <button 
          className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
          onClick={() => addNode('destination', { x: 500, y: 100 })}
          title="Add destination node"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </button>
      </div>
      
      {/* Workspace controls */}
      <div className="absolute right-4 top-4 z-10 bg-white rounded-lg shadow-lg p-2 flex gap-2">
        <button 
          className="w-8 h-8 bg-gray-100 text-gray-700 rounded flex items-center justify-center hover:bg-gray-200 transition-colors"
          onClick={() => setWorkspace(prev => ({ ...prev, scale: prev.scale * 1.1 }))}
          title="Zoom in"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </button>
        <button 
          className="w-8 h-8 bg-gray-100 text-gray-700 rounded flex items-center justify-center hover:bg-gray-200 transition-colors"
          onClick={() => setWorkspace(prev => ({ ...prev, scale: prev.scale * 0.9 }))}
          title="Zoom out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </button>
        <button 
          className="w-8 h-8 bg-gray-100 text-gray-700 rounded flex items-center justify-center hover:bg-gray-200 transition-colors"
          onClick={() => setWorkspace(prev => ({ ...prev, offset: { x: 0, y: 0 }, scale: 1 }))}
          title="Reset view"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18" />
            <path d="M12 3v18" />
          </svg>
        </button>
      </div>
      
      {/* Main workspace */}
      <div 
        ref={containerRef}
        className="w-full h-full bg-neutral-50 overflow-hidden relative cursor-grab"
        onClick={handleWorkspaceClick}
        onContextMenu={e => e.preventDefault()}
        onWheel={handleWheel}
      >
        {/* Grid background */}
        <div 
          className="absolute inset-0 bg-grid-pattern"
          style={{
            backgroundSize: `${20 * workspace.scale}px ${20 * workspace.scale}px`,
            backgroundPosition: `${workspace.offset.x * workspace.scale}px ${workspace.offset.y * workspace.scale}px`,
            backgroundImage: `
              linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
            `
          }}
        />
        
        {/* Transformation container for pan and zoom */}
        <div 
          className="absolute inset-0 transform transition-transform duration-100"
          style={{
            transform: `scale(${workspace.scale}) translate(${workspace.offset.x}px, ${workspace.offset.y}px)`
          }}
        >
          {/* Connections */}
          <svg className="absolute inset-0 pointer-events-none overflow-visible">
            {workspace.connections.map(connection => (
              <path
                key={connection.id}
                d={getConnectionPath(connection)}
                stroke="#6366f1"
                strokeWidth={2 / workspace.scale}
                fill="none"
                strokeDasharray={connection.type === 'control' ? '5,5' : 'none'}
              />
            ))}
            
            {/* Connection in progress */}
            {connectionInProgress && (
              <path
                d={`M ${connectionInProgress.position.x} ${connectionInProgress.position.y} L ${mousePosition.x} ${mousePosition.y}`}
                stroke="#6366f1"
                strokeWidth={2 / workspace.scale}
                fill="none"
                strokeDasharray="5,5"
              />
            )}
          </svg>
          
          {/* Nodes */}
          {workspace.nodes.map(node => (
            <div
              key={node.id}
              className={`absolute bg-white rounded-lg shadow-lg overflow-hidden ${
                node.selected ? 'ring-2 ring-indigo-500' : ''
              } ${
                node.dragging ? 'opacity-80' : ''
              }`}
              style={{
                transform: `translate(${node.position.x}px, ${node.position.y}px)`,
                width: 200,
                height: 'auto',
                zIndex: node.dragging ? 100 : 1
              }}
              onMouseDown={e => startDraggingNode(node.id, e)}
              onClick={e => selectNode(node.id, e)}
            >
              {/* Node header */}
              <div 
                className={`p-3 text-white font-medium flex items-center justify-between cursor-move
                  ${node.type === 'source' ? 'bg-blue-500' :
                    node.type === 'transform' ? 'bg-green-500' :
                    'bg-purple-500'}`}
              >
                <span className="flex items-center">
                  {node.type === 'source' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                  ) : node.type === 'transform' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="16 3 21 3 21 8" />
                      <line x1="4" y1="20" x2="21" y2="3" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                    </svg>
                  )}
                  {node.data.label}
                </span>
                <button className="p-1 rounded hover:bg-white/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </button>
              </div>
              
              {/* Node content */}
              <div className="p-3 bg-white">
                <div className="mb-2 text-xs text-gray-500">{node.type.toUpperCase()}</div>
                
                {/* Input ports */}
                <div className="space-y-2 my-4">
                  {node.data.ports.filter(port => port.type === 'input').map(port => (
                    <div 
                      key={port.id}
                      className="relative flex items-center ml-4"
                    >
                      <div 
                        className="absolute -left-4 w-3 h-3 bg-blue-500 rounded-full cursor-crosshair"
                        onMouseDown={e => startConnection(node.id, port.id, 'input', e)}
                      />
                      <span className="text-xs">{port.label}</span>
                    </div>
                  ))}
                </div>
                
                {/* Output ports */}
                <div className="space-y-2 mt-4">
                  {node.data.ports.filter(port => port.type === 'output').map(port => (
                    <div 
                      key={port.id}
                      className="relative flex items-center justify-end mr-4"
                    >
                      <span className="text-xs">{port.label}</span>
                      <div 
                        className="absolute -right-4 w-3 h-3 bg-purple-500 rounded-full cursor-crosshair"
                        onMouseDown={e => startConnection(node.id, port.id, 'output', e)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Context menu */}
      {showContextMenu && (
        <div 
          className="absolute z-20 bg-white rounded-lg shadow-xl p-2 min-w-40"
          style={{
            left: showContextMenu.position.x,
            top: showContextMenu.position.y
          }}
        >
          <div className="py-1">
            <button 
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded flex items-center"
              onClick={() => {
                addNode('source', { 
                  x: (showContextMenu.position.x / workspace.scale) - workspace.offset.x, 
                  y: (showContextMenu.position.y / workspace.scale) - workspace.offset.y 
                });
                setShowContextMenu(null);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
              Add Source
            </button>
            <button 
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded flex items-center"
              onClick={() => {
                addNode('transform', { 
                  x: (showContextMenu.position.x / workspace.scale) - workspace.offset.x, 
                  y: (showContextMenu.position.y / workspace.scale) - workspace.offset.y 
                });
                setShowContextMenu(null);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 3 21 3 21 8" />
                <line x1="4" y1="20" x2="21" y2="3" />
              </svg>
              Add Transform
            </button>
            <button 
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded flex items-center"
              onClick={() => {
                addNode('destination', { 
                  x: (showContextMenu.position.x / workspace.scale) - workspace.offset.x, 
                  y: (showContextMenu.position.y / workspace.scale) - workspace.offset.y 
                });
                setShowContextMenu(null);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
              </svg>
              Add Destination
            </button>
          </div>
          <div className="border-t border-gray-200 my-1"></div>
          <div className="py-1">
            <button 
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded"
              onClick={() => setShowContextMenu(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {/* Mini-map (Optional) */}
      <div className="absolute bottom-4 right-4 w-48 h-32 bg-white/80 border border-gray-200 rounded shadow-lg overflow-hidden">
        {/* Mini-map content */}
      </div>
    </div>
  );
};

export default function MyCOOPage() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<IntegrationWorkflow | null>(null);
  const [mode, setMode] = useState<'list' | 'edit'>('list');
  const [showKeyboardTips, setShowKeyboardTips] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<IntegrationTemplate | null>(null);
  const [draggedTemplate, setDraggedTemplate] = useState(null);
  
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      switch (e.key) {
        case 'Escape':
          if (mode === 'edit') handleBackToList();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [mode]);

  const handleBackToList = () => {
    setSelectedTemplate(null);
    setSelectedWorkflow(null);
    setMode('list');
  };

  return (
    <>
      <Head>
        <title>My COO | CCO VibeCoder Platform</title>
        <meta
          name="description"
          content="Integrate with external services and import data"
        />
      </Head>
      
      <DashboardLayout>
        <DndProvider backend={HTML5Backend}>
          <motion.div 
            className="space-y-4 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Keyboard Shortcuts Overlay */}
            {showKeyboardTips && (
              <div className="fixed bottom-6 right-6 bg-white/95 p-4 rounded-xl shadow-lg border border-cco-neutral-200 w-80 z-50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-cco-neutral-900 flex items-center">
                    <CommandLineIcon className="w-4 h-4 mr-2" />
                    Keyboard Shortcuts
                  </h3>
                  <button 
                    onClick={() => setShowKeyboardTips(false)}
                    className="text-cco-neutral-500 hover:text-cco-neutral-700"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-cco-neutral-600">Exit Editor</span>
                    <kbd className="px-2 py-1 bg-cco-neutral-100 rounded text-xs">esc</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cco-neutral-600">Delete Selected</span>
                    <kbd className="px-2 py-1 bg-cco-neutral-100 rounded text-xs">delete</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cco-neutral-600">Multi-select</span>
                    <kbd className="px-2 py-1 bg-cco-neutral-100 rounded text-xs">shift + click</kbd>
                  </div>
                </div>
              </div>
            )}

            {/* Thinner Header with Less Language */}
            <motion.div 
              className="bg-white rounded-xl p-4 shadow"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-cco-neutral-900">
                    {!selectedTemplate ? "Connect Data Sources" : selectedTemplate.name}
                  </h1>
                </div>
                <div className="flex items-center space-x-3">
                  {selectedTemplate && (
                    <motion.button 
                      onClick={handleBackToList}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-cco-neutral-100 text-cco-neutral-700 rounded-md hover:bg-cco-neutral-200 transition-colors"
                    >
                      Back
                    </motion.button>
                  )}
                  <button
                    onClick={() => setShowKeyboardTips(prev => !prev)}
                    className="p-2 text-cco-neutral-600 hover:text-cco-neutral-900 hover:bg-cco-neutral-100 rounded-md transition-colors"
                    title="Show Keyboard Shortcuts"
                  >
                    <CommandLineIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Main Content Area */}
            <div className="bg-white rounded-xl p-4">
              {!selectedTemplate ? (
                <div>
                  {/* Thin bar with logos only for data providers */}
                  <motion.div 
                    className="flex items-center space-x-4 overflow-x-auto p-2"
                    layout
                  >
                    {/* Empty Template Card (Plus button) */}
                    <motion.div 
                      onClick={() => {
                        setSelectedTemplate(EMPTY_TEMPLATE);
                        setMode('edit');
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-cco-neutral-100 hover:bg-cco-primary-100 transition-colors cursor-pointer"
                      title="Connect a custom data provider"
                    >
                      <PlusIcon className="w-6 h-6 text-cco-neutral-600 hover:text-cco-primary-600" />
                    </motion.div>

                    {/* Template Cards as Logos Only */}
                    <AnimatePresence>
                      {INTEGRATION_TEMPLATES.map((template) => (
                        <DraggableTemplateCard
                          key={template.id}
                          template={template}
                          onSelect={() => {
                            setSelectedTemplate(template);
                            setMode('edit');
                          }}
                        />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                  
                  {/* Instructions below the logos */}
                  <div className="mt-4 p-4 bg-cco-neutral-50 rounded-lg">
                    <p className="text-sm text-cco-neutral-700 text-center">
                      Select a data source to connect or drag it into your workspace
                    </p>
                  </div>
                </div>
              ) : (
                <motion.div 
                  className="h-full"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  {selectedTemplate.id === 'google-drive' || selectedTemplate.id === 'dropbox' ? (
                    <FileSyncView provider={selectedTemplate.id} />
                  ) : (
                    <ModernWorkspace
                      initialWorkflow={createWorkflowFromTemplate(selectedTemplate)}
                    />
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </DndProvider>
      </DashboardLayout>
    </>
  );
} 