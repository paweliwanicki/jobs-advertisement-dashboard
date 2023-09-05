import { ReactNode, useCallback, useState } from 'react';
import { useCookies } from 'react-cookie';
import { HttpMethod, useApi as useApi } from './useApi';
//import { useApi } from './useApiv2';

type InputError =
  | 'EMPTY'
  | 'WRONG_PASSWORD_FORMAT'
  | 'PASSWORDS_NOT_MATCH'
  | 'WRONG_USERNAME_FORMAT';

type SignResponseStatusCodes = 2001 | 2002;
type SignFormInput = 'USERNAME' | 'PASSWORD' | 'CONFIRM_PASSWORD' | 'TERMS';

type SignResponse = {
  error: string;
  status: SignResponseStatusCodes;
  access_token: string;
};

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
  handleSignUp: (
    username: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
};

const INPUT_ERRORS_MESSAGES: Record<InputError, string> = {
  EMPTY: 'Can not be empty!',
  WRONG_PASSWORD_FORMAT:
    'Password does not meet requirements! Please check the requirements in the password hint.',
  WRONG_USERNAME_FORMAT:
    'Username must be alphanumeric and total length between 6 and 12 characters!',
  PASSWORDS_NOT_MATCH: 'Password and confirm password do not match!',
} as const;

const SIGN_RESPONSE_MESSAGES: Record<SignResponseStatusCodes, string> = {
  2001: 'Unfortunately, the username is already in use. Use a different username and try again.',
  2002: 'The username and password you are incorrect. Check the credentials you entered and try again.',
} as const;

const USERNAME_REGEX = new RegExp(
  '^(?=(.*[a-z]){1,})(?=(.*[0-9]){1,}).{6,12}$'
);
const PASSWORD_REGEX = new RegExp(
  '^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\\-__+.]){1,}).{8,}$'
);

export const useSignForm = (): SignForm => {
  const { fetch } = useApi();
  const [, setCookie] = useCookies(['jwtToken']);

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
      const [data] = await fetch<SignResponse>(HttpMethod.POST, {
        path: '/api/auth/signin',
        payload: JSON.stringify({
          username,
          password,
        }),
      });

      setMessage(data.status ? SIGN_RESPONSE_MESSAGES[data.status] : undefined);

      if (data.access_token) {
        setCookie('jwtToken', data.access_token);
      }
    },
    []
  );

  const handleSignUp = useCallback(
    async (username: string, password: string, confirmPassword: string) => {
      const [data] = await fetch<SignResponse>(HttpMethod.POST, {
        path: '/api/auth/signup',
        payload: JSON.stringify({
          username,
          password,
          confirmPassword,
        }),
      });

      setMessage(data.status ? data.status : undefined);

      if (data.access_token) {
        setCookie('jwtToken', data.access_token);
      }
    },
    []
  );

  const validateSignInForm = useCallback(
    (username: string, password: string) => {
      let isValid = true;

      if (username === '') {
        setUsernameError(INPUT_ERRORS_MESSAGES.EMPTY);
        isValid = false;
      }

      if (password === '') {
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

      if (username === '') {
        setUsernameError(INPUT_ERRORS_MESSAGES.EMPTY);
        isValid = false;
      } else if (!USERNAME_REGEX.test(username)) {
        setUsernameError(INPUT_ERRORS_MESSAGES.WRONG_USERNAME_FORMAT);
        isValid = false;
      }

      if (password === '') {
        setPasswordError(INPUT_ERRORS_MESSAGES.EMPTY);
        isValid = false;
      } else if (!PASSWORD_REGEX.test(password)) {
        setPasswordError(INPUT_ERRORS_MESSAGES.WRONG_PASSWORD_FORMAT);
        isValid = false;
      }

      if (confirmPassword === '') {
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
    setMessage(undefined);
  }, []);

  const clearErrors = useCallback(() => {
    setUsernameError(undefined);
    setPasswordError(undefined);
    setConfirmPasswordError(undefined);
    setTermsError(false);
  }, []);

  const clearValidation = useCallback(() => {
    setPasswordIsValidated(false);
    setUsernameIsValidated(false);
    setConfirmPasswordIsValidated(false);
    setTermsCheckIsValidated(false);
  }, []);

  const clearValidationAndError = useCallback(
    (input?: SignFormInput) => {
      switch (input) {
        case 'USERNAME':
          setUsernameError(undefined);
          setUsernameIsValidated(false);
          break;
        case 'PASSWORD':
          setPasswordError(undefined);
          setPasswordIsValidated(false);
          break;
        case 'CONFIRM_PASSWORD':
          setConfirmPasswordError(undefined);
          setConfirmPasswordIsValidated(false);
          break;
        case 'TERMS':
          setTermsError(false);
          setTermsCheckIsValidated(false);
          break;

        default: {
          clearErrors();
          clearValidation();
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
