import jwt_decode from 'jwt-decode';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { AuthContext } from '../contexts/authContext';
import { User } from '../models/User';

type AuthProviderProps = {
  children: ReactNode;
};

export const decodeJwtToken = (jwtToken?: string): User | undefined => {
  return jwtToken ? jwt_decode(jwtToken) : undefined;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [cookies, setCookies, removeItem] = useCookies([
    'jwtToken',
    'jwtRefreshToken',
  ]);
  const [sessionTimeoutId, setSessionTimeoutId] = useState<NodeJS.Timeout>();
  const [jwtToken, setJwtToken] = useState<string | undefined>(
    () => cookies.jwtToken
  );
  const [jwtRefreshToken, setJwtRefreshToken] = useState<string | undefined>(
    () => cookies.jwtToken
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!cookies.jwtToken
  );

  const setToken = useCallback(
    (token?: string) => {
      setJwtToken(token);
      setIsAuthenticated(!!token);
      if (token) {
        const { exp } = jwt_decode(token) as { exp: number };
        setSessionTime(exp);
        setCookies('jwtToken', token, {
          secure: true,
          sameSite: 'strict',
        });
      } else {
        removeItem('jwtToken');
        clearTimeout(sessionTimeoutId);
      }
    },
    [jwtToken]
  );

  const setRefreshToken = useCallback(
    (refreshToken?: string) => {
      setJwtRefreshToken(refreshToken);
      refreshToken
        ? setCookies('jwtRefreshToken', refreshToken, {
            secure: true,
            sameSite: 'strict',
          })
        : removeItem('jwtRefreshToken');
    },
    [jwtRefreshToken]
  );

  const setSessionTime = useCallback((expirationTime: number) => {
    const now = Math.floor(new Date().getTime());
    const timeoutId = setTimeout(() => {
      setToken(undefined);
      setRefreshToken(undefined);
    }, expirationTime * 1000 - now);
    setSessionTimeoutId(timeoutId);
  }, []);

  useEffect(() => {
    setToken(jwtToken);
    setJwtRefreshToken(jwtRefreshToken);
  }, [jwtToken, jwtRefreshToken]);

  const contextValue = useMemo(
    () => ({
      jwtToken,
      jwtRefreshToken,
      isAuthenticated,
      setToken,
      setRefreshToken,
    }),
    [jwtToken]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
