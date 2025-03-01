import React from 'react';
import PageTemplate from './page-template';
import Script from 'next/script';

// Pricing page component
const PricingPage = () => {
  return (
    <PageTemplate 
      title="Pricing" 
      description="Simple, transparent pricing for the CCO Platform. Everything you need to enhance your creative coding flow."
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-midnight-blue dark:text-cosmic-latte">Pricing</h1>
        
        <p className="lead text-cosmic-grey dark:text-nebula-white mb-8">
          We offer a straightforward pricing model with all features included. No complicated tiers, no hidden costs.
        </p>
        
        <div className="max-w-2xl mx-auto my-12">
          {/* Pro Plan */}
          <div className="border-2 border-electric-indigo rounded-xl p-8 flex flex-col shadow-lg">
            <h2 className="text-2xl font-semibold mb-2 text-midnight-blue dark:text-cosmic-latte text-center">CCO Premium</h2>
            <p className="text-cosmic-grey dark:text-stardust mb-4 text-center">Everything you need for maximum creative flow</p>
            <div className="text-4xl font-bold mb-6 text-midnight-blue dark:text-cosmic-latte text-center">$200<span className="text-lg font-normal text-cosmic-grey dark:text-stardust">/month</span></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-medium text-midnight-blue dark:text-cosmic-latte mb-4">Meeting Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-electric-indigo flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-cosmic-grey dark:text-nebula-white">Unlimited meetings</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-electric-indigo flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-cosmic-grey dark:text-nebula-white">Advanced transcription & summarization</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-electric-indigo flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-cosmic-grey dark:text-nebula-white">Real-time meeting assistance</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-electric-indigo flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-cosmic-grey dark:text-nebula-white">Automatic action item extraction</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-midnight-blue dark:text-cosmic-latte mb-4">Coding Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-electric-indigo flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-cosmic-grey dark:text-nebula-white">Full documentation generation</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-electric-indigo flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-cosmic-grey dark:text-nebula-white">Code repository generation</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-electric-indigo flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-cosmic-grey dark:text-nebula-white">Access to CCO marketplace</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-electric-indigo flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-cosmic-grey dark:text-nebula-white">Unlimited data retention</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-cosmic-grey dark:border-stardust border-opacity-20 dark:border-opacity-20 pt-6 mb-6">
              <h3 className="text-lg font-medium text-midnight-blue dark:text-cosmic-latte mb-4 text-center">Additional Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-electric-indigo flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-cosmic-grey dark:text-nebula-white">Up to 5 team members included</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-electric-indigo flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-cosmic-grey dark:text-nebula-white">Priority support with 24-hour response time</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-electric-indigo flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-cosmic-grey dark:text-nebula-white">Regular feature updates</span>
                </li>
              </ul>
            </div>
            
            <div className="stripe-button-container">
              <Script async src="https://js.stripe.com/v3/buy-button.js" />
              <stripe-buy-button
                buy-button-id="buy_btn_1QxdPiEWuluK4LYADZD8b2zB"
                publishable-key="pk_live_gWN40hIz2Hds1qotnyqgxWFQ"
                className="w-full"
              />
            </div>
            
            <p className="text-center text-cosmic-grey dark:text-stardust text-sm mt-6">
              Need a custom solution? <a href="/landing/contact" className="text-electric-indigo hover:underline">Contact our sales team</a>
            </p>
          </div>
        </div>
        
        <h2 className="text-midnight-blue dark:text-cosmic-latte">Frequently Asked Questions</h2>
        
        <div className="space-y-6 mt-8">
          <div>
            <h3 className="text-midnight-blue dark:text-cosmic-latte">What's included in the CCO Premium plan?</h3>
            <p className="text-cosmic-grey dark:text-nebula-white">
              Everything! CCO Premium includes unlimited meetings, advanced AI transcription and summarization, full documentation generation, code repository creation, access to the CCO marketplace, and unlimited data retention. You also get priority support and regular feature updates.
            </p>
          </div>
          
          <div>
            <h3 className="text-midnight-blue dark:text-cosmic-latte">How many team members can use the platform?</h3>
            <p className="text-cosmic-grey dark:text-nebula-white">
              The CCO Premium plan includes up to 5 team members. If you need more users, please contact our sales team for custom pricing options.
            </p>
          </div>
          
          <div>
            <h3 className="text-midnight-blue dark:text-cosmic-latte">Do you offer monthly and annual billing?</h3>
            <p className="text-cosmic-grey dark:text-nebula-white">
              Yes, you can choose between monthly billing at $200/month or annual billing at $2,000/year, which gives you two months free.
            </p>
          </div>
          
          <div>
            <h3 className="text-midnight-blue dark:text-cosmic-latte">What payment methods do you accept?</h3>
            <p className="text-cosmic-grey dark:text-nebula-white">
              We accept all major credit cards. For annual plans, we can also accommodate invoicing and purchase orders.
            </p>
          </div>
          
          <div>
            <h3 className="text-midnight-blue dark:text-cosmic-latte">Can I cancel or change my plan?</h3>
            <p className="text-cosmic-grey dark:text-nebula-white">
              You can cancel your subscription at any time. Your access will continue until the end of your current billing period. For monthly plans, this means you'll have access until the end of the month; for annual plans, until the end of the year.
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-electric-indigo to-neon-teal dark:from-cosmic-indigo-dark dark:to-cosmic-blue-dark p-8 rounded-lg text-white mt-12">
          <h2 className="text-white dark:text-cosmic-latte">Ready to enhance your creative coding flow?</h2>
          <p className="text-white dark:text-cosmic-latte dark:text-opacity-95">
            Join innovative vibe coders already using the CCO Platform to eliminate administrative overhead and maximize their creative potential.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
            <a href="#" className="inline-block bg-white dark:bg-cosmic-latte text-electric-indigo hover:bg-opacity-90 dark:hover:bg-opacity-90 px-6 py-3 rounded-md font-medium transition-all text-center">
              Get Started Now
            </a>
            <a href="/landing/contact" className="inline-block border border-white dark:border-cosmic-latte text-white dark:text-cosmic-latte hover:bg-cosmic-indigo-light/30 px-6 py-3 rounded-md font-medium transition-all text-center">
              Schedule a Demo
            </a>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default PricingPage; 