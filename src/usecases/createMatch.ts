import type { Match, Player, Team, TeamMode } from '../models';
import { generateId } from '../utils/idUtils';

interface CreateMatchParams {
  gameTypeId: string;
  teamMode: TeamMode;
  players: Player[];
  teams: Team[];
}

export function createMatch({ gameTypeId, teamMode, players, teams }: CreateMatchParams): Match {
  return {
    id: generateId(),
    gameTypeId,
    teamMode,
    players,
    teams,
    actions: [],
    status: 'in-progress',
    startedAt: Date.now(),
  };
}
