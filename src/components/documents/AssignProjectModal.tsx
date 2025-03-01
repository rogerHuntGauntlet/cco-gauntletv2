import React, { useState, useEffect } from 'react';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { getProjectsByUserId } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';

// Define the project type
interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold' | 'planning' | 'new' | 'paused';
}

// Define the props for the modal
interface AssignProjectModalProps {
  documentId: string;
  documentTitle: string;
  onAssign: (projectId: string) => void;
  onCancel: () => void;
  currentProjectId?: string | null;
}

const AssignProjectModal: React.FC<AssignProjectModalProps> = ({
  documentId,
  documentTitle,
  onAssign,
  onCancel,
  currentProjectId
}) => {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(currentProjectId || null);

  // Fetch projects when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getProjectsByUserId(currentUser.uid);
        if (response.error) {
          throw new Error(response.error);
        }
        // Filter out completed projects
        const activeProjects = response.data.filter(
          (project: Project) => project.status !== 'completed'
        );
        setProjects(activeProjects || []);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [currentUser]);

  // Handle the submit action
  const handleSubmit = () => {
    if (selectedProjectId) {
      onAssign(selectedProjectId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-cco-neutral-900">Assign to Project</h2>
          <button 
            onClick={onCancel}
            className="text-cco-neutral-500 hover:text-cco-neutral-700"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <p className="text-cco-neutral-700 mb-4">
          Select a project to assign "<span className="font-medium">{documentTitle}</span>" to:
        </p>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cco-primary-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 my-4">
            <p className="text-red-700">{error}</p>
            <Button 
              variant="outline" 
              className="mt-2"
              onClick={() => {
                setLoading(true);
                setError(null);
                getProjectsByUserId(currentUser?.uid || '')
                  .then(response => {
                    if (response.error) {
                      throw new Error(response.error);
                    }
                    setProjects(response.data || []);
                    setLoading(false);
                  })
                  .catch(err => {
                    console.error("Error retrying fetch:", err);
                    setError("Failed to load projects. Please try again.");
                    setLoading(false);
                  });
              }}
            >
              Try Again
            </Button>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-cco-neutral-700 mb-3">No active projects found.</p>
            <Button 
              variant="outline"
              onClick={onCancel}
            >
              Close
            </Button>
          </div>
        ) : (
          <div className="max-h-60 overflow-y-auto mb-4">
            {projects.map(project => (
              <Card 
                key={project.id}
                hover
                className={`mb-2 p-3 cursor-pointer ${
                  selectedProjectId === project.id 
                    ? 'border-cco-primary-500 bg-cco-primary-50' 
                    : ''
                }`}
                onClick={() => setSelectedProjectId(project.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-cco-neutral-900">{project.name}</h3>
                    <p className="text-sm text-cco-neutral-600 truncate">{project.description}</p>
                  </div>
                  {selectedProjectId === project.id && (
                    <CheckCircleIcon className="w-5 h-5 text-cco-primary-500" />
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
        
        <div className="flex justify-end space-x-2 mt-4">
          <Button 
            variant="ghost" 
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            variant="default"
            onClick={handleSubmit}
            disabled={!selectedProjectId || loading}
          >
            Assign
          </Button>
        </div>
      </div>
    </div>
  );
};

export { AssignProjectModal }; 