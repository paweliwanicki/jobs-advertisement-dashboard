import { ApiService } from "../../utils/ApiService";
import Input from "../common/Input/Input";
import classes from "./SignUpForm.module.scss";
import { useState } from "react";
import searchIcon from "../../assets/desktop/icon-search.svg";

const SignUpForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [usernameHasError, setUsernameHasError] = useState<boolean>(false);
  const [passwordHasError, setPasswordHasError] = useState<boolean>(false);

  const handleSignUp = async () => {
   

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

    console.log(response);
  };

const handleFormOnSubmit = () => {
  const isValid = validateInputs(username, password);
  if(!isValid) return;
  //handleSignUp();
}

  const validateInputs = (username: string, password: string): boolean => {

    console.log(username, password)
    let isValid = true;
    if (username === "") {
      setUsernameHasError(true);
      isValid = false;
    }

    if (password === "") {
      setPasswordHasError(true);
      isValid = false;
    }

    return isValid;
  };

  return (
    <div className={classes.signUpForm}>
      <h2>Sign Up</h2>
      <Input
        type="text"
        id="username"
        labelText="username"
        errorText="cant by empty"
        validText="ruchanie"
        hasError={usernameHasError}
        onChange={setUsername}
        placeholder="asdadwd"
        icon={<img src={searchIcon} alt="search" />}
      />

      <Input
        type="text"
        id="password"
        labelText="password"
        errorText="cant by empty"
        validText="ruchanie"
        hasError={passwordHasError}
        onChange={setPassword}
      />

      <button type="button" onClick={handleFormOnSubmit}>
        send
      </button>
    </div>
  );
};

export default SignUpForm;
