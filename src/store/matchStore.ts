import { create } from 'zustand';

import type { Match, MatchAction } from '../models';
import { generateId } from '../utils/idUtils';

interface MatchState {
  match: Match | undefined;
  setMatch: (match: Match) => void;
  recordAction: (
    entryId: string | undefined,
    type: string,
    payload?: Record<string, unknown>,
  ) => void;
  updateAction: (actionId: string, changes: Partial<Pick<MatchAction, 'payload'>>) => void;
  deleteAction: (actionId: string) => void;
  undoLastAction: () => void;
  restartMatch: () => void;
  clearMatch: () => void;
}

export const useMatchStore = create<MatchState>((set, get) => ({
  match: undefined,

  setMatch: (match) => set({ match }),

  recordAction: (entryId, type, payload) => {
    const { match } = get();
    if (!match) {
      return;
    }
    const action: MatchAction = {
      id: generateId(),
      timestamp: Date.now(),
      entryId,
      type,
      payload,
    };
    set({ match: { ...match, actions: [...match.actions, action] } });
  },

  updateAction: (actionId, changes) => {
    const { match } = get();
    if (!match) {
      return;
    }
    set({
      match: {
        ...match,
        actions: match.actions.map((action) =>
          action.id === actionId
            ? { ...action, payload: { ...action.payload, ...changes.payload } }
            : action,
        ),
      },
    });
  },

  deleteAction: (actionId) => {
    const { match } = get();
    if (!match) {
      return;
    }
    set({
      match: { ...match, actions: match.actions.filter((action) => action.id !== actionId) },
    });
  },

  undoLastAction: () => {
    const { match } = get();
    if (!match || match.actions.length === 0) {
      return;
    }
    set({ match: { ...match, actions: match.actions.slice(0, -1) } });
  },

  restartMatch: () => {
    const { match } = get();
    if (!match) {
      return;
    }
    set({ match: { ...match, actions: [], startedAt: Date.now(), finishedAt: undefined } });
  },

  clearMatch: () => set({ match: undefined }),
}));
