import { ReactNode, useCallback, useState } from 'react';
import { ApiService } from '../utils/ApiService';

type InputError =
  | 'EMPTY'
  | 'WRONG_PASSWORD_FORMAT'
  | 'PASSWORDS_NOT_MATCH'
  | 'WRONG_USERNAME_FORMAT';

type SignResponseMessage = 'WRONG_CREDENTIALS' | 'USERNAME_IN_USE';

type SignInFormValidation = {
  isValid: boolean;
  usernameError: string | null;
  passwordError: string | null;
};

type SignUpFormValidation = SignInFormValidation & {
  confirmPasswordError: string | null;
  termsCheckedError: boolean;
};

type SignForm = {
  message: ReactNode;
  clearMessage: () => void;
  validateSignInForm: (
    username: string,
    password: string
  ) => SignInFormValidation;
  validateSignUpForm: (
    username: string,
    password: string,
    confirmPassword: string,
    termsChecked: boolean
  ) => SignUpFormValidation;
  handleSignIn: (username: string, password: string) => Promise<void>;
  handleSignUp: (username: string, password: string) => Promise<void>;
};

const INPUT_ERRORS_MESSAGES: Record<InputError, string> = {
  EMPTY: 'Can not be empty!',
  WRONG_PASSWORD_FORMAT:
    'Password does not meet requirements! Please check the requirements in the password hint.',
  WRONG_USERNAME_FORMAT:
    'Username must be alphanumeric and total length between 6 and 12 characters!',
  PASSWORDS_NOT_MATCH: 'Password and confirm password do not match!',
} as const;

const SIGN_RESPONSE_MESSAGES: Record<SignResponseMessage, string> = {
  WRONG_CREDENTIALS:
    'You typed wrong username or password! Please check your credentials and try to sign in again.',
  USERNAME_IN_USE:
    'Unfortunately, the username is already in use. Use a different username and try again.',
};

const USERNAME_REGEX = new RegExp(
  '^(?=(.*[a-z]){1,})(?=(.*[0-9]){1,}).{6,12}$'
);
const PASSWORD_REGEX = new RegExp(
  '^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\\-__+.]){1,}).{8,}$'
);

export const useSignForm = (): SignForm => {
  const [message, setMessage] = useState<ReactNode>();

  const handleSignIn = useCallback(
    async (username: string, password: string) => {
      const response = await ApiService.post<{
        username: string;
        password: string;
      }>({
        path: '/api/auth/signin',
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
        path: '/api/auth/signup',
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
      let usernameError = null;
      let passwordError = null;

      if (username === '') {
        usernameError = INPUT_ERRORS_MESSAGES.EMPTY;
        isValid = false;
      }

      if (password === '') {
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

  const validateSignUpForm = useCallback(
    (
      username: string,
      password: string,
      confirmPassword: string,
      termsChecked: boolean
    ) => {
      let isValid = true;
      let usernameError = null;
      let passwordError = null;
      let confirmPasswordError = null;

      if (username === '') {
        usernameError = INPUT_ERRORS_MESSAGES.EMPTY;
        isValid = false;
      } else if (!USERNAME_REGEX.test(username)) {
        usernameError = INPUT_ERRORS_MESSAGES.WRONG_USERNAME_FORMAT;
        isValid = false;
      }

      if (password === '') {
        passwordError = INPUT_ERRORS_MESSAGES.EMPTY;
        isValid = false;
      } else if (!PASSWORD_REGEX.test(password)) {
        passwordError = INPUT_ERRORS_MESSAGES.WRONG_PASSWORD_FORMAT;
        isValid = false;
      }

      if (confirmPassword === '') {
        confirmPasswordError = INPUT_ERRORS_MESSAGES.EMPTY;
        isValid = false;
      } else if (confirmPassword !== password) {
        confirmPasswordError = INPUT_ERRORS_MESSAGES.PASSWORDS_NOT_MATCH;
        isValid = false;
      }

      return {
        isValid,
        usernameError,
        passwordError,
        confirmPasswordError,
        termsCheckedError: !termsChecked,
      };
    },
    []
  );

  const clearMessage = useCallback(() => {
    setMessage(null);
  }, []);

  return {
    message,
    clearMessage,
    validateSignInForm,
    validateSignUpForm,
    handleSignIn,
    handleSignUp,
  };
};
