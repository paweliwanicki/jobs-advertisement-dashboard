import { ReactNode, useCallback, useState } from "react";

type InputError =
  | "EMPTY"
  | "WRONG_PASSWORD_FORMAT"
  | "PASSWORDS_NOT_MATCH"
  | "WRONG_USERNAME_FORMAT";

  type SignResponseMessage = "WRONG_CREDENTIALS" | "USERNAME_IN_USE";


type SignForm = {
  message: ReactNode;
  validateSignInForm: (
    username: string,
    password: string
  ) => {
    isValid: boolean;
    usernameError: string | null;
    passwordError: string | null;
  };
};

const INPUT_ERRORS_MESSAGES: Record<InputError, string> = {
  EMPTY: "Can not be empty!",
  WRONG_PASSWORD_FORMAT:
    "Password does not meet requirements! Please check the requirements in the password hint.",
  WRONG_USERNAME_FORMAT:
    "Username must be alphanumeric and total length between 6 and 12 characters!",
  PASSWORDS_NOT_MATCH: "Password and confirm password do not match!",
} as const;

const SIGN_RESPONSE_MESSAGES: Record<SignResponseMessage, string> = {
  WRONG_CREDENTIALS:
    "You typed wrong username or password! Please check your credentials and try to sign in again.",
    USERNAME_IN_USE:
    "Unfortunately, the username is already in use. Use a different username and try again.",
};

const useSignForm = (): SignForm => {
  const [message, setMessage] = useState<ReactNode>();

  const validateSignInForm = useCallback(
    (username: string, password: string) => {
      let isValid = true;
      let usernameError = null;
      let passwordError = null;

      // validate username
      if (username === "") {
        usernameError = INPUT_ERRORS_MESSAGES.EMPTY;
        isValid = false;
      }

      // validate password
      if (password === "") {
        passwordError = INPUT_ERRORS_MESSAGES.EMPTY;
        isValid = false;
      }

      return {
        isValid,
        usernameError,
        passwordError,
      };
    },
    []
  );

  return {
    message,
    validateSignInForm,
  };
};
