import jwt_decode from 'jwt-decode';
import { useState, ReactNode, useEffect, useMemo } from 'react';
import { User } from '../models/User';
import { UserContext } from '../contexts/userContext';
import { useAuth } from '../hooks/useAuth';

type UserProviderProps = {
  children: ReactNode;
};

const getUser = (jwtToken?: string): User | undefined => {
  return jwtToken ? jwt_decode(jwtToken) : undefined;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const { jwtToken } = useAuth();
  const [user, setUser] = useState<User | undefined>(() => getUser(jwtToken));

  const changeUser = () => {
    const user = getUser(jwtToken);
    setUser(user);
    return user;
  };

  useEffect(() => {
    changeUser();
  }, [jwtToken]);

  const contextValue = useMemo(
    () => ({
      user,
      changeUser,
    }),
    [user, jwtToken]
  );

  return (
    <UserContext.Provider value={contextValue}>
      <>{children}</>
    </UserContext.Provider>
  );
};
