import type { Match } from '../models';
import { getScoreEntries } from './matchSelectors';

function buildSoloMatch(): Match {
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

function buildTeamMatch(): Match {
  return {
    id: 'match-2',
    gameTypeId: 'game-1',
    teamMode: 'teams-2',
    players: [
      { id: 'player-1', name: 'Alice', teamId: 'team-1' },
      { id: 'player-2', name: 'Bob', teamId: 'team-2' },
    ],
    teams: [
      { id: 'team-1', name: 'Équipe 1', color: '#000', playerIds: ['player-1'] },
      { id: 'team-2', name: 'Équipe 2', color: '#fff', playerIds: ['player-2'] },
    ],
    actions: [],
    status: 'in-progress',
    startedAt: Date.now(),
  };
}

describe('getScoreEntries', () => {
  it('returns players in solo mode', () => {
    const entries = getScoreEntries(buildSoloMatch());
    expect(entries).toEqual([
      { id: 'player-1', name: 'Alice' },
      { id: 'player-2', name: 'Bob' },
    ]);
  });

  it('returns teams when team mode is active', () => {
    const entries = getScoreEntries(buildTeamMatch());
    expect(entries).toEqual([
      { id: 'team-1', name: 'Équipe 1', color: '#000' },
      { id: 'team-2', name: 'Équipe 2', color: '#fff' },
    ]);
  });
});
