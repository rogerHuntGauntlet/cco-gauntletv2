import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Dashboard } from '../../components/dashboard/Dashboard';
import { useAuth } from '../../contexts/AuthContext';
import { getDashboardData } from '../../lib/firebase';
import ProtectedRoute from '../../components/ProtectedRoute';
import type { NextPage } from 'next';
import { Dashboard as DashboardType } from '../../types';

const DashboardContent: React.FC = () => {
  const { currentUser } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        const { data, error } = await getDashboardData(currentUser.uid);
        
        if (data) {
          setDashboardData(data);
        } else if (error) {
          console.error("Error fetching dashboard data:", error);
          setError(error);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentUser]);

  // Create empty dashboard data when no data is available
  const emptyDashboardData: DashboardType = {
    recentMeetings: [],
    upcomingMeetings: [],
    activeProjects: [],
    recentDocuments: [],
    pendingActionItems: [],
    notifications: []
  };

  return (
    <>
      <Head>
        <title>Dashboard | CCO VibeCoder Platform</title>
        <meta
          name="description"
          content="View your recent meetings, documents, and projects"
        />
      </Head>
      
      <DashboardLayout>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse text-cco-primary-600">
              Loading dashboard data...
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            Error loading dashboard data: {error}
          </div>
        ) : (
          <Dashboard data={dashboardData || emptyDashboardData} />
        )}
      </DashboardLayout>
    </>
  );
}

const DashboardPage: NextPage = () => {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
};

export default DashboardPage; 