/**
 * Utility functions for handling avatars throughout the application
 */

/**
 * Returns the avatar URL for a user/team member, falling back to a default avatar if none is provided
 * 
 * @param avatar - The avatar URL or undefined
 * @param name - Optional name to generate avatar based on initials
 * @returns The avatar URL to use
 */
export const getAvatarUrl = (avatar?: string, name?: string): string => {
  // If avatar is provided and not empty, use it
  if (avatar) {
    return avatar;
  }
  
  // Default avatar - using a placeholder image service 
  // We use a generic avatar since no name was provided or we want a consistent placeholder
  return 'https://i.pravatar.cc/150?img=1';
};

/**
 * Renders initials from a name for use in avatar placeholders
 * 
 * @param name - The user's name
 * @returns The initials (up to 2 characters)
 */
export const getInitials = (name: string): string => {
  if (!name) return '?';
  
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}; 