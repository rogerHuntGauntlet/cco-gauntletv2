import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../lib/firebase';
import { collection, addDoc, query, where, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/Button';
import BrainCardLogo from '../../components/ui/BrainCardLogo';
import { Brain } from '../../types/brain';

interface BrainManagerProps {
  onSelectBrain: (brain: Brain | null) => void;
  selectedBrainId: string | undefined;
}

const BrainManager: React.FC<BrainManagerProps> = ({ onSelectBrain, selectedBrainId }) => {
  const { user } = useAuth();
  const [brains, setBrains] = useState<Brain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newBrainName, setNewBrainName] = useState('');
  const [isAddingBrain, setIsAddingBrain] = useState(false);
  const [editingBrainId, setEditingBrainId] = useState<string | null>(null);
  const [editingBrainName, setEditingBrainName] = useState('');

  // Fetch user's brains from Firestore
  useEffect(() => {
    const fetchBrains = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const brainsQuery = query(
          collection(db, 'brains'),
          where('userId', '==', user.uid)
        );
        
        const querySnapshot = await getDocs(brainsQuery);
        const fetchedBrains: Brain[] = [];
        
        querySnapshot.forEach((doc) => {
          fetchedBrains.push({
            id: doc.id,
            ...doc.data()
          } as Brain);
        });
        
        // Sort brains by creation date (newest first)
        fetchedBrains.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
        setBrains(fetchedBrains);
        
        // If there's a selected brain ID, find and select that brain
        if (selectedBrainId) {
          const selectedBrain = fetchedBrains.find(brain => brain.id === selectedBrainId);
          if (selectedBrain) {
            onSelectBrain(selectedBrain);
          }
        }
      } catch (error) {
        console.error('Error fetching brains:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBrains();
  }, [user, selectedBrainId, onSelectBrain]);

  // Add a new brain
  const handleAddBrain = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !newBrainName.trim()) return;
    
    try {
      const now = new Date().toISOString();
      const newBrain = {
        name: newBrainName.trim(),
        userId: user.uid,
        createdAt: now,
        updatedAt: now
      };
      
      const docRef = await addDoc(collection(db, 'brains'), newBrain);
      
      const brainWithId = {
        id: docRef.id,
        ...newBrain
      };
      
      setBrains([
        brainWithId,
        ...brains
      ]);
      
      // Select the newly created brain
      onSelectBrain(brainWithId);
      
      setNewBrainName('');
      setIsAddingBrain(false);
    } catch (error) {
      console.error('Error adding brain:', error);
    }
  };

  // Delete a brain
  const handleDeleteBrain = async (brainId: string) => {
    if (!user) return;
    
    try {
      await deleteDoc(doc(db, 'brains', brainId));
      setBrains(brains.filter(brain => brain.id !== brainId));
      
      // If the deleted brain was selected, deselect it
      if (selectedBrainId === brainId) {
        onSelectBrain(null);
      }
    } catch (error) {
      console.error('Error deleting brain:', error);
    }
  };

  // Start editing a brain
  const handleStartEdit = (brain: Brain) => {
    setEditingBrainId(brain.id);
    setEditingBrainName(brain.name);
  };

  // Save brain edit
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !editingBrainId || !editingBrainName.trim()) return;
    
    try {
      const brainRef = doc(db, 'brains', editingBrainId);
      await updateDoc(brainRef, {
        name: editingBrainName.trim(),
        updatedAt: new Date().toISOString()
      });
      
      const updatedBrains = brains.map(brain => 
        brain.id === editingBrainId 
          ? { ...brain, name: editingBrainName.trim(), updatedAt: new Date().toISOString() } 
          : brain
      );
      
      setBrains(updatedBrains);
      
      // If the edited brain was selected, update the selection
      if (selectedBrainId === editingBrainId) {
        const updatedBrain = updatedBrains.find(brain => brain.id === editingBrainId);
        if (updatedBrain) {
          onSelectBrain(updatedBrain);
        }
      }
      
      setEditingBrainId(null);
      setEditingBrainName('');
    } catch (error) {
      console.error('Error updating brain:', error);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingBrainId(null);
    setEditingBrainName('');
  };

  // Handle brain selection
  const handleSelectBrain = (brain: Brain) => {
    onSelectBrain(brain);
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm p-8">
        <p className="text-gray-600">Please sign in to manage your brains.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">My Brains</h2>
        <Button 
          onClick={() => setIsAddingBrain(true)}
          disabled={isAddingBrain}
          className="flex items-center"
        >
          <PlusIcon className="w-5 h-5 mr-1.5" />
          Add Brain
        </Button>
      </div>
      
      {/* Add Brain Form */}
      {isAddingBrain && (
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <form onSubmit={handleAddBrain} className="flex flex-col">
            <h3 className="text-lg font-medium mb-3">Add New Brain</h3>
            <div className="mb-4">
              <label htmlFor="brainName" className="block text-sm font-medium text-gray-700 mb-1">
                Brain Name
              </label>
              <input
                id="brainName"
                type="text"
                value={newBrainName}
                onChange={(e) => setNewBrainName(e.target.value)}
                placeholder="Enter brain name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <Button 
                type="button" 
                variant="secondary"
                onClick={() => {
                  setIsAddingBrain(false);
                  setNewBrainName('');
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={!newBrainName.trim()}>
                Add Brain
              </Button>
            </div>
          </form>
        </div>
      )}
      
      {/* Brains List */}
      <div className="flex-grow overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : brains.length > 0 ? (
          <div className="space-y-3">
            {brains.map((brain) => (
              <div 
                key={brain.id}
                className={`p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer ${
                  selectedBrainId === brain.id ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200'
                }`}
                onClick={() => handleSelectBrain(brain)}
              >
                {editingBrainId === brain.id ? (
                  <form 
                    onSubmit={handleSaveEdit} 
                    className="flex items-center justify-between"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="text"
                      value={editingBrainName}
                      onChange={(e) => setEditingBrainName(e.target.value)}
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      autoFocus
                      required
                    />
                    <div className="flex ml-3 space-x-2">
                      <Button type="submit" size="sm" disabled={!editingBrainName.trim()}>
                        Save
                      </Button>
                      <Button type="button" variant="secondary" size="sm" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <BrainCardLogo size="sm" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{brain.name}</h3>
                        <p className="text-xs text-gray-500">
                          Created {new Date(brain.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleStartEdit(brain)}
                        className="p-1.5 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBrain(brain.id)}
                        className="p-1.5 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm p-8">
            <BrainCardLogo size="lg" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No brains yet</h3>
            <p className="mt-2 text-gray-600 text-center">
              Create your first brain to get started.
            </p>
            {!isAddingBrain && (
              <Button 
                onClick={() => setIsAddingBrain(true)} 
                className="mt-4"
              >
                <PlusIcon className="w-5 h-5 mr-1.5" />
                Add Brain
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrainManager; 