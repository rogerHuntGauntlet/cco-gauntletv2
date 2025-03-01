import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { 
  CalendarIcon, 
  PlusIcon, 
  ArrowPathIcon,
  FunnelIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { MeetingCard } from '../../../components/meetings/MeetingCard';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Meeting } from '../../../types';
import { useAuth } from '../../../contexts/AuthContext';
import { getMeetingsByUserId, createMeeting } from '../../../lib/firebase';
import { 
  CalendarConnection, 
  CalendarProvider, 
  connectToCalendarProvider,
  syncCalendarEvents,
  sendCalendarInvite,
  generateICSFile
} from '../../../utils/calendarIntegration';
import { CreateMeetingForm } from '../../../components/meetings/CreateMeetingForm';

const MeetingsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [calendarConnection, setCalendarConnection] = useState<CalendarConnection | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [sendingInvite, setSendingInvite] = useState<boolean>(false);
  const [inviteSuccess, setInviteSuccess] = useState<boolean>(false);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

  // Fetch meetings from Firestore
  useEffect(() => {
    async function fetchMeetings() {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const fetchedMeetings = await getMeetingsByUserId(currentUser.uid);
        setMeetings(fetchedMeetings);
        setError(null);
      } catch (err) {
        console.error("Error fetching meetings:", err);
        setError("Failed to load meetings. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchMeetings();
  }, [currentUser]);

  // Filter meetings to show only upcoming ones (scheduled status)
  const upcomingMeetings = meetings && Array.isArray(meetings) 
    ? meetings.filter(meeting => meeting.status === 'scheduled')
    : [];
  const pastMeetings = meetings && Array.isArray(meetings)
    ? meetings.filter(meeting => meeting.status !== 'scheduled')
    : [];

  const handleConnectCalendar = async () => {
    setIsConnecting(true);
    try {
      // In a real app, we would show a provider selection dialog
      const provider: CalendarProvider = 'google';
      const connection = await connectToCalendarProvider(provider);
      setCalendarConnection(connection);
      
      // Sync events after connection
      handleSyncEvents(connection);
    } catch (error) {
      console.error('Failed to connect to calendar:', error);
      alert('Failed to connect to calendar. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };
  
  const handleSyncEvents = async (connection: CalendarConnection) => {
    setIsSyncing(true);
    try {
      const externalEvents = await syncCalendarEvents(connection);
      
      // In a real app, we would merge these with existing meetings
      // For now, we'll just log them
      console.log('Synced events:', externalEvents);
      
      // Update connection with new sync time
      setCalendarConnection({
        ...connection,
        lastSynced: new Date()
      });
    } catch (error) {
      console.error('Failed to sync calendar events:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSendInvite = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setShowInviteModal(true);
    setInviteSuccess(false);
  };

  const handleCloseModal = () => {
    setShowInviteModal(false);
    setSelectedMeeting(null);
  };

  const handleSubmitInvite = async (emails: string[]) => {
    if (!selectedMeeting || !calendarConnection) {
      alert('Please connect to a calendar first');
      return;
    }
    
    setSendingInvite(true);
    try {
      await sendCalendarInvite(selectedMeeting, emails, calendarConnection);
      setInviteSuccess(true);
      
      // Clear form after short delay
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    } catch (error) {
      console.error('Failed to send calendar invite:', error);
      alert('Failed to send invite: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setSendingInvite(false);
    }
  };
  
  const handleDownloadICS = (meeting: Meeting) => {
    const icsContent = generateICSFile(meeting);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${meeting.title.replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleCreateMeeting = () => {
    setShowCreateForm(true);
  };
  
  const handleCancelCreate = () => {
    setShowCreateForm(false);
  };
  
  const handleSaveMeeting = async (meetingData: Partial<Meeting>) => {
    if (!currentUser) return;
    
    try {
      // Create a new meeting in Firestore
      const newMeeting = await createMeeting({
        title: meetingData.title || 'Untitled Meeting',
        date: meetingData.date || new Date().toISOString(),
        duration: meetingData.duration || 30,
        participants: meetingData.participants || [{
          id: currentUser.uid,
          name: currentUser.displayName || 'User',
          email: currentUser.email || '',
          role: 'Organizer',
          avatar: currentUser.photoURL || ''
        }],
        projectId: meetingData.projectId || '',
        status: 'scheduled',
        summary: meetingData.summary || '',
        actionItems: [],
        documents: [],
        userId: currentUser.uid
      });
      
      // Add the new meeting to the list
      setMeetings(prevMeetings => {
        if (!prevMeetings || !Array.isArray(prevMeetings)) {
          return [newMeeting];
        }
        return [newMeeting, ...prevMeetings];
      });
      
      // Close the form
      setShowCreateForm(false);
    } catch (error) {
      console.error('Failed to create meeting:', error);
      alert('Failed to create meeting. Please try again.');
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cco-primary-500 mb-4"></div>
          <p className="text-cco-neutral-700">Loading meetings...</p>
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
              getMeetingsByUserId(currentUser?.uid || '')
                .then(meetings => {
                  setMeetings(meetings);
                  setLoading(false);
                })
                .catch(err => {
                  console.error("Error retrying fetch:", err);
                  setError("Failed to load meetings. Please try again.");
                  setLoading(false);
                });
            }}
          >
            Try Again
          </Button>
        </div>
      );
    }

    if (showCreateForm) {
      return (
        <CreateMeetingForm 
          onSubmit={handleSaveMeeting}
          onCancel={handleCancelCreate}
          currentUser={currentUser ? {
            id: currentUser.uid,
            name: currentUser.displayName || 'User',
            email: currentUser.email || '',
            role: 'Organizer',
            avatar: currentUser.photoURL || ''
          } : undefined}
        />
      );
    }

    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-cco-neutral-900">Meetings</h1>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={handleConnectCalendar}
              disabled={isConnecting || !!calendarConnection}
            >
              <CalendarIcon className="w-5 h-5 mr-2" />
              {isConnecting ? 'Connecting...' : calendarConnection ? 'Calendar Connected' : 'Connect Calendar'}
            </Button>
            <Button 
              variant="default"
              onClick={handleCreateMeeting}
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              New Meeting
            </Button>
          </div>
        </div>

        {/* Calendar integration status */}
        {calendarConnection && (
          <Card className="mb-6 bg-cco-primary-50 border-cco-primary-200">
            <div className="flex items-center">
              <CalendarIcon className="w-6 h-6 text-cco-primary-600 mr-3" />
              <div>
                <h3 className="font-medium text-cco-neutral-900">Calendar Connected</h3>
                <p className="text-sm text-cco-neutral-700">
                  Connected to {calendarConnection.provider.charAt(0).toUpperCase() + calendarConnection.provider.slice(1)} Calendar 
                  {calendarConnection.email && <span> ({calendarConnection.email})</span>}
                  {calendarConnection.lastSynced && 
                    <span className="ml-1">
                      • Last synced: {new Date(calendarConnection.lastSynced).toLocaleTimeString()}
                    </span>
                  }
                </p>
              </div>
              <Button 
                variant="ghost" 
                className="ml-auto"
                onClick={() => calendarConnection && handleSyncEvents(calendarConnection)}
                disabled={isSyncing}
              >
                <ArrowPathIcon className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                {isSyncing ? 'Syncing...' : 'Sync'}
              </Button>
            </div>
          </Card>
        )}

        {/* Upcoming meetings section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-cco-neutral-900">Upcoming Meetings</h2>
            <Button 
              variant="ghost"
            >
              <FunnelIcon className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
          
          {upcomingMeetings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingMeetings.map((meeting) => (
                <div key={meeting.id} className="relative">
                  <MeetingCard meeting={meeting} />
                </div>
              ))}
            </div>
          ) : (
            <Card className="p-6 flex flex-col items-center justify-center text-center">
              <div className="bg-cco-primary-50 p-3 rounded-full mb-4">
                <CalendarIcon className="w-8 h-8 text-cco-primary-500" />
              </div>
              <h3 className="text-lg font-medium text-cco-neutral-900 mb-2">No upcoming meetings</h3>
              <p className="text-cco-neutral-600 mb-6 max-w-md">
                You don't have any scheduled meetings coming up. Would you like to create one?
              </p>
              <Button 
                variant="accent" 
                onClick={handleCreateMeeting}
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Schedule a Meeting
              </Button>
            </Card>
          )}
        </div>

        {/* Past meetings section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-cco-neutral-900">Past Meetings</h2>
          </div>
          
          {pastMeetings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pastMeetings.map((meeting) => (
                <div key={meeting.id} className="relative">
                  <MeetingCard meeting={meeting} />
                </div>
              ))}
            </div>
          ) : (
            <Card className="p-6 flex flex-col items-center justify-center text-center">
              <div className="bg-cco-neutral-100 p-3 rounded-full mb-4">
                <ClockIcon className="w-8 h-8 text-cco-neutral-500" />
              </div>
              <h3 className="text-lg font-medium text-cco-neutral-900 mb-2">No past meetings</h3>
              <p className="text-cco-neutral-600 max-w-md">
                You don't have any past meetings. Once you've completed meetings, they'll appear here.
              </p>
            </Card>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Meetings | CCO VibeCoder Platform</title>
        <meta
          name="description"
          content="Manage your meetings, schedule new ones, and sync with your calendar"
        />
      </Head>
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8">
          {renderContent()}
        </div>
      </DashboardLayout>
    </>
  );
};

export default MeetingsPage; 