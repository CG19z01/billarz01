import { gameHistoryRepository } from '../repositories';

export function clearGameHistory(): void {
  gameHistoryRepository.clearAll();
}
