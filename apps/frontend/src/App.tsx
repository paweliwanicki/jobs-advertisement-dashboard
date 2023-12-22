import "./App.scss";
import ThemeProvider from "./providers/ThemeProvider";
import SnackBarProvider from "./providers/SnackBarProvider";
import { CookiesProvider } from "react-cookie";
import { RouterProvider } from "react-router-dom";
import { useRouter } from "./hooks/useRouter";
import UserProvider from "./providers/UserProvider";
import OfferProvider from "./providers/OfferProvider";
import DictionaryProvider from "./providers/DictionaryProvider";

const { router } = useRouter();

export function App() {
  return (
    <CookiesProvider>
      <UserProvider>
        <ThemeProvider>
          <SnackBarProvider>
            <DictionaryProvider>
              <OfferProvider>
                <RouterProvider router={router} />
              </OfferProvider>
            </DictionaryProvider>
          </SnackBarProvider>
        </ThemeProvider>
      </UserProvider>
    </CookiesProvider>
  );
}

export default App;
