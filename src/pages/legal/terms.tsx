import React from 'react';
import PageTemplate from '../company/page-template';
import Link from 'next/link';

const TermsPage = () => {
  // Last updated date
  const lastUpdated = 'April 1, 2025';
  
  return (
    <PageTemplate 
      title="Terms of Service" 
      description="The terms and conditions governing your use of the CCO platform and services."
    >
      <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert prose-headings:text-midnight-blue dark:prose-headings:text-cosmic-latte prose-p:text-cosmic-grey dark:prose-p:text-nebula-white">
        <h1 className="text-center mb-8">Terms of Service</h1>
        
        <div className="text-center mb-12">
          <p className="inline-flex items-center text-cosmic-grey dark:text-stardust text-sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Last Updated: {lastUpdated}
          </p>
        </div>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to Chief Cognitive Officer ("CCO", "we", "us", or "our"). These Terms of Service ("Terms") govern your access to and use of the CCO platform, applications, and services (collectively, the "Services"), so please read them carefully.
          </p>
          <p>
            By accessing or using the Services, you agree to be bound by these Terms. If you do not agree to these Terms, do not access or use the Services. If you are accessing or using the Services on behalf of a company or other legal entity, you represent that you have the authority to bind that entity to these Terms. In that case, "you" and "your" will refer to that entity.
          </p>
        </section>

        <section>
          <h2>2. Eligibility</h2>
          <p>
            You must be at least 18 years old to use the Services. By using the Services, you represent and warrant that you meet all eligibility requirements outlined in these Terms. If you do not meet all these requirements, you must not access or use the Services.
          </p>
        </section>

        <section>
          <h2>3. Account Registration</h2>
          <p>
            To access certain features of the Services, you may be required to register for an account. When you register, you must provide accurate and complete information. You are solely responsible for the activity that occurs on your account, and you must keep your account password secure. You must notify us immediately of any breach of security or unauthorized use of your account.
          </p>
        </section>

        <section>
          <h2>4. Services and Content</h2>
          
          <h3>4.1 Services Description</h3>
          <p>
            CCO is an AI-powered platform designed to assist with meeting management, transcription, summarization, and documentation. The Services may include features for recording meetings, generating transcripts, extracting action items, and creating documentation.
          </p>
          
          <h3>4.2 Changes to Services</h3>
          <p>
            We reserve the right to modify, suspend, or discontinue the Services, temporarily or permanently, at any time, with or without notice. You agree that we will not be liable to you or to any third party for any modification, suspension, or discontinuation of the Services.
          </p>
          
          <h3>4.3 User Content</h3>
          <p>
            Our Services allow you to upload, submit, store, send, or receive content, including meeting recordings, transcripts, and other materials (collectively, "User Content"). You retain ownership of any intellectual property rights that you hold in that User Content.
          </p>
          <p>
            When you upload, submit, store, send, or receive User Content through our Services, you give CCO (and those we work with) a worldwide license to use, host, store, reproduce, modify, create derivative works, communicate, publish, publicly perform, publicly display, and distribute such User Content. The rights you grant in this license are for the limited purpose of operating, promoting, and improving our Services, and to develop new ones.
          </p>
          
          <h3>4.4 Prohibited Content</h3>
          <p>
            You agree not to use the Services to upload, transmit, or otherwise make available any content that:
          </p>
          <ul>
            <li>Is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, invasive of another's privacy, hateful, or otherwise objectionable</li>
            <li>Infringes any patent, trademark, trade secret, copyright, or other proprietary rights of any party</li>
            <li>Contains software viruses or any other computer code, files, or programs designed to interrupt, destroy, or limit the functionality of any computer software or hardware</li>
            <li>Is harmful to minors in any way</li>
            <li>Constitutes unsolicited or unauthorized advertising, promotional materials, "junk mail," "spam," "chain letters," or any other form of solicitation</li>
          </ul>
        </section>

        <section>
          <h2>5. Subscriptions and Payment</h2>
          
          <h3>5.1 Subscription Plans</h3>
          <p>
            Access to certain features of the Services may require a subscription. By subscribing to the Services, you agree to pay the applicable subscription fees as described at the time of purchase. All subscription fees are in U.S. dollars and do not include taxes, which may be added to the subscription fee.
          </p>
          
          <h3>5.2 Billing and Cancellation</h3>
          <p>
            Subscription fees will be billed in advance on either a monthly or annual basis, depending on the subscription plan you select. Your subscription will automatically renew at the end of each billing period unless you cancel it prior to the renewal date. You may cancel your subscription at any time through your account settings or by contacting us at <a href="mailto:billing@cco.dev" className="text-electric-indigo hover:underline">billing@cco.dev</a>.
          </p>
          
          <h3>5.3 Refunds</h3>
          <p>
            Except as expressly provided in these Terms, all subscription fees are non-refundable. If you cancel your subscription, you will continue to have access to the Services until the end of your current billing period, at which point your access will be terminated.
          </p>
          
          <h3>5.4 Price Changes</h3>
          <p>
            We reserve the right to change the subscription fees for the Services at any time. If we change the subscription fees, we will provide you with notice of the change at least 30 days before the change takes effect. If you do not agree to the fee change, you must cancel your subscription before the change takes effect.
          </p>
        </section>

        <section>
          <h2>6. Intellectual Property Rights</h2>
          
          <h3>6.1 Our Intellectual Property</h3>
          <p>
            The Services and their entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof), are owned by CCO, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>
          
          <h3>6.2 License to Use Services</h3>
          <p>
            Subject to your compliance with these Terms, CCO grants you a limited, non-exclusive, non-transferable, non-sublicensable license to access and use the Services for your personal or internal business purposes.
          </p>
          
          <h3>6.3 Restrictions</h3>
          <p>
            You may not:
          </p>
          <ul>
            <li>Copy, modify, distribute, sell, or lease any part of the Services or included software</li>
            <li>Reverse engineer or attempt to extract the source code of the software, unless applicable laws prohibit these restrictions</li>
            <li>Use the Services in any way not permitted by these Terms</li>
          </ul>
        </section>

        <section>
          <h2>7. Privacy</h2>
          <p>
            Your privacy is important to us. Our <Link href="/legal/privacy" className="text-electric-indigo hover:underline">Privacy Policy</Link> explains how we collect, use, and disclose information about you in connection with your use of the Services. By using the Services, you consent to our collection, use, and disclosure of information as described in our Privacy Policy.
          </p>
        </section>

        <section>
          <h2>8. Termination</h2>
          <p>
            We may terminate or suspend your access to the Services, without prior notice or liability, for any reason, including, without limitation, if you breach these Terms. Upon termination, your right to use the Services will immediately cease. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
          </p>
        </section>

        <section>
          <h2>9. Disclaimer of Warranties</h2>
          <p>
            THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. CCO DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THE SERVICES OR THE SERVERS THAT MAKE THEM AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
          </p>
        </section>

        <section>
          <h2>10. Limitation of Liability</h2>
          <p>
            IN NO EVENT WILL CCO, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE SERVICES, ANY WEBSITES LINKED TO THEM, ANY CONTENT ON THE SERVICES OR SUCH OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE.
          </p>
        </section>

        <section>
          <h2>11. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless CCO, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Services.
          </p>
        </section>

        <section>
          <h2>12. Governing Law and Jurisdiction</h2>
          <p>
            These Terms and any dispute or claim arising out of or related to them, their subject matter, or their formation (in each case, including non-contractual disputes or claims) shall be governed by and construed in accordance with the laws of the State of Texas, without giving effect to any choice or conflict of law provision or rule. Any legal suit, action, or proceeding arising out of, or related to, these Terms or the Services shall be instituted exclusively in the federal courts of the United States or the courts of the State of Texas, in each case located in the City of Austin and County of Travis. You waive any and all objections to the exercise of jurisdiction over you by such courts and to venue in such courts.
          </p>
        </section>

        <section>
          <h2>13. Miscellaneous</h2>
          
          <h3>13.1 Entire Agreement</h3>
          <p>
            These Terms constitute the entire agreement between you and CCO regarding the Services and supersede all prior and contemporaneous understandings, agreements, representations, and warranties, both written and oral, regarding the Services.
          </p>
          
          <h3>13.2 Waiver</h3>
          <p>
            No waiver by CCO of any term or condition set out in these Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of CCO to assert a right or provision under these Terms shall not constitute a waiver of such right or provision.
          </p>
          
          <h3>13.3 Severability</h3>
          <p>
            If any provision of these Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal, or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of the Terms will continue in full force and effect.
          </p>
          
          <h3>13.4 Assignment</h3>
          <p>
            You may not assign or transfer these Terms, by operation of law or otherwise, without CCO's prior written consent. Any attempt by you to assign or transfer these Terms without such consent will be null. CCO may freely assign or transfer these Terms without restriction.
          </p>
          
          <h3>13.5 Contact Information</h3>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p>
            Chief Cognitive Officer (CCO)<br />
            Attn: Legal Department<br />
            123 AI Street, Suite 456<br />
            Austin, TX 78701<br />
            Email: <a href="mailto:legal@cco.dev" className="text-electric-indigo hover:underline">legal@cco.dev</a>
          </p>
        </section>
        
        <div className="mt-12 p-6 bg-white dark:bg-obsidian rounded-lg">
          <h3 className="text-midnight-blue dark:text-cosmic-latte">Additional Resources</h3>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <Link href="/legal/privacy" className="text-electric-indigo hover:underline">
              Privacy Policy
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

export default TermsPage; 