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
  showOnlyLogos?: boolean;
}

// Node type style mapping
const nodeStyles: Record<NodeType, { 
  background: string; 
  borderColor: string;
  textColor: string;
  iconColor: string;
}> = {
  cco: { 
    background: 'transparent', 
    borderColor: 'rgba(255, 255, 255, 0.2)',
    textColor: '#ffffff',
    iconColor: '#ffffff'
  },
  data: { 
    background: 'rgba(255, 255, 255, 0.9)', 
    borderColor: '#60a5fa',
    textColor: '#1a1a1a',
    iconColor: '#1a1a1a'
  },
  analytics: { 
    background: 'rgba(255, 255, 255, 0.9)', 
    borderColor: '#34d399',
    textColor: '#1a1a1a',
    iconColor: '#1a1a1a'
  },
  ai: { 
    background: 'rgba(255, 255, 255, 0.9)', 
    borderColor: '#a78bfa',
    textColor: '#1a1a1a',
    iconColor: '#1a1a1a'
  },
  integration: { 
    background: 'rgba(255, 255, 255, 0.9)', 
    borderColor: '#f472b6',
    textColor: '#1a1a1a',
    iconColor: '#1a1a1a'
  }
};

// Let's define a more specific NodeProps type that matches React Flow's expectations
type CCONodeProps = Omit<NodeProps, 'data'> & {
  data: CCONodeData;
};

// The component receives NodeProps where the data property contains our custom CCONodeData
const CCONode = ({ data, selected }: CCONodeProps) => {
  const { type, label, icon, subtitle, showOnlyLogos } = data;
  const styles = nodeStyles[type];
  
  // Determine node appearance based on type
  const isCCO = type === 'cco';
  const nodeSize = isCCO ? 'w-40 h-40' : 'w-28 h-28';
  
  return (
    <div
      className={`${nodeSize} rounded-full flex flex-col items-center justify-center transition-all duration-300 ${
        selected ? 'ring-4 ring-white ring-opacity-60' : ''
      }`}
      style={{ 
        background: styles.background,
        border: isCCO ? 'none' : `2px solid ${styles.borderColor}`,
        filter: isCCO ? 'none' : 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))'
      }}
    >
      {/* Handles */}
      {isCCO ? (
        <>
          <Handle 
            type="target" 
            position={Position.Top} 
            className="!bg-white !w-3 !h-3 !border-2 !opacity-70" 
          />
          <Handle 
            type="target" 
            position={Position.Right} 
            className="!bg-white !w-3 !h-3 !border-2 !opacity-70" 
          />
          <Handle 
            type="target" 
            position={Position.Bottom} 
            className="!bg-white !w-3 !h-3 !border-2 !opacity-70" 
          />
          <Handle 
            type="target" 
            position={Position.Left} 
            className="!bg-white !w-3 !h-3 !border-2 !opacity-70" 
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
        className={`${isCCO ? 'w-24 h-24' : 'w-16 h-16'} flex items-center justify-center ${!showOnlyLogos ? 'mb-2' : ''}`}
      >
        {React.isValidElement(icon) ? 
          React.cloneElement(icon as React.ReactElement, { 
            className: `${(icon as React.ReactElement).props.className || ''}`,
            size: isCCO ? 'lg' : 'md'
          }) : 
          <CogIcon className="w-8 h-8" />
        }
      </div>
      
      {/* Label - only show if showOnlyLogos is false */}
      {!showOnlyLogos && (
        <div className="flex flex-col items-center text-center px-2 mt-2">
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
      )}
    </div>
  );
};

export default CCONode; 