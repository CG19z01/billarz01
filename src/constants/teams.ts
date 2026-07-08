import type { TeamMode } from '../models';
import { colors } from '../theme';

export const TEAM_MODE_PLAYER_COUNTS: Record<TeamMode, number> = {
  solo: 0,
  'teams-2': 2,
  'teams-3': 3,
  'teams-4': 4,
};

export const TEAM_MODE_OPTIONS: { mode: TeamMode; label: string }[] = [
  { mode: 'solo', label: 'Chacun pour soi' },
  { mode: 'teams-2', label: '2 équipes' },
  { mode: 'teams-3', label: '3 équipes' },
  { mode: 'teams-4', label: '4 équipes' },
];

export const TEAM_COLORS: readonly string[] = colors.team;
