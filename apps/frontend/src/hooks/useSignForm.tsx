import { ReactNode, useCallback, useState } from "react";
import { ApiService } from "../utils/ApiService";

type InputError =
  | "EMPTY"
  | "WRONG_PASSWORD_FORMAT"
  | "PASSWORDS_NOT_MATCH"
  | "WRONG_USERNAME_FORMAT";

type SignResponseMessage = "WRONG_CREDENTIALS" | "USERNAME_IN_USE";
type SignFormInput = "USERNAME" | "PASSWORD" | "CONFIRM_PASSWORD" | "TERMS";

type SignForm = {
  message: ReactNode;
  errors: {
    usernameError: string | undefined;
    passwordError: string | undefined;
    confirmPasswordError: string | undefined;
    termsCheckError: boolean;
  };
  isValidated: {
    usernameIsValidated: boolean;
    passwordIsValidated: boolean;
    confirmPasswordIsValidated: boolean;
    termsCheckIsValidated: boolean;
  };
  clearMessage: () => void;
  clearValidationAndError: (input: SignFormInput) => void;
  validateSignInForm: (username: string, password: string) => boolean;
  validateSignUpForm: (
    username: string,
    password: string,
    confirmPassword: string,
    termsChecked: boolean
  ) => boolean;
  handleSignIn: (username: string, password: string) => Promise<void>;
  handleSignUp: (username: string, password: string) => Promise<void>;
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
} as const;

const USERNAME_REGEX = new RegExp(
  "^(?=(.*[a-z]){1,})(?=(.*[0-9]){1,}).{6,12}$"
);
const PASSWORD_REGEX = new RegExp(
  "^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\\-__+.]){1,}).{8,}$"
);

export const useSignForm = (): SignForm => {
  const [message, setMessage] = useState<ReactNode>();
  const [usernameError, setUsernameError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | undefined
  >();
  const [termsCheckError, setTermsError] = useState<boolean>(false);

  const [usernameIsValidated, setUsernameIsValidated] =
    useState<boolean>(false);
  const [passwordIsValidated, setPasswordIsValidated] =
    useState<boolean>(false);
  const [confirmPasswordIsValidated, setConfirmPasswordIsValidated] =
    useState<boolean>(false);
  const [termsCheckIsValidated, setTermsCheckIsValidated] =
    useState<boolean>(false);

  const handleSignIn = useCallback(
    async (username: string, password: string) => {
      const response = await ApiService.post<{
        username: string;
        password: string;
      }>({
        path: "/api/auth/signin",
        payload: JSON.stringify({
          username,
          password,
        }),
      });
      console.log(response);
      setMessage(SIGN_RESPONSE_MESSAGES.WRONG_CREDENTIALS);
    },
    []
  );

  const handleSignUp = useCallback(
    async (username: string, password: string) => {
      const response = await ApiService.post<{
        username: string;
        password: string;
      }>({
        path: "/api/auth/signup",
        payload: JSON.stringify({
          username,
          password,
        }),
      });

      setMessage(SIGN_RESPONSE_MESSAGES.USERNAME_IN_USE);
      console.log(response);
    },
    []
  );

  const validateSignInForm = useCallback(
    (username: string, password: string) => {
      let isValid = true;

      if (username === "") {
        setUsernameError(INPUT_ERRORS_MESSAGES.EMPTY);
        isValid = false;
      }

      if (password === "") {
        setPasswordError(INPUT_ERRORS_MESSAGES.EMPTY);
        isValid = false;
      }

      setUsernameIsValidated(true);
      setPasswordIsValidated(true);

      return isValid;
    },
    []
  );

  const validateSignUpForm = useCallback(
    (
      username: string,
      password: string,
      confirmPassword: string,
      termsChecked: boolean
    ) => {
      let isValid = true;

      if (username === "") {
        setUsernameError(INPUT_ERRORS_MESSAGES.EMPTY);
        isValid = false;
      } else if (!USERNAME_REGEX.test(username)) {
        setUsernameError(INPUT_ERRORS_MESSAGES.WRONG_USERNAME_FORMAT);
        isValid = false;
      }

      if (password === "") {
        setPasswordError(INPUT_ERRORS_MESSAGES.EMPTY);
        isValid = false;
      } else if (!PASSWORD_REGEX.test(password)) {
        setPasswordError(INPUT_ERRORS_MESSAGES.WRONG_PASSWORD_FORMAT);
        isValid = false;
      }

      if (confirmPassword === "") {
        setConfirmPasswordError(INPUT_ERRORS_MESSAGES.EMPTY);
        isValid = false;
      } else if (confirmPassword !== password) {
        setConfirmPasswordError(INPUT_ERRORS_MESSAGES.PASSWORDS_NOT_MATCH);
        isValid = false;
      }

      if (!termsChecked) {
        setTermsError(true);
        isValid = false;
      }

      setUsernameIsValidated(true);
      setPasswordIsValidated(true);
      setConfirmPasswordIsValidated(true);
      setTermsCheckIsValidated(true);

      return isValid;
    },
    []
  );

  const clearMessage = useCallback(() => {
    setMessage(null);
  }, []);

  const clearErrors = useCallback(() => {
    setUsernameError(undefined);
    setPasswordError(undefined);
    setConfirmPasswordError(undefined);
    setTermsError(false);
  }, []);

  const clearValidationAndError = useCallback(
    (input?: SignFormInput) => {
      switch (input) {
        case "USERNAME":
          setUsernameError(undefined);
          setUsernameIsValidated(false);
          break;
        case "PASSWORD":
          setPasswordError(undefined);
          setPasswordIsValidated(false);
          break;
        case "CONFIRM_PASSWORD":
          setConfirmPasswordError(undefined);
          setConfirmPasswordIsValidated(false);
          break;
        case "TERMS":
          setTermsError(false);
          setTermsCheckIsValidated(false);
          break;

        default: {
          clearErrors();
          break;
        }
      }
    },
    [clearErrors]
  );

  return {
    message,
    errors: {
      usernameError,
      passwordError,
      confirmPasswordError,
      termsCheckError,
    },
    isValidated: {
      usernameIsValidated,
      passwordIsValidated,
      confirmPasswordIsValidated,
      termsCheckIsValidated,
    },
    clearMessage,
    clearValidationAndError,
    validateSignInForm,
    validateSignUpForm,
    handleSignIn,
    handleSignUp,
  };
};
