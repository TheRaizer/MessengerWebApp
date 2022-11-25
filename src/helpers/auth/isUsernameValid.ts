import {
  UsernameError,
  ValidityCheckerReturn,
} from '../../../types/helpers/auth/Errors.type';

/**
 * Rules username regex enforces:
    1. No '_' or '.' at the end
    2. Only lowercase, uppercase, digits, '_' and '.' characters are allowed
    3. No '__' or '_.' or '._' or '..' inside
    4. No '_' or '.' at the beginning
 */
const USERNAME_PATTERN = new RegExp(
  '^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$'
);

export const isUsernameValid = (
  username: string
): ValidityCheckerReturn<UsernameError> => {
  const errors: UsernameError[] = [];

  if (username.length < 3 || username.length > 25)
    errors.push(UsernameError.LENGTH_ERROR);

  if (!USERNAME_PATTERN.test(username))
    errors.push(UsernameError.INVALID_USERNAME);

  return { isValid: errors.length === 0, errors };
};
