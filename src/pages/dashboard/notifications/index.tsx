import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useAuth } from '../../../contexts/AuthContext';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { NotificationsList } from '../../../components/notifications/NotificationsList';
import { Notification } from '../../../types';
import { 
  getNotificationsByUserId, 
  updateNotification, 
  deleteNotification,
  markAllNotificationsAsRead 
} from '../../../lib/firebase';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';

export default function NotificationsPage() {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch notifications from Firebase
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!currentUser?.uid) return;
      
      setLoading(true);
      try {
        const response = await getNotificationsByUserId(currentUser.uid);
        
        if (response.error) {
          setError(response.error);
        } else if (response.data) {
          setNotifications(response.data as Notification[]);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch notifications');
        console.error('Error fetching notifications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [currentUser]);

  const handleMarkAsRead = async (id: string) => {
    if (!currentUser?.uid) return;
    
    try {
      const notificationToUpdate = notifications.find(n => n.id === id);
      if (!notificationToUpdate) return;
      
      await updateNotification(id, { isRead: true });
      
      // Update local state
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, isRead: true } : n
      ));
    } catch (err: any) {
      console.error('Error marking notification as read:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!currentUser?.uid) return;
    
    try {
      await markAllNotificationsAsRead(currentUser.uid);
      
      // Update local state
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    } catch (err: any) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  const handleClearNotifications = async () => {
    if (!currentUser?.uid) return;
    
    try {
      // Only clear read notifications
      const readNotifications = notifications.filter(n => n.isRead);
      
      // Delete each read notification
      const deletePromises = readNotifications.map(n => deleteNotification(n.id));
      await Promise.all(deletePromises);
      
      // Update local state - only keep unread notifications
      setNotifications(notifications.filter(n => !n.isRead));
    } catch (err: any) {
      console.error('Error clearing notifications:', err);
    }
  };

  return (
    <>
      <Head>
        <title>Notifications | CCO VibeCoder Platform</title>
        <meta
          name="description"
          content="View and manage your notifications"
        />
      </Head>
      
      <DashboardLayout>
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner size="lg" />
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg">
              Error: {error}. Please try refreshing the page.
            </div>
          ) : (
            <NotificationsList 
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
              onClearNotifications={handleClearNotifications}
            />
          )}
        </div>
      </DashboardLayout>
    </>
  );
} 