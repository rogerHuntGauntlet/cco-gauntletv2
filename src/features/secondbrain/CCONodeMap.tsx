import React, { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  MarkerType,
  ReactFlowProvider,
  Panel,
  useReactFlow,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { SparklesIcon } from '@heroicons/react/24/outline';
import CCONode, { CCONodeData, NodeType } from './CCONode';
import AnimatedEdge, { AnimatedEdgeData } from './AnimatedEdge';
import BrainCardLogo from '../../components/ui/BrainCardLogo';

// Define node types for React Flow
const nodeTypes = {
  ccoNode: CCONode,
};

// Define edge types for React Flow
const edgeTypes = {
  animated: AnimatedEdge,
};

// Node colors for minimap
const getNodeColor = (node: Node) => {
  const data = node.data as unknown as CCONodeData;
  switch (data.type) {
    case 'cco':
      return 'rgba(26, 26, 26, 0.7)';
    case 'data':
      return '#3B82F6';
    case 'analytics':
      return '#10B981';
    case 'ai':
      return '#8B5CF6';
    case 'integration':
      return '#EC4899';
    default:
      return '#64748b';
  }
};

// Service icon mapping with BrainCardLogo as fallback
const serviceIcons: Record<string, React.ReactNode> = {
  'google-drive': <div className="bg-blue-500 rounded-lg p-1 w-full h-full"><BrainCardLogo size="md" /></div>,
  'dropbox': <div className="bg-indigo-500 rounded-lg p-1 w-full h-full"><BrainCardLogo size="md" /></div>,
  'templates': <div className="bg-purple-500 rounded-lg p-1 w-full h-full"><BrainCardLogo size="md" /></div>,
  'notion': <div className="bg-gray-800 rounded-lg p-1 w-full h-full"><BrainCardLogo size="md" /></div>,
  'salesforce': <div className="bg-blue-600 rounded-lg p-1 w-full h-full"><BrainCardLogo size="md" /></div>,
  'onedrive': <div className="bg-blue-700 rounded-lg p-1 w-full h-full"><BrainCardLogo size="md" /></div>,
  // Fallback to BrainCardLogo if no specific icon is available
  'default': <div className="bg-gray-600 rounded-lg p-1 w-full h-full"><BrainCardLogo size="md" /></div>
};

// Main component
const CCONodeMap: React.FC<{
  onServiceClick?: (serviceId: string) => void;
  connectedServices: Array<{id: string; name: string}>;
  showOnlyLogos?: boolean;
}> = ({ onServiceClick, connectedServices = [], showOnlyLogos = false }) => {
  // Initialize flow with nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();

  // Initialize nodes based on connected services
  useEffect(() => {
    // Create CCO node at center
    const ccoNode: Node = {
      id: 'cco',
      position: { x: 0, y: 0 },
      type: 'ccoNode',
      data: {
        type: 'cco' as NodeType,
        label: 'Chief Cognitive Officer',
        icon: <BrainCardLogo size="lg" />,
        showOnlyLogos: showOnlyLogos
      },
    };
    
    // Create nodes for connected services in a circle around the CCO
    const serviceNodes: Node[] = connectedServices.map((service, index) => {
      const angle = (index * (2 * Math.PI)) / connectedServices.length;
      const radius = 300;
      return {
        id: service.id,
        position: {
          x: radius * Math.cos(angle),
          y: radius * Math.sin(angle),
        },
        type: 'ccoNode',
        data: {
          type: 'data' as NodeType,
          label: service.name,
          icon: serviceIcons[service.id] || serviceIcons['default'],
          showOnlyLogos: showOnlyLogos
        },
      };
    });
    
    setNodes([ccoNode, ...serviceNodes]);
    
    // Create edges from each service to CCO
    const serviceEdges = serviceNodes.map((node) => ({
      id: `${node.id}-to-cco`,
      source: node.id,
      target: 'cco',
      type: 'animated',
      animated: true,
      data: {
        type: 'document',
      } as Record<string, unknown>,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: '#64748b',
      },
    }));
    
    setEdges(serviceEdges);
    
    // Fit the view to show all nodes
    setTimeout(() => {
      fitView({ padding: 0.2 });
    }, 100);
  }, [connectedServices, fitView, setEdges, setNodes, showOnlyLogos]);

  // Handle node connecting
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => 
        addEdge({
          ...connection,
          type: 'animated',
          animated: true,
          data: { type: 'document' } as Record<string, unknown>,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: '#64748b',
          },
        }, eds)
      );
    },
    [setEdges]
  );
  
  // Handle node clicks for service nodes
  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      if (node.id !== 'cco' && onServiceClick) {
        onServiceClick(node.id);
      }
    },
    [onServiceClick]
  );

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        proOptions={{ hideAttribution: true }}
        attributionPosition="bottom-right"
        minZoom={0.2}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        defaultEdgeOptions={{ type: 'animated' }}
        className="bg-slate-900"
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1} 
          color="rgba(255, 255, 255, 0.05)" 
        />
        <Controls 
          position="bottom-right" 
          showInteractive={false}
          className="m-4"
        />
        <MiniMap 
          nodeColor={getNodeColor}
          maskColor="rgba(15, 23, 42, 0.7)"
          className="shadow-lg rounded-lg overflow-hidden"
          position="top-right"
          pannable
          zoomable
        />
        <Panel position="top-right" className="p-2 bg-white/10 backdrop-blur-sm shadow-md rounded-lg mr-14 mt-2">
          <div className="flex items-center text-xs text-white/70">
            <SparklesIcon className="w-4 h-4 mr-1 text-cyan-400" />
            <span>Drag nodes to reposition connections</span>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

// Wrap with ReactFlowProvider to enable hooks outside of the component
const CCONodeMapWithProvider: React.FC<{
  onServiceClick?: (serviceId: string) => void;
  connectedServices: Array<{id: string; name: string}>;
  showOnlyLogos?: boolean;
}> = (props) => {
  return (
    <ReactFlowProvider>
      <CCONodeMap {...props} />
    </ReactFlowProvider>
  );
};

export default CCONodeMapWithProvider; 