import parseCategories from './parseCategories';

const cases = [
  [['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], 4, ['1', '2', '3', '4', '+6']],
  [['1', '2', '3'], 9, ['1', '2', '3']],
  [['1', '2', '3', '4'], 4, ['1', '2', '3', '4']],
];

describe('parseCategories()', () => {
  test.each(cases)(
    'given %p and %p as arguments, returns %p',
    (firstArg, secondArg, expectedResult) => {
      const result = parseCategories(firstArg as string[], secondArg as number);
      expect(result).toEqual(expectedResult);
    },
  );
});
