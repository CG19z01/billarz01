import type { Player } from '../models';

export function isValidPlayerName(name: string): boolean {
  return name.trim().length > 0;
}

export function areAllPlayersNamed(players: Player[]): boolean {
  return players.length > 0 && players.every((player) => isValidPlayerName(player.name));
}
