import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import classes from './LoginContainer.module.scss';
import SignInForm from '../../components/SignInForm/SignInForm';
import { useSignForm } from '../../hooks/useSignForm';

type Form = 'SIGN_UP' | 'SIGN_IN';

export type SignForm = {
  onSubmit: (username: string, password: string) => void;
};

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
  const { message, handleSignIn, handleSignUp } = useSignForm();

  const [activeForm, setActiveForm] = useState<Form>('SIGN_IN');

  const handleSignInOnSubmit = (username: string, password: string) => {
    handleSignIn(username, password)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignUpOnSubmit = (username: string, password: string) => {
    handleSignUp(username, password)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };

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
          onClick={() =>
            setActiveForm(activeForm === 'SIGN_IN' ? 'SIGN_UP' : 'SIGN_IN')
          }
        >
          {FORM_CHANGE_TEXT[activeForm].btn}
        </button>
      </div>
    </div>
  );
};

export default LoginContainer;
