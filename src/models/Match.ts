import type { MatchAction } from './MatchAction';
import type { Player } from './Player';
import type { Team, TeamMode } from './Team';

export type MatchStatus = 'in-progress' | 'finished';

export interface Match {
  id: string;
  gameTypeId: string;
  teamMode: TeamMode;
  players: Player[];
  teams: Team[];
  actions: MatchAction[];
  status: MatchStatus;
  startedAt: number;
  finishedAt?: number;
  // Un ou plusieurs vainqueurs (ex-æquo possible selon le moteur du jeu).
  winnerIds?: string[];
}
