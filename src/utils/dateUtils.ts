import { HISTORY_RETENTION_MS } from '../constants/retention';

export function isWithinRetentionWindow(
  playedAt: number,
  now: number,
  retentionMs: number = HISTORY_RETENTION_MS,
): boolean {
  return now - playedAt <= retentionMs;
}
