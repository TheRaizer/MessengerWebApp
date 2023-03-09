import {
  PasswordError,
  ValidityCheckerReturn,
} from '../../../types/helpers/auth/Errors.type';
import { isNumeric } from '../isNumeric';

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

  const removeError = (err: PasswordError) => {
    const indexToRemove = errors.indexOf(err);

    if (indexToRemove == -1) return;

    errors.splice(indexToRemove, 1);
  };

  if (password.length < 8) {
    errors.push(PasswordError.LENGTH_ERROR);
  }

  for (let i = 0; i < password.length; i++) {
    const char = password[i];

    if (char === char.toLowerCase() && char !== char.toUpperCase()) {
      removeError(PasswordError.LOWER_CASE_NOT_FOUND_ERROR);
    }
    if (char === char.toUpperCase() && char !== char.toLowerCase()) {
      removeError(PasswordError.UPPER_CASE_NOT_FOUND_ERROR);
    }
    if (isNumeric(char)) {
      removeError(PasswordError.NUMBER_NOT_FOUND_ERROR);
    }
  }

  return { isValid: errors.length === 0, errors };
};
