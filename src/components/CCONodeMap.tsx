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

import { CogIcon, ServerIcon, SparklesIcon, CloudIcon } from '@heroicons/react/24/outline';
import CCONode, { CCONodeData, NodeType } from './CCONode';
import AnimatedEdge, { AnimatedEdgeData } from './AnimatedEdge';
import { GoogleDriveIcon, DropboxIcon, NotionIcon, SalesforceIcon, OneDriveIcon } from './ServiceIcons';

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
      return '#1a1a1a';
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

// Service icon mapping
const serviceIcons: Record<string, React.ReactNode> = {
  'google-drive': <GoogleDriveIcon />,
  'dropbox': <DropboxIcon />,
  'templates': <ServerIcon className="w-6 h-6" />,
  'notion': <NotionIcon />,
  'salesforce': <SalesforceIcon />,
  'onedrive': <OneDriveIcon />,
};

// Main component
const CCONodeMap: React.FC<{
  onServiceClick?: (serviceId: string) => void;
  connectedServices: Array<{id: string; name: string}>;
}> = ({ onServiceClick, connectedServices = [] }) => {
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
        icon: <CogIcon />,
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
          icon: serviceIcons[service.id] || <CloudIcon />,
        },
      };
    });
    
    setNodes([ccoNode, ...serviceNodes]);
    
    // Create edges from each service to CCO
    const serviceEdges: Edge[] = serviceNodes.map((node) => ({
      id: `${node.id}-to-cco`,
      source: node.id,
      target: 'cco',
      type: 'animated',
      animated: true,
      data: {
        type: 'document',
      } as AnimatedEdgeData,
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
  }, [connectedServices, fitView, setEdges, setNodes]);

  // Handle node connecting
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => 
        addEdge({
          ...connection,
          type: 'animated',
          animated: true,
          data: { type: 'document' } as AnimatedEdgeData,
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
    <div className="w-full h-full bg-white">
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
        className="bg-slate-50"
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1} 
          color="#e2e8f0" 
        />
        <Controls 
          position="bottom-right" 
          showInteractive={false}
          className="m-4"
        />
        <MiniMap 
          nodeColor={getNodeColor}
          maskColor="rgba(226, 232, 240, 0.3)"
          className="shadow-lg rounded-lg overflow-hidden"
          position="top-right"
          pannable
          zoomable
        />
        <Panel position="top-right" className="p-2 bg-white shadow-md rounded-lg mr-14 mt-2">
          <div className="flex items-center text-xs text-gray-500">
            <SparklesIcon className="w-4 h-4 mr-1 text-indigo-500" />
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
}> = (props) => {
  return (
    <ReactFlowProvider>
      <CCONodeMap {...props} />
    </ReactFlowProvider>
  );
};

export default CCONodeMapWithProvider; 