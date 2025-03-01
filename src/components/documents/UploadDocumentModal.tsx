import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { 
  XMarkIcon, 
  ArrowUpTrayIcon, 
  DocumentIcon, 
  PlusIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';

export interface DocumentFormData {
  title: string;
  type: string;
  file: File | null;
  tags: string[];
}

export interface UploadDocumentModalProps {
  onSubmit: (data: DocumentFormData) => void;
  onCancel: () => void;
}

export const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({ onSubmit, onCancel }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [docType, setDocType] = useState('document');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState<{
    title?: string;
    file?: string;
  }>({});
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Auto-populate title with filename (without extension)
      if (!title) {
        const fileName = file.name.split('.').slice(0, -1).join('.');
        setTitle(fileName);
      }
      
      // Auto-detect document type
      detectDocumentType(file);
      
      // Clear file error if exists
      if (errors.file) {
        setErrors(prev => ({ ...prev, file: undefined }));
      }
    }
  };
  
  // Detect document type based on file extension
  const detectDocumentType = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    if (!extension) return;
    
    switch (extension) {
      case 'pdf':
        setDocType('pdf');
        break;
      case 'doc':
      case 'docx':
        setDocType('word');
        break;
      case 'xls':
      case 'xlsx':
        setDocType('spreadsheet');
        break;
      case 'ppt':
      case 'pptx':
        setDocType('presentation');
        break;
      case 'txt':
        setDocType('text');
        break;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        setDocType('image');
        break;
      default:
        setDocType('document');
    }
  };
  
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
    const newErrors: {title?: string; file?: string} = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!selectedFile) {
      newErrors.file = 'Please select a file to upload';
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
        type: docType,
        file: selectedFile,
        tags
      });
    }
  };
  
  // Handle drag events
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      
      // Auto-populate title with filename (without extension)
      if (!title) {
        const fileName = file.name.split('.').slice(0, -1).join('.');
        setTitle(fileName);
      }
      
      // Auto-detect document type
      detectDocumentType(file);
      
      // Clear file error if exists
      if (errors.file) {
        setErrors(prev => ({ ...prev, file: undefined }));
      }
    }
  };
  
  // Handle click on upload area
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cco-neutral-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-cco-neutral-900">Upload Document</h2>
          <button 
            onClick={onCancel}
            className="text-cco-neutral-500 hover:text-cco-neutral-700"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragging 
                ? 'border-cco-purple-500 bg-cco-purple-50' 
                : selectedFile 
                  ? 'border-cco-green-500 bg-cco-green-50' 
                  : 'border-cco-neutral-300 hover:border-cco-purple-400 hover:bg-cco-neutral-50'
            }`}
            onClick={handleUploadClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            
            {selectedFile ? (
              <div className="flex flex-col items-center">
                <DocumentIcon className="w-12 h-12 text-cco-green-500 mb-2" />
                <p className="text-cco-green-700 font-medium">{selectedFile.name}</p>
                <p className="text-cco-neutral-500 text-sm mt-1">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <Button 
                  type="button"
                  variant="outline"
                  className="mt-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                >
                  Change File
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <ArrowUpTrayIcon className="w-12 h-12 text-cco-neutral-400 mb-2" />
                <p className="text-cco-neutral-700 font-medium">Drag and drop your file here</p>
                <p className="text-cco-neutral-500 text-sm mt-1">or click to browse</p>
              </div>
            )}
            
            {errors.file && (
              <p className="mt-2 text-cco-red-500 text-sm">{errors.file}</p>
            )}
          </div>
          
          {/* Document Metadata */}
          <div className="space-y-4">
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
            
            <div>
              <label htmlFor="docType" className="block text-sm font-medium text-cco-neutral-700 mb-1">
                Document Type
              </label>
              <select
                id="docType"
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="w-full px-3 py-2 border border-cco-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cco-purple-200 focus:border-cco-purple-400"
              >
                <option value="document">Document</option>
                <option value="pdf">PDF</option>
                <option value="word">Word Document</option>
                <option value="spreadsheet">Spreadsheet</option>
                <option value="presentation">Presentation</option>
                <option value="image">Image</option>
                <option value="text">Text</option>
                <option value="other">Other</option>
              </select>
            </div>
            
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
          <div className="flex justify-end space-x-3 pt-4 border-t">
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
              Upload Document
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}; 