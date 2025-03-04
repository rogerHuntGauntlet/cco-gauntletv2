import React from 'react';
import PageTemplate from '../company/page-template';
import Link from 'next/link';

const PrivacyPage = () => {
  // Last updated date
  const lastUpdated = 'April 1, 2025';
  
  return (
    <PageTemplate 
      title="Privacy Policy" 
      description="Learn how CCO collects, uses, and protects your personal information and meeting data."
    >
      <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert prose-headings:text-midnight-blue dark:prose-headings:text-cosmic-latte prose-p:text-cosmic-grey dark:prose-p:text-nebula-white">
        <h1 className="text-center mb-8">Privacy Policy</h1>
        
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
            This Privacy Policy explains how Chief Cognitive Officer ("CCO", "we", "us", or "our") collects, uses, and discloses information about you when you access or use our websites, mobile applications, and other online products and services (collectively, the "Services"), or when you otherwise interact with us.
          </p>
          <p>
            We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice (such as adding a statement to our homepage or sending you a notification). We encourage you to review the Privacy Policy whenever you access the Services or otherwise interact with us to stay informed about our information practices and the choices available to you.
          </p>
        </section>

        <section>
          <h2>Collection of Information</h2>
          
          <h3>Information You Provide to Us</h3>
          <p>
            We collect information you provide directly to us. For example, we collect information when you create an account, participate in meetings, fill out a form, provide feedback, make a purchase, communicate with us via third-party social media sites, request customer support, or otherwise communicate with us. The types of information we may collect include your name, email address, company name, job title, billing information, and any other information you choose to provide.
          </p>
          
          <h3>Information We Collect Automatically When You Use the Services</h3>
          <p>
            When you access or use our Services, we automatically collect certain information, including:
          </p>
          <ul>
            <li>
              <strong>Log Information:</strong> We collect information about your use of the Services, including the type of browser you use, access times, pages viewed, your IP address, and the page you visited before navigating to our Services.
            </li>
            <li>
              <strong>Device Information:</strong> We collect information about the computer or mobile device you use to access our Services, including the hardware model, operating system and version, unique device identifiers, and mobile network information.
            </li>
            <li>
              <strong>Meeting Information:</strong> With your permission, we collect and process information related to your meetings, including audio recordings, transcripts, and any content shared during meetings.
            </li>
            <li>
              <strong>Calendar Information:</strong> With your permission, we access your calendar information to schedule and manage meetings.
            </li>
          </ul>
          
          <h3>Information We Collect from Other Sources</h3>
          <p>
            We may obtain information from other sources and combine that with information we collect through our Services. For example, we may collect information about you from third parties, including but not limited to identity verification services, credit bureaus, data enrichment providers, and publicly available sources.
          </p>
        </section>

        <section>
          <h2>Use of Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our Services, which includes processing meeting recordings and generating documentation. We may also use the information we collect to:
          </p>
          <ul>
            <li>Create and maintain your account</li>
            <li>Process transactions and send related information, including confirmations and invoices</li>
            <li>Send you technical notices, updates, security alerts, and support and administrative messages</li>
            <li>Respond to your comments, questions, and requests and provide customer service</li>
            <li>Communicate with you about products, services, offers, and events offered by CCO and others, and provide news and information we think will be of interest to you</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our Services</li>
            <li>Detect, investigate, and prevent security incidents and other malicious, deceptive, fraudulent, or illegal activity</li>
            <li>Debug to identify and repair errors in our Services</li>
            <li>Personalize and improve the Services and provide content or features that match user profiles or interests</li>
            <li>Facilitate contests, sweepstakes, and promotions and process and deliver entries and rewards</li>
            <li>Train and improve our artificial intelligence models to better serve you and other users</li>
          </ul>
        </section>

        <section>
          <h2>Sharing of Information</h2>
          <p>
            We may share information about you as follows or as otherwise described in this Privacy Policy:
          </p>
          <ul>
            <li>With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf</li>
            <li>With other meeting participants, as appropriate for the functionality of the Services</li>
            <li>In response to a request for information if we believe disclosure is in accordance with any applicable law, regulation, or legal process</li>
            <li>If we believe your actions are inconsistent with the spirit or language of our user agreements or policies, or to protect the rights, property, and safety of CCO or others</li>
            <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company</li>
            <li>Between and among CCO and our current and future parents, affiliates, subsidiaries, and other companies under common control and ownership</li>
            <li>With your consent or at your direction</li>
          </ul>
          <p>
            We may also share aggregated or de-identified information, which cannot reasonably be used to identify you.
          </p>
        </section>

        <section>
          <h2>Data Retention</h2>
          <p>
            We store the information we collect about you for as long as is necessary for the purpose(s) for which we originally collected it. We may retain certain information for legitimate business purposes or as required by law.
          </p>
        </section>

        <section>
          <h2>Transfer of Information to the United States and Other Countries</h2>
          <p>
            CCO is based in the United States and we process and store information in the United States and other countries. Therefore, we and our service providers may transfer your information to, or store or access it in, jurisdictions that may not provide equivalent levels of data protection as your home jurisdiction.
          </p>
        </section>

        <section>
          <h2>Your Choices</h2>
          
          <h3>Account Information</h3>
          <p>
            You may update, correct, or delete information about you at any time by logging into your online account or emailing us at <a href="mailto:privacy@cco.dev" className="text-electric-indigo hover:underline">privacy@cco.dev</a>. We may retain certain information as required by law or for legitimate business purposes.
          </p>
          
          <h3>Meeting Recordings and Transcripts</h3>
          <p>
            You can access, modify, or delete meeting recordings and transcripts through your account settings. Note that this will not affect any information that has already been shared with other meeting participants or integrated with other systems.
          </p>
          
          <h3>Cookies</h3>
          <p>
            Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove or reject browser cookies. Please note that if you choose to remove or reject cookies, this could affect the availability and functionality of our Services.
          </p>
          
          <h3>Promotional Communications</h3>
          <p>
            You may opt out of receiving promotional emails from CCO by following the instructions in those emails. If you opt out, we may still send you non-promotional emails, such as those about your account or our ongoing business relations.
          </p>
        </section>

        <section>
          <h2>Additional Disclosures for Individuals in Europe</h2>
          <p>
            If you are located in the European Economic Area (EEA), the United Kingdom, or Switzerland, you have certain rights and protections under applicable law regarding the processing of your personal data.
          </p>
          
          <h3>Legal Basis for Processing</h3>
          <p>
            When we process your personal data, we will only do so in the following situations:
          </p>
          <ul>
            <li>We need to process your personal data to perform our responsibilities under our contract with you (e.g., processing payments for and providing the Services you have requested).</li>
            <li>We have a legitimate interest in processing your personal data. For example, we may process your personal data to send you marketing communications, to communicate with you about changes to our Services, and to provide, secure, and improve our Services.</li>
            <li>We have your consent to do so.</li>
            <li>We need to process your personal data to comply with our legal obligations.</li>
          </ul>
          
          <h3>Data Subject Requests</h3>
          <p>
            You have the right to access personal data we hold about you and to ask that your personal data be corrected, erased, or transferred. You may also have the right to object to, or request that we restrict, certain processing. If you would like to exercise any of these rights, you can log into your account or contact us as indicated below.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
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
            <Link href="/legal/terms" className="text-electric-indigo hover:underline">
              Terms of Service
            </Link>
            <Link href="/legal/cookies" className="text-electric-indigo hover:underline">
              Cookie Policy
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

export default PrivacyPage; 