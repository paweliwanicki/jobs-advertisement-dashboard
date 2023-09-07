import jwt_decode from 'jwt-decode';
import { useState, ReactNode, useContext, useEffect, useMemo } from 'react';
import { AuthContext } from '../contexts/authContext';
import { User } from '../models/User';
import { UserContext } from '../contexts/userContext';

type UserProviderProps = {
  children: ReactNode;
};

const getUser = (jwtToken?: string): User | undefined => {
  return jwtToken ? jwt_decode(jwtToken) : undefined;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const { jwtToken } = useContext(AuthContext);
  const [user, setUser] = useState<User | undefined>(() => getUser(jwtToken));

  const changeUser = () => {
    const user = getUser(jwtToken);
    console.log(user);
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
    [jwtToken]
  );

  return (
    <UserContext.Provider value={contextValue}>
      <>{children}</>
    </UserContext.Provider>
  );
};
