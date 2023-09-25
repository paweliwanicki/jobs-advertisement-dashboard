export const AUTH_STATUS_CODES: Record<number, string> = {
  2000: 'User not found!',
  2001: 'Unfortunately, the username is already in use. Use a different username and try again.',
  2002: 'The username and password you are incorrect. Check the credentials you entered and try again.',
} as const;
