import { createContext, useContext } from 'react';

export type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: (theme: Theme) => theme,
});


export const useTheme = () => useContext(ThemeContext);