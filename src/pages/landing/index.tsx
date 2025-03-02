import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

const LandingPage: FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Check for dark mode preference on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
      
      // Check if mobile
      const userAgent = window.navigator.userAgent;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      setIsMobile(mobileRegex.test(userAgent));
      
      // Check localStorage for theme
      const storedTheme = localStorage.getItem('theme');
      
      if (storedTheme === 'dark') {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
      } else if (storedTheme === 'light') {
        setIsDarkMode(false);
        document.documentElement.classList.remove('dark');
      } else {
        // If no stored preference, check system preference
        const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        setIsDarkMode(systemPrefersDark);
        
        if (systemPrefersDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        
        // Store the initial preference
        localStorage.setItem('theme', systemPrefersDark ? 'dark' : 'light');
      }
    }
  }, []);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    // Log to ensure the toggle is working
    console.log('Dark mode toggled:', newDarkMode, 'Class on html:', document.documentElement.classList.contains('dark'));
  };

  // Don't render anything during server-side rendering to prevent hydration issues
  if (!isClient) {
    return null;
  }

  // Mobile view - only show welcome message and button
  if (isMobile) {
    return (
      <div className="bg-white dark:bg-midnight-blue min-h-screen flex flex-col items-center justify-center p-6">
        <Head>
          <title>CCO - Your AI-Powered Cognitive Officer</title>
          <meta name="description" content="Eliminate administrative overhead and stay in your coding flow. Let CCO handle your meetings, documentation, and project kickoffs." />
          <link rel="icon" href="/assets/icons/favicon.png" />
          <link 
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" 
            rel="stylesheet"
          />
          <link 
            href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" 
            rel="stylesheet"
          />
        </Head>
        
        <div className="w-20 h-20 bg-gradient-to-br from-electric-indigo to-neon-teal rounded-xl flex items-center justify-center text-white font-bold text-2xl mb-6">
          CCO
        </div>
        <h1 className="text-4xl font-bold mb-4 text-midnight-blue dark:text-nebula-white text-center">
          Welcome to CCO VibeCoder
        </h1>
        <p className="text-lg text-cosmic-grey dark:text-digital-lavender mb-10 max-w-md text-center">
          Your AI-powered assistant for software development and creative collaboration.
        </p>
        <Link href="/secondbrains" className="px-8 py-4 bg-electric-indigo text-white rounded-lg font-medium text-lg shadow-lg hover:bg-opacity-90 transition-colors">
          Go to Second Brains
        </Link>
      </div>
    );
  }

  // Desktop view - full landing page
  return (
    <div className="bg-white dark:bg-midnight-blue min-h-screen text-midnight-blue dark:text-nebula-white transition-colors duration-300">
      <Head>
        <title>CCO - Your AI-Powered Cognitive Officer</title>
        <meta name="description" content="Eliminate administrative overhead and stay in your coding flow. Let CCO handle your meetings, documentation, and project kickoffs." />
        <link rel="icon" href="/assets/icons/favicon.png" />
        {/* Import Inter font */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" 
          rel="stylesheet"
        />
        {/* Import JetBrains Mono font */}
        <link 
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" 
          rel="stylesheet"
        />
      </Head>
      
      {/* Theme toggle button */}
      <button 
        onClick={toggleDarkMode} 
        className="fixed z-50 bottom-6 right-6 p-3 rounded-full bg-white dark:bg-midnight-blue shadow-lg transition-colors duration-300"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <svg className="w-6 h-6 text-nebula-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-midnight-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      <main>
        <HeroSection />
        <HowItWorksSection />
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage; 