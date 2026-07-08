import { ORDER_OF_NUMBERS_GAME_ID } from '../gameEngines';
import type { GameHistoryEntry } from '../models';
import {
  getHistoryScoreEntries,
  resolveEntryName,
  resolveGameTypeName,
  resolveWinnerNames,
} from './gameHistoryLabels';

function buildSoloEntry(overrides: Partial<GameHistoryEntry> = {}): GameHistoryEntry {
  return {
    id: 'match-1',
    gameTypeId: ORDER_OF_NUMBERS_GAME_ID,
    playedAt: Date.now(),
    players: [
      { id: 'player-1', name: 'Alice' },
      { id: 'player-2', name: 'Bob' },
    ],
    teams: [],
    finalScore: { 'player-1': 5, 'player-2': 3 },
    ...overrides,
  };
}

function buildTeamEntry(overrides: Partial<GameHistoryEntry> = {}): GameHistoryEntry {
  return {
    id: 'match-2',
    gameTypeId: ORDER_OF_NUMBERS_GAME_ID,
    playedAt: Date.now(),
    players: [
      { id: 'player-1', name: 'Alice', teamId: 'team-1' },
      { id: 'player-2', name: 'Bob', teamId: 'team-2' },
    ],
    teams: [
      { id: 'team-1', name: 'Équipe 1', color: '#000', playerIds: ['player-1'] },
      { id: 'team-2', name: 'Équipe 2', color: '#fff', playerIds: ['player-2'] },
    ],
    finalScore: { 'team-1': 5, 'team-2': 3 },
    ...overrides,
  };
}

describe('resolveGameTypeName', () => {
  it('resolves a known game type', () => {
    expect(resolveGameTypeName(ORDER_OF_NUMBERS_GAME_ID)).toBe("L'Ordre des Numéros");
  });

  it('falls back for an unknown game type', () => {
    expect(resolveGameTypeName('unknown')).toBe('Jeu inconnu');
  });
});

describe('getHistoryScoreEntries', () => {
  it('returns players for a solo entry', () => {
    expect(getHistoryScoreEntries(buildSoloEntry())).toEqual([
      { id: 'player-1', name: 'Alice' },
      { id: 'player-2', name: 'Bob' },
    ]);
  });

  it('returns teams for a team entry', () => {
    expect(getHistoryScoreEntries(buildTeamEntry())).toEqual([
      { id: 'team-1', name: 'Équipe 1', color: '#000' },
      { id: 'team-2', name: 'Équipe 2', color: '#fff' },
    ]);
  });
});

describe('resolveWinnerNames', () => {
  it('returns an empty array when there is no winner', () => {
    expect(resolveWinnerNames(buildSoloEntry({ winnerIds: undefined }))).toEqual([]);
  });

  it('resolves a single player winner in solo mode', () => {
    expect(resolveWinnerNames(buildSoloEntry({ winnerIds: ['player-1'] }))).toEqual(['Alice']);
  });

  it('resolves a team winner in team mode', () => {
    expect(resolveWinnerNames(buildTeamEntry({ winnerIds: ['team-2'] }))).toEqual(['Équipe 2']);
  });

  it('resolves several ex-aequo winners', () => {
    expect(resolveWinnerNames(buildSoloEntry({ winnerIds: ['player-1', 'player-2'] }))).toEqual([
      'Alice',
      'Bob',
    ]);
  });
});

describe('resolveEntryName', () => {
  it('returns a placeholder for an unknown id', () => {
    expect(resolveEntryName(buildSoloEntry(), 'unknown')).toBe('—');
  });
});
