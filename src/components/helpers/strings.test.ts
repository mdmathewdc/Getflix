import capitalizeFirstLetter from './strings';

describe('Getflix helper functions test', () => {
  const words = [
    { input: 'apple', output: 'Apple' },
    { input: 'Banana', output: 'Banana' },
    { input: 'CaBbAgE', output: 'CaBbAgE' },
  ];

  it('should capitalize the first letter in the string', () => {
    words.forEach((item) => {
      expect(capitalizeFirstLetter(item.input)).toBe(item.output);
    });
  });
});
