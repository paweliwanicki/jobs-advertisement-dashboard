import { createContext } from 'react';

type AuthContextType = {
  jwtToken: string | undefined;
  setToken: (token?: string) => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  jwtToken: undefined,
  setToken: (token?: string) => token,
  isAuthenticated: false,
});
