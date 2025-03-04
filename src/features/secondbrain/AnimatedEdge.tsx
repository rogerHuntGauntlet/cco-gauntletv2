import React from 'react';
import { BaseEdge, EdgeProps, getBezierPath, EdgeLabelRenderer } from '@xyflow/react';
import { DocumentIcon } from '@heroicons/react/24/outline';

// Edge data interface
export interface AnimatedEdgeData {
  type?: 'default' | 'document';
  color?: string;
  label?: string;
}

// Define a type that correctly specifies the data property
type AnimatedEdgeProps = Omit<EdgeProps, 'data'> & {
  data?: AnimatedEdgeData;
};

// The AnimatedEdge component renders a custom edge with animated elements
const AnimatedEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data = {} as AnimatedEdgeData,
  markerEnd,
}: AnimatedEdgeProps) => {
  // Default color if not provided
  const color = data?.color || '#64748b';
  
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      {/* Base edge */}
      <BaseEdge 
        id={id} 
        path={edgePath} 
        style={{
          stroke: color,
          strokeWidth: 2,
          opacity: 0.8,
          ...(style as React.CSSProperties),
        }}
        markerEnd={markerEnd}
      />
      
      {/* Animated document icons */}
      {[...Array(3)].map((_, i) => (
        <circle 
          key={`${id}-pulse-${i}`}
          r={4}
          fill={color}
          style={{
            opacity: 0.6,
            animation: `flow-pulse 1.5s infinite ${i * 0.5}s`,
          }}
        >
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            begin={`${i * 1}s`}
            path={edgePath}
          />
        </circle>
      ))}
      
      {/* Optional document icons for document-type edges */}
      {data?.type === 'document' && (
        [...Array(2)].map((_, i) => (
          <foreignObject
            key={`${id}-doc-${i}`}
            width={20}
            height={20}
            style={{ overflow: 'visible' }}
          >
            <div 
              className="flex items-center justify-center p-1 bg-white rounded-full shadow-sm"
              style={{
                animation: `flow-pulse 2s infinite ${i * 1}s`,
              }}
            >
              <DocumentIcon className="w-3.5 h-3.5" style={{ color }} />
            </div>
            <animateMotion
              dur="5s"
              repeatCount="indefinite"
              begin={`${i * 2.5}s`}
              path={edgePath}
            />
          </foreignObject>
        ))
      )}
      
      {/* Edge label */}
      {data?.label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              background: 'white',
              padding: '4px 8px',
              borderRadius: 4,
              fontSize: 12,
              fontWeight: 500,
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
              pointerEvents: 'all',
            }}
            className="nodrag nopan"
          >
            {data.label}
          </div>
        </EdgeLabelRenderer>
      )}
      
      {/* Adding the keyframes with regular style tag since 'style jsx' might not be available */}
      <style>
        {`
          @keyframes flow-pulse {
            0% {
              opacity: 0.2;
              transform: scale(0.8);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.2);
            }
            100% {
              opacity: 0.2;
              transform: scale(0.8);
            }
          }
        `}
      </style>
    </>
  );
};

export default AnimatedEdge; 