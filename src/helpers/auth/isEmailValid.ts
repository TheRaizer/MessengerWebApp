import {
  EmailError,
  ValidityCheckerReturn,
} from '../../../types/helpers/auth/Errors.type';

const EMAIL_PATTERN = new RegExp(
  '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Z|a-z]{2,}'
);

export const isEmailValid = (
  email: string
): ValidityCheckerReturn<EmailError> => {
  const errors: EmailError[] = [];
  if (!EMAIL_PATTERN.test(email)) errors.push(EmailError.INVALID_EMAIL);

  return { isValid: errors.length === 0, errors };
};
