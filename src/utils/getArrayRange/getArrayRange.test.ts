import getArrayRange from './getArrayRange';

const cases = [
  [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 0, 3, [1, 2, 3]],
  [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5, 10, [6, 7, 8, 9, 10]],
  [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 0, 10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
  [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 0, 1, [1]],
  [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 9, 10, [10]],
  [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 0, 0, []],
  [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10, 10, []],
  [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5, 5, []],
  [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5, 6, [6]],
  [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5, 7, [6, 7]],
  [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5, 8, [6, 7, 8]],
  [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5, 9, [6, 7, 8, 9]],
  [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5, 10, [6, 7, 8, 9, 10]],
  [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5, 11, [6, 7, 8, 9, 10]],
];

describe('getArrayRange()', () => {
  test.each(cases)(
    'given %p, %p and %p as arguments, return %p',
    (firstArg, secondArg, thirdArg, expectedResult) => {
      const result = getArrayRange(firstArg as number[], secondArg as number, thirdArg as number);
      expect(result).toEqual(expectedResult);
    },
  );
});
