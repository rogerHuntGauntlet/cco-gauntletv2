import React, { useState } from 'react';
import BrainManager from './BrainManager';
import BrainVisualizer from './BrainVisualizer';
import { Brain } from '../../types/brain';

const BrainDashboard: React.FC = () => {
  const [selectedBrain, setSelectedBrain] = useState<Brain | null>(null);

  return (
    <div className="flex h-full">
      {/* Left panel - Brain Visualizer */}
      <div className="flex-grow h-full p-4">
        <BrainVisualizer brain={selectedBrain} />
      </div>
      
      {/* Right panel - Brain Manager */}
      <div className="w-80 h-full border-l border-gray-200 p-4 overflow-y-auto">
        <BrainManager onSelectBrain={setSelectedBrain} selectedBrainId={selectedBrain?.id} />
      </div>
    </div>
  );
};

export default BrainDashboard; 