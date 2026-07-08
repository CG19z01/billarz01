import { gameHistoryRepository } from '../repositories';

export function cleanupExpiredHistory(now: number = Date.now()): void {
  gameHistoryRepository.deleteExpired(now);
}
