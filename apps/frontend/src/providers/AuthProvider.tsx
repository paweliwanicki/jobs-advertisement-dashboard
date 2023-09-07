import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { AuthContext } from '../contexts/authContext';

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [cookies, setCookies, removeItem] = useCookies(['jwtToken']);
  const [jwtToken, setJwtToken] = useState<string | undefined>(
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

  useEffect(() => {
    setToken(jwtToken);
  }, [jwtToken]);

  const contextValue = useMemo(
    () => ({
      jwtToken,
      setToken,
      isAuthenticated,
    }),
    [jwtToken]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
