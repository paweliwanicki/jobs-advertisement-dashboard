import { createContext } from 'react';

type AuthContextType = {
  jwtToken: string | undefined;
  setToken: (token: string) => void;
};

export const AuthContext = createContext<AuthContextType>({
  jwtToken: undefined,
  setToken: () => {},
});
