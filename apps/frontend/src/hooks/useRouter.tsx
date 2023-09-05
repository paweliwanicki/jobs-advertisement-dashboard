import { createBrowserHistory } from 'history';
import { createBrowserRouter } from 'react-router-dom';
import LoginContainer from '../containers/LoginContainer/LoginContainer';
import { Page404 } from '../404';
import { AuthGuard } from '../guards/AuthGuard';
import AppLayout from '../containers/AppLayout/AppLayout';

const history = createBrowserHistory();

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Page404 />,
    children: [
      {
        path: '/admin',
        element: (
          <AuthGuard>
            <div>admin panel</div>
          </AuthGuard>
        ),
        errorElement: <Page404 />,
      },
      {
        path: '/login',
        element: <LoginContainer />,
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
