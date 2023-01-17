import getPageNeighbours from './getPageNeighbours';

const cases = [
  [10, 1, [1, 2, 3, 4, 5, 6, 7]],
  [10, 2, [1, 2, 3, 4, 5, 6, 7]],
  [10, 3, [1, 2, 3, 4, 5, 6, 7]],
  [10, 4, [1, 2, 3, 4, 5, 6, 7]],
  [10, 5, [2, 3, 4, 5, 6, 7, 8]],
  [20, 10, [7, 8, 9, 10, 11, 12, 13]],
  [10, 6, [3, 4, 5, 6, 7, 8, 9]],
  [10, 7, [4, 5, 6, 7, 8, 9, 10]],
  [10, 8, [4, 5, 6, 7, 8, 9, 10]],
  [10, 9, [4, 5, 6, 7, 8, 9, 10]],
  [10, 10, [4, 5, 6, 7, 8, 9, 10]],
];

describe('getPageNeighbours()', () => {
  test.each(cases)(
    'given %p and %p as arguments, return %p',
    (firstArg, secondArg, expectedResult) => {
      const result = getPageNeighbours(firstArg as number, secondArg as number);
      expect(result).toEqual(expectedResult);
    },
  );

  test('throws an error when referencial value does not exist in an array', () => {
    expect(() => getPageNeighbours(1, 10)).toThrow('Current page is greater than total pages');
  });
});
