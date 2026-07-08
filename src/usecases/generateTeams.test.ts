import type { Player } from '../models';
import { generateTeams } from './generateTeams';

function buildPlayers(count: number): Player[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `player-${index}`,
    name: `Joueur ${index + 1}`,
  }));
}

describe('generateTeams', () => {
  it('returns no teams in solo mode', () => {
    expect(generateTeams(buildPlayers(4), 'solo')).toEqual([]);
  });

  it('creates the expected number of teams', () => {
    expect(generateTeams(buildPlayers(4), 'teams-2')).toHaveLength(2);
    expect(generateTeams(buildPlayers(6), 'teams-3')).toHaveLength(3);
    expect(generateTeams(buildPlayers(8), 'teams-4')).toHaveLength(4);
  });

  it('distributes players round-robin without shuffling', () => {
    const players = buildPlayers(4);
    const teams = generateTeams(players, 'teams-2');

    expect(teams[0].playerIds).toEqual(['player-0', 'player-2']);
    expect(teams[1].playerIds).toEqual(['player-1', 'player-3']);
  });

  it('assigns every player exactly once, shuffled or not', () => {
    const players = buildPlayers(7);
    const teams = generateTeams(players, 'teams-3', { shuffle: true });

    const assignedIds = teams.flatMap((team) => team.playerIds);
    expect(assignedIds.sort()).toEqual(players.map((player) => player.id).sort());
  });

  it('gives each team a distinct color', () => {
    const teams = generateTeams(buildPlayers(8), 'teams-4');
    const colors = teams.map((team) => team.color);
    expect(new Set(colors).size).toBe(colors.length);
  });
});
