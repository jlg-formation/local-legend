class AppCache {
  get<T>(str: string) {
    const value = localStorage.getItem(str);
    if (value === null) {
      return undefined;
    }
    return JSON.parse(value) as T;
  }

  set<T>(str: string, value: T) {
    localStorage.setItem(str, JSON.stringify(value));
  }
}

export const appCache = new AppCache();
