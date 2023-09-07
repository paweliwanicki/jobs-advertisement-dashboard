import './App.scss';
import { CookiesProvider } from 'react-cookie';
import { RouterProvider } from 'react-router-dom';
import { useRouter } from './hooks/useRouter';
import AuthProvider from './providers/AuthProvider';
import { UserProvider } from './providers/UserProvider';
const { router } = useRouter();

export function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <CookiesProvider>
          <RouterProvider router={router} />
        </CookiesProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
