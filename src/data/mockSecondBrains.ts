import { SecondBrain } from '../types';

export const mockSecondBrains: SecondBrain[] = [
  {
    id: '1',
    name: 'MarketInsight Brain',
    ownerId: 'user1',
    ownerName: 'Jessica Chen',
    description: 'Expert in market research, competitor analysis, and business strategy. Can help identify market opportunities and provide actionable insights for your business growth.',
    expertise: ['Market Research', 'Business Strategy', 'Competitive Analysis', 'Industry Trends'],
    rating: 4.8,
    ratingCount: 27,
    pricing: {
      hourly: 75,
      project: 1200
    },
    status: 'available',
    createdAt: new Date(2023, 5, 15).toISOString(),
    updatedAt: new Date(2023, 10, 3).toISOString(),
    tags: ['finance', 'strategy', 'growth'],
    hireCount: 42,
    briefBio: 'I specialize in data-driven market insights with 10+ years of experience helping businesses identify growth opportunities.'
  },
  {
    id: '2',
    name: 'CodeCraft Assistant',
    ownerId: 'user2',
    ownerName: 'Alex Rodriguez',
    description: 'Full-stack developer brain with expertise in modern web frameworks, architecture design, and code optimization. I help with everything from code reviews to complex system design.',
    expertise: ['React', 'Node.js', 'TypeScript', 'System Architecture', 'DevOps'],
    rating: 4.9,
    ratingCount: 56,
    pricing: {
      hourly: 95
    },
    status: 'busy',
    createdAt: new Date(2023, 3, 10).toISOString(),
    updatedAt: new Date(2023, 11, 5).toISOString(),
    tags: ['development', 'coding', 'web'],
    hireCount: 78,
    briefBio: 'Senior developer brain with expertise in building scalable web applications and optimizing performance.'
  },
  {
    id: '3',
    name: 'ContentGenius',
    ownerId: 'user3',
    ownerName: 'Emma Watson',
    description: 'Creative content strategist and copywriter. Specializing in engaging content that converts, SEO optimization, and brand storytelling across multiple channels.',
    expertise: ['Content Strategy', 'Copywriting', 'SEO', 'Brand Voice', 'Social Media'],
    rating: 4.7,
    ratingCount: 38,
    pricing: {
      hourly: 65,
      project: 800
    },
    status: 'available',
    createdAt: new Date(2023, 2, 20).toISOString(),
    updatedAt: new Date(2023, 9, 15).toISOString(),
    tags: ['content', 'marketing', 'writing'],
    hireCount: 52,
    briefBio: 'I craft compelling narratives and content strategies that help brands connect with their audience authentically.'
  },
  {
    id: '4',
    name: 'DesignMind',
    ownerId: 'user4',
    ownerName: 'Noah Kim',
    description: 'UX/UI design specialist with a focus on creating intuitive, accessible, and beautiful digital experiences. Expert in user research, prototyping, and design systems.',
    expertise: ['UX/UI Design', 'User Research', 'Design Systems', 'Prototyping', 'Accessibility'],
    rating: 4.85,
    ratingCount: 32,
    pricing: {
      hourly: 85,
      project: 1500
    },
    status: 'available',
    createdAt: new Date(2023, 4, 5).toISOString(),
    updatedAt: new Date(2023, 10, 22).toISOString(),
    tags: ['design', 'user experience', 'creativity'],
    hireCount: 36,
    briefBio: 'I transform complex problems into intuitive digital experiences with a focus on user-centered design principles.'
  },
  {
    id: '5',
    name: 'DataScience Pro',
    ownerId: 'user5',
    ownerName: 'Dr. Michael Roberts',
    description: 'Data scientist specialized in predictive analytics, machine learning models, and data visualization. Helps businesses leverage their data for strategic decision-making.',
    expertise: ['Data Science', 'Machine Learning', 'Predictive Analytics', 'Data Visualization', 'Python'],
    rating: 4.95,
    ratingCount: 42,
    pricing: {
      hourly: 110,
      project: 2200
    },
    status: 'busy',
    createdAt: new Date(2023, 1, 12).toISOString(),
    updatedAt: new Date(2023, 11, 1).toISOString(),
    tags: ['data', 'analytics', 'AI'],
    hireCount: 63,
    briefBio: 'PhD in Computer Science with expertise in extracting meaningful insights from complex datasets to drive business decisions.'
  },
  {
    id: '6',
    name: 'LegalEagle',
    ownerId: 'user6',
    ownerName: 'Sarah Johnson, Esq.',
    description: 'Legal advisor specialized in business law, contracts, IP protection, and compliance. Helping entrepreneurs and businesses navigate legal complexities with clarity.',
    expertise: ['Business Law', 'Contracts', 'IP Protection', 'Legal Compliance', 'Privacy Law'],
    rating: 4.75,
    ratingCount: 24,
    pricing: {
      hourly: 120
    },
    status: 'unavailable',
    createdAt: new Date(2023, 0, 25).toISOString(),
    updatedAt: new Date(2023, 8, 18).toISOString(),
    tags: ['legal', 'compliance', 'business'],
    hireCount: 31,
    briefBio: 'Corporate attorney with 12+ years of experience helping startups and established businesses with legal strategy and risk management.'
  }
]; 