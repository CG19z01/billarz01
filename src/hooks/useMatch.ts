import { useEffect, useMemo } from 'react';

import { getGameEngine } from '../gameEngines';
import { gameHistoryRepository, matchRepository } from '../repositories';
import { useMatchStore, useNewGameSetupStore } from '../store';
import { buildGameHistoryEntry } from '../usecases/buildGameHistoryEntry';
import { createMatch } from '../usecases/createMatch';
import { getScoreEntries } from '../utils/matchSelectors';

export function useMatch() {
  const match = useMatchStore((state) => state.match);
  const setMatch = useMatchStore((state) => state.setMatch);
  const recordAction = useMatchStore((state) => state.recordAction);
  const updateAction = useMatchStore((state) => state.updateAction);
  const deleteAction = useMatchStore((state) => state.deleteAction);
  const undoLastAction = useMatchStore((state) => state.undoLastAction);
  const restartMatch = useMatchStore((state) => state.restartMatch);
  const clearMatchState = useMatchStore((state) => state.clearMatch);

  const gameTypeId = useNewGameSetupStore((state) => state.gameTypeId);
  const teamMode = useNewGameSetupStore((state) => state.teamMode);
  const players = useNewGameSetupStore((state) => state.players);
  const teams = useNewGameSetupStore((state) => state.teams);

  useEffect(() => {
    if (match) {
      return;
    }
    const resumed = matchRepository.getActiveMatch();
    if (resumed) {
      setMatch(resumed);
      return;
    }
    if (!gameTypeId) {
      return;
    }
    setMatch(createMatch({ gameTypeId, teamMode, players, teams }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (match) {
      matchRepository.saveActiveMatch(match);
    }
  }, [match]);

  const engine = useMemo(() => getGameEngine(match?.gameTypeId ?? ''), [match?.gameTypeId]);
  const scoreEntries = useMemo(() => (match ? getScoreEntries(match) : []), [match]);

  const gameState = useMemo(() => {
    const initial = engine.createInitialState(scoreEntries);
    if (!match) {
      return initial;
    }
    return match.actions.reduce((state, action) => engine.applyAction(state, action), initial);
  }, [engine, scoreEntries, match]);

  const scores = engine.getScores(gameState);
  const currentEntryId = engine.getCurrentEntryId(gameState);
  const result = engine.getResult(gameState);
  const orderedActions = match ? [...match.actions].reverse() : [];

  function finishMatch(winnerIds: string[]) {
    if (!match) {
      return;
    }
    gameHistoryRepository.add(buildGameHistoryEntry(match, scores, winnerIds));
    matchRepository.clearActiveMatch();
    clearMatchState();
  }

  return {
    match,
    engine,
    gameState,
    scoreEntries,
    scores,
    currentEntryId,
    result,
    orderedActions,
    recordAction,
    updateAction,
    deleteAction,
    undoLastAction,
    canUndo: (match?.actions.length ?? 0) > 0,
    restartMatch,
    finishMatch,
  };
}
