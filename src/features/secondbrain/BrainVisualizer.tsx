import React, { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  ReactFlowProvider,
  Node,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import BrainCardLogo from '../../components/ui/BrainCardLogo';
import CCONode from './CCONode';
import AnimatedEdge from './AnimatedEdge';
import { Brain } from '../../types/brain';

// Define node types for React Flow
const nodeTypes = {
  ccoNode: CCONode,
};

// Define edge types for React Flow
const edgeTypes = {
  animated: AnimatedEdge,
};

interface BrainVisualizerProps {
  brain: Brain | null;
}

const BrainVisualizer: React.FC<BrainVisualizerProps> = ({ brain }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Initialize nodes based on selected brain
  useEffect(() => {
    if (!brain) {
      setNodes([]);
      setEdges([]);
      return;
    }

    // Create main brain node at center
    const brainNode: Node = {
      id: brain.id,
      position: { x: 0, y: 0 },
      type: 'ccoNode',
      data: {
        type: 'cco',
        label: brain.name,
        icon: <BrainCardLogo size="lg" />,
        showOnlyLogos: false
      },
    };
    
    // Create placeholder nodes in a circle around the brain
    const placeholderNodes: Node[] = [];
    const placeholderCount = 5;
    
    for (let i = 0; i < placeholderCount; i++) {
      const angle = (i * (2 * Math.PI)) / placeholderCount;
      const radius = 200;
      
      placeholderNodes.push({
        id: `placeholder-${i}`,
        position: {
          x: radius * Math.cos(angle),
          y: radius * Math.sin(angle),
        },
        type: 'ccoNode',
        data: {
          type: 'data',
          label: `Add Content ${i + 1}`,
          icon: <BrainCardLogo size="md" />,
          showOnlyLogos: false
        },
      });
    }
    
    setNodes([brainNode, ...placeholderNodes]);
    
    // Create edges from each placeholder to brain
    const placeholderEdges: Edge[] = placeholderNodes.map((node) => ({
      id: `${node.id}-to-${brain.id}`,
      source: node.id,
      target: brain.id,
      type: 'animated',
      animated: true,
      data: {
        type: 'document',
      },
    }));
    
    setEdges(placeholderEdges);
  }, [brain, setEdges, setNodes]);

  if (!brain) {
    return (
      <div className="flex items-center justify-center h-full bg-slate-100 rounded-lg">
        <p className="text-slate-500">Select a brain to visualize</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        proOptions={{ hideAttribution: true }}
        attributionPosition="bottom-right"
        minZoom={0.5}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        fitView
        fitViewOptions={{ padding: 0.2 }}
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1} 
          color="rgba(0, 0, 0, 0.05)" 
        />
        <Controls 
          position="bottom-right" 
          showInteractive={false}
          className="m-4"
        />
        <MiniMap 
          nodeColor={(node) => {
            return node.id === brain.id ? '#1a1a1a' : '#3B82F6';
          }}
          maskColor="rgba(240, 240, 240, 0.7)"
          className="shadow-lg rounded-lg overflow-hidden"
          position="top-right"
        />
      </ReactFlow>
    </div>
  );
};

// Wrap with ReactFlowProvider to enable hooks outside of the component
const BrainVisualizerWithProvider: React.FC<BrainVisualizerProps> = (props) => {
  return (
    <ReactFlowProvider>
      <BrainVisualizer {...props} />
    </ReactFlowProvider>
  );
};

export default BrainVisualizerWithProvider; 