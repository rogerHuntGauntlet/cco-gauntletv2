export interface Brain {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface BrainContent {
  id: string;
  brainId: string;
  title: string;
  content: string;
  type: 'note' | 'document' | 'link' | 'image';
  createdAt: string;
  updatedAt: string;
} 