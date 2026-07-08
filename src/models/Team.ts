export type TeamMode = 'solo' | 'teams-2' | 'teams-3' | 'teams-4';

export interface Team {
  id: string;
  name: string;
  color: string;
  playerIds: string[];
}
