class LocalStorageMock {
    private store: Record<string, string> = {};
  
    get length() {
      return Object.keys(this.store).length;
    }
  
    key(index: number) {
      return Object.keys(this.store)[index] || null;
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key: string) {
      return this.store[key] || null;
    }
  
    setItem(key: string, value: string) {
      this.store[key] = value;
    }
  
    removeItem(key: string) {
      delete this.store[key];
    }
  }
  
  global.localStorage = new LocalStorageMock();
  