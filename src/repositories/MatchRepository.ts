import type { Match } from '../models';
import { readJson, STORAGE_KEYS, type StorageService, writeJson } from '../storage';

export interface MatchRepository {
  getActiveMatch(): Match | undefined;
  saveActiveMatch(match: Match): void;
  clearActiveMatch(): void;
}

export class StorageMatchRepository implements MatchRepository {
  constructor(private readonly storage: StorageService) {}

  getActiveMatch(): Match | undefined {
    return readJson<Match>(this.storage, STORAGE_KEYS.ACTIVE_MATCH);
  }

  saveActiveMatch(match: Match): void {
    writeJson(this.storage, STORAGE_KEYS.ACTIVE_MATCH, match);
  }

  clearActiveMatch(): void {
    this.storage.delete(STORAGE_KEYS.ACTIVE_MATCH);
  }
}
