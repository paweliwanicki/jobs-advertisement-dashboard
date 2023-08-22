import { useCallback, useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import classes from './LoginContainer.module.scss';
import SignInForm from '../../components/SignInForm/SignInForm';
import { useSignForm } from '../../hooks/useSignForm';

type Form = 'SIGN_UP' | 'SIGN_IN';

const FORM_CHANGE_TEXT: Record<Form, Record<string, string>> = {
  SIGN_UP: {
    label: 'Have already an account?',
    btn: 'Sign in!',
  },
  SIGN_IN: {
    label: 'Do not have an account yet?',
    btn: 'Sign up!',
  },
} as const;

const LoginContainer = () => {
  const { message, handleSignIn, handleSignUp, clearMessage } = useSignForm();

  const [activeForm, setActiveForm] = useState<Form>('SIGN_IN');

  const handleSignInOnSubmit = (username: string, password: string) => {
    handleSignIn(username, password)
      .then((res) => console.log(res))
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSignUpOnSubmit = (
    username: string,
    password: string,
    confirmPassword: string
  ) => {
    handleSignUp(username, password, confirmPassword)
      .then((res) => console.log(res))
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChangeSignForm = useCallback(() => {
    setActiveForm(activeForm === 'SIGN_IN' ? 'SIGN_UP' : 'SIGN_IN');
    clearMessage();
  }, [activeForm, clearMessage]);

  return (
    <div className={classes.loginContainer}>
      {activeForm === 'SIGN_UP' ? (
        <SignUpForm onSubmit={handleSignUpOnSubmit} />
      ) : (
        <SignInForm onSubmit={handleSignInOnSubmit} />
      )}

      <div className={classes.signResponseMessage}>
        {message && <p>{message}</p>}
      </div>
      <div className={classes.formChangeBox}>
        <p>{FORM_CHANGE_TEXT[activeForm].label}</p>
        <button
          className={classes.formChangeBtn}
          onClick={handleChangeSignForm}
        >
          {FORM_CHANGE_TEXT[activeForm].btn}
        </button>
      </div>
    </div>
  );
};

export default LoginContainer;
