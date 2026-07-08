import { clearGameHistory } from '../usecases/clearGameHistory';

export function useSettings() {
  return {
    clearHistory: clearGameHistory,
  };
}
