
// Type definitions for Chrome extension API
interface Chrome {
  tabs: {
    query: (queryInfo: {active: boolean, currentWindow: boolean}, callback: (tabs: {url: string, title: string}[]) => void) => void;
    create: (createProperties: {url: string}) => void;
  };
  storage: {
    local: {
      get: (keys: string | string[] | null, callback: (items: {[key: string]: any}) => void) => void;
      set: (items: {[key: string]: any}, callback?: () => void) => void;
      remove: (keys: string | string[], callback?: () => void) => void;
    };
  };
  runtime: {
    id: string;
    lastError?: {
      message: string;
    };
  };
}

declare global {
  interface Window {
    chrome: Chrome;
  }
  const chrome: Chrome;
}

export {};
