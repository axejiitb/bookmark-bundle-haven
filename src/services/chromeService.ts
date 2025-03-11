
// Gets current tab information
export const getCurrentTab = async (): Promise<chrome.tabs.Tab | null> => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab || null;
  } catch (error) {
    console.error('Error getting current tab:', error);
    return null;
  }
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
