import React from 'react';
import PageTemplate from './page-template';

// About page component
const AboutPage = () => {
  return (
    <PageTemplate 
      title="About Us" 
      description="Learn about the CCO Platform, our mission to empower vibe coders, and the team behind the innovation."
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-midnight-blue dark:text-cosmic-latte">About CCO</h1>
        
        <p className="lead mt-4 text-cosmic-grey dark:text-nebula-white">
          We're on a mission to eliminate administrative overhead for vibe coders, allowing them to focus entirely on their creative coding flow.
        </p>
        
        <h2 className="text-midnight-blue dark:text-cosmic-latte mt-12">Our Story</h2>
        <p className="text-cosmic-grey dark:text-nebula-white">
          CCO was founded in 2025 during Gauntlet AI, an AI-first engineering bootcamp in Austin, TX. The platform was created during an intensive hackathon where our team focused on solving the challenges faced by intuitive, flow-based developers.
        </p>
        
        <p className="text-cosmic-grey dark:text-nebula-white">
          As developers ourselves, we experienced firsthand how meetings, documentation, and project management disrupted our creative process and coding flow. We realized that AI had the potential to transform how developers handle these non-coding tasks. Thus, the Chief Cognitive Officer (CCO) platform was born – an AI assistant designed specifically for vibe coders to handle the cognitive overhead of software development and bridge the gap between client communication and implementation.
        </p>
        
        <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-electric-indigo bg-opacity-5 dark:bg-opacity-10 p-6 rounded-lg">
            <h3 className="text-electric-indigo mb-4">Our Mission</h3>
            <p className="text-cosmic-grey dark:text-nebula-white">
              To empower developers to focus on what they do best—coding—by automating the administrative overhead of software development.
            </p>
          </div>
          
          <div className="bg-electric-indigo bg-opacity-5 dark:bg-opacity-10 p-6 rounded-lg">
            <h3 className="text-electric-indigo mb-4">Our Vision</h3>
            <p className="text-cosmic-grey dark:text-nebula-white">
              A world where developers spend 90% of their time on creative problem-solving and coding, with AI handling the rest.
            </p>
          </div>
        </div>
        
        <h2 className="text-midnight-blue dark:text-cosmic-latte">Our Values</h2>
        <div className="space-y-6 mt-6">
          <div>
            <h3 className="text-midnight-blue dark:text-cosmic-latte">Developer-First</h3>
            <p className="text-cosmic-grey dark:text-nebula-white">
              Everything we build is designed with vibe coders in mind. We understand the unique challenges of flow-based development and create solutions that truly enhance the creative coding experience.
            </p>
          </div>
          
          <div>
            <h3 className="text-midnight-blue dark:text-cosmic-latte">AI-Augmented, Not Replaced</h3>
            <p className="text-cosmic-grey dark:text-nebula-white">
              We believe in AI as a tool to augment human capabilities, not replace them. Our platform enhances your abilities while keeping you in control of your creative process.
            </p>
          </div>
          
          <div>
            <h3 className="text-midnight-blue dark:text-cosmic-latte">Continuous Improvement</h3>
            <p className="text-cosmic-grey dark:text-nebula-white">
              We're committed to continuously improving our platform based on user feedback and emerging technologies. The CCO platform gets smarter with every interaction and adapts to your unique coding style.
            </p>
          </div>
          
          <div>
            <h3 className="text-midnight-blue dark:text-cosmic-latte">Privacy and Security</h3>
            <p className="text-cosmic-grey dark:text-nebula-white">
              We prioritize the security and privacy of your meeting data and generated content. Our platform is designed with strong privacy controls and enterprise-grade security.
            </p>
          </div>
        </div>
        
        <h2 className="mt-12 text-midnight-blue dark:text-cosmic-latte">Our Team</h2>
        <p className="text-cosmic-grey dark:text-nebula-white">
          The CCO platform was built by a talented team of engineers during the Gauntlet AI bootcamp, bringing together diverse skills and experiences to create an innovative solution for developers.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Team Member 1 */}
          <div className="text-center">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-electric-indigo to-neon-teal mb-4 flex items-center justify-center text-white text-2xl font-bold">
              RH
            </div>
            <h3 className="text-xl font-medium text-midnight-blue dark:text-cosmic-latte">Roger Hunt</h3>
            <p className="text-electric-indigo">Engineering Lead</p>
            <p className="text-cosmic-grey dark:text-nebula-white mt-2">
              Visionary engineer with a passion for creating tools that enhance developer productivity and creativity.
            </p>
          </div>
          
          {/* Team Member 2 */}
          <div className="text-center">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-electric-indigo to-neon-teal mb-4 flex items-center justify-center text-white text-2xl font-bold">
              LC
            </div>
            <h3 className="text-xl font-medium text-midnight-blue dark:text-cosmic-latte">Lamar Cannon</h3>
            <p className="text-electric-indigo">AI Specialist</p>
            <p className="text-cosmic-grey dark:text-nebula-white mt-2">
              Expert in AI systems with a focus on creating intuitive interfaces between AI and human workflows.
            </p>
          </div>
          
          {/* Team Member 3 */}
          <div className="text-center">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-electric-indigo to-neon-teal mb-4 flex items-center justify-center text-white text-2xl font-bold">
              AW
            </div>
            <h3 className="text-xl font-medium text-midnight-blue dark:text-cosmic-latte">Adam Weil</h3>
            <p className="text-electric-indigo">Full-Stack Developer</p>
            <p className="text-cosmic-grey dark:text-nebula-white mt-2">
              Skilled developer with experience building complex systems that maintain high performance and usability.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Team Member 4 */}
          <div className="text-center">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-electric-indigo to-neon-teal mb-4 flex items-center justify-center text-white text-2xl font-bold">
              PA
            </div>
            <h3 className="text-xl font-medium text-midnight-blue dark:text-cosmic-latte">Patrice Azi</h3>
            <p className="text-electric-indigo">Product Designer</p>
            <p className="text-cosmic-grey dark:text-nebula-white mt-2">
              Creative designer focused on creating seamless and intuitive user experiences for complex technical products.
            </p>
          </div>
          
          {/* Team Member 5 */}
          <div className="text-center">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-electric-indigo to-neon-teal mb-4 flex items-center justify-center text-white text-2xl font-bold">
              AO
            </div>
            <h3 className="text-xl font-medium text-midnight-blue dark:text-cosmic-latte">Abraham Obubo</h3>
            <p className="text-electric-indigo">Backend Architect</p>
            <p className="text-cosmic-grey dark:text-nebula-white mt-2">
              Specialized in creating robust backend systems that power innovative user experiences with reliability and scalability.
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-cosmic-grey dark:text-nebula-white">
            Our team came together during the Gauntlet AI bootcamp with a shared passion for creating tools that preserve the creative flow of intuitive developers. The CCO platform represents our combined vision for how AI can revolutionize the development process.
          </p>
        </div>
        
        <h2 className="mt-12 text-midnight-blue dark:text-cosmic-latte">Our Marketplace</h2>
        <p className="text-cosmic-grey dark:text-nebula-white">
          Beyond our AI assistant, we provide a unique marketplace that connects vibe coders with clients seeking their talent. Through our innovative "Chief Cognitive Officer interview" process, clients can evaluate a vibe coder's approach to problem-solving without disrupting their creative flow.
        </p>
        
        <h2 className="mt-12 text-midnight-blue dark:text-cosmic-latte">Join Our Journey</h2>
        <p className="text-cosmic-grey dark:text-nebula-white">
          We're excited to continue developing the CCO platform and expanding its capabilities. If you're passionate about using AI to improve the developer experience, we'd love to hear from you. Check out our <a href="/careers" className="text-electric-indigo hover:underline">careers page</a> for opportunities to join our team.
        </p>
        
        <div className="bg-gradient-to-r from-electric-indigo to-neon-teal p-8 rounded-lg text-white mt-12">
          <h2 className="text-white">Want to learn more?</h2>
          <p className="text-white opacity-90">
            We'd love to chat about how CCO can transform your development workflow and preserve your coding flow.
          </p>
          <a href="/contact" className="inline-block mt-4 bg-white text-electric-indigo px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all">
            Contact Us
          </a>
        </div>
      </div>
    </PageTemplate>
  );
};

export default AboutPage; 