export enum PasswordError {
  LENGTH_ERROR = 'password too long',
  LOWER_CASE_NOT_FOUND_ERROR = 'password must contain lower case letter',
  UPPER_CASE_NOT_FOUND_ERROR = 'password must contain upper case letter',
  NUMBER_NOT_FOUND_ERROR = 'password must contain a number',
}

export enum UsernameError {
  LENGTH_ERROR = 'invalid username length',
  INVALID_USERNAME = 'username is invalid',
  USERNAME_TAKEN = 'username is taken',
}

export enum EmailError {
  INVALID_EMAIL = 'invalid email',
  ACCOUNT_EXISTS= 'account already exists'
}

export type AuthErrors = PasswordError | UsernameError | EmailError;

export type ValidityCheckerReturn<T extends AuthErrors> = {
  isValid: boolean;
  errors: T[];
};
