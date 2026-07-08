import type { GameHistoryEntry } from '../models';
import { InMemoryStorageService } from '../testUtils/InMemoryStorageService';
import { StorageGameHistoryRepository } from './GameHistoryRepository';

function buildEntry(overrides: Partial<GameHistoryEntry> = {}): GameHistoryEntry {
  return {
    id: 'entry-1',
    gameTypeId: 'game-1',
    playedAt: Date.now(),
    players: [{ id: 'player-1', name: 'Alice' }],
    teams: [],
    finalScore: {},
    ...overrides,
  };
}

describe('StorageGameHistoryRepository', () => {
  it('returns an empty list when nothing was saved', () => {
    const repository = new StorageGameHistoryRepository(new InMemoryStorageService());
    expect(repository.getAll()).toEqual([]);
  });

  it('adds new entries in front of the list, most recent first', () => {
    const repository = new StorageGameHistoryRepository(new InMemoryStorageService());
    repository.add(buildEntry({ id: 'entry-1' }));
    repository.add(buildEntry({ id: 'entry-2' }));

    expect(repository.getAll().map((entry) => entry.id)).toEqual(['entry-2', 'entry-1']);
  });

  it('deletes entries older than the retention window', () => {
    const repository = new StorageGameHistoryRepository(new InMemoryStorageService());
    const now = Date.now();
    const retentionMs = 3 * 60 * 60 * 1000;

    repository.add(buildEntry({ id: 'recent', playedAt: now - 60 * 60 * 1000 }));
    repository.add(buildEntry({ id: 'expired', playedAt: now - retentionMs - 1 }));

    repository.deleteExpired(now);

    expect(repository.getAll().map((entry) => entry.id)).toEqual(['recent']);
  });

  it('keeps every entry when none are expired', () => {
    const repository = new StorageGameHistoryRepository(new InMemoryStorageService());
    const now = Date.now();
    repository.add(buildEntry({ id: 'entry-1', playedAt: now }));

    repository.deleteExpired(now);

    expect(repository.getAll()).toHaveLength(1);
  });

  it('removes every entry on clearAll', () => {
    const repository = new StorageGameHistoryRepository(new InMemoryStorageService());
    repository.add(buildEntry({ id: 'entry-1' }));
    repository.add(buildEntry({ id: 'entry-2' }));

    repository.clearAll();

    expect(repository.getAll()).toEqual([]);
  });
});
