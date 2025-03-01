import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { signIn } from '../../lib/firebase';
import { VideoModal } from '../../components/ui/VideoModal';
import { SparklesIcon } from '@heroicons/react/24/outline';

const SignInPage: FC = () => {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(true);

  // Check system preference on load
  useEffect(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // If no saved preference, use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors, general: '' };

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
      isValid = false;
    } else {
      newErrors.email = '';
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else {
      newErrors.password = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Display MVP client message instead of attempting to sign in
    setErrors((prev) => ({ 
      ...prev, 
      general: 'Access to our platform is currently limited to MVP clients only. Please contact us at https://x.com/LamarDealMaker to learn how to become an MVP client.' 
    }));
  };

  // Video modal handlers
  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  return (
    <div className="bg-white dark:bg-midnight-blue min-h-screen flex flex-col transition-colors duration-300">
      <Head>
        <title>Sign In - CCO</title>
        <meta name="description" content="Sign in to your CCO account" />
      </Head>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={closeVideoModal}
        videoSrc="/hype-team-SBA-346755141.mp4"
      />

      {/* Header */}
      <header className="w-full px-4 py-6 flex justify-between items-center backdrop-blur-sm bg-white/80 dark:bg-obsidian/80 border-b border-gray-200 dark:border-stardust/20 z-10">
        <div className="flex items-center">
          <SparklesIcon className="h-8 w-8 text-electric-indigo" />
          <span className="text-xl font-semibold ml-2 text-gray-900 dark:text-nebula-white">
            <span className="text-electric-indigo">CCO</span> Portal
          </span>
        </div>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full text-gray-500 dark:text-stardust hover:bg-gray-100 dark:hover:bg-cosmic-grey transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-cosmic-grey rounded-xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-nebula-white mb-2">Welcome Back</h1>
                <p className="text-gray-600 dark:text-stardust">Sign in to your CCO account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-nebula-white mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border bg-white dark:bg-obsidian dark:text-nebula-white ${
                      errors.email
                        ? 'border-electric-crimson focus:border-electric-crimson focus:ring-electric-crimson/50'
                        : 'border-gray-300 dark:border-stardust/20 focus:border-electric-indigo focus:ring-electric-indigo/50'
                    } focus:outline-none focus:ring-2 transition-colors`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-electric-crimson">{errors.email}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-nebula-white">
                      Password
                    </label>
                    <a href="#" className="text-sm text-electric-indigo hover:text-electric-indigo/80 transition-colors">
                      Forgot password?
                    </a>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border bg-white dark:bg-obsidian dark:text-nebula-white ${
                      errors.password
                        ? 'border-electric-crimson focus:border-electric-crimson focus:ring-electric-crimson/50'
                        : 'border-gray-300 dark:border-stardust/20 focus:border-electric-indigo focus:ring-electric-indigo/50'
                    } focus:outline-none focus:ring-2 transition-colors`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-electric-crimson">{errors.password}</p>
                  )}
                </div>

                {errors.general && (
                  <div className="p-3 rounded-lg bg-electric-crimson/10 border border-electric-crimson/20 text-sm text-electric-crimson">
                    {errors.general}
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2.5 px-4 rounded-lg ${
                      isSubmitting
                        ? 'bg-electric-indigo/70 cursor-not-allowed'
                        : 'bg-electric-indigo hover:bg-electric-indigo/90'
                    } text-white font-medium focus:outline-none focus:ring-2 focus:ring-electric-indigo focus:ring-offset-2 dark:focus:ring-offset-cosmic-grey transition-colors`}
                  >
                    {isSubmitting ? 'Signing in...' : 'Sign in'}
                  </button>
                </div>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 dark:text-stardust">
                  Don't have an account?{' '}
                  <Link href="/landing/register">
                    <a className="text-electric-indigo hover:text-electric-indigo/80 font-medium transition-colors">
                      Sign up
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-stardust/70">
              By signing in, you agree to our{' '}
              <a href="#" className="text-electric-indigo hover:text-electric-indigo/80 transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-electric-indigo hover:text-electric-indigo/80 transition-colors">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignInPage; 