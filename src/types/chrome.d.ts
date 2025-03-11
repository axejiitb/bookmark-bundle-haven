
// Type definitions for Chrome extension API
declare namespace chrome {
  namespace tabs {
    interface Tab {
      id?: number;
      url?: string;
      title?: string;
      active: boolean;
      windowId: number;
    }
    
    function query(queryInfo: {
      active: boolean;
      currentWindow: boolean;
    }): Promise<Tab[]>;
    
    function create(createProperties: { url: string }): Promise<Tab>;
  }
  
  namespace storage {
    namespace local {
      function get(keys: string | string[] | null): Promise<{ [key: string]: any }>;
      function set(items: { [key: string]: any }): Promise<void>;
      function remove(keys: string | string[]): Promise<void>;
    }
  }
  
  namespace runtime {
    const id: string;
    const lastError?: {
      message: string;
    };
  }
}

// Chrome namespace is already globally available in extension contexts
