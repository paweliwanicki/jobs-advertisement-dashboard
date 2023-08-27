export const AUTH_STATUS_CODES: Record<number, string> = {
  2000: 'User not found!',
  2001: 'Username is in use!',
  2002: 'Wrong username or password!',
} as const;
