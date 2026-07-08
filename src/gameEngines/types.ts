import type { MatchAction } from '../models';
import type { ScoreEntry } from '../utils/matchSelectors';

export interface GameResult {
  isOver: boolean;
  winnerIds: string[];
  loserIds: string[];
}

const NO_RESULT: GameResult = { isOver: false, winnerIds: [], loserIds: [] };

export function noResult(): GameResult {
  return NO_RESULT;
}

// Chaque jeu implémente ce contrat de façon totalement isolée : ajouter un jeu
// n'impose jamais de modifier le moteur d'un autre jeu.
export interface GameEngine<TState = unknown> {
  gameTypeId: string;
  createInitialState(entries: ScoreEntry[]): TState;
  applyAction(state: TState, action: MatchAction): TState;
  getScores(state: TState): Record<string, number>;
  getCurrentEntryId(state: TState): string | undefined;
  getResult(state: TState): GameResult;
  describeAction(action: MatchAction, entries: ScoreEntry[]): string;
  isActionEditable(action: MatchAction): boolean;
}
