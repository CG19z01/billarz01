import type { Player } from '../models';
import { areAllPlayersNamed, isValidPlayerName } from './validation';

function buildPlayer(name: string): Player {
  return { id: `player-${name}`, name };
}

describe('isValidPlayerName', () => {
  it('rejects an empty name', () => {
    expect(isValidPlayerName('')).toBe(false);
  });

  it('rejects a name made only of whitespace', () => {
    expect(isValidPlayerName('   ')).toBe(false);
  });

  it('accepts a non-empty name', () => {
    expect(isValidPlayerName('Alice')).toBe(true);
  });
});

describe('areAllPlayersNamed', () => {
  it('returns false for an empty list', () => {
    expect(areAllPlayersNamed([])).toBe(false);
  });

  it('returns false when at least one player has no name', () => {
    expect(areAllPlayersNamed([buildPlayer('Alice'), buildPlayer('  ')])).toBe(false);
  });

  it('returns true when every player has a name', () => {
    expect(areAllPlayersNamed([buildPlayer('Alice'), buildPlayer('Bob')])).toBe(true);
  });
});
