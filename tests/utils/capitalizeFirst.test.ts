import utilFunctions from '../../src/utils';

const subject = utilFunctions.capitalizeFirstLetters;


describe('Return expected result', () => {
  test('single word', () => {
    const result = subject('yolo');
    expect(result).toBe('Yolo');
  });

  test('multiple words', () => {
    const result = subject('yolo dolo polo.');
    expect(result).toBe('Yolo Dolo Polo.');
  });

  test('remove extra spaces', () => {
    const result = subject('         Yolo      dolo.   ');
    expect(result).toBe('Yolo Dolo.');
  })
})