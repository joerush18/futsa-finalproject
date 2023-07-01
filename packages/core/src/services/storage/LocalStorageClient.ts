import { IStorageClient, Nullable, StorageKey } from "./types";

class LocalStorageClient implements IStorageClient {
  async read() {
    const response: Record<string, Nullable<string>> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        response[key] = localStorage.getItem(key);
      }
    }
    return response;
  }

  async saveItem(key: StorageKey, value: Nullable<string>) {
    try {
      localStorage.setItem(key, value ?? "");
      return true;
    } catch {
      return false;
    }
  }

  async removeItem(key: StorageKey): Promise<void> {
    localStorage.removeItem(key);
  }
}

export default LocalStorageClient;
