import { EmailError } from '../../../../types/helpers/auth/Errors.type';
import { isEmailValid } from '../../../helpers/auth/isEmailValid';

describe('isEmailValid', () => {
  it('should return isValid true when email is valid', () => {
    const email = 'test@example.com';
    const result = isEmailValid(email);

    expect(result.isValid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  it('should return isValid false when email is invalid', () => {
    const email = 'invalid-email';
    const result = isEmailValid(email);

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain(EmailError.INVALID_EMAIL);
  });
});
