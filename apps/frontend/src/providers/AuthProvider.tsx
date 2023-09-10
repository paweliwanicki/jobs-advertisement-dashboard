import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { AuthContext } from '../contexts/authContext';

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [cookies, setCookies, removeItem] = useCookies([
    'jwtToken',
    'jwtRefreshToken',
  ]);
  const [jwtToken, setJwtToken] = useState<string | undefined>(
    cookies.jwtToken
  );
  const [jwtRefreshToken, setJwtRefreshToken] = useState<string | undefined>(
    cookies.jwtToken
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!cookies.jwtToken
  );

  const setToken = (jwtToken?: string) => {
    setJwtToken(jwtToken);
    setIsAuthenticated(!!jwtToken);
    jwtToken ? setCookies('jwtToken', jwtToken) : removeItem('jwtToken');
  };

  const setRefreshToken = (jwtRefreshToken?: string) => {
    setJwtRefreshToken(jwtRefreshToken);
    jwtRefreshToken
      ? setCookies('jwtRefreshToken', jwtRefreshToken)
      : removeItem('jwtRefreshToken');
  };

  useEffect(() => {
    setToken(jwtToken);
  }, [jwtToken]);

  useEffect(() => {
    setJwtRefreshToken(jwtRefreshToken);
  }, [jwtRefreshToken]);

  const contextValue = useMemo(
    () => ({
      jwtToken,
      jwtRefreshToken,
      setToken,
      setRefreshToken,
      isAuthenticated,
    }),
    [jwtToken]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
