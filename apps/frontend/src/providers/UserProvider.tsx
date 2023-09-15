import { useState, ReactNode, useEffect, useMemo, useCallback } from 'react';
import { User } from '../models/User';
import { UserContext } from '../contexts/userContext';

type UserProviderProps = {
  children: ReactNode;
};

const getCurrentUser = (): User | undefined => {
  const currentUser = localStorage.getItem('user');
  return currentUser ? (JSON.parse(currentUser) as User) : undefined;
};

const setCurrentUser = (user: User | undefined) => {
  user
    ? localStorage.setItem('user', JSON.stringify(user))
    : localStorage.removeItem('user');
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | undefined>(() => getCurrentUser());

  const changeUser = useCallback(
    (user?: User) => {
      setUser(user);
      setCurrentUser(user);
    },
    [user]
  );

  useEffect(() => {
    getCurrentUser();
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      changeUser,
    }),
    [user]
  );

  return (
    <UserContext.Provider value={contextValue}>
      <>{children}</>
    </UserContext.Provider>
  );
};
