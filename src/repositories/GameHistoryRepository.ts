import { HISTORY_RETENTION_MS } from '../constants/retention';
import type { GameHistoryEntry } from '../models';
import { readJson, STORAGE_KEYS, type StorageService, writeJson } from '../storage';
import { isWithinRetentionWindow } from '../utils/dateUtils';

export interface GameHistoryRepository {
  getAll(): GameHistoryEntry[];
  add(entry: GameHistoryEntry): void;
  deleteExpired(now: number): void;
  clearAll(): void;
}

export class StorageGameHistoryRepository implements GameHistoryRepository {
  constructor(private readonly storage: StorageService) {}

  getAll(): GameHistoryEntry[] {
    return readJson<GameHistoryEntry[]>(this.storage, STORAGE_KEYS.GAME_HISTORY) ?? [];
  }

  add(entry: GameHistoryEntry): void {
    writeJson(this.storage, STORAGE_KEYS.GAME_HISTORY, [entry, ...this.getAll()]);
  }

  deleteExpired(now: number): void {
    const remaining = this.getAll().filter((entry) =>
      isWithinRetentionWindow(entry.playedAt, now, HISTORY_RETENTION_MS),
    );
    writeJson(this.storage, STORAGE_KEYS.GAME_HISTORY, remaining);
  }

  clearAll(): void {
    writeJson(this.storage, STORAGE_KEYS.GAME_HISTORY, []);
  }
}
