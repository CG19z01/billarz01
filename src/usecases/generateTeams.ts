import { TEAM_COLORS, TEAM_MODE_PLAYER_COUNTS } from '../constants/teams';
import type { Player, Team, TeamMode } from '../models';
import { shuffleArray } from '../utils/arrayUtils';
import { generateId } from '../utils/idUtils';

interface GenerateTeamsOptions {
  shuffle?: boolean;
}

export function generateTeams(
  players: Player[],
  teamMode: TeamMode,
  { shuffle = false }: GenerateTeamsOptions = {},
): Team[] {
  const teamCount = TEAM_MODE_PLAYER_COUNTS[teamMode];
  if (teamCount === 0) {
    return [];
  }

  const orderedPlayers = shuffle ? shuffleArray(players) : players;

  const teams: Team[] = Array.from({ length: teamCount }, (_, index) => ({
    id: generateId(),
    name: `Équipe ${index + 1}`,
    color: TEAM_COLORS[index % TEAM_COLORS.length],
    playerIds: [],
  }));

  orderedPlayers.forEach((player, index) => {
    teams[index % teamCount].playerIds.push(player.id);
  });

  return teams;
}
