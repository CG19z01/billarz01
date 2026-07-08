import type { GameHistoryEntry, Match } from '../models';

// Le score final et les vainqueurs sont calculés par le moteur du jeu actif
// (voir gameEngines/) ; cette fonction se contente d'assembler l'entrée d'historique.
export function buildGameHistoryEntry(
  match: Match,
  finalScore: Record<string, number>,
  winnerIds: string[],
): GameHistoryEntry {
  return {
    id: match.id,
    gameTypeId: match.gameTypeId,
    playedAt: Date.now(),
    players: match.players,
    teams: match.teams,
    winnerIds,
    finalScore,
  };
}
