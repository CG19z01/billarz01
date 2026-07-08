import type { Match } from '../models';
import { buildGameHistoryEntry } from './buildGameHistoryEntry';

function buildMatch(): Match {
  return {
    id: 'match-1',
    gameTypeId: 'game-1',
    teamMode: 'solo',
    players: [
      { id: 'player-1', name: 'Alice' },
      { id: 'player-2', name: 'Bob' },
    ],
    teams: [],
    actions: [],
    status: 'in-progress',
    startedAt: Date.now(),
  };
}

describe('buildGameHistoryEntry', () => {
  it('carries over the match identity, players and game type', () => {
    const entry = buildGameHistoryEntry(buildMatch(), { 'player-1': 4, 'player-2': 0 }, [
      'player-1',
    ]);

    expect(entry.id).toBe('match-1');
    expect(entry.gameTypeId).toBe('game-1');
    expect(entry.players).toHaveLength(2);
    expect(entry.winnerIds).toEqual(['player-1']);
  });

  it('stores the final score exactly as given', () => {
    const finalScore = { 'player-1': 4, 'player-2': 0 };
    const entry = buildGameHistoryEntry(buildMatch(), finalScore, []);
    expect(entry.finalScore).toEqual(finalScore);
  });

  it('supports several winners ex-aequo', () => {
    const entry = buildGameHistoryEntry(buildMatch(), {}, ['player-1', 'player-2']);
    expect(entry.winnerIds).toEqual(['player-1', 'player-2']);
  });
});
