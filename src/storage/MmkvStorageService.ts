import { createMMKV, type MMKV } from 'react-native-mmkv';

import type { StorageService } from './StorageService';

export class MmkvStorageService implements StorageService {
  private readonly mmkv: MMKV;

  constructor(id: string = 'billard-score-app') {
    this.mmkv = createMMKV({ id });
  }

  getString(key: string): string | undefined {
    return this.mmkv.getString(key);
  }

  setString(key: string, value: string): void {
    this.mmkv.set(key, value);
  }

  delete(key: string): void {
    this.mmkv.remove(key);
  }

  getAllKeys(): string[] {
    return this.mmkv.getAllKeys();
  }
}
