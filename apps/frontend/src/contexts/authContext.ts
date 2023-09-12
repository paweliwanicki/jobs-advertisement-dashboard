import { createContext } from 'react';

type AuthContextType = {
  jwtToken: string | undefined;
  jwtRefreshToken: string | undefined;
  setToken: (token?: string) => void;
  isAuthenticated: boolean;
  setRefreshToken: (token?: string) => void;
};

export const AuthContext = createContext<AuthContextType>({
  jwtToken: undefined,
  jwtRefreshToken: undefined,
  isAuthenticated: false,
  setToken: (token?: string) => token,
  setRefreshToken: (token?: string) => token,
});
