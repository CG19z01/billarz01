import { BLACK_BALL_SHOT_OPTIONS } from '../../constants/blackBall';
import type { ScoreEntry } from '../../utils/matchSelectors';
import { type GameEngine, noResult } from '../types';

export const FREE_SCORING_GAME_ID = 'free-scoring';

// Moteur par défaut, sans aucune règle : points ajoutés/retirés librement,
// boule noire purement informative. Sert de filet de sécurité pour un
// gameTypeId non enregistré, tant qu'aucune règle réelle n'existe pour lui.
type FreeScoringState = Record<string, number>;

function findEntryName(entryId: string | undefined, entries: ScoreEntry[]): string {
  return entries.find((entry) => entry.id === entryId)?.name ?? '—';
}

export const freeScoringEngine: GameEngine<FreeScoringState> = {
  gameTypeId: FREE_SCORING_GAME_ID,

  createInitialState(entries) {
    return Object.fromEntries(entries.map((entry) => [entry.id, 0]));
  },

  applyAction(state, action) {
    if (!action.entryId || !(action.entryId in state)) {
      return state;
    }
    const points = Number(action.payload?.points ?? 0);
    if (action.type === 'point-added') {
      return { ...state, [action.entryId]: state[action.entryId] + points };
    }
    if (action.type === 'point-removed') {
      return { ...state, [action.entryId]: state[action.entryId] - points };
    }
    return state;
  },

  getScores(state) {
    return state;
  },

  getCurrentEntryId() {
    return undefined;
  },

  getResult() {
    return noResult();
  },

  describeAction(action, entries) {
    const entryName = findEntryName(action.entryId, entries);
    const points = Number(action.payload?.points ?? 0);

    switch (action.type) {
      case 'point-added':
        return `${entryName} +${points} point${points > 1 ? 's' : ''}`;
      case 'point-removed':
        return `${entryName} -${points} point${points > 1 ? 's' : ''}`;
      case 'black-ball': {
        const shotLabel =
          BLACK_BALL_SHOT_OPTIONS.find(
            (option) => option.value === action.payload?.blackBallShotType,
          )?.label ?? '';
        return `${entryName} — boule noire (${shotLabel})`;
      }
      default:
        return `${entryName} — action`;
    }
  },

  isActionEditable() {
    return true;
  },
};
