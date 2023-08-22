import Input from '../common/Input/Input';
import classes from './SignInForm.module.scss';
import { ChangeEvent, useCallback, useState, useEffect } from 'react';
import Button from '../common/Button/Button';
import Checkbox from '../common/Checkbox/Checkbox';
import { useSignForm } from '../../hooks/useSignForm';
import { useMotionAnimate } from 'motion-hooks';

 type SignInFormProps = {
  onSubmit: (
    username: string,
    password: string,
  ) => void;
};


const SignInForm = ({ onSubmit }: SignInFormProps) => {
  const { play } = useMotionAnimate(
    `.${classes.signInForm}`,
    { opacity: 1 },
    {
      duration: 0.5,
      easing: [0.22, 0.03, 0.26, 1],
    }
  );

  const { validateSignInForm, clearValidationAndError, errors, isValidated } =
    useSignForm();

  const { usernameError, passwordError } = errors;
  const { usernameIsValidated, passwordIsValidated } = isValidated;

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMeIsChecked, setRememberMeIsChecked] =
    useState<boolean>(false);

  const handleUsernameOnChange = useCallback(
    (username: string) => {
      usernameIsValidated && clearValidationAndError('USERNAME');
      setUsername(username);
    },
    [usernameIsValidated, clearValidationAndError]
  );

  const handlePasswordOnChange = useCallback(
    (password: string) => {
      passwordIsValidated && clearValidationAndError('PASSWORD');
      setPassword(password);
    },
    [passwordIsValidated, clearValidationAndError]
  );

  const handleOnCheckboxChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setRememberMeIsChecked(e.target.checked);
    },
    []
  );

  const handleFormOnSubmit = useCallback(() => {
    const isValid = validateSignInForm(username, password);
    if (!isValid) {
      return;
    }
    onSubmit(username, password);
  }, [username, password, validateSignInForm, onSubmit]);

  useEffect(() => {
    void play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.signInForm}>
      <h2>Sign In</h2>
      <h4>
        Please log in to the application using your username and password.
      </h4>
      <Input
        type="text"
        id="username"
        label="Username"
        errorText={usernameError}
        hasError={!!usernameError}
        onChange={handleUsernameOnChange}
        placeholder="Your username"
        isValidated={usernameIsValidated}
      />

      <Input
        type="password"
        id="password"
        label="Password"
        errorText={passwordError}
        hasError={!!passwordError}
        onChange={handlePasswordOnChange}
        placeholder="Your password"
        isValidated={passwordIsValidated}
      />

      <div className={classes.rememberMeBox}>
        <Checkbox
          onChange={handleOnCheckboxChange}
          isChecked={rememberMeIsChecked}
          size="medium"
          label="Remember me"
        />
      </div>

      <Button type="button" variant="secondary" onClick={handleFormOnSubmit}>
        Sign In
      </Button>
    </div>
  );
};

export default SignInForm;
