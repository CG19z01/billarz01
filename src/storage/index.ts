// MmkvStorageService/storageInstance ne sont volontairement pas ré-exportés ici :
// ce barrel doit rester libre de tout import natif pour que repositories/*
// restent testables sans MMKV. Seul repositories/index.ts (composition root)
// importe storageInstance directement.
export { readJson, writeJson } from './jsonStorage';
export { STORAGE_KEYS } from './storageKeys';
export type { StorageService } from './StorageService';
