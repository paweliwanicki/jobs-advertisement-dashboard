import { createBrowserHistory } from "history";
import { createBrowserRouter } from "react-router-dom";
import LoginContainer from "../containers/LoginContainer/LoginContainer";
import { Page404 } from "../404";

const history = createBrowserHistory();

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
    errorElement: <Page404 />,
  },
  {
    path: "/login",
    element: <LoginContainer />,
  },
]);

export const useRouter = () => {
  return {
    history,
    router,
  };
};
