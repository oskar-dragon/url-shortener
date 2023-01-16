import getSidePages from './getSidePages';

const cases = [
  [[1, 2, 3, 4, 5], 3, [2, 3, 4]],
  [[1, 2, 3, 4, 5], 1, [1, 2, 3]],
  [[1, 2, 3, 4, 5], 5, [3, 4, 5]],
  [[1, 2], 2, [1, 2]],
  [[1, 2], 1, [1, 2]],
  [[1], 1, [1]],
  [[1, 2, 3], 3, [1, 2, 3]],
];

describe('getSideValues()', () => {
  test.each(cases)(
    'given %p and %p as arguments, return %p',
    (firstArg, secondArg, expectedResult) => {
      const result = getSidePages(firstArg as number[], secondArg as number);
      expect(result).toEqual(expectedResult);
    },
  );

  test('throws an error when referencial value does not exist in an array', () => {
    expect(() => getSidePages([1, 2, 3], 10)).toThrow(
      'Referencecial value does not exist in an array',
    );
  });
});
