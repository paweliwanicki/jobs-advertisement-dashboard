import './App.scss';
import { CookiesProvider } from 'react-cookie';
import { RouterProvider } from 'react-router-dom';
import { useRouter } from './hooks/useRouter';
import AuthProvider from './providers/AuthProvider';
const { router } = useRouter();

export function App() {
  return (
    <AuthProvider>
      <CookiesProvider>
        <RouterProvider router={router} />
      </CookiesProvider>
    </AuthProvider>
  );
}

export default App;
