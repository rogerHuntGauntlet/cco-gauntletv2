import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { 
  DocumentTextIcon, 
  PlusIcon, 
  FolderIcon,
  FunnelIcon,
  ArrowUpTrayIcon,
  DocumentDuplicateIcon,
  DocumentIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { useAuth } from '../../../contexts/AuthContext';
import { getDocumentsByUserId, createDocument } from '../../../lib/firebase';
import { UploadDocumentModal } from '../../../components/documents/UploadDocumentModal';
import { CreateMarkdownModal, MarkdownFormData } from '../../../components/documents/CreateMarkdownModal';
import { useRouter } from 'next/router';

// Mock uploadFile function until it's properly implemented in firebase.ts
const uploadFile = async (file: File, path: string): Promise<string> => {
  console.log(`Uploading file ${file.name} to ${path}`);
  // This would normally upload to storage and return the URL
  return `https://example.com/files/${path}`;
};

// Define the DocumentFormData type that matches what UploadDocumentModal expects
interface DocumentFormData {
  title: string;
  type: string;
  file: File | null;
  tags: string[];
}

// Type definitions
interface Document {
  id: string;
  title: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  size: string;
  owner: string;
  tags: string[];
  path: string;
  sharedWith: string[];
  userId: string;
}

interface Folder {
  id: string;
  name: string;
  path: string;
  documentCount: number;
  lastModified: string;
}

type DocumentType = 'all' | 'doc' | 'spreadsheet' | 'presentation' | 'pdf' | 'markdown';

const DocumentsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedType, setSelectedType] = useState<DocumentType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showMarkdownModal, setShowMarkdownModal] = useState(false);
  const [aiServiceModal, setAIServiceModal] = useState({ isOpen: false });
  
  // Fetch documents from Firestore
  useEffect(() => {
    async function fetchDocuments() {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getDocumentsByUserId(currentUser.uid);
        if (response.error) {
          throw new Error(response.error);
        }
        setDocuments(response.data || []);
        
        // For now, we'll set folders to empty until we implement folder functionality
        setFolders([]);
        setError(null);
      } catch (err) {
        console.error("Error fetching documents:", err);
        setError("Failed to load documents. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchDocuments();
  }, [currentUser]);
  
  // Filter documents based on selected type and search query
  const filteredDocuments = documents && Array.isArray(documents) 
    ? documents.filter(doc => {
        if (!doc) return false;
        
        const matchesType = selectedType === 'all' || (doc.type && doc.type === selectedType);
        const matchesSearch = (doc.title && doc.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           (doc.tags && Array.isArray(doc.tags) && doc.tags.some(tag => tag && tag.toLowerCase().includes(searchQuery.toLowerCase())));
        return matchesType && matchesSearch;
      })
    : [];

  const handleCreateNewDoc = () => {
    setShowMarkdownModal(true);
  };

  const handleCancelMarkdown = () => {
    setShowMarkdownModal(false);
  };

  const handleMarkdownSubmit = async (markdownData: MarkdownFormData) => {
    if (!currentUser) return;
    
    try {
      // Create a new markdown document in Firestore
      const response = await createDocument({
        title: markdownData.title,
        type: "markdown",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        size: `${markdownData.content.length} bytes`,
        owner: currentUser.displayName || "User",
        tags: markdownData.tags,
        path: "/",
        sharedWith: [],
        userId: currentUser.uid,
        createdBy: currentUser.uid,
        content: markdownData.content
      });
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      const newDocument = response.data;
      
      // Add the new document to the list
      setDocuments(prevDocuments => {
        if (!prevDocuments || !Array.isArray(prevDocuments)) {
          return [newDocument];
        }
        return [newDocument, ...prevDocuments];
      });
      
      // Close the modal
      setShowMarkdownModal(false);
      
      // In a real app, this would redirect to document editor
      console.log('Created new markdown document:', newDocument.id);
    } catch (error) {
      console.error('Failed to create document:', error);
      alert('Failed to create document. Please try again.');
    }
  };

  const handleUploadFile = () => {
    setShowUploadModal(true);
  };

  const handleCancelUpload = () => {
    setShowUploadModal(false);
  };

  const handleDocumentSubmit = async (documentData: DocumentFormData) => {
    if (!currentUser) return;
    
    try {
      // Handle file upload
      let fileUrl = '';
      if (documentData.file) {
        fileUrl = await uploadFile(documentData.file, `documents/${currentUser.uid}/${documentData.file.name}`);
      }
      
      // Create document in Firestore
      const response = await createDocument({
        title: documentData.title,
        type: documentData.type,
        fileUrl: fileUrl,
        uploadDate: new Date().toISOString(),
        tags: documentData.tags,
        userId: currentUser.uid,
        createdBy: currentUser.uid,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        size: documentData.file ? `${documentData.file.size} bytes` : '0 bytes',
        owner: currentUser.displayName || "User",
        path: "/",
        sharedWith: []
      });
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      const newDoc = response.data;
      
      // Add the new document to the list
      setDocuments(prevDocs => {
        if (!prevDocs || !Array.isArray(prevDocs)) {
          return [newDoc];
        }
        return [newDoc, ...prevDocs];
      });
      
      // Close the modal
      setShowUploadModal(false);
    } catch (error) {
      console.error('Failed to upload document:', error);
      alert('Failed to upload document. Please try again.');
    }
  };

  const handleDocumentClick = (docId: string) => {
    // In a real app, this would open the document
    console.log('Open document', docId);
  };

  const handleFolderClick = (folderId: string) => {
    // In a real app, this would navigate to the folder
    console.log('Open folder', folderId);
  };

  // Document card component for grid view
  const DocumentCard = ({ document }: { document: Document }) => {
    // Select icon based on document type
    let TypeIcon = DocumentTextIcon;
    if (document.type === 'spreadsheet') {
      TypeIcon = DocumentDuplicateIcon;
    } else if (document.type === 'presentation') {
      TypeIcon = DocumentTextIcon;
    } else if (document.type === 'markdown') {
      TypeIcon = DocumentIcon;
    }
    
    // Get the color based on document type
    const getTypeColor = () => {
      switch (document.type) {
        case 'spreadsheet':
          return 'text-green-500';
        case 'presentation':
          return 'text-orange-500';
        case 'pdf':
          return 'text-red-500';
        case 'markdown':
          return 'text-purple-500';
        default:
          return 'text-cco-primary-500';
      }
    };
    
    const formattedDate = new Date(document.updatedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    return (
      <Card hover onClick={() => handleDocumentClick(document.id)} className="cursor-pointer h-full">
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-3">
            <TypeIcon className={`w-8 h-8 ${getTypeColor()} mr-3`} />
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-medium text-cco-neutral-900 truncate">{document.title}</h3>
              <p className="text-xs text-cco-neutral-600">
                {document.type.charAt(0).toUpperCase() + document.type.slice(1)}
              </p>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-xs text-cco-neutral-700 mt-auto">
            <span>Updated {formattedDate}</span>
            <span>{document.size}</span>
          </div>
          
          {document.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {document.tags.map(tag => (
                <span 
                  key={tag} 
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-cco-neutral-100 text-cco-neutral-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Card>
    );
  };

  // Folder card component for grid view
  const FolderCard = ({ folder }: { folder: Folder }) => {
    const formattedDate = new Date(folder.lastModified).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    return (
      <Card hover onClick={() => handleFolderClick(folder.id)} className="cursor-pointer h-full">
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-3">
            <FolderIcon className="w-8 h-8 text-cco-accent-500 mr-3" />
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-medium text-cco-neutral-900 truncate">{folder.name}</h3>
              <p className="text-xs text-cco-neutral-600">
                {folder.documentCount} document{folder.documentCount !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-xs text-cco-neutral-700 mt-auto">
            <span>Modified {formattedDate}</span>
          </div>
        </div>
      </Card>
    );
  };

  // Function to render the AI Service Modal (placeholder)
  const AIServiceModal = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg max-w-lg w-full">
          <h2 className="text-xl font-bold mb-4">AI Service</h2>
          <p className="mb-4">This is a placeholder for the AI service modal.</p>
          <Button onClick={() => setAIServiceModal({ isOpen: false })}>Close</Button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cco-primary-500 mb-4"></div>
          <p className="text-cco-neutral-700">Loading documents...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 my-6">
          <p className="text-red-700">{error}</p>
          <Button 
            variant="outline" 
            className="mt-2"
            onClick={() => {
              setLoading(true);
              setError(null);
              getDocumentsByUserId(currentUser?.uid || '')
                .then(response => {
                  if (response.error) {
                    throw new Error(response.error);
                  }
                  setDocuments(response.data || []);
                  setLoading(false);
                })
                .catch(err => {
                  console.error("Error retrying fetch:", err);
                  setError("Failed to load documents. Please try again.");
                  setLoading(false);
                });
            }}
          >
            Try Again
          </Button>
        </div>
      );
    }

    // Show upload document modal when showUploadModal is true
    if (showUploadModal) {
      return (
        <UploadDocumentModal 
          onSubmit={handleDocumentSubmit}
          onCancel={handleCancelUpload}
        />
      );
    }

    // Show markdown creation modal when showMarkdownModal is true
    if (showMarkdownModal) {
      return (
        <CreateMarkdownModal
          onSubmit={handleMarkdownSubmit}
          onCancel={handleCancelMarkdown}
        />
      );
    }

    return (
      <>
        {/* AI Service Modal */}
        {aiServiceModal.isOpen && AIServiceModal()}

        {/* Header with actions */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-cco-neutral-900">Documents</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCreateNewDoc}
            >
              <DocumentIcon className="w-5 h-5 mr-2" />
              New Doc
            </Button>
            <Button 
              variant="default"
              onClick={handleUploadFile}
            >
              <CloudArrowUpIcon className="w-5 h-5 mr-2" />
              Upload File
            </Button>
          </div>
        </div>

        {/* Display folders if any */}
        {folders.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-cco-neutral-900 mb-4">Folders</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {folders.map((folder) => (
                <FolderCard key={folder.id} folder={folder} />
              ))}
            </div>
          </div>
        )}

        {/* Documents section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-cco-neutral-900">Documents</h2>
            <div className="flex space-x-2">
              <Button 
                variant="ghost"
                onClick={() => setSelectedType('all')}
                className={selectedType === 'all' ? 'bg-cco-neutral-100' : ''}
              >
                All
              </Button>
              <Button 
                variant="ghost"
                onClick={() => setSelectedType('doc')}
                className={selectedType === 'doc' ? 'bg-cco-neutral-100' : ''}
              >
                Documents
              </Button>
              <Button 
                variant="ghost"
                onClick={() => setSelectedType('spreadsheet')}
                className={selectedType === 'spreadsheet' ? 'bg-cco-neutral-100' : ''}
              >
                Spreadsheets
              </Button>
              <Button 
                variant="ghost"
                onClick={() => setSelectedType('presentation')}
                className={selectedType === 'presentation' ? 'bg-cco-neutral-100' : ''}
              >
                Presentations
              </Button>
              <Button 
                variant="ghost"
                onClick={() => setSelectedType('markdown')}
                className={selectedType === 'markdown' ? 'bg-cco-neutral-100' : ''}
              >
                Markdown
              </Button>
            </div>
          </div>
          
          {filteredDocuments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map((document) => (
                <DocumentCard key={document.id} document={document} />
              ))}
            </div>
          ) : (
            <Card className="p-6 flex flex-col items-center justify-center text-center">
              <div className="bg-cco-primary-50 p-3 rounded-full mb-4">
                <DocumentTextIcon className="w-8 h-8 text-cco-primary-500" />
              </div>
              <h3 className="text-lg font-medium text-cco-neutral-900 mb-2">No documents found</h3>
              <p className="text-cco-neutral-600 mb-6 max-w-md">
                {searchQuery || selectedType !== 'all' 
                  ? "No documents match your current filters. Try adjusting your search criteria."
                  : "You don't have any documents yet. Create a new document or upload one to get started."}
              </p>
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  onClick={handleUploadFile}
                >
                  <ArrowUpTrayIcon className="w-5 h-5 mr-2" />
                  Upload Document
                </Button>
                <Button 
                  variant="accent" 
                  onClick={handleCreateNewDoc}
                >
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Create New Document
                </Button>
              </div>
            </Card>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Documents | CCO VibeCoder Platform</title>
        <meta
          name="description"
          content="Manage your documents, files, and folders"
        />
      </Head>
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8">
          {renderContent()}
        </div>
      </DashboardLayout>
    </>
  );
};

export default DocumentsPage; 