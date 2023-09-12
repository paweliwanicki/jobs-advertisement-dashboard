import jwt_decode from 'jwt-decode';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { AuthContext } from '../contexts/authContext';
import { User } from '../models/User';
import { useApi } from '../hooks/useApi';

type AuthProviderProps = {
  children: ReactNode;
};

export const decodeJwtToken = (jwtToken?: string): User | undefined => {
  return jwtToken ? jwt_decode(jwtToken) : undefined;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { refreshJwtToken } = useApi();

  const [cookies, setCookies, removeItem] = useCookies([
    'jwtToken',
    'jwtRefreshToken',
  ]);
  const { jwtToken: token, jwtRefreshToken: refreshToken } = cookies;

  const [jwtToken, setJwtToken] = useState<string | undefined>(token);
  const [jwtRefreshToken, setJwtRefreshToken] = useState<string | undefined>(
    refreshToken
  );

  const [timeOutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!cookies.jwtToken
  );

  const setToken = useCallback(
    (newToken?: string) => {
      setIsAuthenticated(!!newToken);
      setJwtToken(newToken);
      if (newToken) {
        setAutoRefreshToken();
        setCookies('jwtToken', newToken, {
          secure: true,
          sameSite: 'strict',
        });
      } else {
        removeItem('jwtToken');
        clearTimeout(timeOutId);
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

  const setAutoRefreshToken = useCallback(() => {
    if (jwtToken) {
      const timeOutNewId = setTimeout(() => {
        refreshJwtToken();
        setTimeoutId(timeOutNewId);
        console.log('timeout jwt refresh, after 8 mins and 20s');
      }, 500000);
    }
  }, [jwtToken]);

  useEffect(() => {
    setToken(jwtToken);
  }, [jwtToken]);

  useEffect(() => {
    setRefreshToken(jwtRefreshToken);
  }, [jwtRefreshToken]);

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
