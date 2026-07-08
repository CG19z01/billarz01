import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import type { GameHistoryEntry } from '../models';
import { gameHistoryRepository } from '../repositories';
import { cleanupExpiredHistory } from '../usecases/cleanupExpiredHistory';

export function useGameHistory() {
  const [entries, setEntries] = useState<GameHistoryEntry[]>([]);

  const refresh = useCallback(() => {
    cleanupExpiredHistory();
    setEntries(gameHistoryRepository.getAll());
  }, []);

  useFocusEffect(refresh);

  return { entries, refresh };
}
