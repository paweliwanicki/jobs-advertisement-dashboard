import { useContext } from "react";
import { SnackBarContext } from "../contexts/snackBarContext";

export const useSnackBar = () => useContext(SnackBarContext);
