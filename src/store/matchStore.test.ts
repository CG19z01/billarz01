import type { Match } from '../models';
import { useMatchStore } from './matchStore';

function buildSoloMatch(): Match {
  return {
    id: 'match-1',
    gameTypeId: 'game-1',
    teamMode: 'solo',
    players: [
      { id: 'player-1', name: 'Alice' },
      { id: 'player-2', name: 'Bob' },
    ],
    teams: [],
    actions: [],
    status: 'in-progress',
    startedAt: 1_000,
  };
}

beforeEach(() => {
  useMatchStore.getState().setMatch(buildSoloMatch());
});

describe('useMatchStore', () => {
  it('records a generic action with its entry and payload', () => {
    useMatchStore.getState().recordAction('player-1', 'ball-pocketed', { ballNumber: 5 });

    const { match } = useMatchStore.getState();
    expect(match?.actions).toHaveLength(1);
    expect(match?.actions[0]).toMatchObject({
      entryId: 'player-1',
      type: 'ball-pocketed',
      payload: { ballNumber: 5 },
    });
  });

  it('records an action without a payload', () => {
    useMatchStore.getState().recordAction('player-2', 'turn-passed');

    const { match } = useMatchStore.getState();
    expect(match?.actions[0]).toMatchObject({ entryId: 'player-2', type: 'turn-passed' });
  });

  it('merges payload changes when updating an existing action', () => {
    useMatchStore
      .getState()
      .recordAction('player-1', 'ball-pocketed', { ballNumber: 8, cushions: 0 });
    const actionId = useMatchStore.getState().match!.actions[0].id;

    useMatchStore.getState().updateAction(actionId, { payload: { cushions: 3 } });

    expect(useMatchStore.getState().match?.actions[0].payload).toEqual({
      ballNumber: 8,
      cushions: 3,
    });
  });

  it('deletes an action', () => {
    useMatchStore.getState().recordAction('player-1', 'ball-pocketed', { ballNumber: 5 });
    const actionId = useMatchStore.getState().match!.actions[0].id;

    useMatchStore.getState().deleteAction(actionId);

    expect(useMatchStore.getState().match?.actions).toHaveLength(0);
  });

  it('undoes only the last action', () => {
    useMatchStore.getState().recordAction('player-1', 'ball-pocketed', { ballNumber: 5 });
    useMatchStore.getState().recordAction('player-2', 'ball-pocketed', { ballNumber: 6 });

    useMatchStore.getState().undoLastAction();

    const { match } = useMatchStore.getState();
    expect(match?.actions).toHaveLength(1);
    expect(match?.actions[0].entryId).toBe('player-1');
  });

  it('does nothing when undoing with no actions', () => {
    useMatchStore.getState().undoLastAction();
    expect(useMatchStore.getState().match?.actions).toEqual([]);
  });

  it('clears actions and resets startedAt on restart', () => {
    useMatchStore.getState().recordAction('player-1', 'ball-pocketed', { ballNumber: 5 });

    useMatchStore.getState().restartMatch();

    const { match } = useMatchStore.getState();
    expect(match?.actions).toEqual([]);
    expect(match?.startedAt).toBeGreaterThan(1_000);
  });

  it('clears the match', () => {
    useMatchStore.getState().clearMatch();
    expect(useMatchStore.getState().match).toBeUndefined();
  });
});
