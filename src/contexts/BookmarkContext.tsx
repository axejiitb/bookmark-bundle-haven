
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Bookmark, Category } from '@/services/bookmarkService';
import { toast } from '@/components/ui/use-toast';

// Determine if we're in a browser extension environment or not
const isExtension = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id;

// Import the appropriate service based on environment
let bookmarkService: any;

interface BookmarkContextType {
  bookmarks: Bookmark[];
  categories: Category[];
  loading: boolean;
  addBookmark: (url: string, title: string, categoryId: string) => Promise<void>;
  deleteBookmark: (id: string) => Promise<void>;
  addCategory: (name: string, color: string) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  getCurrentTab: () => Promise<any>;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState<any>(null);

  // Dynamically import the correct service
  useEffect(() => {
    const loadService = async () => {
      if (isExtension) {
        const module = await import('@/services/bookmarkService');
        setService(module);
      } else {
        const module = await import('@/services/mockService');
        setService(module);
      }
    };
    
    loadService();
  }, []);

  // Load initial data once service is loaded
  useEffect(() => {
    if (!service) return;
    
    const loadData = async () => {
      try {
        setLoading(true);
        const loadedBookmarks = await service.getBookmarks();
        const loadedCategories = await service.getCategories();
        
        setBookmarks(loadedBookmarks);
        setCategories(loadedCategories);
      } catch (error) {
        console.error('Error loading data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load bookmarks',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [service]);

  const handleAddBookmark = async (url: string, title: string, categoryId: string) => {
    if (!service) return;
    
    try {
      const favicon = service.getFaviconForUrl(url);
      const newBookmark = await service.addBookmark({ url, title, favicon, categoryId });
      
      setBookmarks((prev) => [...prev, newBookmark]);
      
      toast({
        title: 'Bookmark added',
        description: 'Website has been successfully bookmarked',
      });
    } catch (error) {
      console.error('Error adding bookmark:', error);
      toast({
        title: 'Error',
        description: 'Failed to add bookmark',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteBookmark = async (id: string) => {
    if (!service) return;
    
    try {
      await service.deleteBookmark(id);
      setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
      
      toast({
        title: 'Bookmark deleted',
        description: 'Bookmark has been removed',
      });
    } catch (error) {
      console.error('Error deleting bookmark:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete bookmark',
        variant: 'destructive',
      });
    }
  };

  const handleAddCategory = async (name: string, color: string) => {
    if (!service) return;
    
    try {
      const newCategory = await service.addCategory(name, color);
      setCategories((prev) => [...prev, newCategory]);
      
      toast({
        title: 'Category added',
        description: `Category "${name}" has been created`,
      });
    } catch (error) {
      console.error('Error adding category:', error);
      toast({
        title: 'Error',
        description: 'Failed to add category',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!service) return;
    
    try {
      await service.deleteCategory(id);
      setCategories((prev) => prev.filter((category) => category.id !== id));
      
      // Refresh bookmarks as some may have been updated to default category
      const updatedBookmarks = await service.getBookmarks();
      setBookmarks(updatedBookmarks);
      
      toast({
        title: 'Category deleted',
        description: 'Category has been removed',
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete category',
        variant: 'destructive',
      });
    }
  };

  const getCurrentTab = async () => {
    if (!service) return null;
    return service.getCurrentTab();
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        categories,
        loading,
        addBookmark: handleAddBookmark,
        deleteBookmark: handleDeleteBookmark,
        addCategory: handleAddCategory,
        deleteCategory: handleDeleteCategory,
        getCurrentTab,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};
