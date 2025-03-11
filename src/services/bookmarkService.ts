
export interface Bookmark {
  id: string;
  url: string;
  title: string;
  favicon: string;
  categoryId: string;
  createdAt: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

// Initial default categories
const defaultCategories: Category[] = [
  { id: 'work', name: 'Work', color: '#4f46e5' },
  { id: 'personal', name: 'Personal', color: '#10b981' },
  { id: 'shopping', name: 'Shopping', color: '#f59e0b' },
  { id: 'reading', name: 'Reading', color: '#ef4444' }
];

// Store key names
const BOOKMARKS_KEY = 'bookmark_bundle_bookmarks';
const CATEGORIES_KEY = 'bookmark_bundle_categories';

// Initialize storage
const initializeStorage = async (): Promise<void> => {
  const data = await chrome.storage.local.get([CATEGORIES_KEY, BOOKMARKS_KEY]);
  
  if (!data[CATEGORIES_KEY]) {
    await chrome.storage.local.set({ [CATEGORIES_KEY]: defaultCategories });
  }
  
  if (!data[BOOKMARKS_KEY]) {
    await chrome.storage.local.set({ [BOOKMARKS_KEY]: [] });
  }
};

// Get all bookmarks
export const getBookmarks = async (): Promise<Bookmark[]> => {
  await initializeStorage();
  const data = await chrome.storage.local.get([BOOKMARKS_KEY]);
  return data[BOOKMARKS_KEY] || [];
};

// Get all categories
export const getCategories = async (): Promise<Category[]> => {
  await initializeStorage();
  const data = await chrome.storage.local.get([CATEGORIES_KEY]);
  return data[CATEGORIES_KEY] || defaultCategories;
};

// Add a new bookmark
export const addBookmark = async (bookmark: Omit<Bookmark, 'id' | 'createdAt'>): Promise<Bookmark> => {
  const bookmarks = await getBookmarks();
  const newBookmark: Bookmark = {
    ...bookmark,
    id: Date.now().toString(),
    createdAt: Date.now()
  };
  
  await chrome.storage.local.set({ 
    [BOOKMARKS_KEY]: [...bookmarks, newBookmark] 
  });
  
  return newBookmark;
};

// Delete a bookmark
export const deleteBookmark = async (id: string): Promise<void> => {
  const bookmarks = await getBookmarks();
  const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
  await chrome.storage.local.set({ [BOOKMARKS_KEY]: updatedBookmarks });
};

// Add a new category
export const addCategory = async (name: string, color: string): Promise<Category> => {
  const categories = await getCategories();
  const newCategory: Category = {
    id: Date.now().toString(),
    name,
    color
  };
  
  await chrome.storage.local.set({ 
    [CATEGORIES_KEY]: [...categories, newCategory] 
  });
  
  return newCategory;
};

// Delete a category
export const deleteCategory = async (id: string): Promise<void> => {
  const categories = await getCategories();
  const updatedCategories = categories.filter(category => category.id !== id);
  await chrome.storage.local.set({ [CATEGORIES_KEY]: updatedCategories });
  
  // Update bookmarks with this category to use the default category
  const bookmarks = await getBookmarks();
  const updatedBookmarks = bookmarks.map(bookmark => 
    bookmark.categoryId === id ? { ...bookmark, categoryId: 'work' } : bookmark
  );
  
  await chrome.storage.local.set({ [BOOKMARKS_KEY]: updatedBookmarks });
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

// Gets current tab information
export const getCurrentTab = async (): Promise<chrome.tabs.Tab | null> => {
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    return tabs[0] || null;
  } catch (error) {
    console.error('Error getting current tab:', error);
    return null;
  }
};
