import { createBrowserHistory } from 'history';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import LoginContainer from '../containers/LoginContainer/LoginContainer';
import { Page404 } from '../404';
import { AuthGuard } from '../guards/AuthGuard';
import { UserPanel } from '../components/UserPanel/UserPanel';
import Layout from '../containers/Layout/Layout';
import Dashboard from '../containers/Dashboard/Dashboard';
import { RoutePath } from '../enums/RoutePath';
import OfferEditor from '../components/OfferEditor/OfferEditor';

const history = createBrowserHistory();

const router = createBrowserRouter([
  {
    path: RoutePath.HOME,
    element: <Layout />,
    errorElement: <Page404 />,
    children: [
      { index: true, element: <Navigate to={RoutePath.DASHBOARD} replace /> },
      {
        path: RoutePath.LOGIN,
        element: <LoginContainer />,
      },
      {
        path: RoutePath.USER,
        element: (
          <AuthGuard>
            <UserPanel />
          </AuthGuard>
        ),
      },
      {
        path: RoutePath.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: RoutePath.OFFER_EDIT,
        element: <OfferEditor />,
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
