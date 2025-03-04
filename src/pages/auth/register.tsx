import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { register, createUserProfile, createUserSettings, signInWithGithub, signInWithGoogle, signInWithTwitter } from '../../lib/firebase';
import { VideoModal } from '../../components/ui/VideoModal';

const RegisterPage: FC = () => {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [generalError, setGeneralError] = useState('');
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
    const newErrors = { ...errors };

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else {
      newErrors.name = '';
    }

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
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    } else {
      newErrors.password = '';
    }

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    } else {
      newErrors.confirmPassword = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setGeneralError('');

    try {
      // Register the user
      const userCredential = await register(formData.email, formData.password);
      
      if (userCredential.user) {
        // Create user profile
        await createUserProfile(userCredential.user.uid, {
          name: formData.name,
          email: formData.email,
          createdAt: new Date().toISOString(),
        });

        // Create user settings with defaults
        await createUserSettings(userCredential.user.uid, {
          id: userCredential.user.uid,
          userId: userCredential.user.uid,
          profile: {
            name: formData.name,
            email: formData.email,
          },
          emailNotifications: {
            meetings: true,
            documents: true,
            actionItems: true,
            projectUpdates: false,
          },
          theme: isDarkMode ? 'dark' : 'system',
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
          }
        });

        // Redirect to onboarding or dashboard
        router.push('/onboarding');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setGeneralError(
        error.code === 'auth/email-already-in-use'
          ? 'An account with this email already exists.'
          : 'An error occurred during registration. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGithubSignIn = async () => {
    setIsSubmitting(true);
    setGeneralError('');

    try {
      const { user, error } = await signInWithGithub();
      if (user) {
        router.push('/onboarding');
      } else {
        setGeneralError(error || 'Failed to sign in with GitHub');
      }
    } catch (error: any) {
      console.error('GitHub sign in error:', error);
      setGeneralError('An error occurred during GitHub sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setGeneralError('');

    try {
      const { user, error } = await signInWithGoogle();
      if (user) {
        router.push('/onboarding');
      } else {
        setGeneralError(error || 'Failed to sign in with Google');
      }
    } catch (error: any) {
      console.error('Google sign in error:', error);
      setGeneralError('An error occurred during Google sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTwitterSignIn = async () => {
    setIsSubmitting(true);
    setGeneralError('');

    try {
      const { user, error } = await signInWithTwitter();
      if (user) {
        router.push('/onboarding');
      } else {
        setGeneralError(error || 'Failed to sign in with Twitter');
      }
    } catch (error: any) {
      console.error('Twitter sign in error:', error);
      setGeneralError('An error occurred during Twitter sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Video modal handlers
  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  return (
    <div className="bg-white dark:bg-midnight-blue min-h-screen flex flex-col transition-colors duration-300">
      <Head>
        <title>Register - CCO</title>
        <meta name="description" content="Create your CCO account" />
      </Head>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={closeVideoModal}
        videoSrc="/hype-team-SBA-346755141.mp4"
      />

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left panel - Branding & Info */}
        <div className="bg-gradient-to-br from-electric-indigo to-neon-teal md:w-1/2 p-12 flex flex-col justify-between">
          <div>
            <Link href="/landing" className="inline-flex items-center">
              <span className="text-3xl font-bold text-white">CCO</span>
            </Link>
          </div>
          
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Join the community of vibe coders</h1>
            <p className="text-xl opacity-90 mb-8">
              Eliminate administrative overhead and enhance your creative flow with CCO.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg">AI-powered meeting assistant</h3>
                  <p className="opacity-80">Get real-time guidance and automatic documentation</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Your personalized Chief Cognitive Officer</h3>
                  <p className="opacity-80">Import data from all your platforms to build your knowledge base</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Auto-generated code repositories</h3>
                  <p className="opacity-80">Start coding immediately after meetings</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-white text-sm opacity-70">
            © {new Date().getFullYear()} CCO. All rights reserved.
          </div>
        </div>
        
        {/* Right panel - Registration Form */}
        <div className="w-full md:w-1/2 p-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-2xl md:text-3xl font-bold text-midnight-blue dark:text-cosmic-latte mb-6">Create your account</h2>
            <p className="text-cosmic-grey dark:text-stardust mb-8">
              Start building: hire an Chief Cognitive Officer in minutes.
            </p>
            
            {/* MVP Client Message */}
            <div className="mb-6 p-4 bg-electric-indigo bg-opacity-10 border border-electric-indigo border-opacity-50 rounded-md">
              <h3 className="font-semibold text-electric-indigo mb-2">MVP Client Access Only</h3>
              <p className="text-cosmic-grey dark:text-stardust">
                Our state-of-the-art AI platform is currently available exclusively to MVP clients. 
                Please <a href="https://x.com/LamarDealMaker" className="text-electric-indigo hover:underline">contact us</a> to learn how to become an MVP client and unlock the full potential of CCO.
              </p>
            </div>
            {generalError && (
              <div className="mb-6 p-4 bg-electric-crimson bg-opacity-10 border border-electric-crimson border-opacity-50 rounded-md">
                <p className="text-electric-crimson">{generalError}</p>
              </div>
            )}
            
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Create your account
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Or{' '}
                <Link href="/login" className="font-medium text-electric-indigo hover:text-neon-teal">
                  sign in to your account
                </Link>
              </p>
            </div>

            {/* Social Sign In Buttons */}
            <div className="space-y-3">
              {/* GitHub Sign In Button */}
              <button
                type="button"
                onClick={handleGithubSignIn}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-electric-indigo disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                Continue with GitHub
              </button>

              {/* Google Sign In Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-electric-indigo disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
                  />
                  <path
                    fill="#34A853"
                    d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
                  />
                </svg>
                Continue with Google
              </button>

              {/* Twitter Sign In Button */}
              <button
                type="button"
                onClick={handleTwitterSignIn}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-electric-indigo disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="h-5 w-5" fill="#1DA1F2" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                Continue with Twitter
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-midnight-blue text-gray-500 dark:text-gray-400">
                  Or continue with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-midnight-blue dark:text-cosmic-latte mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white dark:bg-cosmic-grey dark:bg-opacity-20 rounded-md border ${errors.name ? 'border-electric-crimson' : 'border-cosmic-grey dark:border-stardust border-opacity-30 dark:border-opacity-30'} text-midnight-blue dark:text-nebula-white placeholder-cosmic-grey dark:placeholder-stardust placeholder-opacity-70 dark:placeholder-opacity-70 focus:outline-none focus:border-electric-indigo transition-colors duration-300`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="mt-1 text-sm text-electric-crimson">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-midnight-blue dark:text-cosmic-latte mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white dark:bg-cosmic-grey dark:bg-opacity-20 rounded-md border ${errors.email ? 'border-electric-crimson' : 'border-cosmic-grey dark:border-stardust border-opacity-30 dark:border-opacity-30'} text-midnight-blue dark:text-nebula-white placeholder-cosmic-grey dark:placeholder-stardust placeholder-opacity-70 dark:placeholder-opacity-70 focus:outline-none focus:border-electric-indigo transition-colors duration-300`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-electric-crimson">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-midnight-blue dark:text-cosmic-latte mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white dark:bg-cosmic-grey dark:bg-opacity-20 rounded-md border ${errors.password ? 'border-electric-crimson' : 'border-cosmic-grey dark:border-stardust border-opacity-30 dark:border-opacity-30'} text-midnight-blue dark:text-nebula-white placeholder-cosmic-grey dark:placeholder-stardust placeholder-opacity-70 dark:placeholder-opacity-70 focus:outline-none focus:border-electric-indigo transition-colors duration-300`}
                  placeholder="••••••••"
                />
                {errors.password && <p className="mt-1 text-sm text-electric-crimson">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-midnight-blue dark:text-cosmic-latte mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white dark:bg-cosmic-grey dark:bg-opacity-20 rounded-md border ${errors.confirmPassword ? 'border-electric-crimson' : 'border-cosmic-grey dark:border-stardust border-opacity-30 dark:border-opacity-30'} text-midnight-blue dark:text-nebula-white placeholder-cosmic-grey dark:placeholder-stardust placeholder-opacity-70 dark:placeholder-opacity-70 focus:outline-none focus:border-electric-indigo transition-colors duration-300`}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-electric-crimson">{errors.confirmPassword}</p>}
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-electric-indigo focus:ring-electric-indigo border-cosmic-grey dark:border-stardust rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-cosmic-grey dark:text-stardust">
                  I agree to the{' '}
                  <Link href="/terms" className="text-electric-indigo hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-electric-indigo hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-electric-indigo hover:bg-opacity-90 text-nebula-white text-center px-4 py-3 rounded-md font-medium transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Creating account...' : 'Create account'}
                </button>
              </div>
              
              <div className="text-center mt-6">
                <p className="text-cosmic-grey dark:text-stardust">
                  Already have an account?{' '}
                  <Link
                    href="/auth/signin"
                    className="text-electric-indigo hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 