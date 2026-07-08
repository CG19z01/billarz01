import { isWithinRetentionWindow } from './dateUtils';

describe('isWithinRetentionWindow', () => {
  const now = new Date('2026-07-08T12:00:00Z').getTime();
  const retentionMs = 3 * 60 * 60 * 1000;

  it('keeps an entry played 1 hour ago', () => {
    const playedAt = now - 1 * 60 * 60 * 1000;
    expect(isWithinRetentionWindow(playedAt, now, retentionMs)).toBe(true);
  });

  it('keeps an entry played exactly at the retention limit', () => {
    const playedAt = now - retentionMs;
    expect(isWithinRetentionWindow(playedAt, now, retentionMs)).toBe(true);
  });

  it('discards an entry played just past the retention limit', () => {
    const playedAt = now - retentionMs - 1;
    expect(isWithinRetentionWindow(playedAt, now, retentionMs)).toBe(false);
  });

  it('discards an entry played 4 hours ago', () => {
    const playedAt = now - 4 * 60 * 60 * 1000;
    expect(isWithinRetentionWindow(playedAt, now, retentionMs)).toBe(false);
  });
});
