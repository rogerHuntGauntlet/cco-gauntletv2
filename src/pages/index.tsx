import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Safe client-side detection that won't cause hydration issues
  useEffect(() => {
    setIsClient(true);
    
    // Check if mobile and set state once
    const userAgent = window.navigator.userAgent;
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    setIsMobile(mobileRegex.test(userAgent));
  }, []);

  // Separate effect for redirection logic
  useEffect(() => {
    // Only run on client side and when isMobile has been determined
    if (isClient && !isMobile) {
      router.push('/dashboard');
    }
  }, [isClient, isMobile, router]);

  // Don't render anything during server-side rendering to prevent hydration issues
  if (!isClient) {
    return null;
  }

  // Mobile view
  if (isMobile) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-cco-neutral-50 p-6">
        <Head>
          <title>CCO VibeCoder Platform</title>
          <meta name="description" content="Your AI-powered assistant for software development" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/assets/icons/favicon.png" />
        </Head>

        <main className="flex w-full flex-1 flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-cco-primary-500 to-cco-accent-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl mb-6">
            CCO
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Welcome to CCO VibeCoder
          </h1>
          <p className="text-lg text-cco-neutral-600 mb-10 max-w-md">
            Your AI-powered assistant for software development and creative collaboration.
          </p>
          <Link href="/secondbrains" className="px-8 py-4 bg-cco-primary-600 text-white rounded-lg font-medium text-lg shadow-lg hover:bg-cco-primary-700 transition-colors">
            Go to Second Brains
          </Link>
        </main>
      </div>
    );
  }

  // Desktop loading view
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cco-neutral-50">
      <Head>
        <title>CCO VibeCoder Platform</title>
        <meta name="description" content="Your AI-powered assistant for software development" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/icons/favicon.png" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="w-12 h-12 bg-gradient-to-br from-cco-primary-500 to-cco-accent-500 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
          CCO
        </div>
        <h1 className="text-3xl font-bold mb-2">
          CCO VibeCoder Platform
        </h1>
        <p className="text-lg text-cco-neutral-600 mb-8">
          Redirecting to dashboard...
        </p>
        <div className="w-8 h-8 border-4 border-cco-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </main>
    </div>
  );
} 