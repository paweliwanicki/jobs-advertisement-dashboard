import './App.scss';
import { CookiesProvider } from 'react-cookie';
import { RouterProvider } from 'react-router-dom';
import { useRouter } from './hooks/useRouter';
import { UserProvider } from './providers/UserProvider';
import ThemeProvider from './providers/ThemeProvider';
const { router } = useRouter();

export function App() {
  return (
    <CookiesProvider>
      <UserProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </UserProvider>
    </CookiesProvider>
  );
}

export default App;
