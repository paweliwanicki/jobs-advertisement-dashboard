import { createContext } from 'react';

type AuthContextType = {
  jwtToken: string | undefined;
  jwtRefreshToken: string | undefined;
  setToken: (token?: string) => void;
  setRefreshToken: (token?: string) => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  jwtToken: undefined,
  jwtRefreshToken: undefined,
  setToken: (token?: string) => token,
  setRefreshToken: (token?: string) => token,
  isAuthenticated: false,
});
