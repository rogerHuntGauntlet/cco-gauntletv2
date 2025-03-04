import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';

const CallToAction: FC = () => {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-electric-indigo to-neon-teal">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-nebula-white mb-6">
            Ready to transform how you manage your coding projects?
          </h2>
          <p className="text-xl text-nebula-white text-opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are staying in their flow state and delivering projects faster with CCO.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/marketplace" 
              className="bg-nebula-white text-electric-indigo px-8 py-3 rounded-md font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Get Started Free
            </Link>
            <Link 
              href="/marketplace" 
              className="border border-nebula-white text-nebula-white hover:bg-nebula-white hover:bg-opacity-10 px-8 py-3 rounded-md font-medium transition-all"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 