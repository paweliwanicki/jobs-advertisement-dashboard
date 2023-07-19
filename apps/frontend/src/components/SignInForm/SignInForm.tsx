import { ApiService } from "../../utils/ApiService";
import Input from "../common/Input/Input";
import classes from "./SignInForm.module.scss";
import { ChangeEvent, useCallback, useState } from "react";
import Button from "../common/Button/Button";
import Checkbox from "../common/Checkbox/Checkbox";

type InputError = "EMPTY";
type SignInResponseMessage = "WRONG_CREDENTIALS";

const INPUT_ERRORS_MESSAGES: Record<InputError, string> = {
  EMPTY: "Can not be empty!",
} as const;

const SIGN_IN_RESPONSE_MESSAGES: Record<SignInResponseMessage, string> = {
  WRONG_CREDENTIALS:
    "You typed wrong username or password! Please check your credentials and try to sign in again.",
};

const SignInForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();

  const [rememberMeIsChecked, setRememberMeIsChecked] =
    useState<boolean>(false);
  

  const handleSignIn = async () => {
    const response = await ApiService.get<{
      username: string;
      password: string;
    }>({
      path: "/api",
      // payload: JSON.stringify({
      //   username,
      //   password,
      // }),
    });
    //setLoginAttemptInfo('Wrong username or password, please try again');
    console.log(response);
  };

  const handleUsernameOnChange = useCallback((username: string) => {
    setUsernameError('');
    setUsername(username);
  }, []);

  const handlePasswordOnChange = useCallback((password: string) => {
    setPasswordError('');
    setPassword(password);
  }, []);

  const handleOnCheckboxChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setRememberMeIsChecked(e.target.checked);
    },
    []
  );

  const validateInputs = useCallback(
    (username: string, password: string): boolean => {
      let isValid = true;

      // validate username
      if (username === "") {
        setUsernameError(INPUT_ERRORS_MESSAGES.EMPTY);
        isValid = false;
      }

      // validate password
      if (password === "") {
        setPasswordError(INPUT_ERRORS_MESSAGES.EMPTY);
        isValid = false;
      }
      return isValid;
    },
    []
  );

  
  const handleFormOnSubmit = useCallback(() => {
    //setLoginAttemptInfo(SIGN_IN_RESPONSE_MESSAGES.WRONG_CREDENTIALS);
    const isValid = validateInputs(username, password);
    if (!isValid) return;
    //handleSignUp();
  }, [username, password, validateInputs]);

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
        hasError={usernameError !== ""}
        onChange={handleUsernameOnChange}
        placeholder="Your username"
      />

      <Input
        type="password"
        id="password"
        label="Password"
        errorText={passwordError}
        hasError={passwordError !== ""}
        onChange={handlePasswordOnChange}
        placeholder="Your password"
      />

      <div className={classes.rememberMeBox}>
        <Checkbox
          onChange={handleOnCheckboxChange}
          isChecked={rememberMeIsChecked}
        />
        <span>Remember me</span>
      </div>

      <Button type="button" variant="secondary" onClick={handleFormOnSubmit}>
        Sign In
      </Button>
    </div>
  );
};

export default SignInForm;
