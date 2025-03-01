import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import Head from 'next/head';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

const LandingPage: FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Check for dark mode preference on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check localStorage first
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