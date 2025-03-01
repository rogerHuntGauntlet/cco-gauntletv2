import React from 'react';
import { 
  CalendarIcon, 
  DocumentTextIcon, 
  ClockIcon, 
  BoltIcon,
  ArrowRightIcon,
  SparklesIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { MeetingCard } from '../meetings/MeetingCard';
import { DocumentCard } from '../meetings/DocumentCard';
import { Dashboard as DashboardType } from '../../types';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardProps {
  data: DashboardType;
}

export function Dashboard({ data }: DashboardProps) {
  const { userProfile } = useAuth();
  const userName = userProfile?.name || 'User';
  
  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-cco-primary-600 via-cco-primary-700 to-cco-primary-900 rounded-xl p-6 sm:p-8 text-white shadow-lg overflow-hidden relative">
        {/* Animated background effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-white transform translate-x-1/2 translate-y-1/2 animate-pulse"></div>
        </div>
        
        <div className="relative">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back, {userName}!</h1>
          <p className="text-cco-primary-100 max-w-xl">
            Your virtual COO is here to help you manage your business operations. Let's get started.
          </p>
        </div>
      </div>
      
      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-cco-neutral-50">
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
        
        <Card className="bg-cco-neutral-50">
          <div className="p-5">
            <div className="flex items-center">
              <div className="rounded-full bg-cco-accent-100 p-3">
                <DocumentTextIcon className="w-6 h-6 text-cco-accent-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-cco-neutral-700">Projects</p>
                <p className="text-2xl font-bold text-cco-neutral-900">{data.activeProjects.length}</p>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="bg-cco-neutral-50">
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
        
        <Card className="bg-cco-neutral-50">
          <div className="p-5">
            <div className="flex items-center">
              <div className="rounded-full bg-yellow-100 p-3">
                <BellIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-cco-neutral-700">Notifications</p>
                <p className="text-2xl font-bold text-cco-neutral-900">{data.notifications.filter(n => !n.isRead).length}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Recent meeting */}
      {data.recentMeetings.length > 0 ? (
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-cco-neutral-900">Recent Meeting</h2>
            <Button variant="ghost" className="text-sm">
              View all meetings <ArrowRightIcon className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <MeetingCard meeting={data.recentMeetings[0]} />
            </div>
            
            <div className="bg-cco-neutral-50 rounded-lg p-5">
              <h3 className="font-semibold text-lg mb-3 text-cco-neutral-900">Key Highlights</h3>
              {data.recentMeetings[0].keyHighlights && data.recentMeetings[0].keyHighlights.length > 0 ? (
                <ul className="space-y-2">
                  {data.recentMeetings[0].keyHighlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <BoltIcon className="w-5 h-5 text-cco-accent-500 flex-shrink-0 mt-0.5 mr-2" />
                      <span className="text-sm text-cco-neutral-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-cco-neutral-600">No key highlights recorded for this meeting.</p>
              )}
              
              {data.recentMeetings[0].actionItems && data.recentMeetings[0].actionItems.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-3 text-cco-neutral-900">Action Items</h3>
                  <ul className="space-y-3">
                    {data.recentMeetings[0].actionItems.map((item) => (
                      <li key={item.id} className="flex items-start">
                        <span className={`w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0 ${
                          item.priority === 'high' 
                            ? 'bg-red-500' 
                            : item.priority === 'medium' 
                            ? 'bg-yellow-500' 
                            : 'bg-green-500'
                        }`} />
                        <div>
                          <p className="text-sm text-cco-neutral-700">{item.description}</p>
                          {item.dueDate && (
                            <p className="text-xs text-cco-neutral-700 mt-1">
                              <ClockIcon className="w-3.5 h-3.5 inline-block mr-1" />
                              Due {new Date(item.dueDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Card className="bg-cco-neutral-50 border-dashed">
          <div className="flex flex-col items-center justify-center py-8">
            <CalendarIcon className="w-12 h-12 text-cco-neutral-400 mb-4" />
            <h3 className="font-medium text-cco-neutral-700 mb-2">No recent meetings</h3>
            <p className="text-sm text-cco-neutral-600 text-center max-w-md mb-4">
              You don't have any recent meetings. When you have meetings, they'll appear here.
            </p>
            <Button variant="accent" size="sm">
              Schedule a Meeting
            </Button>
          </div>
        </Card>
      )}

      {/* Generated documents */}
      {data.recentDocuments.length > 0 ? (
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-cco-neutral-900">Recent Documents</h2>
            <Button variant="ghost" className="text-sm">
              View all documents <ArrowRightIcon className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.recentDocuments.slice(0, 3).map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        </div>
      ) : (
        <Card className="bg-cco-neutral-50 border-dashed">
          <div className="flex flex-col items-center justify-center py-8">
            <DocumentTextIcon className="w-12 h-12 text-cco-neutral-400 mb-4" />
            <h3 className="font-medium text-cco-neutral-700 mb-2">No documents yet</h3>
            <p className="text-sm text-cco-neutral-600 text-center max-w-md mb-4">
              You don't have any documents yet. After meetings, your documents will appear here.
            </p>
            <Button variant="accent" size="sm">
              Create a Document
            </Button>
          </div>
        </Card>
      )}
        
      {/* Projects */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-cco-neutral-900">Your Projects</h2>
          <Button variant="ghost" className="text-sm">
            View all projects <ArrowRightIcon className="w-4 h-4 ml-1" />
          </Button>
        </div>
        
        {data.activeProjects.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-6">
            {data.activeProjects.map((project) => (
              <Card key={project.id} hover={true} className="overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                    <span className="text-xs text-cco-neutral-700">
                      Updated {new Date(project.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-1">{project.name}</h3>
                  <p className="text-sm text-cco-neutral-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2 py-0.5 bg-cco-neutral-100 text-cco-neutral-700 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-cco-neutral-700">
                    <span>{project.meetings?.length || 0} Meetings</span>
                    <span>{project.documents?.length || 0} Documents</span>
                    <Button variant="outline" size="sm" className="text-xs">
                      View Project
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-cco-neutral-50 border-dashed">
            <div className="flex flex-col items-center justify-center py-8">
              <SparklesIcon className="w-12 h-12 text-cco-neutral-400 mb-4" />
              <h3 className="font-medium text-cco-neutral-700 mb-2">No active projects</h3>
              <p className="text-sm text-cco-neutral-600 text-center max-w-md mb-4">
                You don't have any active projects yet. Create a new project to get started.
              </p>
              <Button variant="accent" size="sm">
                Create a Project
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
} 