import './App.scss';
import LoginContainer from './containers/LoginContainer/LoginContainer';
import Layout from './containers/Layout/Layout';
import { Theme, ThemeContext } from './contexts/themeContext';
import { useState } from 'react';
import { getDefaultTheme } from './utils/utils';

function App() {
  const [theme, setTheme] = useState<Theme>(() => getDefaultTheme());
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Layout theme={theme}>
        <LoginContainer />
      </Layout>
    </ThemeContext.Provider>
  );
}

export default App;
