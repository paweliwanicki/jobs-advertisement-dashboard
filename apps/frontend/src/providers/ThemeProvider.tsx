import { ReactNode, useMemo, useState } from 'react';
import { Theme, ThemeContext } from '../contexts/themeContext';
import { getDefaultTheme } from '../utils/utils';

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => getDefaultTheme());

  const contextValue = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
