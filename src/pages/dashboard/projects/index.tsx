import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Head from 'next/head';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { 
  RectangleStackIcon, 
  PlusIcon, 
  ChartBarIcon,
  ClockIcon,
  UsersIcon,
  Cog6ToothIcon,
  ArrowRightIcon,
  ListBulletIcon,
  TagIcon,
  CheckCircleIcon,
  FolderIcon,
  ShareIcon,
  SparklesIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { useRouter } from 'next/router';
import { useAuth } from '../../../contexts/AuthContext';
import { getProjectsByUserId, createProject } from '../../../lib/firebase';

// Define project types
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

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

// Interface for project filters
interface ProjectFilters {
  status: string[];
  priority: string[];
  tags: string[];
}

// Add this new interface
interface AIServiceModalState {
  isOpen: boolean;
  projectId: string | null;
  selectedService: string | null;
  generatedPrompt: string | null;
}

const ProjectsPage: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ProjectFilters>({
    status: [],
    priority: [],
    tags: []
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  // Modal state
  const [aiServiceModal, setAIServiceModal] = useState<AIServiceModalState>({
    isOpen: false,
    projectId: null,
    selectedService: null,
    generatedPrompt: null
  });
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const dropdownRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  const buttonRefs = useRef<{[key: string]: HTMLButtonElement | null}>({});
  const router = useRouter();
  
  // Fetch projects from Firestore
  useEffect(() => {
    async function fetchProjects() {
      if (!user) return;

      try {
        setLoading(true);
        const fetchedProjects = await getProjectsByUserId(user.uid);
        setProjects(fetchedProjects);
        setError(null);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [user]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If we have an active dropdown and click is not on the button
      if (activeDropdownId) {
        const buttonElement = buttonRefs.current[activeDropdownId];
        
        if (buttonElement && !buttonElement.contains(event.target as Node)) {
          setActiveDropdownId(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdownId]);
  
  // Compute all available tags for filtering
  const allTags = Array.from(
    new Set(projects.flatMap(project => project.tags))
  );
  
  // Filter projects based on search query and filters
  const filteredProjects = projects.filter(project => {
    // Search query filter
    const matchesSearch = 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.clientName && project.clientName.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Status filter
    const matchesStatus = filters.status.length === 0 || 
      filters.status.includes(project.status);
    
    // Priority filter
    const matchesPriority = filters.priority.length === 0 || 
      filters.priority.includes(project.priority);
    
    // Tags filter
    const matchesTags = filters.tags.length === 0 || 
      project.tags.some(tag => filters.tags.includes(tag));
    
    return matchesSearch && matchesStatus && matchesPriority && matchesTags;
  });
  
  // Group projects by status
  const projectsByStatus = {
    active: filteredProjects.filter(p => p.status === 'active'),
    planning: filteredProjects.filter(p => p.status === 'planning'),
    onHold: filteredProjects.filter(p => p.status === 'on-hold'),
    completed: filteredProjects.filter(p => p.status === 'completed')
  };

  const handleCreateProject = async () => {
    if (!user) return;
    
    try {
      // In a real application, this would show a modal with a form
      const newProject = await createProject({
        name: "New Project",
        description: "Project description",
        status: "planning",
        startDate: new Date().toISOString(),
        progress: 0,
        teamMembers: [{
          id: user.uid,
          name: user.displayName || "User",
          role: "Project Manager",
          avatar: user.photoURL || ""
        }],
        tags: [],
        priority: "medium",
        userId: user.uid
      });
      
      // Add the new project to the list
      setProjects(prevProjects => [newProject, ...prevProjects]);
      
      // Navigate to the new project
      router.push(`/dashboard/projects/${newProject.id}`);
    } catch (error) {
      console.error('Failed to create project:', error);
      alert('Failed to create project. Please try again.');
    }
  };

  const handleProjectClick = (projectId: string) => {
    // Navigate to project details page
    router.push(`/dashboard/projects/${projectId}`);
  };

  const handleShareVibes = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    
    // Create the shareable link using window.location.origin
    const origin = window.location.origin;
    const shareableLink = `${origin}/shared-project/${project.id}`;
    
    // Copy link to clipboard
    navigator.clipboard.writeText(shareableLink)
      .then(() => {
        // Show success message - could be replaced with a toast notification in a real app
        alert(`Link copied to clipboard! Anyone with this link can view the "${project.name}" project.`);
      })
      .catch((error) => {
        console.error('Failed to copy link:', error);
        alert(`Error copying link. Please copy manually: ${shareableLink}`);
      });
  };

  // Replace handleAIAssist with this new version
  const handleAIAssist = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Open the modal with the current project
    setAIServiceModal({
      isOpen: true,
      projectId: project.id,
      selectedService: null,
      generatedPrompt: null
    });
  };
  
  const handleSelectAIService = (serviceName: string) => {
    const currentProject = projects.find(p => p.id === aiServiceModal.projectId);
    if (!currentProject) return;
    
    // Set the selected service and generate a prompt based on the project
    setAIServiceModal({
      ...aiServiceModal,
      selectedService: serviceName,
      generatedPrompt: generatePlatformPrompt(serviceName, currentProject)
    });
  };
  
  const closeAIServiceModal = () => {
    setAIServiceModal({
      isOpen: false,
      projectId: null,
      selectedService: null,
      generatedPrompt: null
    });
  };
  
  const toggleStatusFilter = (status: string) => {
    setFilters(prev => {
      const statusIndex = prev.status.indexOf(status);
      const updatedStatus = [...prev.status];
      
      if (statusIndex >= 0) {
        updatedStatus.splice(statusIndex, 1);
      } else {
        updatedStatus.push(status);
      }
      
      return { ...prev, status: updatedStatus };
    });
  };
  
  const togglePriorityFilter = (priority: string) => {
    setFilters(prev => {
      const priorityIndex = prev.priority.indexOf(priority);
      const updatedPriority = [...prev.priority];
      
      if (priorityIndex >= 0) {
        updatedPriority.splice(priorityIndex, 1);
      } else {
        updatedPriority.push(priority);
      }
      
      return { ...prev, priority: updatedPriority };
    });
  };
  
  const toggleTagFilter = (tag: string) => {
    setFilters(prev => {
      const tagIndex = prev.tags.indexOf(tag);
      const updatedTags = [...prev.tags];
      
      if (tagIndex >= 0) {
        updatedTags.splice(tagIndex, 1);
      } else {
        updatedTags.push(tag);
      }
      
      return { ...prev, tags: updatedTags };
    });
  };
  
  const clearFilters = () => {
    setFilters({
      status: [],
      priority: [],
      tags: []
    });
    setSearchQuery('');
  };
  
  // AI Platform integration - generates prompts based on project and selected AI platform
  const generatePlatformPrompt = (platform: string, project: Project): string => {
    // Base details about the project
    const projectDetails = `Project: "${project.name}"
Description: ${project.description}
Status: ${project.status}
Priority: ${project.priority}
Progress: ${project.progress}%
Tags: ${project.tags.join(', ')}
`;
    
    // Different prompts for different AI services
    switch (platform) {
      case 'requirements':
        return `${projectDetails}
Task: Generate a comprehensive software requirements document for this project.
Please include:
1. Functional requirements
2. Non-functional requirements
3. User stories
4. Acceptance criteria
5. Technical constraints
6. Dependencies`;
        
      case 'architecture':
        return `${projectDetails}
Task: Suggest an appropriate software architecture for this project.
Please include:
1. High-level architecture diagram
2. Component breakdown
3. Technology stack recommendations
4. Data flow
5. API design considerations
6. Scalability and performance considerations`;
        
      case 'roadmap':
        return `${projectDetails}
Task: Create a project roadmap and timeline.
Please include:
1. Key milestones
2. Sprint planning suggestions
3. Resource allocation recommendations
4. Risk assessment
5. Dependencies management
6. Timeline visualization`;
        
      case 'testing':
        return `${projectDetails}
Task: Develop a comprehensive testing strategy for this project.
Please include:
1. Test cases for main features
2. Testing methodologies to use
3. Automation vs. manual testing breakdown
4. Performance testing approach
5. Security testing considerations
6. Acceptance criteria verification`;
        
      default:
        return `${projectDetails}
Task: Provide AI assistance for this project.
Please analyze the project details and offer insights and recommendations.`;
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cco-primary-500 mb-4"></div>
          <p className="text-cco-neutral-700">Loading projects...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 my-6">
          <p className="text-red-700">{error}</p>
          <Button 
            variant="outline" 
            className="mt-2"
            onClick={() => {
              setLoading(true);
              setError(null);
              getProjectsByUserId(user?.uid || '')
                .then(projects => {
                  setProjects(projects);
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
      );
    }

    return (
      <>
        {/* AI Service Modal */}
        {aiServiceModal.isOpen && AIServiceModal()}

        {/* Header with actions */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-cco-neutral-900">Projects</h1>
          <Button 
            variant="default"
            onClick={handleCreateProject}
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            New Project
          </Button>
        </div>

        {/* Filters */}
        <div className="flex mb-6">
          <input
            type="text"
            placeholder="Search projects..."
            className="flex-1 px-4 py-2 rounded-l-md border border-cco-neutral-300 focus:outline-none focus:ring-2 focus:ring-cco-primary-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button 
            variant="outline"
            className="rounded-l-none"
            onClick={() => setSearchQuery('')}
          >
            Clear
          </Button>
        </div>
        
        {/* Project sections by status */}
        {Object.keys(projectsByStatus).map(status => {
          const statusProjects = projectsByStatus[status as keyof typeof projectsByStatus];
          
          if (statusProjects.length === 0) {
            return null; // Don't show empty sections
          }
          
          return (
            <div key={status} className="mb-8">
              <h2 className="text-xl font-semibold text-cco-neutral-900 mb-4 capitalize">
                {status === 'onHold' ? 'On Hold' : status} Projects
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {statusProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          );
        })}
        
        {/* If no projects match filters, show empty state */}
        {filteredProjects.length === 0 && (
          <Card className="p-6 flex flex-col items-center justify-center text-center">
            <div className="bg-cco-primary-50 p-3 rounded-full mb-4">
              <RectangleStackIcon className="w-8 h-8 text-cco-primary-500" />
            </div>
            <h3 className="text-lg font-medium text-cco-neutral-900 mb-2">
              {filters.status.length > 0 || filters.priority.length > 0 || filters.tags.length > 0 || searchQuery
                ? "No projects match your filters"
                : "No projects found"}
            </h3>
            <p className="text-cco-neutral-600 mb-6 max-w-md">
              {filters.status.length > 0 || filters.priority.length > 0 || filters.tags.length > 0 || searchQuery
                ? "Try adjusting your search criteria or filters to see more projects."
                : "Create your first project to get started tracking your work."}
            </p>
            {(filters.status.length > 0 || filters.priority.length > 0 || filters.tags.length > 0 || searchQuery) ? (
              <Button 
                variant="outline" 
                onClick={clearFilters}
              >
                Clear All Filters
              </Button>
            ) : (
              <Button 
                variant="accent" 
                onClick={handleCreateProject}
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Create First Project
              </Button>
            )}
          </Card>
        )}
      </>
    );
  };
  
  // AI Service Modal Component
  const AIServiceModal = () => {
    const currentProject = projects.find(p => p.id === aiServiceModal.projectId);
    
    if (!currentProject) {
      return null;
    }
    
    return ReactDOM.createPortal(
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-cco-neutral-900">
                  AI Assistance for {currentProject.name}
                </h2>
                <p className="text-cco-neutral-600">
                  Select a service to get AI-powered help with your project
                </p>
              </div>
              <button 
                className="text-cco-neutral-500 hover:text-cco-neutral-700"
                onClick={closeAIServiceModal}
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            {!aiServiceModal.selectedService ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Card 
                  hover 
                  onClick={() => handleSelectAIService('requirements')}
                  className="cursor-pointer"
                >
                  <div className="flex items-start">
                    <div className="bg-cco-primary-50 p-2 rounded-md mr-4">
                      <ListBulletIcon className="w-6 h-6 text-cco-primary-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-cco-neutral-900">
                        Requirements Document
                      </h3>
                      <p className="text-sm text-cco-neutral-600">
                        Generate a detailed requirements document for your project
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card 
                  hover 
                  onClick={() => handleSelectAIService('architecture')}
                  className="cursor-pointer"
                >
                  <div className="flex items-start">
                    <div className="bg-cco-primary-50 p-2 rounded-md mr-4">
                      <Cog6ToothIcon className="w-6 h-6 text-cco-primary-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-cco-neutral-900">
                        Architecture Recommendations
                      </h3>
                      <p className="text-sm text-cco-neutral-600">
                        Get suggestions for the technical architecture of your project
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card 
                  hover 
                  onClick={() => handleSelectAIService('roadmap')}
                  className="cursor-pointer"
                >
                  <div className="flex items-start">
                    <div className="bg-cco-primary-50 p-2 rounded-md mr-4">
                      <ClockIcon className="w-6 h-6 text-cco-primary-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-cco-neutral-900">
                        Project Roadmap
                      </h3>
                      <p className="text-sm text-cco-neutral-600">
                        Plan your project timeline and milestones
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card 
                  hover 
                  onClick={() => handleSelectAIService('testing')}
                  className="cursor-pointer"
                >
                  <div className="flex items-start">
                    <div className="bg-cco-primary-50 p-2 rounded-md mr-4">
                      <CheckCircleIcon className="w-6 h-6 text-cco-primary-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-cco-neutral-900">
                        Testing Strategy
                      </h3>
                      <p className="text-sm text-cco-neutral-600">
                        Generate a comprehensive testing plan for your project
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ) : (
              <div className="mt-4">
                <div className="flex items-center mb-4">
                  <h3 className="text-lg font-semibold text-cco-neutral-900">
                    {aiServiceModal.selectedService.charAt(0).toUpperCase() + 
                    aiServiceModal.selectedService.slice(1)} Generator
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-auto"
                    onClick={() => setAIServiceModal({
                      ...aiServiceModal,
                      selectedService: null,
                      generatedPrompt: null
                    })}
                  >
                    Back to Services
                  </Button>
                </div>
                
                <div className="bg-cco-neutral-50 rounded-md p-4 mb-4">
                  <h4 className="text-sm font-medium text-cco-neutral-700 mb-2">
                    Prompt to send to AI Assistant
                  </h4>
                  <pre className="whitespace-pre-wrap text-sm text-cco-neutral-900 font-mono bg-white p-3 rounded border border-cco-neutral-200">
                    {aiServiceModal.generatedPrompt}
                  </pre>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button 
                    variant="outline"
                    onClick={closeAIServiceModal}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="accent"
                    onClick={() => {
                      // In a real app, this would send the prompt to an AI service
                      alert('In a real application, this would send the prompt to an AI assistant and display the generated content.');
                      closeAIServiceModal();
                    }}
                  >
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    Generate with AI
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>,
      document.body
    );
  };

  // Project card component
  const ProjectCard = ({ project }: { project: Project }) => {
    // Format dates for display
    const formatDate = (dateString?: string) => {
      if (!dateString) return '';
      
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    };
    
    // Status color mapping
    const statusColors = {
      'active': 'bg-green-100 text-green-800',
      'completed': 'bg-blue-100 text-blue-800',
      'on-hold': 'bg-yellow-100 text-yellow-800',
      'planning': 'bg-purple-100 text-purple-800'
    };
    
    // Priority color mapping
    const priorityColors = {
      'low': 'bg-gray-100 text-gray-800',
      'medium': 'bg-blue-100 text-blue-800',
      'high': 'bg-orange-100 text-orange-800',
      'urgent': 'bg-red-100 text-red-800'
    };

    return (
      <Card 
        hover 
        onClick={() => handleProjectClick(project.id)}
        className="cursor-pointer h-full"
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-medium text-cco-neutral-900 flex-1 truncate">{project.name}</h3>
            <button
              ref={el => (buttonRefs.current[project.id] = el)}
              className="ml-2 text-cco-neutral-400 hover:text-cco-neutral-600"
              onClick={(e) => {
                e.stopPropagation();
                if (activeDropdownId === project.id) {
                  setActiveDropdownId(null);
                } else {
                  const buttonRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                  setDropdownPosition({
                    top: buttonRect.bottom + window.scrollY,
                    left: buttonRect.right - 150 + window.scrollX
                  });
                  setActiveDropdownId(project.id);
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
            
            {/* Dropdown menu */}
            {activeDropdownId === project.id && (
              <div
                ref={el => (dropdownRefs.current[project.id] = el)}
                className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                style={{
                  top: `${dropdownPosition.top}px`,
                  left: `${dropdownPosition.left}px`
                }}
              >
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <button
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-cco-neutral-700 hover:bg-cco-neutral-100"
                    role="menuitem"
                    onClick={(e) => handleShareVibes(project, e)}
                  >
                    <ShareIcon className="h-4 w-4 mr-2" />
                    Share Project
                  </button>
                  <button
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-cco-neutral-700 hover:bg-cco-neutral-100"
                    role="menuitem"
                    onClick={(e) => handleAIAssist(project, e)}
                  >
                    <SparklesIcon className="h-4 w-4 mr-2" />
                    AI Assist
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <p className="text-sm text-cco-neutral-600 mb-4 line-clamp-2">{project.description}</p>
          
          <div className="flex justify-between items-center mb-4">
            <span className={`text-xs rounded-full px-2 py-0.5 ${statusColors[project.status]}`}>
              {project.status === 'on-hold' ? 'On Hold' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
            <span className={`text-xs rounded-full px-2 py-0.5 ${priorityColors[project.priority]}`}>
              {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-cco-neutral-700 mb-1">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <div className="h-2 bg-cco-neutral-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-cco-primary-500 rounded-full" 
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
          
          {/* Team members */}
          <div className="mb-4">
            <h4 className="text-xs font-medium text-cco-neutral-700 mb-2">Team</h4>
            <div className="flex -space-x-2 overflow-hidden">
              {project.teamMembers.map((member, index) => (
                <div 
                  key={member.id || index} 
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                  title={member.name}
                >
                  {member.avatar ? (
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full rounded-full bg-cco-primary-100 flex items-center justify-center text-cco-primary-700 text-xs font-medium">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Tags */}
          {project.tags.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {project.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-cco-neutral-100 text-cco-neutral-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center text-xs text-cco-neutral-700 mt-auto">
            <div>
              <span className="font-medium">Start:</span> {formatDate(project.startDate)}
            </div>
            {project.dueDate && (
              <div>
                <span className="font-medium">Due:</span> {formatDate(project.dueDate)}
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <>
      <Head>
        <title>Projects | CCO VibeCoder Platform</title>
        <meta
          name="description"
          content="Manage your projects, track progress, and collaborate with your team"
        />
      </Head>
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8 flex">
          <div className="w-full lg:w-5/6 pr-0 lg:pr-6">
            {renderContent()}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ProjectsPage; 