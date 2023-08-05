import { Theme } from '../contexts/themeContext';

const isBrowserDefaultDark = (): boolean =>
  window.matchMedia('(prefers-color-scheme: dark)').matches;

export const getDefaultTheme = (): Theme => {
  const localStorageTheme: Theme | null = localStorage.getItem(
    'theme'
  ) as Theme;
  const browserDefaultTheme: Theme = isBrowserDefaultDark() ? 'dark' : 'light';
  return localStorageTheme || browserDefaultTheme;
};
