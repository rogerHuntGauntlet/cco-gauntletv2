import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from './Footer';
import RoundedIcon from '../../components/ui/RoundedIcon';

interface PageTemplateProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ title, description, children }) => {
  return (
    <div className="bg-white dark:bg-midnight-blue min-h-screen flex flex-col transition-colors duration-300">
      <Head>
        <title>{title} - CCO</title>
        <meta name="description" content={description} />
      </Head>
      
      <header className="sticky top-0 z-30 bg-white dark:bg-midnight-blue border-b border-cosmic-grey dark:border-stardust border-opacity-10 dark:border-opacity-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center">
            <RoundedIcon size="md" className="h-8 w-8" />
            <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-electric-indigo to-neon-teal bg-clip-text text-transparent">CCO</span>
          </Link>
          
          <nav className="hidden md:flex space-x-10">
            <Link href="/marketplace" className="text-cosmic-grey dark:text-stardust hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors">
              Features
            </Link>
            <Link href="/marketplace" className="text-cosmic-grey dark:text-stardust hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors">
              Use Cases
            </Link>
            <Link href="/marketplace" className="text-cosmic-grey dark:text-stardust hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors">
              Pricing
            </Link>
            <Link href="/marketplace" className="text-cosmic-grey dark:text-stardust hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors">
              About
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link href="/marketplace" className="text-cosmic-grey dark:text-stardust hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors">
              Sign In
            </Link>
            <Link href="/marketplace" className="bg-gradient-to-r from-electric-indigo to-neon-teal text-white dark:text-cosmic-latte px-5 py-2 rounded-md font-medium hover:from-electric-indigo/90 hover:to-neon-teal/90 transition-all">
              Sign Up
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1 py-16 px-6 md:px-12">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default PageTemplate; 