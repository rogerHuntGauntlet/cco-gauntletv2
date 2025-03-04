import React from 'react';
import PageTemplate from '../company/page-template';
import Link from 'next/link';

const CareersPage = () => {
  // Sample job listings
  const jobs = [
    {
      id: 1,
      title: 'AI Engineer',
      location: 'Remote, US',
      department: 'Engineering',
      type: 'Full-time',
      description: 'We\'re looking for an AI/ML engineer with experience in natural language processing to help improve our meeting transcription and summarization capabilities.',
      requirements: [
        'Master\'s or PhD in Computer Science, Machine Learning, or related field',
        '3+ years experience with modern NLP techniques and frameworks',
        'Experience with generative AI models and fine-tuning',
        'Strong Python skills and experience with PyTorch or TensorFlow',
        'Experience deploying ML models in production environments'
      ]
    },
    {
      id: 2,
      title: 'Senior Frontend Engineer',
      location: 'Austin, TX or Remote',
      department: 'Engineering',
      type: 'Full-time',
      description: 'Join our frontend team to build intuitive, responsive interfaces that help developers manage their meetings and documentation effortlessly.',
      requirements: [
        '5+ years of experience with modern JavaScript frameworks (React preferred)',
        'Strong TypeScript skills and understanding of type systems',
        'Experience with state management (Redux, Context API, etc.)',
        'Knowledge of modern CSS practices and frameworks',
        'Eye for design and passion for creating great user experiences'
      ]
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      location: 'Remote, US',
      department: 'Engineering',
      type: 'Full-time',
      description: 'Help build and maintain our cloud infrastructure, ensuring our services are scalable, reliable, and secure.',
      requirements: [
        '3+ years experience with AWS or other cloud providers',
        'Experience with containerization (Docker, Kubernetes)',
        'Strong knowledge of CI/CD pipelines and infrastructure as code',
        'Familiarity with monitoring and observability tools',
        'Experience with security best practices in cloud environments'
      ]
    },
    {
      id: 4,
      title: 'Product Designer',
      location: 'Austin, TX or Remote',
      department: 'Design',
      type: 'Full-time',
      description: 'Design beautiful, intuitive interfaces that make complex AI features accessible and useful for developers.',
      requirements: [
        '3+ years of product design experience, preferably for developer tools or B2B SaaS',
        'Strong portfolio demonstrating UX/UI design skills',
        'Experience with modern design tools (Figma, Sketch, etc.)',
        'Understanding of design systems and component-based design',
        'Ability to translate user research into design decisions'
      ]
    },
    {
      id: 5,
      title: 'Technical Content Writer',
      location: 'Remote, US',
      department: 'Marketing',
      type: 'Full-time',
      description: 'Create compelling content that showcases the value of CCO for developers and engineering teams.',
      requirements: [
        'Strong technical background with understanding of software development',
        'Excellent writing skills with ability to explain complex concepts clearly',
        'Experience creating technical blog posts, whitepapers, or documentation',
        'Understanding of SEO best practices',
        'Portfolio of technical writing samples'
      ]
    }
  ];

  // Values and benefits
  const values = [
    {
      title: 'Remote-First Culture',
      description: 'We believe in hiring the best talent regardless of location. Our team is distributed across the US, and we\'ve built our culture around effective remote collaboration.',
      icon: '🌎'
    },
    {
      title: 'Work-Life Balance',
      description: 'We practice what we preach. By eliminating unnecessary meetings and administrative overhead, we create space for deep work and personal time.',
      icon: '⚖️'
    },
    {
      title: 'Continuous Learning',
      description: 'The AI landscape is constantly evolving. We provide a generous learning stipend and dedicated time for professional development.',
      icon: '📚'
    },
    {
      title: 'Transparent Communication',
      description: 'We share company metrics, challenges, and successes openly. Everyone has context on how their work contributes to our mission.',
      icon: '🔍'
    }
  ];

  const benefits = [
    'Competitive salary and equity',
    'Comprehensive health, dental, and vision coverage',
    'Flexible vacation policy',
    'Home office stipend',
    'Annual learning and development budget',
    'Regular company retreats',
    'Wellness program',
    '401(k) with company match'
  ];

  return (
    <PageTemplate 
      title="Careers at CCO" 
      description="Join our mission to eliminate administrative overhead for developers. Explore current openings and learn about our culture."
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-midnight-blue dark:text-cosmic-latte mb-6">Join Our Team</h1>
          <p className="text-cosmic-grey dark:text-nebula-white max-w-3xl mx-auto text-lg">
            We're building tools that give developers back their time and mental space to focus on what they do best — coding. If you're passionate about AI, developer experience, and solving real problems, we'd love to hear from you.
          </p>
        </div>
        
        {/* Current openings */}
        <h2 className="text-midnight-blue dark:text-cosmic-latte mb-8 text-center">Current Openings</h2>
        <div className="grid grid-cols-1 gap-6 mb-16">
          {jobs.map(job => (
            <div key={job.id} className="bg-white dark:bg-obsidian rounded-xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-cosmic-grey border-opacity-10 dark:border-stardust dark:border-opacity-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-midnight-blue dark:text-cosmic-latte">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <span className="inline-flex items-center text-cosmic-grey dark:text-nebula-white text-sm">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location}
                      </span>
                      <span className="inline-flex items-center text-cosmic-grey dark:text-nebula-white text-sm">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {job.department}
                      </span>
                      <span className="inline-flex items-center text-cosmic-grey dark:text-nebula-white text-sm">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <Link href={`/landing/careers/${job.id}`} className="mt-4 md:mt-0 inline-block bg-gradient-to-r from-electric-indigo to-neon-teal text-white px-6 py-2 rounded-md font-medium hover:opacity-90 transition-all">
                    Apply Now
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <p className="text-cosmic-grey dark:text-nebula-white mb-4">{job.description}</p>
                <h4 className="font-medium text-midnight-blue dark:text-cosmic-latte mb-2">Requirements:</h4>
                <ul className="list-disc list-inside space-y-1 text-cosmic-grey dark:text-nebula-white">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        {/* Our values */}
        <h2 className="text-midnight-blue dark:text-cosmic-latte mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {values.map((value, index) => (
            <div key={index} className="bg-white dark:bg-obsidian rounded-xl p-6 shadow-sm">
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold text-midnight-blue dark:text-cosmic-latte mb-2">{value.title}</h3>
              <p className="text-cosmic-grey dark:text-nebula-white">{value.description}</p>
            </div>
          ))}
        </div>
        
        {/* Benefits */}
        <div className="bg-electric-indigo bg-opacity-5 dark:bg-opacity-10 rounded-xl p-8 mb-16">
          <h2 className="text-midnight-blue dark:text-cosmic-latte mb-6 text-center">Benefits & Perks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white dark:bg-obsidian rounded-lg p-4 shadow-sm flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-electric-indigo to-neon-teal flex items-center justify-center text-white mr-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-cosmic-grey dark:text-nebula-white">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* No matching positions */}
        <div className="bg-gradient-to-r from-electric-indigo to-neon-teal rounded-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Don't see a matching position?</h2>
            <p className="mb-6 opacity-90">
              We're always looking for talented individuals who are passionate about our mission. If you think you'd be a great fit for CCO but don't see a relevant opening, we'd still love to hear from you.
            </p>
            <Link href="/landing/contact" className="inline-block bg-white text-electric-indigo px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default CareersPage; 