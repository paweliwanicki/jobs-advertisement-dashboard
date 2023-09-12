import './App.scss';
import { CookiesProvider } from 'react-cookie';
import { RouterProvider } from 'react-router-dom';
import { useRouter } from './hooks/useRouter';
import AuthProvider from './providers/AuthProvider';
import { UserProvider } from './providers/UserProvider';
import ThemeProvider from './providers/ThemeProvider';
const { router } = useRouter();

export function App() {
  return (
    <CookiesProvider>
      <AuthProvider>
        <UserProvider>
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        </UserProvider>
      </AuthProvider>
    </CookiesProvider>
  );
}

export default App;
