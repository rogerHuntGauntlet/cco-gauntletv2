import type { NextApiRequest, NextApiResponse } from 'next';
import { Notification } from '../../../types';

type ResponseData = {
  success: boolean;
  message?: string;
  notification?: Notification;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
  
  try {
    // Get the data from the request
    const { secondBrainId, userId } = req.body;
    
    // Validate the request
    if (!secondBrainId || !userId) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    
    // In a real app, this would save to a database
    // Here we just simulate a successful response
    
    // Generate a mock notification
    const notification: Notification = {
      id: `notification-${Date.now()}`,
      userId: secondBrainId.split('-')[1], // Simulate getting the owner's ID
      title: 'New Hire Request',
      message: `Your Chief Cognitive Officer was hired by a user. Contact them to begin the collaboration.`,
      type: 'system',
      isRead: false,
      createdAt: new Date().toISOString(),
      link: `/dashboard/notifications`,
      relatedItemId: secondBrainId,
      relatedItemType: 'project',
      icon: 'BriefcaseIcon'
    };
    
    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Chief Cognitive Officer hired successfully',
      notification
    });
  } catch (error) {
    console.error('Error hiring Chief Cognitive Officer:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
} 