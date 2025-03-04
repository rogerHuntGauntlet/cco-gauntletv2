import React, { useState } from 'react';
import PageTemplate from './page-template';
import Link from 'next/link';

const SupportPage = () => {
  // State for contact form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  });
  
  // Handler for form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would submit the form data
    alert('Your support request has been submitted. We\'ll get back to you soon!');
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'medium'
    });
  };
  
  // Common support topics
  const supportTopics = [
    {
      title: 'Account & Billing',
      icon: '👤',
      questions: [
        'How do I change my subscription plan?',
        'Can I get a refund after purchasing?',
        'How do I update my payment method?',
        'What happens when my trial ends?',
        'How do I cancel my subscription?'
      ]
    },
    {
      title: 'Installation & Setup',
      icon: '🔧',
      questions: [
        'How do I install the CCO CLI?',
        'What are the system requirements?',
        'How do I connect my calendar?',
        'Can I use CCO with my existing tools?',
        'How do I set up team access?'
      ]
    },
    {
      title: 'Features & Usage',
      icon: '✨',
      questions: [
        'How does the meeting transcription work?',
        'Can I customize the documentation output?',
        'How accurate is the action item detection?',
        'Can CCO integrate with my task management tool?',
        'How do I share meeting notes with non-users?'
      ]
    },
    {
      title: 'Troubleshooting',
      icon: '🔍',
      questions: [
        'CCO isn\'t connecting to my calendar',
        'My meeting wasn\'t transcribed correctly',
        'I\'m getting authentication errors',
        'The documentation is missing information',
        'The CLI commands aren\'t working'
      ]
    }
  ];

  return (
    <PageTemplate 
      title="Support" 
      description="Get help with CCO. Browse our knowledge base, check FAQs, or contact our support team directly."
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-midnight-blue dark:text-cosmic-latte mb-6">Support Center</h1>
          <p className="text-cosmic-grey dark:text-nebula-white max-w-3xl mx-auto text-lg">
            Have questions or need help with CCO? Our support team is here to assist you. Browse common topics below or reach out directly.
          </p>
          
          {/* Search box */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help articles..."
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-obsidian text-midnight-blue dark:text-nebula-white border border-cosmic-grey dark:border-stardust border-opacity-20 dark:border-opacity-20 focus:outline-none focus:ring-2 focus:ring-electric-indigo"
              />
              <div className="absolute right-3 top-3 text-cosmic-grey dark:text-stardust">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Support resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-obsidian rounded-xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-cosmic-grey border-opacity-10 dark:border-stardust dark:border-opacity-10">
              <h2 className="text-xl font-bold text-midnight-blue dark:text-cosmic-latte flex items-center">
                <svg className="w-6 h-6 mr-2 text-electric-indigo" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Documentation
              </h2>
            </div>
            <div className="p-6">
              <p className="text-cosmic-grey dark:text-nebula-white mb-4">
                Our comprehensive documentation covers everything from getting started to advanced usage and API reference.
              </p>
              <Link href="/landing/documentation" className="inline-block text-electric-indigo font-medium hover:underline">
                Browse Documentation →
              </Link>
            </div>
          </div>
          
          <div className="bg-white dark:bg-obsidian rounded-xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-cosmic-grey border-opacity-10 dark:border-stardust dark:border-opacity-10">
              <h2 className="text-xl font-bold text-midnight-blue dark:text-cosmic-latte flex items-center">
                <svg className="w-6 h-6 mr-2 text-electric-indigo" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                FAQ
              </h2>
            </div>
            <div className="p-6">
              <p className="text-cosmic-grey dark:text-nebula-white mb-4">
                Find answers to frequently asked questions about CCO, from account management to troubleshooting common issues.
              </p>
              <Link href="/landing/documentation#faq" className="inline-block text-electric-indigo font-medium hover:underline">
                View FAQ →
              </Link>
            </div>
          </div>
          
          <div className="bg-white dark:bg-obsidian rounded-xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-cosmic-grey border-opacity-10 dark:border-stardust dark:border-opacity-10">
              <h2 className="text-xl font-bold text-midnight-blue dark:text-cosmic-latte flex items-center">
                <svg className="w-6 h-6 mr-2 text-electric-indigo" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Community
              </h2>
            </div>
            <div className="p-6">
              <p className="text-cosmic-grey dark:text-nebula-white mb-4">
                Join our community of developers to ask questions, share tips, and connect with other CCO users.
              </p>
              <Link href="/landing/community" className="inline-block text-electric-indigo font-medium hover:underline">
                Join Community →
              </Link>
            </div>
          </div>
          
          <div className="bg-white dark:bg-obsidian rounded-xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-cosmic-grey border-opacity-10 dark:border-stardust dark:border-opacity-10">
              <h2 className="text-xl font-bold text-midnight-blue dark:text-cosmic-latte flex items-center">
                <svg className="w-6 h-6 mr-2 text-electric-indigo" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Video Tutorials
              </h2>
            </div>
            <div className="p-6">
              <p className="text-cosmic-grey dark:text-nebula-white mb-4">
                Watch step-by-step video tutorials to learn how to use CCO's features and get the most out of the platform.
              </p>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="inline-block text-electric-indigo font-medium hover:underline">
                Watch Tutorials →
              </a>
            </div>
          </div>
        </div>
        
        {/* Common support topics */}
        <h2 className="text-2xl font-bold text-midnight-blue dark:text-cosmic-latte mb-8 text-center">Common Support Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 mb-16">
          {supportTopics.map((topic, index) => (
            <div key={index}>
              <h3 className="text-xl font-bold text-midnight-blue dark:text-cosmic-latte mb-4 flex items-center">
                <span className="text-2xl mr-2">{topic.icon}</span>
                {topic.title}
              </h3>
              <ul className="space-y-3">
                {topic.questions.map((question, qIndex) => (
                  <li key={qIndex}>
                    <a href="#" className="text-cosmic-grey dark:text-nebula-white hover:text-electric-indigo dark:hover:text-electric-indigo flex items-start">
                      <svg className="w-5 h-5 mr-2 mt-0.5 text-electric-indigo" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {question}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Contact form */}
        <div className="bg-white dark:bg-obsidian rounded-xl shadow-sm p-8 mb-16">
          <h2 className="text-2xl font-bold text-midnight-blue dark:text-cosmic-latte mb-6 text-center">Contact Support</h2>
          <p className="text-cosmic-grey dark:text-nebula-white text-center mb-8 max-w-2xl mx-auto">
            Couldn't find what you're looking for? Our support team is here to help. Fill out the form below and we'll get back to you as soon as possible.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-midnight-blue dark:text-cosmic-latte mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md bg-white dark:bg-obsidian text-midnight-blue dark:text-nebula-white border border-cosmic-grey dark:border-stardust border-opacity-20 dark:border-opacity-20 focus:outline-none focus:ring-2 focus:ring-electric-indigo"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-midnight-blue dark:text-cosmic-latte mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md bg-white dark:bg-obsidian text-midnight-blue dark:text-nebula-white border border-cosmic-grey dark:border-stardust border-opacity-20 dark:border-opacity-20 focus:outline-none focus:ring-2 focus:ring-electric-indigo"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="subject" className="block text-midnight-blue dark:text-cosmic-latte mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-white dark:bg-obsidian text-midnight-blue dark:text-nebula-white border border-cosmic-grey dark:border-stardust border-opacity-20 dark:border-opacity-20 focus:outline-none focus:ring-2 focus:ring-electric-indigo"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-midnight-blue dark:text-cosmic-latte mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-2 rounded-md bg-white dark:bg-obsidian text-midnight-blue dark:text-nebula-white border border-cosmic-grey dark:border-stardust border-opacity-20 dark:border-opacity-20 focus:outline-none focus:ring-2 focus:ring-electric-indigo"
                required
              ></textarea>
            </div>
            
            <div className="mb-6">
              <label htmlFor="priority" className="block text-midnight-blue dark:text-cosmic-latte mb-2">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-white dark:bg-obsidian text-midnight-blue dark:text-nebula-white border border-cosmic-grey dark:border-stardust border-opacity-20 dark:border-opacity-20 focus:outline-none focus:ring-2 focus:ring-electric-indigo"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-electric-indigo to-neon-teal text-white rounded-md font-medium hover:opacity-90 transition-all"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
        
        {/* Support information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-obsidian rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-electric-indigo bg-opacity-10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-electric-indigo" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-midnight-blue dark:text-cosmic-latte mb-2">Email Support</h3>
            <p className="text-cosmic-grey dark:text-nebula-white">
              <a href="mailto:support@cco.dev" className="hover:text-electric-indigo">support@cco.dev</a>
            </p>
          </div>
          
          <div className="bg-white dark:bg-obsidian rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-electric-indigo bg-opacity-10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-electric-indigo" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-midnight-blue dark:text-cosmic-latte mb-2">Live Chat</h3>
            <p className="text-cosmic-grey dark:text-nebula-white">
              Available Monday-Friday<br />9am-5pm EST
            </p>
          </div>
          
          <div className="bg-white dark:bg-obsidian rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-electric-indigo bg-opacity-10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-electric-indigo" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-midnight-blue dark:text-cosmic-latte mb-2">Phone Support</h3>
            <p className="text-cosmic-grey dark:text-nebula-white">
              Premium plans only<br />
              <a href="tel:+17813202501" className="hover:text-electric-indigo">+1 (781) 320-2501</a>
            </p>
          </div>
        </div>
        
        {/* FAQ CTA */}
        <div className="bg-gradient-to-r from-electric-indigo to-neon-teal rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="mb-6 opacity-90 max-w-2xl mx-auto">
            Check out our comprehensive FAQ section for quick answers to common questions about CCO features, account management, and troubleshooting.
          </p>
          <Link href="/landing/documentation#faq" className="inline-block bg-white text-electric-indigo px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all">
            View FAQ
          </Link>
        </div>
      </div>
    </PageTemplate>
  );
};

export default SupportPage; 