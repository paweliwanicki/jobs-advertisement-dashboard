import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { AuthContext } from "../contexts/authContext";


type AuthProviderProps = {
  children: ReactNode;
};


const AuthProvider = ({ children }: AuthProviderProps) => {
  const [cookies, setCookies, removeItem] = useCookies(["jwtToken"]);

  const [jwtToken, setJwtToken] = useState(cookies.jwtToken);

  const setToken = (jwtToken: string) => {
    setJwtToken(jwtToken);
    //setCookies("jwtToken", jwtToken);
  };

  useEffect(() => {
    if (jwtToken) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + jwtToken;
      //localStorage.setItem("jwtToken", jwtToken);
      setCookies("jwtToken", jwtToken);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      ///localStorage.removeItem("jwtToken");
      removeItem("jwtToken");
    }
  }, [jwtToken]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      jwtToken,
      setToken,
    }),
    [jwtToken]
  );

  // Provide the authentication context to the children components
  return (
    AuthContext.Provider
  );
};
