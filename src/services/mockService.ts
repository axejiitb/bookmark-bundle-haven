
import { Bookmark, Category } from './bookmarkService';

const BOOKMARKS_KEY = 'bookmark_bundle_bookmarks';
const CATEGORIES_KEY = 'bookmark_bundle_categories';

// Initial default categories
const defaultCategories: Category[] = [
  { id: 'work', name: 'Work', color: '#4f46e5' },
  { id: 'personal', name: 'Personal', color: '#10b981' },
  { id: 'shopping', name: 'Shopping', color: '#f59e0b' },
  { id: 'reading', name: 'Reading', color: '#ef4444' }
];

// For local development, use localStorage instead of chrome.storage
export const getBookmarks = async (): Promise<Bookmark[]> => {
  const storedBookmarks = localStorage.getItem(BOOKMARKS_KEY);
  return storedBookmarks ? JSON.parse(storedBookmarks) : [];
};

export const getCategories = async (): Promise<Category[]> => {
  const storedCategories = localStorage.getItem(CATEGORIES_KEY);
  if (!storedCategories) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(defaultCategories));
    return defaultCategories;
  }
  return JSON.parse(storedCategories);
};

export const addBookmark = async (bookmark: Omit<Bookmark, 'id' | 'createdAt'>): Promise<Bookmark> => {
  const bookmarks = await getBookmarks();
  const newBookmark: Bookmark = {
    ...bookmark,
    id: Date.now().toString(),
    createdAt: Date.now()
  };
  
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify([...bookmarks, newBookmark]));
  return newBookmark;
};

export const deleteBookmark = async (id: string): Promise<void> => {
  const bookmarks = await getBookmarks();
  const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedBookmarks));
};

export const addCategory = async (name: string, color: string): Promise<Category> => {
  const categories = await getCategories();
  const newCategory: Category = {
    id: Date.now().toString(),
    name,
    color
  };
  
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify([...categories, newCategory]));
  return newCategory;
};

export const deleteCategory = async (id: string): Promise<void> => {
  const categories = await getCategories();
  const updatedCategories = categories.filter(category => category.id !== id);
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(updatedCategories));
  
  const bookmarks = await getBookmarks();
  const updatedBookmarks = bookmarks.map(bookmark => 
    bookmark.categoryId === id ? { ...bookmark, categoryId: 'work' } : bookmark
  );
  
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedBookmarks));
};

// Mock getCurrentTab for local development 
export const getCurrentTab = async (): Promise<any> => {
  return {
    url: window.location.href,
    title: document.title
  };
};

// Gets favicon for a URL
export const getFaviconForUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}`;
  } catch (error) {
    console.error('Error getting favicon:', error);
    return '';
  }
};
