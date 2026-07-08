import { useEffect } from 'react';

import { cleanupExpiredHistory } from '../usecases/cleanupExpiredHistory';

export function useHistoryCleanup() {
  useEffect(() => {
    cleanupExpiredHistory();
  }, []);
}
