import React, { useState } from 'react';
import { 
  XMarkIcon, 
  DocumentTextIcon,
  TagIcon,
  PlusIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';

export interface MarkdownFormData {
  title: string;
  content: string;
  tags: string[];
}

export interface CreateMarkdownModalProps {
  onSubmit: (data: MarkdownFormData) => void;
  onCancel: () => void;
}

export const CreateMarkdownModal: React.FC<CreateMarkdownModalProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
  }>({});
  
  // Add a new tag
  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };
  
  // Remove a tag
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  // Handle tag input keydown
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  // Validate form before submission
  const validateForm = (): boolean => {
    const newErrors: {title?: string; content?: string} = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        title,
        content,
        tags
      });
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cco-neutral-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-cco-neutral-900">Create Markdown Document</h2>
          <button 
            onClick={onCancel}
            className="text-cco-neutral-500 hover:text-cco-neutral-700"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-6 space-y-4 overflow-y-auto flex-1">
            {/* Document Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-cco-neutral-700 mb-1">
                Document Title*
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) {
                    setErrors(prev => ({ ...prev, title: undefined }));
                  }
                }}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.title 
                    ? 'border-cco-red-300 focus:ring-cco-red-200' 
                    : 'border-cco-neutral-300 focus:ring-cco-purple-200 focus:border-cco-purple-400'
                }`}
                placeholder="Enter document title"
              />
              {errors.title && (
                <p className="mt-1 text-cco-red-500 text-sm">{errors.title}</p>
              )}
            </div>
            
            {/* Markdown Editor */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-cco-neutral-700 mb-1">
                Content*
              </label>
              <div className="border rounded-md flex flex-col overflow-hidden">
                <div className="bg-cco-neutral-50 border-b p-2 flex items-center space-x-2">
                  <button
                    type="button"
                    className="p-1 hover:bg-cco-neutral-200 rounded"
                    onClick={() => setContent(prev => prev + '# Heading')}
                    title="Heading 1"
                  >
                    H1
                  </button>
                  <button
                    type="button"
                    className="p-1 hover:bg-cco-neutral-200 rounded"
                    onClick={() => setContent(prev => prev + '## Heading')}
                    title="Heading 2"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    className="p-1 hover:bg-cco-neutral-200 rounded"
                    onClick={() => setContent(prev => prev + '**Bold**')}
                    title="Bold"
                  >
                    <strong>B</strong>
                  </button>
                  <button
                    type="button"
                    className="p-1 hover:bg-cco-neutral-200 rounded"
                    onClick={() => setContent(prev => prev + '*Italic*')}
                    title="Italic"
                  >
                    <em>I</em>
                  </button>
                  <button
                    type="button"
                    className="p-1 hover:bg-cco-neutral-200 rounded"
                    onClick={() => setContent(prev => prev + '- List item')}
                    title="List"
                  >
                    • List
                  </button>
                  <button
                    type="button"
                    className="p-1 hover:bg-cco-neutral-200 rounded"
                    onClick={() => setContent(prev => prev + '1. Numbered item')}
                    title="Numbered List"
                  >
                    1. List
                  </button>
                  <button
                    type="button"
                    className="p-1 hover:bg-cco-neutral-200 rounded"
                    onClick={() => setContent(prev => prev + '[Link](https://example.com)')}
                    title="Link"
                  >
                    Link
                  </button>
                  <button
                    type="button"
                    className="p-1 hover:bg-cco-neutral-200 rounded"
                    onClick={() => setContent(prev => prev + '![Image](https://example.com/image.jpg)')}
                    title="Image"
                  >
                    Image
                  </button>
                  <button
                    type="button"
                    className="p-1 hover:bg-cco-neutral-200 rounded"
                    onClick={() => setContent(prev => prev + '```\ncode block\n```')}
                    title="Code Block"
                  >
                    Code
                  </button>
                </div>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    if (errors.content) {
                      setErrors(prev => ({ ...prev, content: undefined }));
                    }
                  }}
                  rows={15}
                  className={`p-3 w-full flex-1 font-mono resize-none focus:outline-none focus:ring-2 ${
                    errors.content 
                      ? 'focus:ring-cco-red-200' 
                      : 'focus:ring-cco-purple-200'
                  }`}
                  placeholder="# Start writing your markdown content here..."
                />
              </div>
              {errors.content && (
                <p className="mt-1 text-cco-red-500 text-sm">{errors.content}</p>
              )}
              <p className="mt-1 text-xs text-cco-neutral-500">
                Use markdown syntax for formatting. You can use the toolbar above for common markdown elements.
              </p>
            </div>
            
            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-cco-neutral-700 mb-1">
                Tags (optional)
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map(tag => (
                  <div key={tag} className="bg-cco-purple-100 text-cco-purple-800 px-3 py-1 rounded-full flex items-center text-sm">
                    {tag}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-cco-purple-600 hover:text-cco-purple-800"
                    >
                      <XCircleIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  id="tags"
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  className="flex-1 px-3 py-2 border border-cco-neutral-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-cco-purple-200 focus:border-cco-purple-400"
                  placeholder="Add tags"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-3 py-2 bg-cco-purple-500 text-white rounded-r-md hover:bg-cco-purple-600 focus:outline-none focus:ring-2 focus:ring-cco-purple-500 focus:ring-offset-2"
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
              </div>
              <p className="mt-1 text-xs text-cco-neutral-500">
                Press Enter or click the + button to add a tag
              </p>
            </div>
          </div>
          
          {/* Footer with actions */}
          <div className="flex justify-end space-x-3 p-6 border-t mt-auto">
            <Button 
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="default"
            >
              Create Document
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}; 