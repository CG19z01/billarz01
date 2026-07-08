import { storageService } from '../storage/storageInstance';
import { type GameHistoryRepository, StorageGameHistoryRepository } from './GameHistoryRepository';
import { type MatchRepository, StorageMatchRepository } from './MatchRepository';

export type { GameHistoryRepository } from './GameHistoryRepository';
export type { MatchRepository } from './MatchRepository';

export const matchRepository: MatchRepository = new StorageMatchRepository(storageService);
export const gameHistoryRepository: GameHistoryRepository = new StorageGameHistoryRepository(
  storageService,
);
