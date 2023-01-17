import excludeDuplicates from './excludeDuplicates';

const cases = [
  [[1, 2, 3], [1, 2, 3], []],
  [
    [1, 2, 3, 4, 5, 6],
    [6, 5, 2],
    [1, 3, 4],
  ],

  [
    [6, 5, 2],
    [1, 2, 3, 4, 5, 6],
    [1, 3, 4],
  ],
];

describe('excludeDuplicates()', () => {
  test.each(cases)(
    'given %p and %p as arguments, returns %p',
    (firstArg, secondArg, expectedResult) => {
      const result = excludeDuplicates(firstArg, secondArg);
      expect(result).toEqual(expectedResult);
    },
  );
});
