import type { StorageService } from './StorageService';

export function readJson<T>(storage: StorageService, key: string): T | undefined {
  const raw = storage.getString(key);
  if (!raw) {
    return undefined;
  }
  try {
    return JSON.parse(raw) as T;
  } catch {
    return undefined;
  }
}

export function writeJson<T>(storage: StorageService, key: string, value: T): void {
  storage.setString(key, JSON.stringify(value));
}
