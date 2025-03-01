import React from 'react';
import PageTemplate from './page-template';
import Link from 'next/link';

const BlogPage = () => {
  // Sample blog post data
  const blogPosts = [
    {
      id: 1,
      title: 'Introducing CCO: Your AI-Powered Cognitive Officer',
      slug: 'introducing-cco',
      excerpt: 'Learn how CCO is revolutionizing the way developers handle meetings, documentation, and project kickoffs.',
      date: 'April 15, 2025',
      author: 'Roger Hunt',
      authorRole: 'Engineering Lead',
      category: 'Product Updates',
      image: '/images/blog/cco-introduction.jpg',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'The Flow State: Why Interruptions Kill Developer Productivity',
      slug: 'flow-state-productivity',
      excerpt: 'Research shows that the average developer needs 23 minutes to get back into flow after an interruption. Here\'s how AI can help.',
      date: 'April 8, 2025',
      author: 'Adam Weil',
      authorRole: 'Full-Stack Developer',
      category: 'Developer Insights',
      image: '/images/blog/flow-state.jpg',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'Translating Client Requirements: From Vague Ideas to Technical Specifications',
      slug: 'client-requirements-to-specs',
      excerpt: 'Bridge the gap between client vision and technical implementation with AI-powered requirement translation.',
      date: 'March 28, 2025',
      author: 'Lamar Cannon',
      authorRole: 'AI Specialist',
      category: 'Best Practices',
      image: '/images/blog/client-requirements.jpg',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'Automated Documentation: How CCO Makes Comprehensive Docs a Reality',
      slug: 'automated-documentation',
      excerpt: 'Say goodbye to outdated or missing documentation. CCO\'s automated approach ensures your team stays on the same page.',
      date: 'March 20, 2025',
      author: 'Patrice Azi',
      authorRole: 'Product Designer',
      category: 'Product Updates',
      image: '/images/blog/automated-docs.jpg',
      readTime: '4 min read'
    },
    {
      id: 5,
      title: 'AI Ethics in Development: How We\'re Building Responsible AI at CCO',
      slug: 'ai-ethics-development',
      excerpt: 'Our approach to building ethical AI systems that augment rather than replace human creativity and decision-making.',
      date: 'March 12, 2025',
      author: 'Abraham Obubo',
      authorRole: 'Backend Architect',
      category: 'Company Culture',
      image: '/images/blog/ai-ethics.jpg',
      readTime: '8 min read'
    },
    {
      id: 6,
      title: 'Client Success Story: How Team Alpha Reduced Meeting Time by 70%',
      slug: 'team-alpha-success-story',
      excerpt: 'Learn how a team of 12 developers used CCO to dramatically reduce meeting overhead while improving communication.',
      date: 'March 5, 2025',
      author: 'Roger Hunt',
      authorRole: 'Engineering Lead',
      category: 'Case Studies',
      image: '/images/blog/success-story.jpg',
      readTime: '5 min read'
    }
  ];

  // Featured blog post (first one)
  const featuredPost = blogPosts[0];
  
  // Remaining posts
  const remainingPosts = blogPosts.slice(1);

  return (
    <PageTemplate 
      title="CCO Blog" 
      description="Insights, updates, and thought leadership on AI-powered development workflows, meeting optimization, and developer productivity."
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-midnight-blue dark:text-cosmic-latte mb-8">CCO Blog</h1>
        
        {/* Featured post */}
        <div className="bg-white dark:bg-obsidian rounded-xl overflow-hidden shadow-sm mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-electric-indigo bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center p-6">
              <div className="w-full h-56 rounded-lg bg-gradient-to-r from-electric-indigo to-neon-teal flex items-center justify-center text-white">
                <span className="font-bold">Featured Article</span>
              </div>
            </div>
            <div className="p-8">
              <div className="text-electric-indigo font-medium text-sm mb-2">{featuredPost.category}</div>
              <h2 className="text-2xl font-bold text-midnight-blue dark:text-cosmic-latte mb-4">{featuredPost.title}</h2>
              <p className="text-cosmic-grey dark:text-nebula-white mb-6">{featuredPost.excerpt}</p>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-electric-indigo to-neon-teal flex items-center justify-center text-white text-xs font-bold">
                  {featuredPost.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="ml-3">
                  <div className="text-midnight-blue dark:text-cosmic-latte font-medium">{featuredPost.author}</div>
                  <div className="text-cosmic-grey dark:text-nebula-white text-sm">{featuredPost.authorRole}</div>
                </div>
                <div className="ml-auto text-cosmic-grey dark:text-nebula-white text-sm">
                  {featuredPost.date} · {featuredPost.readTime}
                </div>
              </div>
              <Link href={`/landing/blog/${featuredPost.slug}`} className="inline-block bg-gradient-to-r from-electric-indigo to-neon-teal text-white px-6 py-3 rounded-md font-medium hover:opacity-90 transition-all">
                Read Article
              </Link>
            </div>
          </div>
        </div>
        
        {/* Blog post filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button className="bg-electric-indigo text-white px-4 py-2 rounded-full text-sm font-medium">All Posts</button>
          <button className="bg-white dark:bg-obsidian text-cosmic-grey dark:text-nebula-white px-4 py-2 rounded-full text-sm font-medium hover:bg-electric-indigo hover:text-white transition-colors">Product Updates</button>
          <button className="bg-white dark:bg-obsidian text-cosmic-grey dark:text-nebula-white px-4 py-2 rounded-full text-sm font-medium hover:bg-electric-indigo hover:text-white transition-colors">Developer Insights</button>
          <button className="bg-white dark:bg-obsidian text-cosmic-grey dark:text-nebula-white px-4 py-2 rounded-full text-sm font-medium hover:bg-electric-indigo hover:text-white transition-colors">Best Practices</button>
          <button className="bg-white dark:bg-obsidian text-cosmic-grey dark:text-nebula-white px-4 py-2 rounded-full text-sm font-medium hover:bg-electric-indigo hover:text-white transition-colors">Case Studies</button>
          <button className="bg-white dark:bg-obsidian text-cosmic-grey dark:text-nebula-white px-4 py-2 rounded-full text-sm font-medium hover:bg-electric-indigo hover:text-white transition-colors">Company Culture</button>
        </div>
        
        {/* Blog post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {remainingPosts.map(post => (
            <div key={post.id} className="bg-white dark:bg-obsidian rounded-xl overflow-hidden shadow-sm">
              <div className="h-48 bg-electric-indigo bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center">
                <div className="w-3/4 h-32 rounded-lg bg-gradient-to-r from-electric-indigo to-neon-teal opacity-70 flex items-center justify-center">
                  <span className="text-white font-medium">{post.category}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="text-electric-indigo font-medium text-sm mb-2">{post.category}</div>
                <h3 className="text-xl font-bold text-midnight-blue dark:text-cosmic-latte mb-3">{post.title}</h3>
                <p className="text-cosmic-grey dark:text-nebula-white mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-electric-indigo to-neon-teal flex items-center justify-center text-white text-xs font-bold">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-2">
                    <div className="text-midnight-blue dark:text-cosmic-latte font-medium text-sm">{post.author}</div>
                    <div className="text-cosmic-grey dark:text-nebula-white text-xs">{post.date} · {post.readTime}</div>
                  </div>
                </div>
                <Link href={`/landing/blog/${post.slug}`} className="text-electric-indigo font-medium hover:underline">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Newsletter signup */}
        <div className="bg-gradient-to-r from-electric-indigo to-neon-teal rounded-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Stay updated with CCO insights</h2>
            <p className="mb-6 opacity-90">Get the latest articles, product updates, and development tips delivered straight to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-4 py-3 rounded-md text-midnight-blue focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-electric-indigo px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all">
                Subscribe
              </button>
            </div>
            <p className="mt-4 text-sm opacity-75">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default BlogPage; 