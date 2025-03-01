import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../contexts/AuthContext';
import { AIProvider } from '../contexts/AIContext';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  // Set up dark mode on initial load
  useEffect(() => {
    // Ensure we only run this in the browser
    if (typeof window !== 'undefined') {
      // Check for saved theme preference or use device preference
      const savedTheme = localStorage.getItem('theme');
      
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }, []);

  return (
    <AuthProvider>
      <AIProvider>
        <Component {...pageProps} />
      </AIProvider>
    </AuthProvider>
  );
} 