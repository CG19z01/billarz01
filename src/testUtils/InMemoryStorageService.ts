import type { StorageService } from '../storage';

// Double de test : permet de valider repositories/usecases sans dépendre de MMKV.
export class InMemoryStorageService implements StorageService {
  private readonly store = new Map<string, string>();

  getString(key: string): string | undefined {
    return this.store.get(key);
  }

  setString(key: string, value: string): void {
    this.store.set(key, value);
  }

  delete(key: string): void {
    this.store.delete(key);
  }

  getAllKeys(): string[] {
    return Array.from(this.store.keys());
  }
}
