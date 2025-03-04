import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { UserSettings } from '../../../types';
import { useAuth } from '../../../contexts/AuthContext';
import { getUserSettings, updateUserSettings, createUserSettings, uploadFileToStorage } from '../../../lib/firebase';
import Head from 'next/head';
import {
  UserIcon,
  BellIcon,
  SunIcon,
  EyeIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import ProtectedRoute from '../../../components/common/ProtectedRoute';

const TABS = [
  { id: 'profile', name: 'Profile', icon: UserIcon },
  { id: 'notifications', name: 'Notifications', icon: BellIcon },
  { id: 'documents', name: 'Documents', icon: DocumentTextIcon },
  { id: 'appearance', name: 'Appearance', icon: SunIcon },
  { id: 'accessibility', name: 'Accessibility', icon: EyeIcon },
  { id: 'privacy', name: 'Privacy', icon: ShieldCheckIcon },
  { id: 'integrations', name: 'Integrations', icon: ArrowPathIcon },
];

// Default settings to use if none exist
const defaultSettings: UserSettings = {
  id: '',
  userId: '',
  profile: {
    name: '',
    email: '',
    avatar: '',
  },
  emailNotifications: {
    meetings: true,
    documents: true,
    actionItems: true,
    projectUpdates: false,
  },
  theme: 'system',
  language: 'English',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12h',
  accessibility: {
    highContrast: false,
    largeText: false,
    reduceMotion: false,
  },
  privacy: {
    shareUsageData: true,
    allowCookies: true,
  },
  documentPreferences: {
    defaultFormat: 'doc',
    showMarkdown: true,
    autoSaveInterval: 5,
    defaultTags: [],
  },
  integration: {
    connectedServices: [
      {
        id: 'github',
        name: 'GitHub',
        connected: false,
      },
      {
        id: 'google',
        name: 'Google Calendar',
        connected: false,
      },
      {
        id: 'slack',
        name: 'Slack',
        connected: false,
      },
    ],
  },
};

const SettingsContent: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [settings, setSettings] = useState<UserSettings>({
    ...defaultSettings,
    documentPreferences: {
      defaultFormat: 'doc',
      showMarkdown: true,
      autoSaveInterval: 5,
      defaultTags: [],
    }
  });
  const [originalSettings, setOriginalSettings] = useState<UserSettings>({
    ...defaultSettings,
    documentPreferences: {
      defaultFormat: 'doc',
      showMarkdown: true,
      autoSaveInterval: 5,
      defaultTags: [],
    }
  });
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Fetch user settings from Firestore
  useEffect(() => {
    const fetchSettings = async () => {
      if (!currentUser) return;
      
      setIsLoading(true);
      
      try {
        const { data, error } = await getUserSettings(currentUser.uid);
        
        if (error && error !== "No settings found") {
          console.error("Error fetching settings:", error);
          setErrorMessage("Failed to load settings. Please try again.");
        }
        
        if (data) {
          // Ensure required nested objects exist
          const updatedData = {
            ...data,
            profile: data.profile || {
              name: '',
              email: '',
              avatar: '',
            },
            emailNotifications: data.emailNotifications || {
              meetings: true,
              documents: true,
              actionItems: true,
              projectUpdates: false,
            },
            accessibility: data.accessibility || {
              highContrast: false,
              largeText: false,
              reduceMotion: false,
            },
            privacy: data.privacy || {
              shareUsageData: true,
              allowCookies: true,
            },
            documentPreferences: data.documentPreferences || {
              defaultFormat: 'doc',
              showMarkdown: true,
              autoSaveInterval: 5,
              defaultTags: [],
            },
            integration: data.integration || {
              connectedServices: [],
            }
          };
          setSettings(updatedData);
          setOriginalSettings(updatedData);
        } else {
          // If no settings exist, create default settings
          const { data: newData, error: createError } = await createUserSettings(
            currentUser.uid, 
            { ...defaultSettings, id: currentUser.uid, userId: currentUser.uid }
          );
          
          if (createError) {
            console.error("Error creating settings:", createError);
            setErrorMessage("Failed to create default settings.");
          } else if (newData) {
            setSettings(newData);
            setOriginalSettings(newData);
          }
        }
      } catch (err) {
        console.error("Error in fetchSettings:", err);
        setErrorMessage("An unexpected error occurred while loading settings.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSettings();
  }, [currentUser]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Clear any messages when changing tabs
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleInputChange = (
    section: keyof UserSettings,
    key: string,
    value: any
  ) => {
    setSettings((prev) => {
      // If the section is a nested object
      if (typeof prev[section] === 'object' || prev[section] === undefined) {
        // Initialize the section if it doesn't exist
        const currentSection = prev[section] || {};
        
        return {
          ...prev,
          [section]: {
            ...currentSection,
            [key]: value,
          },
        };
      }
      // Handle top-level properties
      return {
        ...prev,
        [key]: value,
      };
    });
    setIsDirty(true);
    // Clear any messages when making changes
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSave = async () => {
    if (!currentUser) return;
    
    setIsSaving(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      const { data, error } = await updateUserSettings(currentUser.uid, settings);
      
      if (error) {
        console.error("Error updating settings:", error);
        setErrorMessage("Failed to save settings. Please try again.");
      } else {
        setSettings(data as UserSettings);
        setOriginalSettings(data as UserSettings);
        setIsDirty(false);
        setSuccessMessage("Settings saved successfully!");
      }
    } catch (err) {
      console.error("Error in handleSave:", err);
      setErrorMessage("An unexpected error occurred while saving settings.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setSettings(originalSettings);
    setIsDirty(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  // Handle avatar upload
  const handleAvatarClick = () => {
    // Trigger the hidden file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    const file = event.target.files[0];
    
    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload an image file (JPEG, PNG, GIF).');
      return;
    }
    
    // Check if the file size is less than 5MB
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Please upload an image smaller than 5MB.');
      return;
    }
    
    // Create a preview of the image
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        setAvatarPreview(e.target.result);
      }
    };
    reader.readAsDataURL(file);
    
    setIsUploading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    console.log("Starting avatar upload process...");
    console.log("Current user ID:", currentUser?.uid);
    console.log("Storage bucket:", process.env.FIREBASE_STORAGE_BUCKET || "cco-gauntlet-3d975.appspot.com");
    
    try {
      if (!currentUser || !currentUser.uid) {
        throw new Error("User authentication required. Please sign in again.");
      }
      
      // Create a unique path for the avatar
      const filePath = `avatars/${currentUser.uid}/${new Date().getTime()}_${file.name}`;
      console.log("Upload file path:", filePath);
      
      // Upload the file to Firebase Storage
      const { url, error } = await uploadFileToStorage(file, filePath);
      
      if (error) {
        console.error("Error uploading avatar:", error);
        // Provide more specific error messages based on common storage errors
        if (error.includes('unauthorized') || error.includes('permission-denied')) {
          setErrorMessage("You don't have permission to upload files. Please check your account permissions.");
        } else if (error.includes('quota-exceeded')) {
          setErrorMessage("Storage quota exceeded. Please contact support.");
        } else if (error.includes('invalid-argument') || error.includes('not-found')) {
          setErrorMessage("Storage location not found. Please try again or contact support.");
        } else if (error.includes('canceled')) {
          setErrorMessage("Upload was canceled. Please try again.");
        } else if (error.includes('Authentication required')) {
          setErrorMessage("Your session has expired. Please sign in again.");
        } else if (error.includes('cors') || error.includes('CORS') || error.includes('blocked by CORS')) {
          setErrorMessage("CORS error: Your request was blocked. Please make sure you're using the correct origin or try refreshing the page.");
          console.error("CORS error detected. Check Firebase Storage CORS configuration and bucket name.");
        } else {
          setErrorMessage("Failed to upload avatar. Please try again. Error: " + error);
        }
        setAvatarPreview(null);
        setIsUploading(false);
        return;
      }
      
      if (url) {
        console.log("Upload successful, URL:", url);
        // Update settings with the new avatar URL
        const updatedSettings = {
          ...settings,
          profile: {
            ...settings.profile,
            avatar: url
          }
        };
        
        setSettings(updatedSettings);
        setIsDirty(true);
        setSuccessMessage("Avatar uploaded successfully! Don't forget to save your changes.");
        // Clear the preview after successful upload
        setAvatarPreview(null);
      }
    } catch (err: any) {
      console.error("Error in handleFileChange:", err);
      // Get a more descriptive error message if available
      const errorMessage = err?.message || "An unexpected error occurred while uploading avatar.";
      
      // Check for CORS errors in the error message
      if (errorMessage.includes('cors') || errorMessage.includes('CORS') || 
          (err.code && (err.code === 'storage/unauthorized' || err.code.includes('cors')))) {
        setErrorMessage("CORS error: Your browser blocked the upload request. This is likely a configuration issue with storage permissions.");
        console.error("CORS error details:", err);
      } else {
        setErrorMessage(errorMessage);
      }
      
      setAvatarPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cco-primary-600"></div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <Head>
        <script async src="https://js.stripe.com/v3/buy-button.js"></script>
      </Head>
      <div className="max-w-7xl mx-auto pb-12">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-cco-neutral-900">Settings</h1>
            <p className="mt-1 text-sm text-cco-neutral-700">
              Manage your account settings and preferences
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
            <Button
              variant="secondary"
              onClick={handleReset}
              disabled={!isDirty}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!isDirty}>
              Save Changes
            </Button>
          </div>
        </div>

        {/* Premium Plan */}
        <div className="mb-6">
          <Card className="bg-gradient-to-r from-cco-primary-50 to-cco-primary-100 border-cco-primary-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-cco-primary-900 mb-2">Upgrade to Premium</h3>
                <p className="text-cco-primary-800 mb-4">Contact begin@ideatrek.io after payment if our team is not in contact within 24 hours</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-cco-primary-700 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-cco-primary-800"><span className="font-medium">AI-powered phone number</span> to automatically solicit and land business for you</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-cco-primary-700 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-cco-primary-800"><span className="font-medium">Client sharing</span> - share projects with clients without dealing with client issues</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-cco-primary-700 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-cco-primary-800"><span className="font-medium">App building service</span> - our team will build one of your client apps (conditions apply)</span>
                  </li>
                  
                </ul>
              </div>
              <div className="w-full md:w-auto mt-4 md:mt-0">
                <div id="stripe-button-container">
                  <stripe-buy-button
                    buy-button-id="buy_btn_1QxnZHEWuluK4LYAcemS0mfu"
                    publishable-key="pk_live_gWN40hIz2Hds1qotnyqgxWFQ"
                  >
                  </stripe-buy-button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="md:grid md:grid-cols-12 md:gap-6">
          {/* Sidebar / Tabs */}
          <div className="md:col-span-3">
            <Card className="sticky top-6">
              <nav className="space-y-1">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                      activeTab === tab.id
                        ? 'bg-cco-primary-50 text-cco-primary-700'
                        : 'text-cco-neutral-700 hover:bg-cco-neutral-100'
                    }`}
                  >
                    <tab.icon
                      className={`mr-3 flex-shrink-0 h-5 w-5 ${
                        activeTab === tab.id
                          ? 'text-cco-primary-700'
                          : 'text-cco-neutral-600'
                      }`}
                      aria-hidden="true"
                    />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Main content */}
          <div className="mt-5 md:mt-0 md:col-span-9">
            <Card>
              {activeTab === 'profile' && (
                <div>
                  <h3 className="text-lg font-medium leading-6 text-cco-neutral-900 mb-6">
                    Profile Information
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-cco-neutral-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="mt-1 block w-full rounded-md border-cco-neutral-300 shadow-sm focus:border-cco-primary-500 focus:ring-cco-primary-500 sm:text-sm"
                        placeholder="John Doe"
                        value={settings.profile?.name || ''}
                        onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-cco-neutral-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="mt-1 block w-full rounded-md border-cco-neutral-300 shadow-sm focus:border-cco-primary-500 focus:ring-cco-primary-500 sm:text-sm"
                        placeholder="john.doe@example.com"
                        value={settings.profile?.email || ''}
                        onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="avatar"
                        className="block text-sm font-medium text-cco-neutral-700"
                      >
                        Avatar
                      </label>
                      <div className="mt-1">
                        <div className="flex items-center space-x-5">
                          <div className="relative h-16 w-16 rounded-full overflow-hidden">
                            <img
                              className="h-16 w-16 rounded-full object-cover"
                              src={settings.profile?.avatar || "https://i.pravatar.cc/150?img=68"}
                              alt="User avatar"
                            />
                          </div>
                          {/* Upload button has been removed */}
                          {successMessage && activeTab === 'profile' && (
                            <p className="mt-2 text-sm text-green-600">{successMessage}</p>
                          )}
                          {errorMessage && activeTab === 'profile' && (
                            <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h3 className="text-lg font-medium leading-6 text-cco-neutral-900 mb-6">
                    Email Notifications
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="notifyMeetings"
                          name="notifyMeetings"
                          type="checkbox"
                          className="h-4 w-4 rounded border-cco-neutral-300 text-cco-primary-600 focus:ring-cco-primary-500"
                          checked={settings.emailNotifications?.meetings ?? true}
                          onChange={(e) => handleInputChange('emailNotifications', 'meetings', e.target.checked)}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="notifyMeetings"
                          className="font-medium text-cco-neutral-700"
                        >
                          Meeting updates
                        </label>
                        <p className="text-cco-neutral-500">
                          Get notified about meeting confirmations, cancellations and
                          updates.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="notifyDocuments"
                          name="notifyDocuments"
                          type="checkbox"
                          className="h-4 w-4 rounded border-cco-neutral-300 text-cco-primary-600 focus:ring-cco-primary-500"
                          checked={settings.emailNotifications?.documents ?? true}
                          onChange={(e) => handleInputChange('emailNotifications', 'documents', e.target.checked)}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="notifyDocuments"
                          className="font-medium text-cco-neutral-700"
                        >
                          Document changes
                        </label>
                        <p className="text-cco-neutral-500">
                          Get notified when documents are created, updated or shared with
                          you.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="notifyActionItems"
                          name="notifyActionItems"
                          type="checkbox"
                          className="h-4 w-4 rounded border-cco-neutral-300 text-cco-primary-600 focus:ring-cco-primary-500"
                          checked={settings.emailNotifications?.actionItems ?? true}
                          onChange={(e) => handleInputChange('emailNotifications', 'actionItems', e.target.checked)}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="notifyActionItems"
                          className="font-medium text-cco-neutral-700"
                        >
                          Action items
                        </label>
                        <p className="text-cco-neutral-500">
                          Get notified when you are assigned to action items or when they
                          are updated.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="notifyProjectUpdates"
                          name="notifyProjectUpdates"
                          type="checkbox"
                          className="h-4 w-4 rounded border-cco-neutral-300 text-cco-primary-600 focus:ring-cco-primary-500"
                          checked={settings.emailNotifications?.projectUpdates ?? true}
                          onChange={(e) => handleInputChange('emailNotifications', 'projectUpdates', e.target.checked)}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="notifyProjectUpdates"
                          className="font-medium text-cco-neutral-700"
                        >
                          Project updates
                        </label>
                        <p className="text-cco-neutral-500">
                          Get notified about project status changes and major updates.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'documents' && (
                <div>
                  <h3 className="text-lg font-medium leading-6 text-cco-neutral-900 mb-6">
                    Document Preferences
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="defaultFormat"
                        className="block text-sm font-medium text-cco-neutral-700"
                      >
                        Default Document Format
                      </label>
                      <select
                        id="defaultFormat"
                        name="defaultFormat"
                        className="mt-1 block w-full rounded-md border-cco-neutral-300 shadow-sm focus:border-cco-primary-500 focus:ring-cco-primary-500 sm:text-sm"
                        value={settings.documentPreferences?.defaultFormat || 'doc'}
                        onChange={(e) =>
                          handleInputChange('documentPreferences', 'defaultFormat', e.target.value)
                        }
                      >
                        <option value="doc">Document</option>
                        <option value="spreadsheet">Spreadsheet</option>
                        <option value="presentation">Presentation</option>
                        <option value="pdf">PDF</option>
                        <option value="markdown">Markdown</option>
                      </select>
                    </div>
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="showMarkdown"
                          name="showMarkdown"
                          type="checkbox"
                          className="h-4 w-4 rounded border-cco-neutral-300 text-cco-primary-600 focus:ring-cco-primary-500"
                          checked={settings.documentPreferences?.showMarkdown ?? true}
                          onChange={(e) =>
                            handleInputChange('documentPreferences', 'showMarkdown', e.target.checked)
                          }
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="showMarkdown" className="font-medium text-cco-neutral-700">
                          Show Markdown Documents
                        </label>
                        <p className="text-cco-neutral-500">
                          Show markdown documents in your document library and enable creating markdown files
                        </p>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="autoSaveInterval"
                        className="block text-sm font-medium text-cco-neutral-700"
                      >
                        Auto-save Interval (minutes)
                      </label>
                      <input
                        type="number"
                        id="autoSaveInterval"
                        name="autoSaveInterval"
                        className="mt-1 block w-32 rounded-md border-cco-neutral-300 shadow-sm focus:border-cco-primary-500 focus:ring-cco-primary-500 sm:text-sm"
                        min="1"
                        max="60"
                        value={settings.documentPreferences?.autoSaveInterval ?? 5}
                        onChange={(e) =>
                          handleInputChange('documentPreferences', 'autoSaveInterval', parseInt(e.target.value, 10))
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="defaultTags" className="block text-sm font-medium text-cco-neutral-700">
                        Default Tags
                      </label>
                      <div className="mt-1">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {settings.documentPreferences?.defaultTags?.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-cco-primary-100 text-cco-primary-800"
                            >
                              {tag}
                              <button
                                type="button"
                                className="ml-1.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-cco-primary-600 hover:bg-cco-primary-200 hover:text-cco-primary-500 focus:bg-cco-primary-500 focus:text-white focus:outline-none"
                                onClick={() => {
                                  const newTags = [...(settings.documentPreferences?.defaultTags || [])];
                                  newTags.splice(index, 1);
                                  handleInputChange('documentPreferences', 'defaultTags', newTags);
                                }}
                              >
                                <span className="sr-only">Remove tag</span>
                                &times;
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="flex">
                          <input
                            type="text"
                            id="newTag"
                            className="block w-full rounded-l-md border-cco-neutral-300 shadow-sm focus:border-cco-primary-500 focus:ring-cco-primary-500 sm:text-sm"
                            placeholder="Add a tag"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                e.preventDefault();
                                const newTag = e.currentTarget.value.trim();
                                const currentTags = settings.documentPreferences?.defaultTags || [];
                                if (!currentTags.includes(newTag)) {
                                  handleInputChange('documentPreferences', 'defaultTags', [...currentTags, newTag]);
                                }
                                e.currentTarget.value = '';
                              }
                            }}
                          />
                          <Button
                            onClick={(e) => {
                              const input = document.getElementById('newTag') as HTMLInputElement;
                              const newTag = input.value.trim();
                              if (newTag) {
                                const currentTags = settings.documentPreferences?.defaultTags || [];
                                if (!currentTags.includes(newTag)) {
                                  handleInputChange('documentPreferences', 'defaultTags', [...currentTags, newTag]);
                                }
                                input.value = '';
                              }
                            }}
                            variant="default"
                            className="rounded-l-none"
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div>
                  <h3 className="text-lg font-medium leading-6 text-cco-neutral-900 mb-6">
                    Appearance and Localization
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="theme"
                        className="block text-sm font-medium text-cco-neutral-700"
                      >
                        Theme
                      </label>
                      <select
                        id="theme"
                        name="theme"
                        className="mt-1 block w-full rounded-md border-cco-neutral-300 shadow-sm focus:border-cco-primary-500 focus:ring-cco-primary-500 sm:text-sm"
                        value={settings.theme || 'system'}
                        onChange={(e) => {
                          setSettings(prev => ({
                            ...prev,
                            theme: e.target.value as 'light' | 'dark' | 'system'
                          }));
                          setIsDirty(true);
                        }}
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="system">System</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="language"
                        className="block text-sm font-medium text-cco-neutral-700"
                      >
                        Language
                      </label>
                      <select
                        id="language"
                        name="language"
                        className="mt-1 block w-full rounded-md border-cco-neutral-300 shadow-sm focus:border-cco-primary-500 focus:ring-cco-primary-500 sm:text-sm"
                        value={settings.language || 'English'}
                        onChange={(e) => {
                          setSettings(prev => ({
                            ...prev,
                            language: e.target.value
                          }));
                          setIsDirty(true);
                        }}
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Chinese">Chinese</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="timezone"
                        className="block text-sm font-medium text-cco-neutral-700"
                      >
                        Timezone
                      </label>
                      <select
                        id="timezone"
                        name="timezone"
                        className="mt-1 block w-full rounded-md border-cco-neutral-300 shadow-sm focus:border-cco-primary-500 focus:ring-cco-primary-500 sm:text-sm"
                        value={settings.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone}
                        onChange={(e) => {
                          setSettings(prev => ({
                            ...prev,
                            timezone: e.target.value
                          }));
                          setIsDirty(true);
                        }}
                      >
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        <option value="Europe/London">London (GMT)</option>
                        <option value="Europe/Paris">Paris (CET)</option>
                        <option value="Asia/Tokyo">Tokyo (JST)</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="dateFormat"
                        className="block text-sm font-medium text-cco-neutral-700"
                      >
                        Date Format
                      </label>
                      <select
                        id="dateFormat"
                        name="dateFormat"
                        className="mt-1 block w-full rounded-md border-cco-neutral-300 shadow-sm focus:border-cco-primary-500 focus:ring-cco-primary-500 sm:text-sm"
                        value={settings.dateFormat || 'MM/DD/YYYY'}
                        onChange={(e) => {
                          setSettings(prev => ({
                            ...prev,
                            dateFormat: e.target.value as 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD'
                          }));
                          setIsDirty(true);
                        }}
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="timeFormat"
                        className="block text-sm font-medium text-cco-neutral-700"
                      >
                        Time Format
                      </label>
                      <select
                        id="timeFormat"
                        name="timeFormat"
                        className="mt-1 block w-full rounded-md border-cco-neutral-300 shadow-sm focus:border-cco-primary-500 focus:ring-cco-primary-500 sm:text-sm"
                        value={settings.timeFormat || '12h'}
                        onChange={(e) => {
                          setSettings(prev => ({
                            ...prev,
                            timeFormat: e.target.value as '12h' | '24h'
                          }));
                          setIsDirty(true);
                        }}
                      >
                        <option value="12h">12-hour</option>
                        <option value="24h">24-hour</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'accessibility' && (
                <div>
                  <h3 className="text-lg font-medium leading-6 text-cco-neutral-900 mb-6">
                    Accessibility
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="highContrast"
                          name="highContrast"
                          type="checkbox"
                          className="h-4 w-4 rounded border-cco-neutral-300 text-cco-primary-600 focus:ring-cco-primary-500"
                          checked={settings.accessibility?.highContrast ?? false}
                          onChange={(e) => handleInputChange('accessibility', 'highContrast', e.target.checked)}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="highContrast"
                          className="font-medium text-cco-neutral-700"
                        >
                          High contrast mode
                        </label>
                        <p className="text-cco-neutral-500">
                          Increase contrast between text and background
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="largeText"
                          name="largeText"
                          type="checkbox"
                          className="h-4 w-4 rounded border-cco-neutral-300 text-cco-primary-600 focus:ring-cco-primary-500"
                          checked={settings.accessibility?.largeText ?? false}
                          onChange={(e) => handleInputChange('accessibility', 'largeText', e.target.checked)}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="largeText"
                          className="font-medium text-cco-neutral-700"
                        >
                          Large text
                        </label>
                        <p className="text-cco-neutral-500">
                          Increase text size throughout the application
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="reduceMotion"
                          name="reduceMotion"
                          type="checkbox"
                          className="h-4 w-4 rounded border-cco-neutral-300 text-cco-primary-600 focus:ring-cco-primary-500"
                          checked={settings.accessibility?.reduceMotion ?? false}
                          onChange={(e) => handleInputChange('accessibility', 'reduceMotion', e.target.checked)}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="reduceMotion"
                          className="font-medium text-cco-neutral-700"
                        >
                          Reduce motion
                        </label>
                        <p className="text-cco-neutral-500">
                          Minimize animations and transitions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div>
                  <h3 className="text-lg font-medium leading-6 text-cco-neutral-900 mb-6">
                    Privacy and Data
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="shareUsageData"
                          name="shareUsageData"
                          type="checkbox"
                          className="h-4 w-4 rounded border-cco-neutral-300 text-cco-primary-600 focus:ring-cco-primary-500"
                          checked={settings.privacy?.shareUsageData ?? true}
                          onChange={(e) => handleInputChange('privacy', 'shareUsageData', e.target.checked)}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="shareUsageData"
                          className="font-medium text-cco-neutral-700"
                        >
                          Share anonymous usage data
                        </label>
                        <p className="text-cco-neutral-500">
                          Help us improve by allowing collection of anonymous usage statistics
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="allowCookies"
                          name="allowCookies"
                          type="checkbox"
                          className="h-4 w-4 rounded border-cco-neutral-300 text-cco-primary-600 focus:ring-cco-primary-500"
                          checked={settings.privacy?.allowCookies ?? true}
                          onChange={(e) => handleInputChange('privacy', 'allowCookies', e.target.checked)}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="allowCookies"
                          className="font-medium text-cco-neutral-700"
                        >
                          Allow cookies
                        </label>
                        <p className="text-cco-neutral-500">
                          We use cookies to enhance your experience and remember your preferences
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-cco-neutral-200">
                      <Button variant="destructive">Delete My Account</Button>
                      <p className="mt-2 text-xs text-cco-neutral-500">
                        This action is irreversible and will delete all your data permanently
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'integrations' && (
                <div>
                  <h3 className="text-lg font-medium leading-6 text-cco-neutral-900 mb-6">
                    Connected Services
                  </h3>
                  <div className="space-y-6">
                    {settings.integration.connectedServices.map(service => (
                      <div key={service.id} className="flex items-center justify-between p-4 border border-cco-neutral-200 rounded-md">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-cco-neutral-100 rounded-md flex items-center justify-center text-cco-neutral-700">
                            {service.id === 'github' && (
                              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.29.1-2.69 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.4.2 2.44.1 2.69.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                              </svg>
                            )}
                            {service.id === 'google' && (
                              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                              </svg>
                            )}
                            {service.id === 'slack' && (
                              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
                              </svg>
                            )}
                          </div>
                          <div className="ml-4">
                            <h4 className="text-sm font-medium text-cco-neutral-900">{service.name}</h4>
                            {service.connected ? (
                              <div className="flex items-center mt-1">
                                <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                                <span className="text-xs text-cco-neutral-600">Connected
                                  {service.lastSync && ` - Last synced ${new Date(service.lastSync).toLocaleDateString()}`}
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center mt-1">
                                <span className="h-2 w-2 rounded-full bg-cco-neutral-300 mr-2"></span>
                                <span className="text-xs text-cco-neutral-600">Not connected</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <Button
                          variant={service.connected ? "outline" : "default"}
                          size="sm"
                        >
                          {service.connected ? "Disconnect" : "Connect"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const Settings: NextPage = () => {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  );
};

export default Settings; 