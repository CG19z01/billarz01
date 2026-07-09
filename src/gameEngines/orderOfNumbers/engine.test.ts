import type { MatchAction } from '../../models';
import type { ScoreEntry } from '../../utils/matchSelectors';
import { orderOfNumbersEngine as engine, type OrderOfNumbersState } from './engine';

const ENTRIES: ScoreEntry[] = [
  { id: 'p1', name: 'Alice' },
  { id: 'p2', name: 'Bob' },
  { id: 'p3', name: 'Chloé' },
];

function pocketAction(entryId: string, ballNumber: number, cushions?: number): MatchAction {
  return {
    id: `${entryId}-${ballNumber}`,
    timestamp: Date.now(),
    entryId,
    type: 'ball-pocketed',
    payload: cushions === undefined ? { ballNumber } : { ballNumber, cushions },
  };
}

function passAction(entryId: string): MatchAction {
  return { id: `${entryId}-pass`, timestamp: Date.now(), entryId, type: 'turn-passed' };
}

function outOfPlayAction(ballNumber: number): MatchAction {
  return {
    id: `oop-${ballNumber}`,
    timestamp: Date.now(),
    type: 'ball-out-of-play',
    payload: { ballNumber },
  };
}

function pocketAll(
  state: OrderOfNumbersState,
  entryId: string,
  ballNumbers: number[],
): OrderOfNumbersState {
  return ballNumbers.reduce(
    (current, ballNumber) => engine.applyAction(current, pocketAction(entryId, ballNumber)),
    state,
  );
}

function freshState(entries: ScoreEntry[] = ENTRIES): OrderOfNumbersState {
  return engine.createInitialState(entries);
}

describe('createInitialState', () => {
  it('starts with all 15 balls on the table and the first entry on strike', () => {
    const state = freshState();
    expect(state.remainingBalls).toHaveLength(15);
    expect(engine.getCurrentEntryId(state)).toBe('p1');
    expect(engine.getResult(state)).toEqual({ isOver: false, winnerIds: [], loserIds: [] });
  });
});

describe('pocketing a normal ball', () => {
  it('removes the ball from the table and keeps the same player on strike', () => {
    let state = freshState();
    state = engine.applyAction(state, pocketAction('p1', 5));

    expect(state.remainingBalls).not.toContain(5);
    expect(engine.getCurrentEntryId(state)).toBe('p1');
    expect(engine.getScores(state)).toMatchObject({ p1: 5 });
  });

  it('accumulates points across several balls in the same turn', () => {
    let state = freshState();
    state = pocketAll(state, 'p1', [1, 2, 3]);
    expect(engine.getScores(state).p1).toBe(6);
  });
});

describe('turn-passed', () => {
  it('advances to the next entry and wraps around', () => {
    let state = freshState();
    state = engine.applyAction(state, passAction('p1'));
    expect(engine.getCurrentEntryId(state)).toBe('p2');

    state = engine.applyAction(state, passAction('p2'));
    expect(engine.getCurrentEntryId(state)).toBe('p3');

    state = engine.applyAction(state, passAction('p3'));
    expect(engine.getCurrentEntryId(state)).toBe('p1');
  });
});

describe('fin normale', () => {
  it('declares the highest scorer the winner when there is no tie', () => {
    let state = freshState([ENTRIES[0], ENTRIES[1]]);
    state = pocketAll(state, 'p1', [1, 2, 3, 4, 5, 6, 7]);
    state = pocketAll(state, 'p2', [9, 10, 11, 12, 13, 14, 15]);
    state = engine.applyAction(state, pocketAction('p2', 8, 0));

    expect(engine.getResult(state)).toEqual({ isOver: true, winnerIds: ['p2'], loserIds: [] });
    expect(engine.getScores(state)).toEqual({ p1: 28, p2: 92 });
    expect(engine.getCurrentEntryId(state)).toBeUndefined();
  });

  it('lets the black-ball potter win a tie they are part of', () => {
    let state = freshState();
    state = pocketAll(state, 'p1', [12, 11, 10, 3]); // 36, +8 black = 44
    state = pocketAll(state, 'p2', [15, 14, 13, 2]); // 44
    state = pocketAll(state, 'p3', [9, 7, 6, 5, 4, 1]); // 32
    state = engine.applyAction(state, pocketAction('p1', 8, 0));

    expect(engine.getScores(state)).toEqual({ p1: 44, p2: 44, p3: 32 });
    expect(engine.getResult(state).winnerIds).toEqual(['p1']);
  });

  it('falls back to the potter of the ball just before the black ball when the potter is not tied', () => {
    let state = freshState();
    state = pocketAll(state, 'p2', [9, 10, 11, 12]); // 42
    state = pocketAll(state, 'p3', [1, 2, 3, 4, 5, 6, 7]); // 28
    state = pocketAll(state, 'p1', [13, 14, 15]); // 42, last non-black ball potted by p1
    state = engine.applyAction(state, pocketAction('p3', 8, 0)); // p3: 28 + 8 = 36

    expect(engine.getScores(state)).toEqual({ p1: 42, p2: 42, p3: 36 });
    expect(engine.getResult(state).winnerIds).toEqual(['p1']);
  });
});

