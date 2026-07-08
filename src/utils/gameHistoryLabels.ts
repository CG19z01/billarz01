import { GAME_TYPES } from '../constants/games';
import type { GameHistoryEntry } from '../models';
import type { ScoreEntry } from './matchSelectors';

export function resolveGameTypeName(gameTypeId: string): string {
  return GAME_TYPES.find((gameType) => gameType.id === gameTypeId)?.name ?? 'Jeu inconnu';
}

// Une entrée d'historique n'a pas de champ teamMode : la présence d'équipes suffit à savoir
// si l'id (vainqueur, score) désigne un joueur ou une équipe.
export function getHistoryScoreEntries(entry: GameHistoryEntry): ScoreEntry[] {
  if (entry.teams.length > 0) {
    return entry.teams.map((team) => ({ id: team.id, name: team.name, color: team.color }));
  }
  return entry.players.map((player) => ({ id: player.id, name: player.name }));
}

export function resolveEntryName(entry: GameHistoryEntry, id: string): string {
  return getHistoryScoreEntries(entry).find((scoreEntry) => scoreEntry.id === id)?.name ?? '—';
}

export function resolveWinnerNames(entry: GameHistoryEntry): string[] {
  return (entry.winnerIds ?? []).map((id) => resolveEntryName(entry, id));
}
