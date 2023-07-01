import forEach from "lodash/forEach";

import { IStorageClient, Service, StorageKey } from "./types";

class StorageService implements Service {
  private cache: Map<StorageKey, unknown> = new Map();

  public constructor(protected storage: IStorageClient) {}

  public async init() {
    const cacheable = await this.storage.read();
    forEach(cacheable, (value, key) => {
      let parsed = value;
      try {
        if (typeof value === "string") {
          parsed = JSON.parse(value);
        }
      } catch {
        // Ignore JSON parse error and simply use raw value.
      }
      this.cache.set(key as StorageKey, parsed);
    });
  }

  public saveItem<T>(key: StorageKey, value: T) {
    let saveable: string;
    if (value && typeof value === "object") {
      saveable = JSON.stringify(value);
    } else {
      saveable = String(value);
    }
    this.storage.saveItem(key, saveable);
    this.cache.set(key, value);
  }

  public getItem<T>(key: StorageKey): T | null | undefined {
    return this.cache.get(key) as T;
  }

  public removeItem(key: StorageKey) {
    this.cache.delete(key);
    this.storage.removeItem(key);
  }

  public getName() {
    return "StorageService";
  }
}

export default StorageService;
