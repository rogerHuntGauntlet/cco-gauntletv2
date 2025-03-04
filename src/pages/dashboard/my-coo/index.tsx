import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  Connection,
  NodeChange,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Panel,
  ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import BrainCardLogo from '../../../components/ui/BrainCardLogo';

// Custom node component
const CustomNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 min-w-[150px]">
      <div className="flex flex-col items-center">
        <BrainCardLogo size="md" className="mb-2" />
        <div className="text-center font-medium text-gray-800">{data.label}</div>
      </div>
    </div>
  );
};

// Initial nodes and edges
const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export default function MyCooPage() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [nodeName, setNodeName] = useState<string>('New Node');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  
  // Handle node changes
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  // Handle edge changes
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // Handle connections
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge({ ...connection, animated: true }, eds)),
    []
  );

  // Store the ReactFlow instance
  const onInit = useCallback((instance: ReactFlowInstance) => {
    setReactFlowInstance(instance);
  }, []);

  // Add a new node
  const addNode = () => {
    const newNode: Node = {
      id: `node-${nodes.length + 1}`,
      type: 'custom',
      position: {
        x: Math.random() * 300 + 100,
        y: Math.random() * 200 + 100,
      },
      data: {
        label: nodeName,
      },
    };
    
    setNodes((nds) => [...nds, newNode]);
    setNodeName('New Node');
    setIsEditing(false);
  };

  // Delete a node
  const deleteNode = (nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    // Also remove any connected edges
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  };

  // Focus on a specific node
  const focusNode = (nodeId: string) => {
    // Find the node
    const node = nodes.find((n) => n.id === nodeId);
    if (node && reactFlowInstance) {
      // Use ReactFlow's viewport functions to center on the node
      const x = node.position.x;
      const y = node.position.y;
      const zoom = 1.5; // Zoom level when focusing on a node
      
      reactFlowInstance.setCenter(x, y, { zoom, duration: 800 });
    }
  };

  return (
    <div className="h-screen w-full flex">
      <div className="h-full flex-grow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={{ custom: CustomNode }}
          onInit={onInit}
          fitView
        >
          <Background color="#f0f0f0" gap={16} />
          <Controls />
          
          <Panel position="top-right">
            <div className="relative">
              {isEditing ? (
                <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                  <div className="mb-4">
                    <label htmlFor="nodeName" className="block text-sm font-medium text-gray-700 mb-1">
                      Node Name
                    </label>
                    <input
                      type="text"
                      id="nodeName"
                      value={nodeName}
                      onChange={(e) => setNodeName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addNode}
                      className="px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Add Node
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="bg-indigo-600 text-white p-2 rounded-full shadow-md hover:bg-indigo-700 transition-colors"
                  onClick={() => setIsEditing(true)}
                  aria-label="Add node"
                >
                  <PlusIcon className="w-6 h-6" />
                </button>
              )}
            </div>
          </Panel>
        </ReactFlow>
      </div>
      
      {/* Right side panel with node list */}
      <div className="w-64 bg-white border-l border-gray-200 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Nodes</h2>
          
          {nodes.length === 0 ? (
            <div className="text-gray-500 text-sm">
              No nodes added yet. Click the + button to add a node.
            </div>
          ) : (
            <ul className="space-y-2">
              {nodes.map((node) => (
                <li 
                  key={node.id} 
                  className="p-3 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BrainCardLogo size="sm" className="mr-2" />
                      <span className="text-sm font-medium text-gray-700">{node.data.label}</span>
                    </div>
                    <div className="flex space-x-1">
                      <button 
                        onClick={() => focusNode(node.id)}
                        className="text-gray-500 hover:text-indigo-600 p-1"
                        title="Focus on node"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteNode(node.id)}
                        className="text-gray-500 hover:text-red-600 p-1"
                        title="Delete node"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
