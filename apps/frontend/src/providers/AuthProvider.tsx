import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { AuthContext } from '../contexts/authContext';

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [cookies, setCookies, removeItem] = useCookies(['jwtToken']);
  const [jwtToken, setJwtToken] = useState<string | undefined>(
    cookies.jwtToken
  );

  const setToken = (jwtToken: string) => {
    setJwtToken(jwtToken);
  };

  useEffect(() => {
    if (jwtToken) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwtToken;
      setCookies('jwtToken', jwtToken);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      removeItem('jwtToken');
    }
  }, [jwtToken]);

  const contextValue = useMemo(
    () => ({
      jwtToken,
      setToken,
    }),
    [jwtToken]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
