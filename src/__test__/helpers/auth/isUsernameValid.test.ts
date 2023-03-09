import { UsernameError } from '../../../../types/helpers/auth/Errors.type';
import { isUsernameValid } from '../../../helpers/auth/isUsernameValid';

describe('isUsernameValid', () => {
  it('should return valid when given a valid username', () => {
    const result = isUsernameValid('valid_username');

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it.each(['invalid..username', '__not__working', 'notvalid__', 'inva lid'])(
    'should return invalid when given username: $s',
    (invalidUsername) => {
      const result = isUsernameValid(invalidUsername);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(UsernameError.INVALID_USERNAME);
    }
  );

  it('should return invalid with a length error when given a username that is too short', () => {
    const result = isUsernameValid('ab');

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain(UsernameError.LENGTH_ERROR);
  });

  it('should return invalid with a length error when given a username that is too long', () => {
    const result = isUsernameValid('abcdefghijklmnopqrstuvwxyz');

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain(UsernameError.LENGTH_ERROR);
  });
});
