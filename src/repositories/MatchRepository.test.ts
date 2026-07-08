import type { Match } from '../models';
import { InMemoryStorageService } from '../testUtils/InMemoryStorageService';
import { StorageMatchRepository } from './MatchRepository';

function buildMatch(overrides: Partial<Match> = {}): Match {
  return {
    id: 'match-1',
    gameTypeId: 'game-1',
    teamMode: 'solo',
    players: [{ id: 'player-1', name: 'Alice' }],
    teams: [],
    actions: [],
    status: 'in-progress',
    startedAt: Date.now(),
    ...overrides,
  };
}

describe('StorageMatchRepository', () => {
  it('returns undefined when no active match was saved', () => {
    const repository = new StorageMatchRepository(new InMemoryStorageService());
    expect(repository.getActiveMatch()).toBeUndefined();
  });

  it('saves and retrieves the active match', () => {
    const repository = new StorageMatchRepository(new InMemoryStorageService());
    const match = buildMatch();

    repository.saveActiveMatch(match);

    expect(repository.getActiveMatch()).toEqual(match);
  });

  it('overwrites the previous active match when saving a new one', () => {
    const repository = new StorageMatchRepository(new InMemoryStorageService());
    repository.saveActiveMatch(buildMatch({ id: 'match-1' }));
    repository.saveActiveMatch(buildMatch({ id: 'match-2' }));

    expect(repository.getActiveMatch()?.id).toBe('match-2');
  });

  it('clears the active match', () => {
    const repository = new StorageMatchRepository(new InMemoryStorageService());
    repository.saveActiveMatch(buildMatch());

    repository.clearActiveMatch();

    expect(repository.getActiveMatch()).toBeUndefined();
  });
});
