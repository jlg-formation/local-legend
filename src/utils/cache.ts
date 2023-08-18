class AppCache {
  get<T>(key: string) {
    const value = localStorage.getItem(key);
    if (value === null) {
      return undefined;
    }
    return JSON.parse(value) as T;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  clearCache() {
    localStorage.clear();
  }
}

export const appCache = new AppCache();
