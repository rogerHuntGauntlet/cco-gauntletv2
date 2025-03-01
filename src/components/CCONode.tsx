import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { CogIcon } from '@heroicons/react/24/outline';

// Custom CCO node types
export type NodeType = 'cco' | 'data' | 'analytics' | 'ai' | 'integration';

// Node data interface - this is for the data property of the node
export interface CCONodeData {
  label: string;
  type: NodeType;
  icon: React.ReactNode;
  subtitle?: string;
}

// Node type style mapping
const nodeStyles: Record<NodeType, { 
  background: string; 
  borderColor: string;
  textColor: string;
  iconColor: string;
}> = {
  cco: { 
    background: 'linear-gradient(135deg, #1a1a1a, #333333)', 
    borderColor: '#4d4d4d',
    textColor: '#ffffff',
    iconColor: '#ffffff'
  },
  data: { 
    background: 'linear-gradient(135deg, #2563eb, #3b82f6)', 
    borderColor: '#60a5fa',
    textColor: '#ffffff',
    iconColor: '#ffffff'
  },
  analytics: { 
    background: 'linear-gradient(135deg, #059669, #10b981)', 
    borderColor: '#34d399',
    textColor: '#ffffff',
    iconColor: '#ffffff'
  },
  ai: { 
    background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)', 
    borderColor: '#a78bfa',
    textColor: '#ffffff',
    iconColor: '#ffffff'
  },
  integration: { 
    background: 'linear-gradient(135deg, #db2777, #ec4899)', 
    borderColor: '#f472b6',
    textColor: '#ffffff',
    iconColor: '#ffffff'
  }
};

// Let's define a more specific NodeProps type that matches React Flow's expectations
type CCONodeProps = Omit<NodeProps, 'data'> & {
  data: CCONodeData;
};

// The component receives NodeProps where the data property contains our custom CCONodeData
const CCONode = ({ data, selected }: CCONodeProps) => {
  const { type, label, icon, subtitle } = data;
  const styles = nodeStyles[type];
  
  // Determine node appearance based on type
  const isCCO = type === 'cco';
  const nodeSize = isCCO ? 'w-36 h-36' : 'w-28 h-28';
  
  return (
    <div
      className={`${nodeSize} rounded-full flex flex-col items-center justify-center shadow-lg transition-all duration-300 ${
        selected ? 'ring-4 ring-white ring-opacity-60' : ''
      }`}
      style={{ 
        background: styles.background,
        border: `2px solid ${styles.borderColor}`,
        filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))'
      }}
    >
      {/* Handles */}
      {isCCO ? (
        <>
          <Handle 
            type="target" 
            position={Position.Top} 
            className="!bg-white !w-3 !h-3 !border-2" 
          />
          <Handle 
            type="target" 
            position={Position.Right} 
            className="!bg-white !w-3 !h-3 !border-2" 
          />
          <Handle 
            type="target" 
            position={Position.Bottom} 
            className="!bg-white !w-3 !h-3 !border-2" 
          />
          <Handle 
            type="target" 
            position={Position.Left} 
            className="!bg-white !w-3 !h-3 !border-2" 
          />
        </>
      ) : (
        <Handle 
          type="source" 
          position={Position.Bottom} 
          className="!bg-white !w-3 !h-3 !border-2" 
        />
      )}
      
      {/* Icon */}
      <div 
        className={`${isCCO ? 'w-16 h-16' : 'w-12 h-12'} flex items-center justify-center mb-2`}
        style={{ color: styles.iconColor }}
      >
        {React.isValidElement(icon) ? 
          React.cloneElement(icon as React.ReactElement, { 
            className: `${isCCO ? 'w-12 h-12' : 'w-8 h-8'} ${(icon as React.ReactElement).props.className || ''}` 
          }) : 
          <CogIcon className="w-8 h-8" />
        }
      </div>
      
      {/* Label */}
      <div className="flex flex-col items-center text-center px-2">
        <span 
          className={`${isCCO ? 'text-lg font-bold' : 'text-sm font-medium'} leading-tight`}
          style={{ color: styles.textColor }}
        >
          {label}
        </span>
        {subtitle && (
          <span className="text-xs mt-1 opacity-80" style={{ color: styles.textColor }}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default CCONode; 