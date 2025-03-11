
// Type definitions for Chrome extension API
interface Chrome {
  tabs: {
    query: (queryInfo: {
      active: boolean;
      currentWindow: boolean;
    }) => Promise<chrome.tabs.Tab[]>;
    create: (createProperties: { url: string }) => Promise<chrome.tabs.Tab>;
  };
  storage: {
    local: {
      get: (keys: string | string[] | null) => Promise<{ [key: string]: any }>;
      set: (items: { [key: string]: any }) => Promise<void>;
      remove: (keys: string | string[]) => Promise<void>;
    };
  };
  runtime: {
    id: string;
    lastError?: {
      message: string;
    };
  };
}

declare namespace chrome.tabs {
  interface Tab {
    id?: number;
    url?: string;
    title?: string;
    active: boolean;
    windowId: number;
  }
}

declare global {
  interface Window {
    chrome: Chrome;
  }
  const chrome: Chrome;
}

export {};
