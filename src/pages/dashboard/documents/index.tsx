import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { 
  DocumentTextIcon, 
  PlusIcon, 
  FolderIcon,
  FunnelIcon,
  ArrowUpTrayIcon,
  DocumentDuplicateIcon 
} from '@heroicons/react/24/outline';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { useAuth } from '../../../contexts/AuthContext';
import { getDocumentsByUserId, createDocument } from '../../../lib/firebase';

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

type DocumentType = 'all' | 'doc' | 'spreadsheet' | 'presentation' | 'pdf';

const DocumentsPage: React.FC = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedType, setSelectedType] = useState<DocumentType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  // Fetch documents from Firestore
  useEffect(() => {
    async function fetchDocuments() {
      if (!user) return;

      try {
        setLoading(true);
        const fetchedDocuments = await getDocumentsByUserId(user.uid);
        setDocuments(fetchedDocuments);
        
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
  }, [user]);
  
  // Filter documents based on selected type and search query
  const filteredDocuments = documents.filter(doc => {
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const handleCreateNewDoc = async () => {
    if (!user) return;
    
    try {
      // Create a new document in Firestore
      const newDocument = await createDocument({
        title: "Untitled Document",
        type: "doc",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        size: "0 KB",
        owner: user.displayName || "User",
        tags: [],
        path: "/",
        sharedWith: [],
        userId: user.uid,
        content: ""
      });
      
      // Add the new document to the list
      setDocuments(prevDocuments => [newDocument, ...prevDocuments]);
      
      // In a real app, this would redirect to document editor
      console.log('Created new document:', newDocument.id);
    } catch (error) {
      console.error('Failed to create document:', error);
      alert('Failed to create document. Please try again.');
    }
  };

  const handleUploadFile = () => {
    setShowUploadModal(true);
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
    }
    
    const formattedDate = new Date(document.updatedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    return (
      <Card hover onClick={() => handleDocumentClick(document.id)} className="cursor-pointer h-full">
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-3">
            <TypeIcon className="w-8 h-8 text-cco-primary-500 mr-3" />
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
              getDocumentsByUserId(user?.uid || '')
                .then(documents => {
                  setDocuments(documents);
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

    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-cco-neutral-900">Documents</h1>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={handleUploadFile}
            >
              <ArrowUpTrayIcon className="w-5 h-5 mr-2" />
              Upload
            </Button>
            <Button 
              variant="default"
              onClick={handleCreateNewDoc}
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              New Document
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