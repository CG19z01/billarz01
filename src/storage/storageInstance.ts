import { MmkvStorageService } from './MmkvStorageService';
import type { StorageService } from './StorageService';

// Point d'accès unique à l'implémentation concrète, pour ne l'instancier qu'une fois.
export const storageService: StorageService = new MmkvStorageService();
