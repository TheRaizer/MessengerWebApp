import { isNumeric } from '../../helpers/isNumeric';

describe('isNumeric', () => {
  it('should return true for numeric characters', () => {
    expect(isNumeric('1')).toBe(true);
    expect(isNumeric('0')).toBe(true);
    expect(isNumeric('9')).toBe(true);
  });

  it('should return false for non-numeric characters', () => {
    expect(isNumeric('a')).toBe(false);
    expect(isNumeric(' ')).toBe(false);
    expect(isNumeric('-')).toBe(false);
    expect(isNumeric('+')).toBe(false);
    expect(isNumeric('.')).toBe(false);
  });
});
