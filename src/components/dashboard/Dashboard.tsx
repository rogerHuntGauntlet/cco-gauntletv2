import React from 'react';
import { 
  CalendarIcon, 
  DocumentTextIcon,
  RectangleStackIcon,
  ClockIcon,
  PlusIcon,
  ArrowRightIcon,
  BellIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { Dashboard as DashboardType } from '../../types';
import { format, isValid } from 'date-fns';

interface DashboardProps {
  data: DashboardType;
}

export function Dashboard({ data }: DashboardProps) {
  const { userProfile } = useAuth();
  const userName = userProfile?.name || 'User';
  
  // Check if data arrays exist and have content
  const hasMeetings = data.upcomingMeetings && data.upcomingMeetings.length > 0;
  const hasProjects = data.activeProjects && data.activeProjects.length > 0;
  const hasDocuments = data.recentDocuments && data.recentDocuments.length > 0;
  const hasActionItems = data.pendingActionItems && data.pendingActionItems.length > 0;
  
  // Helper function to safely format dates
  const safeFormatDate = (dateString: string | undefined, formatStr: string, fallback = 'No date'): string => {
    if (!dateString) return fallback;
    try {
      const date = new Date(dateString);
      return isValid(date) ? format(date, formatStr) : fallback;
    } catch (err) {
      console.error('Error formatting date:', err);
      return fallback;
    }
  };
  
  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-cco-primary-600 via-cco-primary-700 to-cco-primary-900 rounded-xl p-6 sm:p-8 text-white shadow-lg">
        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">Welcome back, {userName}!</h1>
          <p className="text-cco-primary-100 text-lg mb-6">
            Your dashboard is ready. Here's an overview of your latest activities.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard/meetings/new">
              <Button variant="secondary" className="bg-white text-cco-primary-700 hover:bg-cco-primary-50">
                <PlusIcon className="w-5 h-5 mr-2" />
                Schedule Meeting
              </Button>
            </Link>
            <Link href="/dashboard/projects/new">
              <Button variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                <PlusIcon className="w-5 h-5 mr-2" />
                Create Project
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/dashboard/meetings" className="block">
          <Card className="bg-white hover:shadow-md transition-all" hover={true}>
            <div className="p-5">
              <div className="flex items-center">
                <div className="rounded-full bg-cco-primary-100 p-3">
                  <CalendarIcon className="w-6 h-6 text-cco-primary-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-cco-neutral-700">Upcoming Meetings</p>
                  <p className="text-2xl font-bold text-cco-neutral-900">{data.upcomingMeetings.length}</p>
                </div>
              </div>
            </div>
          </Card>
        </Link>
        
        <Link href="/dashboard/projects" className="block">
          <Card className="bg-white hover:shadow-md transition-all" hover={true}>
            <div className="p-5">
              <div className="flex items-center">
                <div className="rounded-full bg-cco-accent-100 p-3">
                  <RectangleStackIcon className="w-6 h-6 text-cco-accent-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-cco-neutral-700">Active Projects</p>
                  <p className="text-2xl font-bold text-cco-neutral-900">{data.activeProjects.length}</p>
                </div>
              </div>
            </div>
          </Card>
        </Link>
        
        <Link href="/dashboard/documents" className="block">
          <Card className="bg-white hover:shadow-md transition-all" hover={true}>
            <div className="p-5">
              <div className="flex items-center">
                <div className="rounded-full bg-blue-100 p-3">
                  <DocumentTextIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-cco-neutral-700">Documents</p>
                  <p className="text-2xl font-bold text-cco-neutral-900">{data.recentDocuments.length}</p>
                </div>
              </div>
            </div>
          </Card>
        </Link>
        
        <Link href="/dashboard/tasks" className="block">
          <Card className="bg-white hover:shadow-md transition-all" hover={true}>
            <div className="p-5">
              <div className="flex items-center">
                <div className="rounded-full bg-green-100 p-3">
                  <ClockIcon className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-cco-neutral-700">Action Items</p>
                  <p className="text-2xl font-bold text-cco-neutral-900">{data.pendingActionItems.length}</p>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      </div>
      
      {/* Upcoming meetings section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-cco-neutral-900">Upcoming Meetings</h2>
            <Link href="/dashboard/meetings">
              <Button variant="ghost" size="sm" className="text-cco-primary-600 hover:text-cco-primary-700">
                View all <ArrowRightIcon className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          {hasMeetings ? (
            <div className="space-y-4">
              {data.upcomingMeetings.slice(0, 2).map(meeting => (
                <Card key={meeting.id} hover={true} className="bg-white">
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-cco-neutral-900">{meeting.title}</h3>
                      <span className="px-2 py-0.5 bg-cco-primary-100 text-cco-primary-700 rounded text-xs">
                        {safeFormatDate(meeting.date, 'MMM d, h:mm a')}
                      </span>
                    </div>
                    
                    {meeting.summary && (
                      <p className="text-sm text-cco-neutral-600 mb-3 line-clamp-2">{meeting.summary}</p>
                    )}
                    
                    <div className="flex items-center text-xs text-cco-neutral-500 mb-3">
                      <span>{meeting.duration} min</span>
                      <span className="mx-2">•</span>
                      <span>{meeting.participants.length} participants</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Link href={`/dashboard/meetings/${meeting.id}`}>
                        <Button variant="outline" size="sm">View Details</Button>
                      </Link>
                      <button className="text-xs text-cco-neutral-700 hover:text-cco-primary-600 flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        Add to Calendar
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
              
              {data.upcomingMeetings.length > 2 && (
                <div className="text-center">
                  <Link href="/dashboard/meetings">
                    <Button variant="ghost" className="text-cco-primary-600 hover:text-cco-primary-700">
                      Show {data.upcomingMeetings.length - 2} more meetings
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Card className="bg-white border-dashed border-2 border-cco-neutral-200">
              <div className="p-6 flex flex-col items-center text-center">
                <CalendarIcon className="w-12 h-12 text-cco-neutral-400 mb-2" />
                <h3 className="font-medium text-cco-neutral-900 mb-1">No upcoming meetings</h3>
                <p className="text-cco-neutral-600 mb-4">Schedule your first meeting to get started</p>
                <Link href="/dashboard/meetings/new">
                  <Button variant="accent" size="sm">
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Schedule Meeting
                  </Button>
                </Link>
              </div>
            </Card>
          )}
        </div>
        
        {/* Action items section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-cco-neutral-900">Action Items</h2>
            <Link href="/dashboard/tasks">
              <Button variant="ghost" size="sm" className="text-cco-primary-600 hover:text-cco-primary-700">
                View all <ArrowRightIcon className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          {hasActionItems ? (
            <Card className="bg-white">
              <div className="p-4">
                <ul className="divide-y divide-cco-neutral-100">
                  {data.pendingActionItems.slice(0, 5).map(item => (
                    <li key={item.id} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full border border-cco-neutral-200 flex items-center justify-center cursor-pointer hover:bg-cco-neutral-50">
                          <CheckCircleIcon className="w-4 h-4 text-cco-neutral-300" />
                        </div>
                        <div>
                          <p className="text-sm text-cco-neutral-900 mb-1">{item.description}</p>
                          <div className="flex items-center">
                            {item.dueDate && (
                              <span className="text-xs text-cco-neutral-500">
                                Due: {safeFormatDate(item.dueDate, 'MMM d')}
                              </span>
                            )}
                            {item.priority && (
                              <>
                                <span className="mx-1.5">•</span>
                                <span className={`px-1.5 py-0.5 rounded text-xs ${
                                  item.priority === 'high' ? 'bg-red-100 text-red-700' :
                                  item.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-green-100 text-green-700'
                                }`}>
                                  {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                
                {data.pendingActionItems.length > 5 && (
                  <div className="pt-3 mt-3 border-t border-cco-neutral-100 text-center">
                    <Link href="/dashboard/tasks">
                      <Button variant="ghost" size="sm" className="text-cco-primary-600 w-full">
                        Show {data.pendingActionItems.length - 5} more tasks
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </Card>
          ) : (
            <Card className="bg-white border-dashed border-2 border-cco-neutral-200">
              <div className="p-6 flex flex-col items-center text-center">
                <ClockIcon className="w-12 h-12 text-cco-neutral-400 mb-2" />
                <h3 className="font-medium text-cco-neutral-900 mb-1">No action items</h3>
                <p className="text-cco-neutral-600 mb-4">Action items from meetings will appear here</p>
              </div>
            </Card>
          )}
        </div>
      </div>
      
      {/* Projects section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-cco-neutral-900">Active Projects</h2>
          <Link href="/dashboard/projects">
            <Button variant="ghost" size="sm" className="text-cco-primary-600 hover:text-cco-primary-700">
              View all <ArrowRightIcon className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
        
        {hasProjects ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.activeProjects.slice(0, 3).map(project => (
              <Link href={`/dashboard/projects/${project.id}`} key={project.id}>
                <Card hover={true} className="h-full bg-white">
                  <div className="p-4 flex flex-col h-full">
                    <div className="mb-2 flex items-center">
                      <span className="px-2 py-0.5 rounded-full text-xs bg-cco-neutral-100 text-cco-neutral-800">
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </div>
                    
                    <h3 className="font-semibold text-cco-neutral-900 mb-1">{project.name}</h3>
                    
                    <p className="text-sm text-cco-neutral-600 mb-3 line-clamp-2 flex-grow">
                      {project.description}
                    </p>
                    
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-cco-neutral-100 text-cco-neutral-700 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2 py-0.5 bg-cco-neutral-100 text-cco-neutral-700 rounded text-xs">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center pt-2 mt-auto border-t border-cco-neutral-100">
                      <div className="flex gap-3 text-xs text-cco-neutral-600">
                        <span className="flex items-center">
                          <CalendarIcon className="w-3.5 h-3.5 mr-1" />
                          {(project.meetings && project.meetings.length) || 0}
                        </span>
                        <span className="flex items-center">
                          <DocumentTextIcon className="w-3.5 h-3.5 mr-1" />
                          {(project.documents && project.documents.length) || 0}
                        </span>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
            
            {data.activeProjects.length > 3 && (
              <Card className="h-full bg-cco-neutral-50 border-dashed flex items-center justify-center p-4">
                <Link href="/dashboard/projects" className="text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-cco-primary-600 mb-2 font-medium">
                      +{data.activeProjects.length - 3} more projects
                    </span>
                    <Button variant="outline" size="sm">View All Projects</Button>
                  </div>
                </Link>
              </Card>
            )}
            
            <Link href="/dashboard/projects/new">
              <Card className="h-full bg-cco-neutral-50 border-dashed flex items-center justify-center p-4">
                <div className="text-center">
                  <div className="rounded-full bg-cco-neutral-100 w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <PlusIcon className="w-6 h-6 text-cco-neutral-600" />
                  </div>
                  <p className="text-cco-neutral-700 mb-3">Create a new project</p>
                  <Button variant="accent" size="sm">New Project</Button>
                </div>
              </Card>
            </Link>
          </div>
        ) : (
          <Card className="bg-white border-dashed border-2 border-cco-neutral-200">
            <div className="p-8 flex flex-col items-center text-center">
              <RectangleStackIcon className="w-16 h-16 text-cco-neutral-400 mb-3" />
              <h3 className="font-medium text-cco-neutral-900 text-lg mb-2">No active projects</h3>
              <p className="text-cco-neutral-600 mb-6 max-w-md">
                You don't have any active projects yet. Create your first project to start collaborating.
              </p>
              <Link href="/dashboard/projects/new">
                <Button variant="accent">
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Create New Project
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
      
      {/* Recent documents section */}
      {hasDocuments && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-cco-neutral-900">Recent Documents</h2>
            <Link href="/dashboard/documents">
              <Button variant="ghost" size="sm" className="text-cco-primary-600 hover:text-cco-primary-700">
                View all <ArrowRightIcon className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.recentDocuments.slice(0, 4).map(doc => (
              <Link href={`/dashboard/documents/${doc.id}`} key={doc.id}>
                <Card hover={true} className="h-full bg-white">
                  <div className="p-4 flex flex-col h-full">
                    <div className="flex items-center mb-3">
                      <div className="rounded-lg bg-blue-100 p-2 mr-3">
                        <DocumentTextIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-xs text-cco-neutral-500">
                        Updated {safeFormatDate(doc.updatedAt, 'MMM d')}
                      </span>
                    </div>
                    
                    <h3 className="font-medium text-cco-neutral-900 mb-2 line-clamp-2">{doc.title}</h3>
                    
                    {doc.tags && doc.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-auto">
                        {doc.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-cco-neutral-100 text-cco-neutral-700 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-3 pt-2 border-t border-cco-neutral-100 flex justify-between items-center">
                      <span className="text-xs text-cco-neutral-600">
                        {doc.type}
                      </span>
                      <Button variant="ghost" size="sm" className="text-cco-primary-600">View</Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* Notifications */}
      {data.notifications && data.notifications.length > 0 && (
        <div className="fixed bottom-6 right-6 bg-white shadow-lg rounded-lg border border-cco-neutral-200 p-4 max-w-sm w-full">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-cco-neutral-900 flex items-center">
              <BellIcon className="w-5 h-5 mr-2 text-cco-primary-600" />
              Notifications
            </h3>
            <button className="text-cco-neutral-500 text-xs hover:text-cco-neutral-700">
              Mark all as read
            </button>
          </div>
          
          <div className="max-h-60 overflow-y-auto -mr-2 pr-2">
            <ul className="divide-y divide-cco-neutral-100">
              {data.notifications.slice(0, 3).map(notification => (
                <li key={notification.id} className="py-2 first:pt-0">
                  <div className="flex gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      notification.type === 'action' ? 'bg-red-500' :
                      notification.type === 'meeting' ? 'bg-cco-primary-500' :
                      'bg-cco-neutral-500'
                    }`} />
                    <div>
                      <p className="text-sm text-cco-neutral-900">{notification.message}</p>
                      <p className="text-xs text-cco-neutral-500 mt-1">
                        {safeFormatDate(notification.createdAt, 'MMM d, h:mm a')}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {data.notifications.length > 3 && (
            <div className="pt-2 mt-2 border-t border-cco-neutral-100 text-center">
              <Link href="/dashboard/notifications">
                <Button variant="ghost" size="sm" className="text-cco-primary-600 w-full">
                  View all {data.notifications.length} notifications
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 