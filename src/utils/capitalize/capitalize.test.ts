import capitalize from './capitalize';

const cases = [
  ['Test', 'Test'],
  ['test', 'Test'],
  ['test more than one word', 'Test more than one word'],
  ['Test more than one word', 'Test more than one word'],
  ['', ''],
];

describe('capitalize()', () => {
  test.each(cases)('given %p as arguments, returns %p', (firstArg, expectedResult) => {
    const result = capitalize(firstArg);
    expect(result).toEqual(expectedResult);
  });
});
