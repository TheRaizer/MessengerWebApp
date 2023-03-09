import { PasswordError } from '../../../../types/helpers/auth/Errors.type';
import { isPasswordValid } from '../../../helpers/auth/isPasswordValid';

describe('isPasswordValid', () => {
  it('should return valid for a password that meets all requirements', () => {
    const password = 'Abc1234!';
    const result = isPasswordValid(password);

    expect(result.isValid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  it('should return invalid for a password that does not meet length requirement', () => {
    const password = 'Abc123!';
    const result = isPasswordValid(password);

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain(PasswordError.LENGTH_ERROR);
  });

  it('should return invalid for a password that does not contain a lower case letter', () => {
    const password = 'ABC1234!';
    const result = isPasswordValid(password);

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain(PasswordError.LOWER_CASE_NOT_FOUND_ERROR);
  });

  it('should return invalid for a password that does not contain an upper case letter', () => {
    const password = 'abc1234!';
    const result = isPasswordValid(password);

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain(PasswordError.UPPER_CASE_NOT_FOUND_ERROR);
  });

  it('should return invalid for a password that does not contain a number', () => {
    const password = 'Abcdefg!';
    const result = isPasswordValid(password);

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain(PasswordError.NUMBER_NOT_FOUND_ERROR);
  });
});
