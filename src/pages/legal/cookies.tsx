import React from 'react';
import PageTemplate from '../company/page-template';
import Link from 'next/link';

const CookiesPage = () => {
  // Last updated date
  const lastUpdated = 'April 1, 2025';
  
  return (
    <PageTemplate 
      title="Cookie Policy" 
      description="Learn about how CCO uses cookies and similar technologies on our website and services."
    >
      <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert prose-headings:text-midnight-blue dark:prose-headings:text-cosmic-latte prose-p:text-cosmic-grey dark:prose-p:text-nebula-white">
        <h1 className="text-center mb-8">Cookie Policy</h1>
        
        <div className="text-center mb-12">
          <p className="inline-flex items-center text-cosmic-grey dark:text-stardust text-sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Last Updated: {lastUpdated}
          </p>
        </div>

        <section>
          <h2>Introduction</h2>
          <p>
            This Cookie Policy explains how Chief Cognitive Officer ("CCO", "we", "us", or "our") uses cookies and similar technologies on our websites, applications, and other online products and services (collectively, the "Services"). This Cookie Policy should be read together with our <Link href="/legal/privacy" className="text-electric-indigo hover:underline">Privacy Policy</Link> and <Link href="/legal/terms" className="text-electric-indigo hover:underline">Terms of Service</Link>.
          </p>
          <p>
            By using our Services, you agree to our use of cookies as described in this Cookie Policy. If you do not accept the use of cookies, please disable them as described below, but note that this may affect your experience on our Services.
          </p>
        </section>

        <section>
          <h2>What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners. Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device after you close your browser until they expire or you delete them. Session cookies are deleted from your device when you close your browser.
          </p>
          <p>
            We also use other technologies like web beacons, pixels, and local storage, which function similarly to cookies and allow us to track your usage of our Services.
          </p>
        </section>

        <section>
          <h2>Types of Cookies We Use</h2>
          <p>
            We use different types of cookies for various purposes. These include:
          </p>
          
          <h3>Essential Cookies</h3>
          <p>
            These cookies are necessary for the Services to function properly. They enable basic functions like page navigation, access to secure areas, and authentication. The Services cannot function properly without these cookies, and they cannot be disabled.
          </p>
          
          <h3>Performance/Analytics Cookies</h3>
          <p>
            These cookies help us understand how visitors interact with our Services by collecting and reporting information anonymously. They help us improve our Services by measuring errors, testing different designs, and gauging traffic patterns.
          </p>
          
          <h3>Functionality Cookies</h3>
          <p>
            These cookies allow the Services to remember choices you make (such as your username, language, or region) and provide enhanced, more personalized features. They may be set by us or by third-party providers whose services we have added to our pages.
          </p>
          
          <h3>Targeting/Advertising Cookies</h3>
          <p>
            These cookies are used to deliver advertisements more relevant to you and your interests. They are also used to limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns. They are usually placed by advertising networks with our permission.
          </p>
        </section>

        <section>
          <h2>Specific Cookies We Use</h2>
          <p>
            Below is a detailed list of the cookies used on our Services:
          </p>
          
          <h3>Essential Cookies</h3>
          <ul>
            <li><strong>cco_session:</strong> Authentication session cookie to identify logged-in users</li>
            <li><strong>cco_csrf:</strong> Security cookie to prevent cross-site request forgery attacks</li>
            <li><strong>cco_preferences:</strong> Stores your cookie consent preferences</li>
          </ul>
          
          <h3>Performance/Analytics Cookies</h3>
          <ul>
            <li><strong>_ga, _gid, _gat:</strong> Google Analytics cookies to track site usage and user behavior</li>
            <li><strong>amplitude_id:</strong> Amplitude analytics cookie to measure feature usage</li>
          </ul>
          
          <h3>Functionality Cookies</h3>
          <ul>
            <li><strong>cco_theme:</strong> Remembers your light/dark theme preference</li>
            <li><strong>cco_language:</strong> Stores your preferred language setting</li>
            <li><strong>cco_recent:</strong> Tracks recently viewed documentation pages</li>
          </ul>
          
          <h3>Targeting/Advertising Cookies</h3>
          <ul>
            <li><strong>_fbp:</strong> Facebook pixel cookie for advertising measurement</li>
            <li><strong>_li_id:</strong> LinkedIn Insight tag for conversion tracking</li>
            <li><strong>cco_ref:</strong> Tracks referral sources to our website</li>
          </ul>
        </section>

        <section>
          <h2>Third-Party Cookies</h2>
          <p>
            In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and so on. These cookies may include:
          </p>
          <ul>
            <li><strong>Google:</strong> Analytics, advertising, and YouTube functionality</li>
            <li><strong>Facebook:</strong> Advertising and social sharing features</li>
            <li><strong>LinkedIn:</strong> Advertising and social sharing features</li>
            <li><strong>Intercom:</strong> Customer support chat functionality</li>
            <li><strong>Stripe:</strong> Payment processing</li>
          </ul>
          <p>
            Please note that these third parties may have their own privacy policies governing how they use information collected through their cookies. We encourage you to read their privacy policies for more information.
          </p>
        </section>

        <section>
          <h2>Managing Cookies</h2>
          <p>
            Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies, or to alert you when cookies are being sent. The methods for doing so vary from browser to browser, and from version to version. You can obtain up-to-date information about blocking and deleting cookies via the support pages of your browser:
          </p>
          <ul>
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-electric-indigo hover:underline">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-electric-indigo hover:underline">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-electric-indigo hover:underline">Safari</a></li>
            <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-electric-indigo hover:underline">Microsoft Edge</a></li>
          </ul>
          <p>
            Please note that if you choose to block cookies, you may not be able to use all the features of our Services.
          </p>
          <p>
            In addition to browser controls, we provide a cookie consent banner when you first visit our website that allows you to manage your preferences for non-essential cookies.
          </p>
        </section>

        <section>
          <h2>Do Not Track</h2>
          <p>
            Some browsers include a "Do Not Track" feature that signals to websites that you do not want to have your online activities tracked. Our Services do not currently respond to "Do Not Track" signals because there is not yet a common understanding of how to interpret these signals. However, you can usually express your privacy preferences regarding the use of cookies as described in the "Managing Cookies" section.
          </p>
        </section>

        <section>
          <h2>Changes to This Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
          </p>
          <p>
            The date at the top of this Cookie Policy indicates when it was last updated.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
          </p>
          <p>
            Chief Cognitive Officer (CCO)<br />
            Attn: Privacy Officer<br />
            123 AI Street, Suite 456<br />
            Austin, TX 78701<br />
            Email: <a href="mailto:privacy@cco.dev" className="text-electric-indigo hover:underline">privacy@cco.dev</a>
          </p>
        </section>
        
        <div className="mt-12 p-6 bg-white dark:bg-obsidian rounded-lg">
          <h3 className="text-midnight-blue dark:text-cosmic-latte">Additional Resources</h3>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <Link href="/legal/privacy" className="text-electric-indigo hover:underline">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="text-electric-indigo hover:underline">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-electric-indigo hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default CookiesPage; 