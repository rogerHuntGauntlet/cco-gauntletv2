import React from 'react';
import PageTemplate from '../components/PageTemplate';

// Use Cases page component
const UseCasesPage = () => {
  return (
    <PageTemplate 
      title="Use Cases" 
      description="Discover how vibe coders use the CCO Platform to maintain creative flow and eliminate administrative overhead."
    >
      <div className="max-w-4xl mx-auto space-y-16">
        <header>
          <h1 className="text-midnight-blue dark:text-cosmic-latte">CCO Platform Use Cases</h1>
          <p className="lead mt-4 text-cosmic-grey dark:text-nebula-white">
            Explore how vibe coders and clients leverage the CCO Platform to streamline development processes, eliminate administrative overhead, and maintain creative coding flow.
          </p>
        </header>

        {/* Vibe Coder Use Case */}
        <section className="space-y-6">
          <h2 className="text-midnight-blue dark:text-cosmic-latte">For Vibe Coders</h2>
          
          <div className="bg-cosmic-light dark:bg-cosmic-dark rounded-lg p-8 space-y-6">
            <h3 className="text-midnight-blue dark:text-cosmic-latte">Challenge</h3>
            <p className="text-cosmic-grey dark:text-nebula-white">
              Intuitive, flow-based developers lose valuable creative momentum when forced to document meetings, create PRDs, and handle administrative tasks. Context switching between coding and documentation disrupts their natural workflow and reduces productivity.
            </p>
            
            <h3 className="text-midnight-blue dark:text-cosmic-latte">Solution</h3>
            <p className="text-cosmic-grey dark:text-nebula-white">
              The CCO Platform integrates with Zoom to provide real-time meeting assistance, automatically generating comprehensive documentation and starter code repositories. Vibe coders can focus entirely on client conversations and coding while CCO handles the administrative overhead.
            </p>
            
            <h3 className="text-midnight-blue dark:text-cosmic-latte">Results</h3>
            <ul className="list-disc pl-6 space-y-2 text-cosmic-grey dark:text-nebula-white">
              <li>35% increase in time spent in coding flow state</li>
              <li>Complete elimination of manual note-taking and documentation</li>
              <li>Immediate code scaffolding generation after client meetings</li>
              <li>Zero context switching between creative and administrative tasks</li>
            </ul>
            
            <blockquote className="italic border-l-4 border-cosmic-blue pl-4 mt-6 text-cosmic-grey dark:text-nebula-white">
              "CCO has completely transformed my workflow. I can stay in my creative flow during client meetings and jump straight into coding afterward without the usual documentation overhead. The starter code repositories it generates save me hours of setup time."
              <footer className="mt-2 font-medium text-midnight-blue dark:text-cosmic-latte">— Alex Chen, Freelance Vibe Coder</footer>
            </blockquote>
          </div>
        </section>

        {/* Client Finding Vibe Coders Use Case */}
        <section className="space-y-6">
          <h2 className="text-midnight-blue dark:text-cosmic-latte">For Clients Seeking Developers</h2>
          
          <div className="bg-cosmic-light dark:bg-cosmic-dark rounded-lg p-8 space-y-6">
            <h3 className="text-midnight-blue dark:text-cosmic-latte">Challenge</h3>
            <p className="text-cosmic-grey dark:text-nebula-white">
              Finding the right developer for creative projects is challenging. Traditional interviews often fail to reveal a developer's true problem-solving abilities, and portfolio reviews provide limited insight into how they would approach your specific project.
            </p>
            
            <h3 className="text-midnight-blue dark:text-cosmic-latte">Solution</h3>
            <p className="text-cosmic-grey dark:text-nebula-white">
              The CCO Platform's marketplace allows clients to "interview" vibe coders' "Chief Cognitive Officers" (CCOs) to evaluate their problem-solving approach and technical expertise. This revolutionary process provides deeper insight into how developers think and work without disrupting their creative flow.
            </p>
            
            <h3 className="text-midnight-blue dark:text-cosmic-latte">Results</h3>
            <ul className="list-disc pl-6 space-y-2 text-cosmic-grey dark:text-nebula-white">
              <li>85% better match rate between clients and vibe coders</li>
              <li>50% reduction in time spent finding the right developer</li>
              <li>More accurate assessment of technical capabilities</li>
              <li>Clearer understanding of problem-solving approaches</li>
            </ul>
            
            <blockquote className="italic border-l-4 border-cosmic-blue pl-4 mt-6 text-cosmic-grey dark:text-nebula-white">
              "The Chief Cognitive Officer interview process revealed insights about developers that traditional interviews never could. We found the perfect vibe coder for our project in half the time, and the automated documentation kept everyone aligned throughout."
              <footer className="mt-2 font-medium text-midnight-blue dark:text-cosmic-latte">— Maria Rodriguez, Startup Founder</footer>
            </blockquote>
          </div>
        </section>

        {/* Remote-First Teams Use Case */}
        <section className="space-y-6">
          <h2 className="text-midnight-blue dark:text-cosmic-latte">For Remote-First Development Teams</h2>
          
          <div className="bg-cosmic-light dark:bg-cosmic-dark rounded-lg p-8 space-y-6">
            <h3 className="text-midnight-blue dark:text-cosmic-latte">Challenge</h3>
            <p className="text-cosmic-grey dark:text-nebula-white">
              Distributed vibe coder teams across different time zones struggle with maintaining collaborative flow. Knowledge sharing is inconsistent, and asynchronous communication often lacks the context needed for effective decision-making.
            </p>
            
            <h3 className="text-midnight-blue dark:text-cosmic-latte">Solution</h3>
            <p className="text-cosmic-grey dark:text-nebula-white">
              CCO Platform provides comprehensive meeting summaries, searchable transcripts, and automatic code repository generation that makes asynchronous work more effective. Team members can quickly get up to speed on discussions they missed and immediately access generated code.
            </p>
            
            <h3 className="text-midnight-blue dark:text-cosmic-latte">Results</h3>
            <ul className="list-disc pl-6 space-y-2 text-cosmic-grey dark:text-nebula-white">
              <li>40% reduction in synchronous meetings required</li>
              <li>Seamless knowledge transfer across time zones</li>
              <li>Consistent documentation accessible to all team members</li>
              <li>Faster onboarding of new team members with complete context</li>
            </ul>
            
            <blockquote className="italic border-l-4 border-cosmic-blue pl-4 mt-6 text-cosmic-grey dark:text-nebula-white">
              "As a fully remote team of vibe coders across 12 time zones, CCO has been transformative. Our team members start their day by reviewing AI-generated summaries and code repositories from meetings that happened while they were asleep."
              <footer className="mt-2 font-medium text-midnight-blue dark:text-cosmic-latte">— Miguel Torres, CTO at RemoteFlow</footer>
            </blockquote>
          </div>
        </section>

        {/* Code Repository Generation Use Case */}
        <section className="space-y-6">
          <h2 className="text-midnight-blue dark:text-cosmic-latte">Code Repository Generation</h2>
          
          <div className="bg-cosmic-light dark:bg-cosmic-dark rounded-lg p-8 space-y-6">
            <h3 className="text-midnight-blue dark:text-cosmic-latte">Challenge</h3>
            <p className="text-cosmic-grey dark:text-nebula-white">
              Starting a new project requires significant setup time. Vibe coders must transition from client discussions to project scaffolding, creating repositories, setting up file structures, and implementing basic functionality before they can begin the creative coding process.
            </p>
            
            <h3 className="text-midnight-blue dark:text-cosmic-latte">Solution</h3>
            <p className="text-cosmic-grey dark:text-nebula-white">
              CCO Platform automatically generates starter code repositories based on meeting discussions. The platform analyzes requirements and creates appropriate project scaffolding with basic implementation, allowing vibe coders to immediately dive into the creative aspects of development.
            </p>
            
            <h3 className="text-midnight-blue dark:text-cosmic-latte">Results</h3>
            <ul className="list-disc pl-6 space-y-2 text-cosmic-grey dark:text-nebula-white">
              <li>70% reduction in project setup time</li>
              <li>Immediate transition from client meetings to actual coding</li>
              <li>Consistent repository structure aligned with requirements</li>
              <li>Elimination of repetitive scaffolding tasks</li>
            </ul>
            
            <blockquote className="italic border-l-4 border-cosmic-blue pl-4 mt-6 text-cosmic-grey dark:text-nebula-white">
              "The code repository generation feature alone is worth it. After a client meeting, I have a complete starter repo with all the basic scaffolding ready to go. I can immediately jump into the creative implementation without wasting time on setup."
              <footer className="mt-2 font-medium text-midnight-blue dark:text-cosmic-latte">— Priya Sharma, Independent Vibe Coder</footer>
            </blockquote>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-cosmic-blue-light dark:bg-cosmic-indigo-dark rounded-lg p-8 text-center shadow-lg">
          <h2 className="text-white dark:text-cosmic-latte font-bold mb-4">Ready to enhance your creative coding flow?</h2>
          <p className="text-white dark:text-cosmic-latte dark:text-opacity-95 mb-6">
            Join innovative vibe coders already using CCO Platform to eliminate administrative overhead and maximize their creative potential.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/landing/pricing" className="px-6 py-3 bg-white dark:bg-cosmic-latte text-cosmic-blue hover:bg-gray-100 dark:hover:bg-cosmic-latte/90 rounded-md font-medium transition-colors">
              View Pricing
            </a>
            <a href="/landing/contact" className="px-6 py-3 bg-transparent border border-white dark:border-cosmic-latte text-white dark:text-cosmic-latte hover:bg-cosmic-indigo-light dark:hover:bg-cosmic-indigo-light/30 rounded-md font-medium transition-colors">
              Contact Sales
            </a>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default UseCasesPage; 