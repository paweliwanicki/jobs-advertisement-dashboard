import type { Response } from 'express';

export const setJwtTokensCookies = (
  tokens: Record<string, string>,
  response: Response,
) => {
  response.clearCookie('jwtToken');
  response.clearCookie('refreshToken');
  response.cookie('jwtToken', tokens.accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    expires: new Date(Date.now() + 15 * 60000),
  });
  response.cookie('refreshToken', tokens.refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
};
