import "./App.scss";
import ThemeProvider from "./providers/ThemeProvider";
import SnackBarProvider from "./providers/SnackBarProvider";
import { CookiesProvider } from "react-cookie";
import { RouterProvider } from "react-router-dom";
import { useRouter } from "./hooks/useRouter";
import { UserProvider } from "./providers/UserProvider";

const { router } = useRouter();

export function App() {
  return (
    <CookiesProvider>
      <UserProvider>
        <ThemeProvider>
          <SnackBarProvider>
            <RouterProvider router={router} />
          </SnackBarProvider>
        </ThemeProvider>
      </UserProvider>
    </CookiesProvider>
  );
}

export default App;
