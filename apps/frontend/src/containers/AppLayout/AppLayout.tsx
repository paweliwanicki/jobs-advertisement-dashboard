import { useState, ReactNode } from 'react';
import Layout from '../Layout/Layout';
import { getDefaultTheme } from '../../utils/utils';
import { Theme, ThemeContext } from '../../contexts/themeContext';

type AppLayoutProps = {
  children?: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const [theme, setTheme] = useState<Theme>(() => getDefaultTheme());

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Layout theme={theme}>HOMEPAGE{children}</Layout>;
    </ThemeContext.Provider>
  );
};

export default AppLayout;
