import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import RoundedIcon from '../../components/ui/RoundedIcon';

const Footer: FC = () => {
  return (
    <footer className="bg-white dark:bg-obsidian py-16 px-6 md:px-12 lg:px-24 border-t border-cosmic-grey dark:border-stardust border-opacity-10 dark:border-opacity-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-cosmic-grey dark:border-stardust border-opacity-10 dark:border-opacity-10">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-flex items-center">
              <RoundedIcon size="lg" className="h-9 w-9" />
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-electric-indigo to-neon-teal bg-clip-text text-transparent">CCO</span>
            </Link>
            <p className="mt-6 text-cosmic-grey dark:text-stardust">
              Transforming the way developers navigate meetings and documentation.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="https://twitter.com" className="text-cosmic-grey dark:text-stardust hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.016 10.016 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://github.com" className="text-cosmic-grey dark:text-stardust hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" className="text-cosmic-grey dark:text-stardust hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-medium text-midnight-blue dark:text-cosmic-latte mb-6">Product</h3>
            <ul className="space-y-4">
              <li><Link href="/landing/features" className="text-cosmic-grey dark:text-stardust hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors">Features</Link></li>
              <li><Link href="/landing/use-cases" className="text-cosmic-grey dark:text-stardust hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors">Use Cases</Link></li>
              <li><Link href="/landing/pricing" className="text-cosmic-grey dark:text-stardust hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors">Pricing</Link></li>
              <li><Link href="/landing/roadmap" className="text-cosmic-grey dark:text-stardust hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors">Roadmap</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-medium text-midnight-blue dark:text-cosmic-latte mb-6">Company</h3>
            <ul className="space-y-4">
              <li><Link href="/landing/about" className="text-cosmic-grey dark:text-stardust hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors">About</Link></li>
              <li><Link href="/landing/blog" className="text-cosmic-grey dark:text-stardust hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors">Blog</Link></li>
              <li><Link href="/landing/careers" className="text-cosmic-grey dark:text-stardust hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors">Careers</Link></li>
              <li><Link href="/landing/contact" className="text-cosmic-grey dark:text-stardust hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-medium text-midnight-blue dark:text-cosmic-latte mb-6">Resources</h3>
            <ul className="space-y-4">
              <li><Link href="/landing/documentation" className="text-cosmic-grey dark:text-stardust hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors">Documentation</Link></li>
              <li><Link href="/landing/support" className="text-cosmic-grey dark:text-stardust hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors">Support</Link></li>
              <li><Link href="/landing/community" className="text-cosmic-grey dark:text-stardust hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors">Community</Link></li>
              <li><Link href="/landing/changelog" className="text-cosmic-grey dark:text-stardust hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors">Changelog</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cosmic-grey dark:text-stardust text-sm">
            © 2023 CCO. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/landing/privacy" className="text-cosmic-grey dark:text-stardust hover:text-electric-indigo dark:hover:text-electric-indigo text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/landing/terms" className="text-cosmic-grey dark:text-stardust hover:text-electric-indigo dark:hover:text-electric-indigo text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/landing/cookies" className="text-cosmic-grey dark:text-stardust hover:text-electric-indigo dark:hover:text-electric-indigo text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 