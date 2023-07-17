import { ApiService } from "../../utils/ApiService";
import Input from "../common/Input/Input";
import classes from "./SignInForm.module.scss";
import { useState } from "react";
import Button from "../common/Button/Button";

type InputError = "EMPTY";

const INPUT_ERRORS_MESSAGES: Record<InputError, string> = {
  EMPTY: "Can not be empty!",
} as const;

const SignInForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string | null>();
  const [passwordError, setPasswordError] = useState<string | null>();

  const [loginAttemptInfo, setLoginAttemptInfo] = useState<string | null>('Wrong username or password! Check credentials and please try again.');

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

  const handleUsernameOnChange = (username: string) => {
    setUsernameError(null);
    setUsername(username);
  };

  const handlePasswordOnChange = (password: string) => {
    setPasswordError(null);
    setPassword(password);
  };

  const handleFormOnSubmit = () => {
    const isValid = validateInputs(username, password);
    if (!isValid) return;
    //handleSignUp();
  };

  const validateInputs = (username: string, password: string): boolean => {
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
  };

  return (
    <div className={classes.signInForm}>
      <h2>Sign In</h2>
      <h4>Please log in to the application using your username and password.</h4>
      <Input
        type="text"
        id="username"
        label="Username"
        errorText={usernameError ?? ""}
        hasError={usernameError !== ""}
        onChange={handleUsernameOnChange}
        placeholder="Your username"
      />

      <Input
        type="password"
        id="password"
        label="Password"
        errorText={passwordError ?? ""}
        hasError={passwordError !== ""}
        onChange={handlePasswordOnChange}
        placeholder="Your password"
      />

      <p className={classes.loginAttemptInfo}>{loginAttemptInfo}</p>

      <Button type="button" variant="secondary" onClick={handleFormOnSubmit}>
        Sign In
      </Button>
    </div>
  );
};

export default SignInForm;
