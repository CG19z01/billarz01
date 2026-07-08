import { useGameHistory } from './useGameHistory';

export function useGameHistoryEntry(matchId: string) {
  const { entries } = useGameHistory();
  return entries.find((entry) => entry.id === matchId);
}
