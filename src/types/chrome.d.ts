
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
    interface StorageArea {
      get(keys: string | string[] | null): Promise<{ [key: string]: any }>;
      set(items: { [key: string]: any }): Promise<void>;
      remove(keys: string | string[]): Promise<void>;
    }
    
    const local: StorageArea;
  }
  
  namespace runtime {
    const id: string;
    interface LastError {
      message: string;
    }
    const lastError: LastError | undefined;
  }
}
