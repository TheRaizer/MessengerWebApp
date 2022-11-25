import {
  PasswordError,
  ValidityCheckerReturn,
} from '../../../types/helpers/auth/Errors.type';

/**
 * Rules:
 * 1. must contain a lower case letter
 * 2. must contain a upper case letter
 * 3. must contain a number
 * 4. must be longer than 7 characters
 */
export const isPasswordValid = (
  password: string
): ValidityCheckerReturn<PasswordError> => {
  const errors: PasswordError[] = [
    PasswordError.LOWER_CASE_NOT_FOUND_ERROR,
    PasswordError.UPPER_CASE_NOT_FOUND_ERROR,
    PasswordError.NUMBER_NOT_FOUND_ERROR,
  ];

  if (password.length < 8) {
    errors.push(PasswordError.LENGTH_ERROR);
  }

  for (let i = 0; i < password.length; i++) {
    const char = password[i];

    if (char === char.toLowerCase())
      errors.splice(
        errors.indexOf(PasswordError.LOWER_CASE_NOT_FOUND_ERROR),
        1
      );

    if (char === char.toUpperCase())
      errors.splice(
        errors.indexOf(PasswordError.UPPER_CASE_NOT_FOUND_ERROR),
        1
      );

    if (/^\d+$/.test(char))
      errors.splice(errors.indexOf(PasswordError.NUMBER_NOT_FOUND_ERROR), 1);
  }

  return { isValid: errors.length === 0, errors };
};
