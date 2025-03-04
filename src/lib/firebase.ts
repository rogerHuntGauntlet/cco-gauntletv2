// Import the functions you need from the SDKs
import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GithubAuthProvider, GoogleAuthProvider, TwitterAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, query, where, getDocs, deleteDoc, writeBatch } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserSettings } from "../types";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyB5RwTLoNCkArzKpB8gaZfiEsvvjORrkXk",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "cco-gauntlet-3d975.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "cco-gauntlet-3d975",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "cco-gauntlet-3d975.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "170751489035",
  appId: process.env.FIREBASE_APP_ID || "1:170751489035:web:47efc6b6fdc7435200430e",
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-YZRVRLH0GF"
};

// Initialize Firebase
let app;
// Check if Firebase app has already been initialized
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // use the existing app if available
}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const githubProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();

// Auth functions
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    console.error("Firebase auth error:", error);
    
    // Extract the error code from Firebase error format
    let errorCode = error.code || error.message || "unknown-error";
    
    // Log the specific error details for debugging
    console.log("Error code:", errorCode);
    console.log("Error message:", error.message);
    
    return { user: null, error: errorCode };
  }
};

export const register = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;
    
    // Check if user profile exists
    const { data: profile } = await getUserProfile(user.uid);
    
    if (!profile) {
      // Create user profile if it doesn't exist
      await createUserProfile(user.uid, {
        name: user.displayName || 'GitHub User',
        email: user.email,
        photoURL: user.photoURL,
        role: 'user',
      });
      
      // Create default user settings
      await createUserSettings(user.uid, {
        profile: {
          name: user.displayName || 'GitHub User',
          email: user.email || '',
          avatar: user.photoURL || '',
        },
      });
    }
    
    return { user, error: null };
  } catch (error: any) {
    console.error("GitHub auth error:", error);
    return { user: null, error: error.message };
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user profile exists
    const { data: profile } = await getUserProfile(user.uid);
    
    if (!profile) {
      // Create user profile if it doesn't exist
      await createUserProfile(user.uid, {
        name: user.displayName || 'Google User',
        email: user.email,
        photoURL: user.photoURL,
        role: 'user',
      });
      
      // Create default user settings
      await createUserSettings(user.uid, {
        profile: {
          name: user.displayName || 'Google User',
          email: user.email || '',
          avatar: user.photoURL || '',
        },
      });
    }
    
    return { user, error: null };
  } catch (error: any) {
    console.error("Google auth error:", error);
    return { user: null, error: error.message };
  }
};

export const signInWithTwitter = async () => {
  try {
    const result = await signInWithPopup(auth, twitterProvider);
    const user = result.user;
    
    // Check if user profile exists
    const { data: profile } = await getUserProfile(user.uid);
    
    if (!profile) {
      // Create user profile if it doesn't exist
      await createUserProfile(user.uid, {
        name: user.displayName || 'Twitter User',
        email: user.email,
        photoURL: user.photoURL,
        role: 'user',
      });
      
      // Create default user settings
      await createUserSettings(user.uid, {
        profile: {
          name: user.displayName || 'Twitter User',
          email: user.email || '',
          avatar: user.photoURL || '',
        },
      });
    }
    
    return { user, error: null };
  } catch (error: any) {
    console.error("Twitter auth error:", error);
    return { user: null, error: error.message };
  }
};

