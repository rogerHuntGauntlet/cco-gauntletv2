import React, { useState } from 'react';
import PageTemplate from '../components/PageTemplate';

// Contact page component
// Added for landing-page-updates branch to create PR
const ContactPage = () => {
  // Form state management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'General Inquiry',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, this would send the form data to a server
    // This is a placeholder to simulate form submission
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        error: false,
        message: 'Thank you for your message! We\'ll get back to you soon.'
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 1000);
  };

  return (
    <PageTemplate 
      title="Contact Us" 
      description="Get in touch with the CCO Platform team for questions, support, or partnership opportunities."
    >
      <div className="max-w-4xl mx-auto space-y-10">
        <header>
          <h1 className="text-midnight-blue dark:text-cosmic-latte">Contact Us</h1>
          <p className="lead mt-4 text-cosmic-grey dark:text-nebula-white">
            We'd love to hear from you. Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <section className="bg-cosmic-light dark:bg-cosmic-dark p-8 rounded-lg">
            <h2 className="mb-6 text-midnight-blue dark:text-cosmic-latte">Send Us a Message</h2>
            
            {formStatus.submitted ? (
              <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-100 p-4 rounded-md">
                {formStatus.message}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-1 font-medium text-midnight-blue dark:text-cosmic-latte">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-cosmic-black text-midnight-blue dark:text-cosmic-latte"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-1 font-medium text-midnight-blue dark:text-cosmic-latte">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-cosmic-black text-midnight-blue dark:text-cosmic-latte"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block mb-1 font-medium text-midnight-blue dark:text-cosmic-latte">
                    Company Name
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-cosmic-black text-midnight-blue dark:text-cosmic-latte"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-1 font-medium text-midnight-blue dark:text-cosmic-latte">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-cosmic-black text-midnight-blue dark:text-cosmic-latte"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Product Question">Product Question</option>
                    <option value="Sales">Sales</option>
                    <option value="Support">Support</option>
                    <option value="Partnership">Partnership</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-1 font-medium text-midnight-blue dark:text-cosmic-latte">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-cosmic-black text-midnight-blue dark:text-cosmic-latte"
                  />
                </div>
                
                <button
                  type="submit"
                  className="px-6 py-2 bg-cosmic-blue text-white rounded-md hover:bg-cosmic-indigo transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </section>
          
          {/* Contact Information */}
          <section className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-3 text-midnight-blue dark:text-cosmic-latte">Contact Information</h3>
              <address className="not-italic space-y-2 text-cosmic-grey dark:text-nebula-white">
                <p>
                  <strong className="text-midnight-blue dark:text-cosmic-latte">CCO Platform Headquarters</strong><br />
                  123 AI Avenue<br />
                  San Francisco, CA 94105<br />
                  United States
                </p>
                <p>
                  <strong className="text-midnight-blue dark:text-cosmic-latte">Email:</strong><br />
                  <a href="mailto:hello@cco-platform.com" className="text-cosmic-blue hover:text-cosmic-indigo dark:text-cosmic-indigo-light dark:hover:text-cosmic-blue-light">
                    hello@cco-platform.com
                  </a>
                </p>
                <p>
                  <strong className="text-midnight-blue dark:text-cosmic-latte">Phone:</strong><br />
                  <a href="tel:+17813202501" className="text-cosmic-blue hover:text-cosmic-indigo dark:text-cosmic-indigo-light dark:hover:text-cosmic-blue-light">
                    +1 (781) 320-2501
                  </a>
                </p>
              </address>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3 text-midnight-blue dark:text-cosmic-latte">Support</h3>
              <p className="mb-2 text-cosmic-grey dark:text-nebula-white">
                For technical support or help with your account:
              </p>
              <p>
                <a href="mailto:support@cco-platform.com" className="text-cosmic-blue hover:text-cosmic-indigo dark:text-cosmic-indigo-light dark:hover:text-cosmic-blue-light">
                  support@cco-platform.com
                </a>
              </p>
              <p className="mt-4 text-cosmic-grey dark:text-nebula-white">
                Visit our <a href="/documentation" className="text-cosmic-blue hover:text-cosmic-indigo dark:text-cosmic-indigo-light dark:hover:text-cosmic-blue-light">documentation</a> for guides and tutorials.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3 text-midnight-blue dark:text-cosmic-latte">Sales</h3>
              <p className="mb-2 text-cosmic-grey dark:text-nebula-white">
                For pricing, demos, or enterprise plans:
              </p>
              <p>
                <a href="mailto:sales@cco-platform.com" className="text-cosmic-blue hover:text-cosmic-indigo dark:text-cosmic-indigo-light dark:hover:text-cosmic-blue-light">
                  sales@cco-platform.com
                </a>
              </p>
              <p className="mt-2">
                <a href="tel:+17813202501" className="text-cosmic-blue hover:text-cosmic-indigo dark:text-cosmic-indigo-light dark:hover:text-cosmic-blue-light">
                  +1 (781) 320-2501
                </a>
              </p>
            </div>
          </section>
        </div>
        
        {/* Map or additional content */}
        <section className="mt-10 bg-cosmic-light dark:bg-cosmic-dark p-4 rounded-lg text-center">
          <p className="text-sm text-cosmic-grey dark:text-nebula-white">
            Visit us at our headquarters in San Francisco's tech district.
            <br />
            {/* In a real implementation, this would include an embedded map */}
            [Map Placeholder]
          </p>
        </section>
      </div>
    </PageTemplate>
  );
};

export default ContactPage; 