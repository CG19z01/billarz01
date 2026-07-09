import type { ScoreEntry } from '../../utils/matchSelectors';
import type { GameEngine } from '../types';
import { BALL_NUMBERS, BLACK_BALL_NUMBER, ORDER_OF_NUMBERS_GAME_ID } from './constants';
import { getBallValue } from './scoring';

interface PocketedBall {
  ballNumber: number;
  // absent pour une boule retirée hors-jeu : l'événement n'est rattaché à
  // aucun joueur.
  entryId?: string;
  cushions?: number;
  // false pour une boule noire empochée prématurément, ou pour une boule
  // retirée hors-jeu : l'événement est gardé pour l'historique et le
  // départage, mais ne rapporte aucun point.
  scored: boolean;
}

export interface OrderOfNumbersState {
  entries: ScoreEntry[];
  remainingBalls: number[];
  pocketedOrder: PocketedBall[];
  currentEntryIndex: number;
  isOver: boolean;
  winnerIds: string[];
  loserIds: string[];
}

function findEntryName(entryId: string | undefined, entries: ScoreEntry[]): string {
  return entries.find((entry) => entry.id === entryId)?.name ?? '—';
}

function computeScores(
  entries: ScoreEntry[],
  pocketedOrder: PocketedBall[],
): Record<string, number> {
  const scores: Record<string, number> = Object.fromEntries(entries.map((entry) => [entry.id, 0]));
  for (const pocketed of pocketedOrder) {
    if (!pocketed.scored || !pocketed.entryId) {
      continue;
    }
    scores[pocketed.entryId] =
      (scores[pocketed.entryId] ?? 0) + getBallValue(pocketed.ballNumber, pocketed.cushions);
  }
  return scores;
}

// "Si plusieurs joueurs possèdent le plus grand nombre de points : si le joueur
// ayant empoché la boule noire fait partie des joueurs à égalité, il est déclaré
// vainqueur ; sinon, le vainqueur est le joueur ayant empoché la dernière boule
// avant la boule noire."
function resolveWinner(
  scores: Record<string, number>,
  blackBallPotterId: string,
  previousPotterId: string | undefined,
): string[] {
  const maxScore = Math.max(...Object.values(scores));
  const topEntries = Object.keys(scores).filter((id) => scores[id] === maxScore);

  if (topEntries.length <= 1) {
    return topEntries;
  }
  if (topEntries.includes(blackBallPotterId)) {
    return [blackBallPotterId];
  }
  return previousPotterId ? [previousPotterId] : topEntries;
}

// Fin anticipée : le potteur de la noire est exclu du départage. Le
// vainqueur est le joueur restant avec le plus de points ; en cas
// d'égalité, celui qui a empoché la boule de plus grande valeur l'emporte.
function resolveEarlyEndWinner(
  entries: ScoreEntry[],
  pocketedOrder: PocketedBall[],
  blackBallPotterId: string,
): string[] {
  const candidateIds = entries.map((entry) => entry.id).filter((id) => id !== blackBallPotterId);
  const scores = computeScores(entries, pocketedOrder);
  const maxScore = Math.max(...candidateIds.map((id) => scores[id] ?? 0));
  const topEntries = candidateIds.filter((id) => (scores[id] ?? 0) === maxScore);

  if (topEntries.length <= 1) {
    return topEntries;
  }

  let winner: string | undefined;
  let bestBallValue = -Infinity;
  for (const pocketed of pocketedOrder) {
    if (!pocketed.scored || !pocketed.entryId || !topEntries.includes(pocketed.entryId)) {
      continue;
    }
    const value = getBallValue(pocketed.ballNumber, pocketed.cushions);
    if (value > bestBallValue) {
      bestBallValue = value;
      winner = pocketed.entryId;
    }
  }

  return winner ? [winner] : topEntries;
}

