import { shuffleArray } from './arrayUtils';

describe('shuffleArray', () => {
  it('does not mutate the original array', () => {
    const original = [1, 2, 3, 4];
    shuffleArray(original);
    expect(original).toEqual([1, 2, 3, 4]);
  });

  it('preserves length and elements', () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(original);
    expect(shuffled).toHaveLength(original.length);
    expect([...shuffled].sort()).toEqual([...original].sort());
  });

  it('produces the expected permutation for a fixed random sequence', () => {
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0);
    expect(shuffleArray([1, 2, 3, 4])).toEqual([2, 3, 4, 1]);
    randomSpy.mockRestore();
  });
});
