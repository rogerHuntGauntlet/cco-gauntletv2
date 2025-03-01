import React, { useState, useEffect } from 'react';
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
  GiftIcon
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
                <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-lg border border-blue-300 h-full">
                  <h4 className="font-bold text-lg mb-1">Next 5 People</h4>
                  <p className="text-blue-800 text-xl font-bold">$500 for MVP Development</p>
                  <div className="mt-2 text-sm text-blue-700">
                    <span className="font-bold">Only 3 spots left!</span> Going fast!
                  </div>
                </div>

                {/* Tier 3 */}
                <div className="bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-lg border border-green-300 h-full">
                  <h4 className="font-bold text-lg mb-1">Next 10 People</h4>
                  <p className="text-green-800 text-xl font-bold">$2,000 for MVP Development</p>
                  <div className="mt-2 text-sm text-green-700">Incredible value!</div>
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
  const { userProfile } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVibeMode, setIsVibeMode] = useState(false);
  const [showSpecialOffer, setShowSpecialOffer] = useState(false);
  
  // Automatically close sidebar on route change for mobile
  useEffect(() => {
    const handleRouteChange = () => {
      setIsSidebarOpen(false);
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const toggleVibeMode = () => {
    setIsVibeMode(!isVibeMode);
  };
  
  const handleSignOut = async () => {
    try {
      await logOut();
      router.push('/landing/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-midnight-blue text-nebula-white">
      {/* Mobile backdrop for sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-obsidian bg-opacity-70 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-obsidian border-r border-stardust/10 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo and branding */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-stardust/10">
          <div className="flex items-center space-x-2">
            <SparklesIcon className="h-8 w-8 text-electric-indigo" />
            <span className="text-xl font-semibold text-nebula-white">
              <span className="text-electric-indigo">CCO</span> Portal
            </span>
          </div>
          <button 
            onClick={toggleSidebar}
            className="p-1 text-nebula-white hover:text-neon-teal lg:hidden"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = router.pathname === item.href || router.pathname.startsWith(`${item.href}/`);
            return (
              <Link href={item.href} key={item.name}>
                <a
                  className={`flex items-center space-x-3 px-2 py-2.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive 
                      ? 'bg-electric-indigo/20 text-electric-indigo' 
                      : 'text-stardust hover:bg-cosmic-grey hover:text-nebula-white'
                  }`}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span>{item.name}</span>
                  {item.name === 'Dashboard' && (
                    <span className="ml-auto inline-flex items-center rounded-full bg-neon-teal/20 px-2 py-0.5 text-xs text-neon-teal">
                      New
                    </span>
                  )}
                </a>
              </Link>
            );
          })}
        </nav>

        {/* Special Offer banner */}
        <div 
          className="absolute bottom-16 inset-x-2 p-3 bg-gradient-to-r from-electric-indigo/20 to-neon-teal/20 backdrop-blur-sm rounded-lg cursor-pointer hover:from-electric-indigo/30 hover:to-neon-teal/30 transition-all"
          onClick={() => setShowSpecialOffer(true)}
        >
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-electric-indigo/20 mr-3">
              <GiftIcon className="h-5 w-5 text-electric-indigo" />
            </div>
            <div>
              <p className="text-xs font-medium text-nebula-white">Special Offer</p>
              <p className="text-xs text-stardust">Limited time discount!</p>
            </div>
          </div>
        </div>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-stardust/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-electric-indigo flex items-center justify-center">
                <span className="text-xs font-medium text-nebula-white">
                  {userProfile?.name ? userProfile.name.charAt(0) : 'U'}
                </span>
              </div>
              <div className="truncate">
                <p className="text-sm font-medium text-nebula-white truncate">{userProfile?.name || 'User'}</p>
                <p className="text-xs text-stardust truncate">{userProfile?.email || 'user@example.com'}</p>
              </div>
            </div>
            <button 
              onClick={handleSignOut}
              className="p-1.5 rounded-full text-stardust hover:bg-cosmic-grey hover:text-nebula-white transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="h-16 border-b border-stardust/10 bg-midnight-blue/90 backdrop-blur-sm z-10 flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleSidebar}
              className="p-1.5 rounded-md text-stardust hover:bg-cosmic-grey hover:text-nebula-white lg:hidden"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <div className="relative">
              <button className="p-1.5 rounded-full text-stardust hover:bg-cosmic-grey hover:text-nebula-white transition-colors">
                <div className="relative">
                  <BellIcon className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-electric-crimson text-[10px] font-semibold text-white">
                    3
                  </span>
                </div>
              </button>
            </div>
            
            {/* Vibe Chat Toggle */}
            <button 
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full border transition-all ${
                isChatOpen 
                  ? 'bg-electric-indigo text-nebula-white border-electric-indigo' 
                  : 'bg-transparent text-stardust border-stardust/20 hover:border-stardust/50'
              }`}
            >
              <SparklesIcon className="h-4 w-4" />
              <span className="text-sm font-medium">Vibe Chat</span>
            </button>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-midnight-blue">
          {/* Mobile Vibe Chat button (fixed at bottom) */}
          <div className="md:hidden fixed right-4 bottom-4 z-20">
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="h-12 w-12 rounded-full bg-electric-indigo shadow-lg flex items-center justify-center"
            >
              <SparklesIcon className="h-6 w-6 text-nebula-white" />
            </button>
          </div>
          
          {children}
        </main>

        {/* Vibe Chat Panel */}
        <VibeChatPanel 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)}
        />
      </div>

      {/* Special Offer Modal */}
      <SpecialOfferModal 
        isOpen={showSpecialOffer} 
        onClose={() => setShowSpecialOffer(false)} 
      />
    </div>
  );
} 