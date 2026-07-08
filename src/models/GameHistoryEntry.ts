import type { Player } from './Player';
import type { Team } from './Team';

export interface GameHistoryEntry {
  id: string;
  gameTypeId: string;
  playedAt: number;
  players: Player[];
  teams: Team[];
  // Un ou plusieurs vainqueurs (ex-æquo possible selon le moteur du jeu).
  winnerIds?: string[];
  // entryId (joueur ou équipe) -> score final, calculé par le moteur du jeu.
  finalScore: Record<string, number>;
}
