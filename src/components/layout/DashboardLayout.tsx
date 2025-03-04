import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  HomeIcon, 
  CalendarIcon, 
  DocumentTextIcon, 
  RectangleStackIcon, 
  Cog6ToothIcon,
  UserIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  CircleStackIcon,
  SparklesIcon,
  GiftIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';
import VibeChatPanel from '../ui/VibeChatPanel';
import RoundedIcon from '../ui/RoundedIcon';
import { notifications } from '../../utils/mockData';
import { logOut } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';

// Define a type for Heroicon components
type HeroIcon = React.ComponentType<React.ComponentProps<'svg'>>;

interface NavItem {
  name: string;
  href: string;
  icon: HeroIcon;
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'My CCO', href: '/dashboard/my-coo', icon: CircleStackIcon },
  { name: 'Meetings', href: '/dashboard/meetings', icon: CalendarIcon },
  { name: 'Documents', href: '/dashboard/documents', icon: DocumentTextIcon },
  { name: 'Projects', href: '/dashboard/projects', icon: RectangleStackIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// Special Offer Modal Component
const SpecialOfferModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        {/* Modal Content */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="relative">
            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute top-3 right-3 text-cco-neutral-500 hover:text-cco-neutral-700 z-10"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {/* Sparkly Header */}
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-cco-accent-500 p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full flex">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div 
                      key={i}
                      className="absolute rounded-full bg-white" 
                      style={{
                        width: `${Math.random() * 10 + 3}px`,
                        height: `${Math.random() * 10 + 3}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.5 + 0.1,
                        animation: `pulse ${Math.random() * 3 + 2}s infinite ${Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <h3 className="text-2xl font-bold mb-2">Limited Time Special Offer!</h3>
                <p className="text-white text-opacity-90">Act fast! Our MVP packages are going quickly!</p>
              </div>
            </div>

            {/* Offer Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tier 1 */}
                <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-4 rounded-lg border border-yellow-300 relative overflow-hidden h-full opacity-75">
                  <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs font-bold">
                    SOLD OUT
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                   
                  </div>
                  <h4 className="font-bold text-lg mb-1 line-through">First 5 People</h4>
                  <p className="text-yellow-800 text-xl font-bold line-through">FREE MVP Development</p>
                  <div className="mt-2 text-sm text-red-700 font-semibold">All spots claimed!</div>
                </div>

                {/* Tier 2 */}
                <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-lg border border-blue-300 h-full opacity-75">
                  <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs font-bold">
                    SOLD OUT
                  </div>
                  <h4 className="font-bold text-lg mb-1 line-through">Next 5 People</h4>
                  <p className="text-blue-800 text-xl font-bold line-through">$500 for MVP Development</p>
                  <div className="mt-2 text-sm text-red-700 font-semibold">All spots claimed!</div>
                </div>

                {/* Tier 3 */}
                <div className="bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-lg border border-green-300 h-full">
                  <h4 className="font-bold text-lg mb-1">Next 10 People</h4>
                  <p className="text-green-800 text-xl font-bold">$2,000 for MVP Development</p>
                  <div className="mt-2 text-sm text-green-700">
                    <span className="font-bold">Only 4 spots left!</span> Going fast!
                  </div>
                </div>

                {/* Tier 4 */}
                <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-4 rounded-lg border border-purple-300 h-full">
                  <h4 className="font-bold text-lg mb-1">Next 30 People</h4>
                  <p className="text-purple-800 text-xl font-bold">$15,000 for MVP Development</p>
                  <div className="mt-2 text-sm text-purple-700">Standard pricing</div>
                </div>
              </div>

              {/* Contact Button */}
              <div className="pt-6">
                <a 
                  href="https://x.com/LamarDealMaker/status/1895533619428618386" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg text-center transition-all transform hover:scale-105 shadow-lg"
                >
                  Contact Us on Twitter to Claim Your Offer!
                </a>
                <p className="text-center mt-3 text-sm text-cco-neutral-500">
                  Click the button above to message us and secure your spot!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [vibeMode, setVibeMode] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { currentUser, userProfile } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showSpecialOfferModal, setShowSpecialOfferModal] = useState(false);
  
  // Check if user has upgraded (paid property exists)
  const isUpgraded = userProfile && 'paid' in userProfile;

  // Get display name from user profile or fallback to email
  const displayName = userProfile?.name || (currentUser?.email?.split('@')[0] || 'User');
  
  // Get user avatar or use first letter of name
  const userAvatar = userProfile?.photoURL || null;
  const userInitial = displayName.charAt(0).toUpperCase();

  // Get unread notification count
  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleVibeMode = () => {
    setVibeMode(!vibeMode);
  };
  
  const handleSignOut = async () => {
    if (isSigningOut) return;
    
    setIsSigningOut(true);
    try {
      const { error } = await logOut();
      if (error) {
        console.error('Error signing out:', error);
        alert('Failed to sign out. Please try again.');
      } else {
        router.push('/auth/signin');
      }
    } catch (err) {
      console.error('Error signing out:', err);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="flex h-screen bg-cco-neutral-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-cco-neutral-200">
            <Link href="/dashboard" className="flex items-center space-x-2">
       
              <span className="text-xl font-semibold text-cco-neutral-900">VibeCoder</span>
            </Link>
            <button 
              className="p-1 rounded-md lg:hidden text-cco-neutral-700 hover:bg-cco-neutral-100"
              onClick={toggleSidebar}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = router.pathname === item.href || router.pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
                    isActive
                      ? 'bg-cco-primary-50 text-cco-primary-700'
                      : 'text-cco-neutral-700 hover:bg-cco-neutral-100'
                  }`}
                >
                  <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-cco-primary-700' : 'text-cco-neutral-700'}`} />
                  {item.name}
                  {item.name === 'Settings' && !isUpgraded && (
                    <SparklesIcon className="w-4 h-4 ml-2 text-cco-accent-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-cco-neutral-200">
            <div className="flex items-center space-x-3 p-2">
              <div className="flex-shrink-0">
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://i.pravatar.cc/150?img=68"
                  alt="User avatar"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-cco-neutral-900">
                  {currentUser?.displayName || 'User'}
                </p>
                <p className="text-xs text-cco-neutral-700">
                  {currentUser?.email || 'user@example.com'}
                </p>
              </div>
            </div>
            <button 
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="mt-3 flex items-center w-full px-4 py-2 text-sm text-cco-neutral-700 rounded-md hover:bg-cco-neutral-100 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3 text-cco-neutral-700" />
              {isSigningOut ? 'Signing out...' : 'Sign out'}
            </button>
          </div>
        </div>
      </div>

      {/* VIBE Chat Panel */}
      {vibeMode && <VibeChatPanel isOpen={vibeMode} onClose={toggleVibeMode} />}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm h-16 flex items-center px-6">
          <button
            className="text-cco-neutral-700 lg:hidden"
            onClick={toggleSidebar}
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          
          <div className="ml-auto flex items-center space-x-4">
            {/* CCO Marketplace Link */}
            <Link 
              href="/marketplace" 
              className="p-1 rounded-md text-cco-neutral-700 hover:bg-cco-neutral-100 relative group transition-all duration-300"
            >
              <ShoppingBagIcon className="w-6 h-6 text-cco-primary-600" />
              <span className="sr-only">CCO Marketplace</span>
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-max px-2 py-1 bg-cco-neutral-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                CCO Marketplace
              </span>
            </Link>
            
            {/* Special Offer Button */}
            <button 
              onClick={() => setShowSpecialOfferModal(true)}
              className="p-1 rounded-md text-cco-neutral-700 hover:bg-cco-neutral-100 relative group transition-all duration-300 hover:scale-110"
            >
              <div className="relative">
                <GiftIcon className="w-6 h-6 text-cco-accent-500 animate-pulse" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cco-accent-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cco-accent-500"></span>
                </span>
              </div>
              <span className="sr-only">Special Offer</span>
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-max px-2 py-1 bg-cco-neutral-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Special Offer
              </span>
            </button>
            
            {/* VIBE Button */}
            <button 
              onClick={toggleVibeMode}
              className={`p-1 rounded-md transition-all duration-300 relative group ${
                vibeMode 
                  ? 'bg-gradient-to-r from-cco-primary-500 to-cco-accent-500 text-white shadow-md' 
                  : 'text-cco-neutral-700 hover:bg-cco-neutral-100'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-300 ${vibeMode ? 'scale-110' : 'scale-100'}`}
              >
                <circle cx="13" cy="12" r="8" />
                <path d="M13 2v4" />
                <path d="M13 18v4" />
                <path d="M2 12h4" />
                <path d="M18 12h4" />
                <circle cx="13" cy="12" r="5" className="animate-pulse" fill="currentColor" opacity="0.2" />
                <circle cx="13" cy="12" r="3" className="animate-pulse delay-150" fill="currentColor" opacity="0.3" />
              </svg>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-cco-accent-500 rounded-full"></span>
              <span className="sr-only">{vibeMode ? 'Deactivate Vibe Mode' : 'Activate Vibe Mode'}</span>
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-max px-2 py-1 bg-cco-neutral-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {vibeMode ? 'Deactivate Vibe Mode' : 'Activate Vibe Mode'}
              </span>
            </button>
            {/* Notification Bell */}
            <Link href="/dashboard/notifications" className="p-1 rounded-md text-cco-neutral-700 hover:bg-cco-neutral-100 relative group">
              <BellIcon className="w-6 h-6" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center bg-cco-accent-500 text-white text-xs font-medium rounded-full min-w-5 h-5 px-1.5">
                  {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
                </span>
              )}
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-max px-2 py-1 bg-cco-neutral-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Notifications
              </span>
            </Link>
            
            {/* User Menu */}
            <div className="relative">
              <button 
                className="flex items-center focus:outline-none"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <div className="relative">
                  {userAvatar ? (
                    <img 
                      src={userAvatar} 
                      alt={displayName} 
                      className="w-8 h-8 rounded-full bg-cco-primary-100 object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-cco-primary-500 flex items-center justify-center text-white">
                      {userInitial}
                    </div>
                  )}
                </div>
               
              </button>
              
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link href="/dashboard/settings" className="block px-4 py-2 text-sm text-cco-neutral-700 hover:bg-cco-neutral-100">
                    Settings
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="block w-full text-left px-4 py-2 text-sm text-cco-neutral-700 hover:bg-cco-neutral-100"
                  >
                    {isSigningOut ? 'Signing out...' : 'Sign out'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 bg-cco-neutral-50">
          {children}
        </main>
      </div>

      <SpecialOfferModal 
        isOpen={showSpecialOfferModal} 
        onClose={() => setShowSpecialOfferModal(false)} 
      />
    </div>
  );
} 