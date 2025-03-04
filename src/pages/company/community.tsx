import React from 'react';
import PageTemplate from '../components/PageTemplate';

const CommunityPage = () => {
  // Example recent discussions data
  const recentDiscussions = [
    {
      id: 1,
      title: "Best practices for organizing meeting notes",
      author: "Sarah Chen",
      avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      date: "2 hours ago",
      replies: 18,
      views: 142,
      category: "Best Practices",
      excerpt: "I've been using CCO for a few months now and I'm trying to figure out the best way to organize all the meeting notes and action items. What's working for everyone else?"
    },
    {
      id: 2,
      title: "API integration with Slack - webhook issues",
      author: "Miguel Rodriguez",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "Yesterday",
      replies: 24,
      views: 237,
      category: "Integrations",
      excerpt: "Has anyone successfully set up the Slack integration to post meeting summaries to a channel? I'm having trouble with the webhook configuration."
    },
    {
      id: 3,
      title: "Feature request: Custom AI prompts for different meeting types",
      author: "Alex Johnson",
      avatarUrl: "https://randomuser.me/api/portraits/men/43.jpg",
      date: "3 days ago",
      replies: 31,
      views: 412,
      category: "Feature Requests",
      excerpt: "It would be great if we could create custom AI prompts for different types of meetings (standups, one-on-ones, client meetings, etc.) to get more tailored summaries."
    },
    {
      id: 4,
      title: "How do you handle sensitive information in transcripts?",
      author: "Rachel Kim",
      avatarUrl: "https://randomuser.me/api/portraits/women/63.jpg",
      date: "4 days ago",
      replies: 16,
      views: 193,
      category: "Security",
      excerpt: "Our team sometimes discusses sensitive information during meetings. What's the best approach to handle this with CCO? Are there any redaction features?"
    },
    {
      id: 5,
      title: "CCO saved my team 10+ hours per week - here's how",
      author: "David Miller",
      avatarUrl: "https://randomuser.me/api/portraits/men/11.jpg",
      date: "1 week ago",
      replies: 47,
      views: 821,
      category: "Success Stories",
      excerpt: "Just wanted to share how we've integrated CCO into our workflow and the incredible time savings we've experienced. Here's our process..."
    }
  ];

  // Example categories with post counts
  const categories = [
    { name: "General Discussion", count: 487, icon: "💬" },
    { name: "Feature Requests", count: 342, icon: "💡" },
    { name: "Integrations", count: 215, icon: "🔄" },
    { name: "Best Practices", count: 189, icon: "✅" },
    { name: "Success Stories", count: 124, icon: "🏆" },
    { name: "Bug Reports", count: 98, icon: "🐛" },
    { name: "API", count: 76, icon: "🧩" },
    { name: "Security", count: 45, icon: "🔒" }
  ];

  // Example featured members
  const featuredMembers = [
    {
      name: "Emily Watson",
      avatarUrl: "https://randomuser.me/api/portraits/women/8.jpg",
      role: "Community Champion",
      contributions: 342,
      joined: "Feb 2022"
    },
    {
      name: "Rajesh Patel",
      avatarUrl: "https://randomuser.me/api/portraits/men/4.jpg",
      role: "Integration Expert",
      contributions: 287,
      joined: "May 2022"
    },
    {
      name: "Olivia Martinez",
      avatarUrl: "https://randomuser.me/api/portraits/women/23.jpg",
      role: "Documentation Contributor",
      contributions: 215,
      joined: "Aug 2022"
    },
    {
      name: "Thomas Lee",
      avatarUrl: "https://randomuser.me/api/portraits/men/36.jpg",
      role: "API Specialist",
      contributions: 178,
      joined: "Nov 2022"
    }
  ];

  // Example upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "CCO Platform Office Hours",
      date: "Aug 15, 2023",
      time: "2:00 PM - 3:30 PM EDT",
      location: "Virtual (Zoom)",
      description: "Join our product team for open office hours to ask questions, provide feedback, and learn tips and tricks for getting the most out of CCO."
    },
    {
      id: 2,
      title: "Advanced AI Summarization Workshop",
      date: "Aug 22, 2023",
      time: "11:00 AM - 12:30 PM EDT",
      location: "Virtual (Zoom)",
      description: "Learn how to customize and fine-tune CCO's AI to produce better meeting summaries tailored to your team's specific needs."
    },
    {
      id: 3,
      title: "CCO API: Building Custom Integrations",
      date: "Sept 5, 2023",
      time: "1:00 PM - 3:00 PM EDT",
      location: "Virtual (Zoom)",
      description: "A technical workshop on using the CCO API to build custom integrations with your existing tools and workflows."
    }
  ];

  return (
    <PageTemplate 
      title="Community" 
      description="Join the CCO community to connect with other users, share knowledge, and get help"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-midnight-blue dark:text-cosmic-latte">CCO Community</h1>
          <p className="lead mt-4 text-cosmic-grey dark:text-nebula-white max-w-2xl mx-auto">
            Connect with other CCO users, share knowledge, and get help from a community of developers and teams using our platform.
          </p>
        </header>

        {/* Community stats */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-cosmic-light dark:bg-cosmic-dark p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-electric-indigo mb-2">28,500+</div>
              <div className="text-cosmic-grey dark:text-nebula-white">Community Members</div>
            </div>
            <div className="bg-cosmic-light dark:bg-cosmic-dark p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-electric-indigo mb-2">15,000+</div>
              <div className="text-cosmic-grey dark:text-nebula-white">Discussion Threads</div>
            </div>
            <div className="bg-cosmic-light dark:bg-cosmic-dark p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-electric-indigo mb-2">95%</div>
              <div className="text-cosmic-grey dark:text-nebula-white">Questions Answered</div>
            </div>
          </div>
        </section>

        {/* Join CTA */}
        <section className="mb-16 bg-gradient-to-r from-electric-indigo to-neon-teal p-8 rounded-lg text-white text-center">
          <h2 className="text-white text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="text-white opacity-90 mb-6 max-w-2xl mx-auto">
            Get help, share ideas, and connect with other CCO users from around the world. 
            Our community is a place to learn, contribute, and grow together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#" className="inline-block px-6 py-3 bg-white text-electric-indigo font-medium rounded-md hover:bg-opacity-90 transition-colors">
              Sign Up
            </a>
            <a href="#" className="inline-block px-6 py-3 bg-white/20 text-white font-medium rounded-md hover:bg-white/30 transition-colors">
              Browse Discussions
            </a>
          </div>
        </section>

        {/* Recent discussions and categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Categories */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-midnight-blue dark:text-cosmic-latte mb-6">
              Categories
            </h2>
            
            <div className="bg-cosmic-light dark:bg-cosmic-dark rounded-lg overflow-hidden">
              <div className="divide-y divide-cosmic-grey/10">
                {categories.map((category, index) => (
                  <a 
                    key={index} 
                    href="#" 
                    className="flex items-center justify-between p-4 hover:bg-cosmic-grey/5 transition-colors"
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{category.icon}</span>
                      <span className="text-midnight-blue dark:text-cosmic-latte font-medium">
                        {category.name}
                      </span>
                    </div>
                    <span className="text-sm text-cosmic-grey dark:text-nebula-grey bg-cosmic-grey/10 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Recent discussions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-midnight-blue dark:text-cosmic-latte mb-6">
              Recent Discussions
            </h2>
            
            <div className="space-y-6">
              {recentDiscussions.map((discussion) => (
                <div key={discussion.id} className="bg-cosmic-light dark:bg-cosmic-dark p-6 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-electric-indigo/10 text-electric-indigo dark:bg-electric-indigo/20 rounded-full">
                      {discussion.category}
                    </span>
                    <span className="text-sm text-cosmic-grey dark:text-nebula-grey">
                      {discussion.date}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-midnight-blue dark:text-cosmic-latte mb-2">
                    <a href="#" className="hover:text-electric-indigo transition-colors">
                      {discussion.title}
                    </a>
                  </h3>
                  
                  <p className="text-cosmic-grey dark:text-nebula-white mb-4 line-clamp-2">
                    {discussion.excerpt}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img 
                        src={discussion.avatarUrl} 
                        alt={discussion.author} 
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <span className="text-sm text-cosmic-grey dark:text-nebula-grey">
                        {discussion.author}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-cosmic-grey dark:text-nebula-grey">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {discussion.replies}
                      </div>
                      
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {discussion.views}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="text-center">
                <a href="#" className="inline-block px-6 py-3 bg-electric-indigo/10 text-electric-indigo font-medium rounded-md hover:bg-electric-indigo/20 transition-colors">
                  View All Discussions
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Featured members */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-midnight-blue dark:text-cosmic-latte mb-6 text-center">
            Featured Community Members
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMembers.map((member, index) => (
              <div key={index} className="bg-cosmic-light dark:bg-cosmic-dark p-6 rounded-lg text-center">
                <img 
                  src={member.avatarUrl} 
                  alt={member.name} 
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-midnight-blue dark:text-cosmic-latte">
                  {member.name}
                </h3>
                <div className="text-electric-indigo font-medium text-sm mb-2">
                  {member.role}
                </div>
                <div className="text-sm text-cosmic-grey dark:text-nebula-grey mb-1">
                  {member.contributions} contributions
                </div>
                <div className="text-sm text-cosmic-grey dark:text-nebula-grey">
                  Joined {member.joined}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming events */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-midnight-blue dark:text-cosmic-latte mb-6 text-center">
            Upcoming Community Events
          </h2>
          
          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-cosmic-light dark:bg-cosmic-dark p-6 rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-midnight-blue dark:text-cosmic-latte mb-1">
                      {event.title}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center text-sm text-cosmic-grey dark:text-nebula-grey gap-1 sm:gap-4">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-neon-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {event.date}
                      </div>
                      
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-neon-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {event.time}
                      </div>
                      
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-neon-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </div>
                    </div>
                  </div>
                  
                  <button className="px-4 py-2 bg-electric-indigo hover:bg-electric-indigo/90 text-white rounded-md text-sm font-medium transition-colors md:self-start">
                    Register
                  </button>
                </div>
                
                <p className="text-cosmic-grey dark:text-nebula-white">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <a href="#" className="inline-block px-6 py-3 bg-electric-indigo/10 text-electric-indigo font-medium rounded-md hover:bg-electric-indigo/20 transition-colors">
              View All Events
            </a>
          </div>
        </section>

        {/* Community guidelines */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-midnight-blue dark:text-cosmic-latte mb-6 text-center">
            Community Guidelines
          </h2>
          
          <div className="bg-cosmic-light dark:bg-cosmic-dark p-8 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-midnight-blue dark:text-cosmic-latte mb-4 flex items-center">
                  <span className="w-8 h-8 bg-electric-indigo/10 text-electric-indigo rounded-full flex items-center justify-center mr-3">1</span>
                  Be Respectful
                </h3>
                <p className="text-cosmic-grey dark:text-nebula-white pl-11">
                  Treat everyone with respect. No harassment, bullying, or discrimination of any kind will be tolerated.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-midnight-blue dark:text-cosmic-latte mb-4 flex items-center">
                  <span className="w-8 h-8 bg-electric-indigo/10 text-electric-indigo rounded-full flex items-center justify-center mr-3">2</span>
                  Stay On Topic
                </h3>
                <p className="text-cosmic-grey dark:text-nebula-white pl-11">
                  Keep discussions relevant to CCO, developer productivity, and related technologies. Use appropriate categories for your posts.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-midnight-blue dark:text-cosmic-latte mb-4 flex items-center">
                  <span className="w-8 h-8 bg-electric-indigo/10 text-electric-indigo rounded-full flex items-center justify-center mr-3">3</span>
                  No Spam
                </h3>
                <p className="text-cosmic-grey dark:text-nebula-white pl-11">
                  Don't post unsolicited advertisements or promotional content. Value-adding links to your own content are allowed if relevant.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-midnight-blue dark:text-cosmic-latte mb-4 flex items-center">
                  <span className="w-8 h-8 bg-electric-indigo/10 text-electric-indigo rounded-full flex items-center justify-center mr-3">4</span>
                  Share Knowledge
                </h3>
                <p className="text-cosmic-grey dark:text-nebula-white pl-11">
                  Help others by sharing your expertise and experience. If someone helped you, pay it forward when you can.
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <a href="#" className="text-sm font-medium text-electric-indigo hover:text-electric-indigo/80 transition-colors">
                Read Full Community Guidelines →
              </a>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section>
          <div className="bg-cosmic-light dark:bg-cosmic-dark p-8 rounded-lg text-center">
            <h2 className="text-xl font-bold text-midnight-blue dark:text-cosmic-latte mb-4">
              Stay Connected
            </h2>
            <p className="text-cosmic-grey dark:text-nebula-white mb-6 max-w-2xl mx-auto">
              Subscribe to our community newsletter to stay updated on events, featured discussions, and new resources.
            </p>
            
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-2 border border-cosmic-grey/30 rounded-md leading-5 bg-white dark:bg-cosmic-dark text-midnight-blue dark:text-cosmic-latte placeholder-cosmic-grey focus:outline-none focus:ring-2 focus:ring-electric-indigo focus:border-electric-indigo"
                  required
                />
                <button 
                  type="submit"
                  className="px-4 py-2 bg-electric-indigo hover:bg-electric-indigo/90 text-white rounded-md text-sm font-medium transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default CommunityPage; 