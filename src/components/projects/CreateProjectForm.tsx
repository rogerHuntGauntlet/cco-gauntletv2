import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { 
  XMarkIcon,
  TagIcon,
  CalendarIcon,
  PlusIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

// Define the priority and status options
const priorities = [
  { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800' },
  { value: 'medium', label: 'Medium', color: 'bg-blue-100 text-blue-800' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
  { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' }
];

const statuses = [
  { value: 'planning', label: 'Planning', color: 'bg-purple-100 text-purple-800' },
  { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800' },
  { value: 'on-hold', label: 'On Hold', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'completed', label: 'Completed', color: 'bg-blue-100 text-blue-800' }
];

// Define the interface for form props
interface CreateProjectFormProps {
  onSubmit: (projectData: ProjectFormData) => void;
  onCancel: () => void;
}

// Define the project form data structure
export interface ProjectFormData {
  name: string;
  description: string;
  status: string;
  startDate: string;
  dueDate: string;
  priority: string;
  clientName: string;
  tags: string[];
}

export const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ onSubmit, onCancel }) => {
  // Initialize form state
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    status: 'planning',
    startDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    priority: 'medium',
    clientName: '',
    tags: []
  });
  
  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    dueDate?: string;
    startDate?: string;
  }>({});

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error if exists
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Add a new tag
  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  // Remove a tag
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Handle tag input keydown
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  // Validate form before submission
  const validateForm = (): boolean => {
    const newErrors: {
      name?: string;
      description?: string;
      dueDate?: string;
      startDate?: string;
    } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (formData.dueDate && new Date(formData.dueDate) <= new Date(formData.startDate)) {
      newErrors.dueDate = 'Due date must be after start date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-cco-neutral-900">Create New Project</h2>
        <Button 
          variant="ghost"
          onClick={onCancel}
        >
          <XMarkIcon className="w-5 h-5" />
        </Button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-cco-neutral-700 mb-1">
            Project Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-cco-neutral-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-cco-primary-500`}
            placeholder="Enter project name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-cco-neutral-700 mb-1">
            Description*
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className={`w-full px-3 py-2 border ${errors.description ? 'border-red-300' : 'border-cco-neutral-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-cco-primary-500`}
            placeholder="Describe the project..."
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-cco-neutral-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-cco-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cco-primary-500"
            >
              {statuses.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-cco-neutral-700 mb-1">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-cco-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cco-primary-500"
            >
              {priorities.map(priority => (
                <option key={priority.value} value={priority.value}>{priority.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-cco-neutral-700 mb-1">
              Start Date*
            </label>
            <div className="relative">
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.startDate ? 'border-red-300' : 'border-cco-neutral-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-cco-primary-500`}
              />
              <CalendarIcon className="w-5 h-5 text-cco-neutral-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
          </div>
          
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-cco-neutral-700 mb-1">
              Due Date (Optional)
            </label>
            <div className="relative">
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate || ''}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.dueDate ? 'border-red-300' : 'border-cco-neutral-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-cco-primary-500`}
              />
              <CalendarIcon className="w-5 h-5 text-cco-neutral-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.dueDate && <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>}
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="clientName" className="block text-sm font-medium text-cco-neutral-700 mb-1">
            Client Name (Optional)
          </label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            value={formData.clientName || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-cco-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cco-primary-500"
            placeholder="Enter client name"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-cco-neutral-700 mb-1">
            Tags
          </label>
          <div className="flex">
            <input
              id="newTag"
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleTagKeyDown}
              className="flex-1 px-3 py-2 border border-cco-neutral-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-cco-purple-200 focus:border-cco-purple-400"
              placeholder="Add tags"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-3 py-2 bg-cco-purple-500 text-white rounded-r-md hover:bg-cco-purple-600 focus:outline-none focus:ring-2 focus:ring-cco-purple-500 focus:ring-offset-2"
            >
              <PlusIcon className="w-5 h-5" />
            </button>
          </div>
          
          {formData.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <span 
                  key={tag} 
                  className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-cco-neutral-100 text-cco-neutral-800"
                >
                  {tag}
                  <button
                    type="button"
                    className="ml-1 focus:outline-none"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <XMarkIcon className="w-4 h-4 text-cco-neutral-600 hover:text-cco-neutral-900" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button 
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            variant="accent"
          >
            Create Project
          </Button>
        </div>
      </form>
    </Card>
  );
}; 