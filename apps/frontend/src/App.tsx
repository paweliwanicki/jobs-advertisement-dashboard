import "./App.scss";
import LoginContainer from "./containers/LoginContainer/LoginContainer";
import Layout from "./containers/Layout/Layout";
import { Theme, ThemeContext } from "./contexts/themeContext";
import { useState } from "react";
const isBrowserDefaultDark = (): boolean =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const getDefaultTheme = (): Theme => {
  const localStorageTheme: Theme | null = localStorage.getItem(
    "theme"
  ) as Theme;
  const browserDefaultTheme: Theme = isBrowserDefaultDark() ? "dark" : "light";
  return localStorageTheme || browserDefaultTheme;
};

function App() {
  const [theme, setTheme] = useState<Theme>(getDefaultTheme());

  console.log(theme);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>
        <Layout theme={theme}>
          <LoginContainer />
        </Layout>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
