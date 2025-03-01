import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { 
  RectangleStackIcon, 
  ClockIcon,
  UsersIcon,
  TagIcon,
  DocumentTextIcon,
  ArrowTopRightOnSquareIcon,
  SparklesIcon,
  ChatBubbleLeftEllipsisIcon,
  BoltIcon,
  SunIcon,
  MoonIcon,
  PencilIcon,
  TrashIcon,
  ShareIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { getAvatarUrl } from '../../../utils/avatarUtils';
import { getProjectById, updateProject, deleteProject } from '../../../lib/firebase';

// Define project types (same as in the dashboard)
interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold' | 'planning';
  startDate: string;
  dueDate?: string;
  completedDate?: string;
  progress: number;
  teamMembers: TeamMember[];
  tags: string[];
  clientName?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  userId: string;
}

// Define the status options (matching the ones in CreateProjectForm)
const statusOptions = [
  { value: 'planning', label: 'Planning', color: 'bg-purple-100 text-purple-800' },
  { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800' },
  { value: 'on-hold', label: 'On Hold', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'completed', label: 'Completed', color: 'bg-blue-100 text-blue-800' }
];

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

// Project document interface
interface ProjectDocument {
  id: string;
  name: string;
  type: string;
  lastUpdated: string;
  url: string;
}

// Sample documents (would be replaced with real data in production)
const sampleDocuments: ProjectDocument[] = [
  { id: 'd1', name: 'Project Brief', type: 'PDF', lastUpdated: new Date().toISOString().split('T')[0], url: '#' },
  { id: 'd2', name: 'Design Mockups', type: 'Figma', lastUpdated: new Date().toISOString().split('T')[0], url: '#' },
  { id: 'd3', name: 'Technical Specifications', type: 'PDF', lastUpdated: new Date().toISOString().split('T')[0], url: '#' }
];

const ProjectDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  
  // Add debugging log
  console.log("ProjectDetailsPage rendering with query ID:", id);
  
  const [project, setProject] = useState<Project | null>(null);
  const [documents, setDocuments] = useState<ProjectDocument[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'team' | 'documents'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Add mounted ref to prevent setState after unmount
  const mounted = useRef(true);
  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);
  
  // Fetch project data from Firebase
  useEffect(() => {
    const fetchProjectData = async () => {
      // Don't fetch until router is ready and id is available
      if (!router.isReady) return;
      
      if (!id || typeof id !== 'string') {
        console.error("Invalid project ID:", id);
        setError("Invalid project ID");
        setLoading(false);
        return;
      }
      
      if (mounted.current) {
        setLoading(true);
        setError(null);
      }
      
      try {
        // Fetch project details from Firebase - this doesn't require auth
        const { data, error } = await getProjectById(id);
        
        if (error) {
          console.error("Firebase error:", error);
          setError("Project not found. Error: " + error);
          setLoading(false);
          return;
        }
        
        if (!data) {
          console.warn("No project data returned from Firebase");
          setError("Project not found");
          setLoading(false);
          return;
        }
        
        // Set the project data
        console.log("Firebase project data:", data);
        if (mounted.current) {
          setProject(data as Project);
        }
        
        // In a production app, you would fetch real documents related to this project
        // For now, we'll use sample document data
        setDocuments(sampleDocuments);
      } catch (err: any) {
        console.error("Error fetching project:", err);
        setError("Failed to load project. Please try again.");
      } finally {
        if (mounted.current) {
          setLoading(false);
        }
      }
    };
    
    fetchProjectData();
  }, [id, router.isReady]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
        setShowStatusDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  if (loading) {
    return (
      <DashboardLayout>
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-purple-100 flex items-center justify-center">
              <svg className="animate-spin h-8 w-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-gray-800">Loading project...</h1>
            <p className="text-gray-600 mt-2">Please wait while we retrieve the project details.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  if (error || !project) {
    return (
      <DashboardLayout>
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
              <ExclamationCircleIcon className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800">Error Loading Project</h1>
            <p className="text-gray-600 mt-2">{error || "Project not found"}</p>
            <Button
              variant="default"
              size="md"
              className="mt-6"
              onClick={() => router.push('/dashboard/projects')}
            >
              Back to Projects
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  const statusColors = {
    'active': 'bg-green-100 text-green-800',
    'planning': 'bg-blue-100 text-blue-800',
    'on-hold': 'bg-yellow-100 text-yellow-800',
    'completed': 'bg-gray-100 text-gray-800'
  };
  
  const priorityColors = {
    'low': 'bg-blue-100 text-blue-800',
    'medium': 'bg-yellow-100 text-yellow-800',
    'high': 'bg-orange-100 text-orange-800',
    'urgent': 'bg-red-100 text-red-800'
  };
  
  const statusDisplay = project.status.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const daysUntilDue = project.dueDate 
    ? Math.round((new Date(project.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;
  
  const handleChangeStatus = (newStatus: 'active' | 'completed' | 'on-hold' | 'planning') => {
    if (project && mounted.current) {
      // Update loading state
      setLoading(true);
      
      // Optimistically update the UI
      setProject({
        ...project,
        status: newStatus
      });
      
      // Close the dropdown
      setShowStatusDropdown(false);
      
      // Update the project in Firebase
      updateProject(project.id, { status: newStatus })
        .then(({ error }) => {
          if (error) {
            // Show error notification
            setNotification({
              message: `Error updating status: ${error}`,
              type: 'error'
            });
            
            // Revert the optimistic update
            setProject(prev => prev ? { ...prev, status: prev.status } : null);
          } else {
            // Show success notification
            const statusDisplayName = statusOptions.find(s => s.value === newStatus)?.label || newStatus;
            setNotification({
              message: `Project status updated to ${statusDisplayName}`,
              type: 'success'
            });
          }
        })
        .catch(err => {
          console.error("Error updating project status:", err);
          setNotification({
            message: "Failed to update status. Please try again.",
            type: 'error'
          });
          
          // Revert the optimistic update
          setProject(prev => prev ? { ...prev, status: prev.status } : null);
        })
        .finally(() => {
          if (mounted.current) {
            setLoading(false);
          }
          
          // Auto-hide notification after 3 seconds
          setTimeout(() => {
            setNotification(null);
          }, 3000);
        });
    }
  };
  
  const handleShareProject = () => {
    // Create the shareable link using window.location.origin - no auth needed here
    const origin = window.location.origin;
    const shareableLink = `${origin}/project/${project.id}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareableLink)
      .then(() => {
        setNotification({
          message: 'Shareable link copied to clipboard!',
          type: 'success'
        });
        
        // Auto-hide notification after 3 seconds
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
        setNotification({
          message: 'Failed to copy link to clipboard',
          type: 'error'
        });
        
        // Auto-hide notification after 3 seconds
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      });
  };
  
  const handleEditProject = () => {
    setIsEditing(true);
  };
  
  const handleDeleteProject = () => {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      if (!project) return;
      
      setLoading(true);
      
      // Delete the project in Firebase
      deleteProject(project.id)
        .then(({ error }) => {
          if (error) {
            setNotification({
              message: `Error deleting project: ${error}`,
              type: 'error'
            });
          } else {
            setNotification({
              message: 'Project deleted successfully!',
              type: 'success'
            });
            
            // Navigate back to projects list
            router.push('/dashboard/projects');
          }
        })
        .catch(err => {
          console.error("Error deleting project:", err);
          setNotification({
            message: "Failed to delete project. Please try again.",
            type: 'error'
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  
  return (
    <DashboardLayout>
      <Head>
        <title>{project.name} | Project Details | CCO VibeCoder</title>
        <meta name="description" content={project.description} />
      </Head>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notification Toast */}
        {notification && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-md ${
            notification.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 
            'bg-red-50 text-red-800 border border-red-200'
          }`}>
            <div className="flex">
              {notification.type === 'success' ? (
                <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              <span>{notification.message}</span>
            </div>
          </div>
        )}
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
              <div className="relative" ref={statusDropdownRef}>
                <button
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className={`ml-4 px-3 py-1 text-sm font-medium rounded-full ${statusColors[project.status as keyof typeof statusColors]} hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 cursor-pointer`}
                >
                  {statusDisplay}
                </button>
                
                {showStatusDropdown && (
                  <div className="absolute z-10 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {statusOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleChangeStatus(option.value as 'active' | 'completed' | 'on-hold' | 'planning')}
                          className={`block w-full text-left px-4 py-2 text-sm ${project.status === option.value ? 'bg-gray-100' : ''} hover:bg-gray-100`}
                          role="menuitem"
                        >
                          <span className={`inline-block mr-2 px-2 py-0.5 rounded-full text-xs ${option.color}`}>
                            {option.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <span className={`ml-2 px-3 py-1 text-sm font-medium rounded-full ${priorityColors[project.priority]}`}>
                {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)} Priority
              </span>
            </div>
            <p className="mt-2 text-lg text-gray-600">{project.description}</p>
            {project.clientName && (
              <p className="mt-1 text-sm text-gray-500">Client: {project.clientName}</p>
            )}
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button 
              variant="outline"
              size="md"
              onClick={handleShareProject}
              className="flex items-center"
            >
              <ShareIcon className="h-5 w-5 mr-2" />
              Share
            </Button>
            <Button 
              variant="outline"
              size="md"
              onClick={handleEditProject}
              className="flex items-center"
            >
              <PencilIcon className="h-5 w-5 mr-2" />
              Edit
            </Button>
            <Button 
              variant="outline"
              size="md"
              onClick={handleDeleteProject}
              className="flex items-center text-red-600 hover:text-white hover:bg-red-600 border-red-200 hover:border-red-600"
            >
              <TrashIcon className="h-5 w-5 mr-2" />
              Delete
            </Button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress: {project.progress}%</span>
            {daysUntilDue !== null && (
              <span className={`text-sm font-medium ${daysUntilDue < 0 ? 'text-red-600' : daysUntilDue <= 7 ? 'text-yellow-600' : 'text-gray-600'}`}>
                {daysUntilDue < 0 
                  ? `Overdue by ${Math.abs(daysUntilDue)} days` 
                  : daysUntilDue === 0 
                    ? 'Due today'
                    : `${daysUntilDue} days left`}
              </span>
            )}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-purple-600 h-2.5 rounded-full"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${
                activeTab === 'overview'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`${
                activeTab === 'team'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Team
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`${
                activeTab === 'documents'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Documents
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Key Info */}
              <Card className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Project Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Start Date</h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(project.startDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Due Date</h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {project.dueDate 
                        ? new Date(project.dueDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : 'Not set'}
                    </p>
                  </div>
                  {project.completedDate && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Completed Date</h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(project.completedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Tags</h3>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Timeline/Milestones would go here in a real app */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
                  <Button variant="ghost" size="sm">View all</Button>
                </div>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <DocumentTextIcon className="h-5 w-5 text-purple-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Design mockup uploaded</p>
                      <p className="text-sm text-gray-500">2 days ago by Sarah Williams</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Client feedback received</p>
                      <p className="text-sm text-gray-500">3 days ago by Alex Johnson</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <UsersIcon className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">New team member added</p>
                      <p className="text-sm text-gray-500">1 week ago by Alex Johnson</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
          
          {activeTab === 'team' && (
            <div>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-gray-900">Team Members</h2>
                  <Button variant="default" size="sm">Add Member</Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.teamMembers.map(member => (
                    <div key={member.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <img 
                        src={getAvatarUrl(member.avatar, member.name)} 
                        alt={member.name} 
                        className="h-12 w-12 rounded-full object-cover" 
                      />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
          
          {activeTab === 'documents' && (
            <div>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-gray-900">Project Documents</h2>
                  <Button variant="default" size="sm">Upload Document</Button>
                </div>
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last Updated</th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {documents.map((document) => (
                        <tr key={document.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{document.name}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{document.type}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{document.lastUpdated}</td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a href={document.url} className="text-purple-600 hover:text-purple-900">
                              View<span className="sr-only">, {document.name}</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                      {documents.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500">
                            No documents found. Upload a document to get started.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetailsPage; 