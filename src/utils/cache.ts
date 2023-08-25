import * as localforage from "localforage";

class AppCache {
  async get<T>(key: string): Promise<T | undefined> {
    const value = await localforage.getItem<string>(key);
    if (value === null) {
      return undefined;
    }
    return JSON.parse(value) as T;
  }

  async getOrDefault<T>(key: string, defaultValue: T): Promise<T> {
    const value = await localforage.getItem<string>(key);
    if (value === null) {
      return defaultValue;
    }
    return JSON.parse(value) as T;
  }

  async remove(key: string): Promise<void> {
    await localforage.removeItem(key);
  }

  async set<T>(key: string, value: T): Promise<void> {
    await localforage.setItem(key, JSON.stringify(value));
  }

  async clearCache(): Promise<void> {
    await localforage.clear();
  }
}

export const appCache = new AppCache();