export const orderOfNumbersEngine: GameEngine<OrderOfNumbersState> = {
  gameTypeId: ORDER_OF_NUMBERS_GAME_ID,

  createInitialState(entries) {
    return {
      entries,
      remainingBalls: [...BALL_NUMBERS],
      pocketedOrder: [],
      currentEntryIndex: 0,
      isOver: false,
      winnerIds: [],
      loserIds: [],
    };
  },

  applyAction(state, action) {
    if (state.isOver) {
      return state;
    }

    if (action.type === 'turn-passed') {
      if (state.entries.length === 0) {
        return state;
      }
      return { ...state, currentEntryIndex: (state.currentEntryIndex + 1) % state.entries.length };
    }

    if (action.type === 'ball-out-of-play') {
      const ballNumber = Number(action.payload?.ballNumber);
      if (ballNumber === BLACK_BALL_NUMBER || !state.remainingBalls.includes(ballNumber)) {
        return state;
      }
      return {
        ...state,
        remainingBalls: state.remainingBalls.filter((number) => number !== ballNumber),
        pocketedOrder: [...state.pocketedOrder, { ballNumber, scored: false }],
        currentEntryIndex:
          state.entries.length === 0
            ? state.currentEntryIndex
            : (state.currentEntryIndex + 1) % state.entries.length,
      };
    }

    if (action.type !== 'ball-pocketed' || !action.entryId) {
      return state;
    }

    const ballNumber = Number(action.payload?.ballNumber);
    if (!state.remainingBalls.includes(ballNumber)) {
      return state;
    }

    const otherBallsRemain = state.remainingBalls.length - 1 > 0;
    const remainingBalls = state.remainingBalls.filter((number) => number !== ballNumber);

    if (ballNumber !== BLACK_BALL_NUMBER) {
      return {
        ...state,
        remainingBalls,
        pocketedOrder: [
          ...state.pocketedOrder,
          { ballNumber, entryId: action.entryId, scored: true },
        ],
      };
    }

    // Boule noire.
    const cushions = Number(action.payload?.cushions ?? 0);

    if (!otherBallsRemain) {
      // Fin normale : la noire est la dernière boule, elle compte normalement.
      const previousPotterId = state.pocketedOrder[state.pocketedOrder.length - 1]?.entryId;
      const pocketedOrder: PocketedBall[] = [
        ...state.pocketedOrder,
        { ballNumber, entryId: action.entryId, cushions, scored: true },
      ];
      const scores = computeScores(state.entries, pocketedOrder);
      return {
        ...state,
        remainingBalls,
        pocketedOrder,
        isOver: true,
        winnerIds: resolveWinner(scores, action.entryId, previousPotterId),
        loserIds: [],
      };
    }

    // Fin anticipée : la noire sort trop tôt, elle ne rapporte aucun point et
    // son potteur est éliminé — exclu du départage et déclaré perdant. Le
    // vainqueur est le joueur restant avec le plus de points.
    const pocketedOrder: PocketedBall[] = [
      ...state.pocketedOrder,
      { ballNumber, entryId: action.entryId, cushions, scored: false },
    ];

    return {
      ...state,
      remainingBalls,
      pocketedOrder,
      isOver: true,
      winnerIds: resolveEarlyEndWinner(state.entries, pocketedOrder, action.entryId),
      loserIds: [action.entryId],
    };
  },

  getScores(state) {
    return computeScores(state.entries, state.pocketedOrder);
  },

  getCurrentEntryId(state) {
    return state.isOver ? undefined : state.entries[state.currentEntryIndex]?.id;
  },

  getResult(state) {
    return { isOver: state.isOver, winnerIds: state.winnerIds, loserIds: state.loserIds };
  },

  describeAction(action, entries) {
    const entryName = findEntryName(action.entryId, entries);

    if (action.type === 'turn-passed') {
      return `${entryName} ne rentre aucune boule — fin du tour`;
    }

    if (action.type === 'ball-out-of-play') {
      const ballNumber = Number(action.payload?.ballNumber);
      return `Boule ${ballNumber} retirée du jeu (hors-jeu) — fin du tour`;
    }

    if (action.type === 'ball-pocketed') {
      const ballNumber = Number(action.payload?.ballNumber);
      if (ballNumber === BLACK_BALL_NUMBER) {
        const cushions = Number(action.payload?.cushions ?? 0);
        const value = getBallValue(ballNumber, cushions);
        const cushionLabel =
          cushions === 0 ? '0 bande' : cushions === 1 ? '1 bande' : `${cushions} bandes`;
        return `${entryName} empoche la boule noire (${cushionLabel}) — ${value} points`;
      }
      return `${entryName} empoche la boule ${ballNumber} — +${ballNumber} points`;
    }

    return `${entryName} — action`;
  },

  isActionEditable(action) {
    return (
      action.type === 'ball-pocketed' && Number(action.payload?.ballNumber) === BLACK_BALL_NUMBER
    );
  },
};
