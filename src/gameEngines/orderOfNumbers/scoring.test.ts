import { getBallValue } from './scoring';

describe('getBallValue', () => {
  it('gives a normal ball its own number as value', () => {
    expect(getBallValue(1)).toBe(1);
    expect(getBallValue(7)).toBe(7);
    expect(getBallValue(15)).toBe(15);
  });

  it.each([
    [0, 8],
    [1, 16],
    [2, 24],
    [3, 32],
    [4, 40],
    [5, 48],
  ])('values the black ball at %i cushions as %i points', (cushions, expected) => {
    expect(getBallValue(8, cushions)).toBe(expected);
  });

  it('defaults the black ball to 0 cushions when none is given', () => {
    expect(getBallValue(8)).toBe(8);
  });
});
