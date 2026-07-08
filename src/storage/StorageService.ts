// Abstraction de stockage : aucun repository ni composant ne doit dépendre de MMKV directement.
export interface StorageService {
  getString(key: string): string | undefined;
  setString(key: string, value: string): void;
  delete(key: string): void;
  getAllKeys(): string[];
}
