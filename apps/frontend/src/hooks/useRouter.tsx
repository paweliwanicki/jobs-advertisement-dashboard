import { createBrowserHistory } from 'history';
import { createBrowserRouter } from 'react-router-dom';
import LoginContainer from '../containers/LoginContainer/LoginContainer';
import { Page404 } from '../404';
import { AuthGuard } from '../guards/AuthGuard';
import { UserPanel } from '../components/UserPanel/UserPanel';
import Layout from '../containers/Layout/Layout';

const history = createBrowserHistory();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Page404 />,
    children: [
      {
        path: '/admin',
        element: (
          <AuthGuard>
            <div style={{ color: 'black' }}>admin panel</div>
          </AuthGuard>
        ),
      },
      {
        path: '/login',
        element: <LoginContainer />,
      },
      {
        path: '/user',
        element: (
          <AuthGuard>
            <UserPanel />
          </AuthGuard>
        ),
      },
      {
        path: '/dashboard',
        element: <div style={{ color: 'black' }}>Dashboard</div>,
      },
    ],
  },
]);

export const useRouter = () => {
  return {
    history,
    router,
  };
};