// Firestore functions
export const createUserProfile = async (userId: string, userData: any) => {
  try {
    await setDoc(doc(db, "users", userId), {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return { error: null };
  } catch (error: any) {
    console.error("Error creating user profile:", error);
    return { error: error.message };
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { data: docSnap.data(), error: null };
    } else {
      return { data: null, error: "No such document!" };
    }
  } catch (error: any) {
    console.error("Error getting user profile:", error);
    return { data: null, error: error.message };
  }
};

export const updateUserProfile = async (userId: string, userData: any) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      ...userData,
      updatedAt: new Date(),
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

// User settings functions
export const getUserSettings = async (userId: string) => {
  try {
    const docRef = doc(db, "settings", userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { data: docSnap.data() as UserSettings, error: null };
    } else {
      // Return default settings if no settings document exists
      return { 
        data: null, 
        error: "No settings found"
      };
    }
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

export const createUserSettings = async (userId: string, settings: Partial<UserSettings>) => {
  try {
    // Default settings that will be used if not provided
    const defaultSettings: UserSettings = {
      id: userId,
      userId: userId,
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
        connectedServices: [],
      },
    };

    const newSettings = { ...defaultSettings, ...settings };
    
    await setDoc(doc(db, "settings", userId), {
      ...newSettings,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return { data: newSettings, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

export const updateUserSettings = async (userId: string, settings: Partial<UserSettings>) => {
  try {
    const settingsRef = doc(db, "settings", userId);
    
    // Check if the settings document exists first
    const docSnap = await getDoc(settingsRef);
    
    if (docSnap.exists()) {
      // Update existing settings
      await updateDoc(settingsRef, {
        ...settings,
        updatedAt: new Date(),
      });
      
      // Get the updated document
      const updatedSnap = await getDoc(settingsRef);
      return { data: updatedSnap.data() as UserSettings, error: null };
    } else {
      // Create new settings if they don't exist
      return await createUserSettings(userId, settings);
    }
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

// Meetings functions
export const getMeetingsByUserId = async (userId: string) => {
  try {
    const meetingsRef = collection(db, "meetings");
    const q = query(
      meetingsRef, 
      where("participantIds", "array-contains", userId)
    );
    
    const querySnapshot = await getDocs(q);
    const meetings = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { data: meetings, error: null };
  } catch (error: any) {
    console.error("Error fetching meetings:", error);
    return { data: null, error: error.message };
  }
};

export const createMeeting = async (meetingData: any) => {
  try {
    const docRef = doc(collection(db, "meetings"));
    await setDoc(docRef, {
      ...meetingData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return { data: { id: docRef.id, ...meetingData }, error: null };
  } catch (error: any) {
    console.error("Error creating meeting:", error);
    return { data: null, error: error.message };
  }
};

// Projects functions
export const getProjectsByUserId = async (userId: string) => {
  try {
    const projectsRef = collection(db, "projects");
    const q = query(
      projectsRef, 
      where("userId", "==", userId)
    );
    
    const querySnapshot = await getDocs(q);
    const projects = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { data: projects, error: null };
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    return { data: null, error: error.message };
  }
};

export const getProjectById = async (projectId: string) => {
  try {
    const projectRef = doc(db, "projects", projectId);
    const projectSnap = await getDoc(projectRef);
    
    if (projectSnap.exists()) {
      return { 
        data: { 
          id: projectSnap.id, 
          ...projectSnap.data() 
        }, 
        error: null 
      };
    } else {
      return { data: null, error: "Project not found" };
    }
  } catch (error: any) {
    console.error("Error fetching project:", error);
    return { data: null, error: error.message };
  }
};

export const createProject = async (projectData: any) => {
  try {
    const docRef = doc(collection(db, "projects"));
    await setDoc(docRef, {
      ...projectData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return { data: { id: docRef.id, ...projectData }, error: null };
  } catch (error: any) {
    console.error("Error creating project:", error);
    return { data: null, error: error.message };
  }
};

export const updateProject = async (projectId: string, projectData: any) => {
  try {
    const projectRef = doc(db, "projects", projectId);
    await updateDoc(projectRef, {
      ...projectData,
      updatedAt: new Date(),
    });
    
    return { data: { id: projectId, ...projectData }, error: null };
  } catch (error: any) {
    console.error("Error updating project:", error);
    return { data: null, error: error.message };
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const projectRef = doc(db, "projects", projectId);
    await deleteDoc(projectRef);
    
    return { error: null };
  } catch (error: any) {
    console.error("Error deleting project:", error);
    return { error: error.message };
  }
};

// Documents functions
export const getDocumentsByUserId = async (userId: string) => {
  try {
    const docsRef = collection(db, "documents");
    const q = query(
      docsRef, 
      where("createdBy", "==", userId)
    );
    
    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { data: documents, error: null };
  } catch (error: any) {
    console.error("Error fetching documents:", error);
    return { data: null, error: error.message };
  }
};

export const createDocument = async (documentData: any) => {
  try {
    const docRef = doc(collection(db, "documents"));
    await setDoc(docRef, {
      ...documentData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return { data: { id: docRef.id, ...documentData }, error: null };
  } catch (error: any) {
    console.error("Error creating document:", error);
    return { data: null, error: error.message };
  }
};

export const updateDocument = async (documentId: string, documentData: any) => {
  try {
    const documentRef = doc(db, "documents", documentId);
    await updateDoc(documentRef, {
      ...documentData,
      updatedAt: new Date(),
    });
    
    return { data: { id: documentId, ...documentData }, error: null };
  } catch (error: any) {
    console.error("Error updating document:", error);
    return { data: null, error: error.message };
  }
};

// Notifications functions
export const getNotificationsByUserId = async (userId: string) => {
  try {
    const notificationsRef = collection(db, "notifications");
    const q = query(
      notificationsRef, 
      where("userId", "==", userId)
    );
    
    const querySnapshot = await getDocs(q);
    const notifications = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { data: notifications, error: null };
  } catch (error: any) {
    console.error("Error fetching notifications:", error);
    return { data: null, error: error.message };
  }
};

export const createNotification = async (notificationData: any) => {
  try {
    const docRef = doc(collection(db, "notifications"));
    await setDoc(docRef, {
      ...notificationData,
      createdAt: new Date(),
      isRead: false,
    });
    
    return { data: { id: docRef.id, ...notificationData }, error: null };
  } catch (error: any) {
    console.error("Error creating notification:", error);
    return { data: null, error: error.message };
  }
};

export const updateNotification = async (notificationId: string, updateData: any) => {
  try {
    const notificationRef = doc(db, "notifications", notificationId);
    await updateDoc(notificationRef, {
      ...updateData,
      updatedAt: new Date(),
    });
    
    return { data: { id: notificationId, ...updateData }, error: null };
  } catch (error: any) {
    console.error("Error updating notification:", error);
    return { data: null, error: error.message };
  }
};

export const deleteNotification = async (notificationId: string) => {
  try {
    await deleteDoc(doc(db, "notifications", notificationId));
    return { data: { id: notificationId }, error: null };
  } catch (error: any) {
    console.error("Error deleting notification:", error);
    return { data: null, error: error.message };
  }
};

export const markAllNotificationsAsRead = async (userId: string) => {
  try {
    const notificationsRef = collection(db, "notifications");
    const q = query(
      notificationsRef, 
      where("userId", "==", userId),
      where("isRead", "==", false)
    );
    
    const querySnapshot = await getDocs(q);
    
    // Create a batch to perform multiple updates at once
    const batch = writeBatch(db);
    
    querySnapshot.docs.forEach((doc) => {
      const notificationRef = doc.ref;
      batch.update(notificationRef, { 
        isRead: true,
        updatedAt: new Date()
      });
    });
    
    // Commit the batch
    await batch.commit();
    
    return { data: { success: true }, error: null };
  } catch (error: any) {
    console.error("Error marking all notifications as read:", error);
    return { data: null, error: error.message };
  }
};

// Dashboard data function to get all user data
export const getDashboardData = async (userId: string) => {
  try {
    // Get meetings, projects, documents, notifications in parallel
    const [meetingsResponse, projectsResponse, documentsResponse, notificationsResponse] = 
      await Promise.all([
        getMeetingsByUserId(userId),
        getProjectsByUserId(userId),
        getDocumentsByUserId(userId),
        getNotificationsByUserId(userId)
      ]);
    
    // Check for errors
    if (meetingsResponse.error || projectsResponse.error || 
        documentsResponse.error || notificationsResponse.error) {
      return { 
        data: null, 
        error: "Error fetching dashboard data" 
      };
    }
    
    // Process meetings into upcoming and recent
    const meetings = meetingsResponse.data || [];
    const now = new Date();
    const upcomingMeetings = meetings
      .filter(m => new Date(m.date) > now && m.status !== 'canceled')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    const recentMeetings = meetings
      .filter(m => new Date(m.date) <= now || m.status === 'completed')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Get active projects
    const projects = projectsResponse.data || [];
    const activeProjects = projects.filter(p => p.status === 'active' || p.status === 'new');
    
    // Get recent documents
    const documents = documentsResponse.data || [];
    const recentDocuments = documents
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5);
    
    // Get pending action items from all meetings
    const pendingActionItems = meetings
      .flatMap(m => (m.actionItems || []))
      .filter(item => item.status === 'open')
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    
    // Get notifications sorted by date
    const notifications = notificationsResponse.data || [];
    const sortedNotifications = notifications
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    // Construct dashboard data
    const dashboardData = {
      recentMeetings,
      upcomingMeetings,
      activeProjects,
      recentDocuments,
      pendingActionItems,
      notifications: sortedNotifications
    };
    
    return { data: dashboardData, error: null };
  } catch (error: any) {
    console.error("Error fetching dashboard data:", error);
    return { data: null, error: error.message };
  }
};

// File upload function
export const uploadFileToStorage = async (file: File, path: string) => {
  try {
    // Check if user is authenticated
    if (!auth.currentUser) {
      console.error("User not authenticated");
      return { url: null, error: "Authentication required. Please sign in again." };
    }
    
    console.log("Current user:", auth.currentUser.uid);
    console.log("Storage path:", path);
    
    // Create a storage reference
    const storageRef = ref(storage, path);
    
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return { url: downloadURL, error: null };
  } catch (error: any) {
    console.error("Error uploading file:", error);
    const errorCode = error.code || "";
    const errorMessage = error.message || "Unknown error";
    console.log(`Storage error details - Code: ${errorCode}, Message: ${errorMessage}`);
    
    // Return more descriptive error
    return { 
      url: null, 
      error: `${errorMessage} (${errorCode})` 
    };
  }
};

export { auth, db, storage };
export default app; 