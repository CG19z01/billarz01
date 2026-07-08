import type { Match } from '../models';

export interface ScoreEntry {
  id: string;
  name: string;
  color?: string;
}

// L'unité de score dépend du mode : un joueur en solo, une équipe sinon.
export function getScoreEntries(match: Match): ScoreEntry[] {
  if (match.teamMode === 'solo') {
    return match.players.map((player) => ({ id: player.id, name: player.name }));
  }
  return match.teams.map((team) => ({ id: team.id, name: team.name, color: team.color }));
}