describe('ball-out-of-play', () => {
  it('removes the ball from the table without scoring it and passes the turn', () => {
    let state = freshState();
    state = engine.applyAction(state, outOfPlayAction(5));

    expect(state.remainingBalls).not.toContain(5);
    expect(engine.getScores(state)).toEqual({ p1: 0, p2: 0, p3: 0 });
    expect(engine.getCurrentEntryId(state)).toBe('p2');
  });

  it('wraps the turn around to the first entry', () => {
    let state = freshState([ENTRIES[0], ENTRIES[1]]);
    state = engine.applyAction(state, passAction('p1'));
    state = engine.applyAction(state, outOfPlayAction(5));

    expect(engine.getCurrentEntryId(state)).toBe('p1');
  });

  it('is a no-op for the black ball', () => {
    let state = freshState();
    const beforeState = state;
    state = engine.applyAction(state, outOfPlayAction(8));

    expect(state).toBe(beforeState);
    expect(state.remainingBalls).toContain(8);
  });

  it('is a no-op for a ball already off the table', () => {
    let state = freshState();
    state = engine.applyAction(state, pocketAction('p1', 5));
    const afterPocket = state;
    state = engine.applyAction(state, outOfPlayAction(5));

    expect(state).toBe(afterPocket);
  });

  it('is not editable', () => {
    expect(engine.isActionEditable(outOfPlayAction(5))).toBe(false);
  });

  it('describes the removal neutrally, without attributing it to a player', () => {
    expect(engine.describeAction(outOfPlayAction(5), ENTRIES)).toBe(
      'Boule 5 retirée du jeu (hors-jeu) — fin du tour',
    );
  });
});

describe('fin anticipée', () => {
  it('scores the black ball at zero and ends the game immediately', () => {
    let state = freshState([ENTRIES[0], ENTRIES[1]]);
    state = engine.applyAction(state, pocketAction('p1', 5));
    state = engine.applyAction(state, pocketAction('p2', 8, 2));

    expect(state.remainingBalls.length).toBeGreaterThan(0);
    expect(engine.getScores(state)).toEqual({ p1: 5, p2: 0 });
    expect(engine.getResult(state)).toEqual({ isOver: true, winnerIds: ['p1'], loserIds: [] });
  });

  it('lets the black-ball potter win a tie they are part of', () => {
    let state = freshState([ENTRIES[0], ENTRIES[1]]);
    state = pocketAll(state, 'p1', [5, 3]); // 8
    state = pocketAll(state, 'p2', [6, 2]); // 8
    state = engine.applyAction(state, pocketAction('p2', 8, 1));

    expect(engine.getResult(state).winnerIds).toEqual(['p2']);
  });

  it('falls back to the potter of the ball just before the black ball when tied and the potter is excluded', () => {
    let state = freshState();
    state = pocketAll(state, 'p2', [6, 2]); // 8
    state = pocketAll(state, 'p1', [5, 3]); // 8, last non-black ball potted by p1
    state = engine.applyAction(state, pocketAction('p3', 8, 0)); // p3 has 0

    expect(engine.getScores(state)).toEqual({ p1: 8, p2: 8, p3: 0 });
    expect(engine.getResult(state).winnerIds).toEqual(['p1']);
  });

  it('eliminates the potter and ties every other entry for first when the black ball is pocketed first', () => {
    let state = freshState();
    state = engine.applyAction(state, pocketAction('p2', 8, 0));

    expect(engine.getResult(state)).toEqual({
      isOver: true,
      winnerIds: ['p1', 'p3'],
      loserIds: ['p2'],
    });
  });
});

describe('after the game is over', () => {
  it('ignores further actions', () => {
    let state = freshState([ENTRIES[0], ENTRIES[1]]);
    state = engine.applyAction(state, pocketAction('p2', 8, 0));
    const overState = state;

    state = engine.applyAction(state, pocketAction('p1', 5));

    expect(state).toBe(overState);
  });
});

describe('isActionEditable', () => {
  it('allows editing the black ball cushion count', () => {
    expect(engine.isActionEditable(pocketAction('p1', 8, 1))).toBe(true);
  });

  it('does not allow editing a normal ball or a pass', () => {
    expect(engine.isActionEditable(pocketAction('p1', 5))).toBe(false);
    expect(engine.isActionEditable(passAction('p1'))).toBe(false);
  });
});

describe('describeAction', () => {
  it('describes a normal ball pocket', () => {
    expect(engine.describeAction(pocketAction('p1', 5), ENTRIES)).toBe(
      'Alice empoche la boule 5 — +5 points',
    );
  });

  it('describes a black ball pocket with its cushion count and value', () => {
    expect(engine.describeAction(pocketAction('p1', 8, 2), ENTRIES)).toBe(
      'Alice empoche la boule noire (2 bandes) — 24 points',
    );
  });

  it('describes a passed turn', () => {
    expect(engine.describeAction(passAction('p2'), ENTRIES)).toBe(
      'Bob ne rentre aucune boule — fin du tour',
    );
  });
});
