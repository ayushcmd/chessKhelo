export const AUTH_CONFIG = {
  minPasswordLength: 6,
  maxUsernameLength: 20,
  minUsernameLength: 3,
  errors: {
    invalidEmail: 'Invalid email address',
    passwordTooShort: `Password must be at least 6 characters`,
    usernameTooShort: 'Username must be at least 3 characters',
    usernameTooLong: 'Username must be less than 20 characters',
    usernameInvalid: 'Username can only contain letters, numbers and underscores',
  },
};