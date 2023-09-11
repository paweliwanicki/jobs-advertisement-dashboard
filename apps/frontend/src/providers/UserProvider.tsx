import { useState, ReactNode, useEffect, useMemo, useCallback } from 'react';
import { User } from '../models/User';
import { UserContext } from '../contexts/userContext';
import { useAuth } from '../hooks/useAuth';
import { decodeJwtToken } from './AuthProvider';

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const { jwtToken } = useAuth();
  const [user, setUser] = useState<User | undefined>(() =>
    decodeJwtToken(jwtToken)
  );

  const changeUser = useCallback(() => {
    const user = decodeJwtToken(jwtToken);
    setUser(user);
    return user;
  }, [jwtToken]);

  useEffect(() => {
    changeUser();
  }, [jwtToken]);

  const contextValue = useMemo(
    () => ({
      user,
      changeUser,
    }),
    [jwtToken]
  );

  return (
    <UserContext.Provider value={contextValue}>
      <>{children}</>
    </UserContext.Provider>
  );
};
