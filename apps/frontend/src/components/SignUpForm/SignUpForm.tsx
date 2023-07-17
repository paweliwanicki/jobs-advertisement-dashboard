import { ApiService } from "../../utils/ApiService";
import Input from "../common/Input/Input";
import classes from "./SignUpForm.module.scss";
import { ChangeEvent, ReactNode, useCallback, useState } from "react";
import Button from "../common/Button/Button";
import { Tooltip } from "react-tooltip";
import Checkbox from "../common/Checkbox/Checkbox";
import Modal from "../common/Modal/Modal";
import SvgIcon from "../common/SvgIcon/SvgIcon";

type InputError =
  | "EMPTY"
  | "WRONG_PASSWORD_FORMAT"
  | "PASSWORDS_NOT_MATCH"
  | "WRONG_USERNAME";

const USERNAME_REGEX = new RegExp(
  "^(?=(.*[a-z]){1,})(?=(.*[0-9]){1,}).{6,12}$"
);
const PASSWORD_REGEX = new RegExp(
  "^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\\-__+.]){1,}).{8,}$"
);

const INPUT_ERRORS_MESSAGES: Record<InputError, string> = {
  EMPTY: "Can not be empty!",
  WRONG_PASSWORD_FORMAT:
    "Password does not meet requirements! Please check the requirements in the password hint.",
  WRONG_USERNAME:
    "Username must be alphanumeric and total length between 6 and 12 characters!",
  PASSWORDS_NOT_MATCH: "Password and confirm password do not match!",
} as const;

// move terms and privacy to db, fetch them on demand and useMemo
const TERMS_CONDITION: ReactNode = (
  <>
    <h3>Terms and Conditions</h3>
    <p>Score one for you for reading the terms and conditions &#128077; </p>
  </>
);

const PRIVACY_STATEMENT: ReactNode = (
  <>
    <h3>Privacy Statement</h3>
    <p>
      All usernames and passwords are stored and used only for app demo
      purposes. &#128373;
    </p>
  </>
);

const SignUpForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [termsChecked, setTermsChecked] = useState<boolean>(false);

  const [usernameError, setUsernameError] = useState<string | null>();
  const [passwordError, setPasswordError] = useState<string | null>();
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >();
  const [termsError, setTermsError] = useState<boolean>(false);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode>();

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

  const handleUsernameOnChange = useCallback((username: string) => {
    setUsernameError(null);
    setUsername(username);
  }, []);

  const handlePasswordOnChange = useCallback((password: string) => {
    setPasswordError(null);
    setPassword(password);
  }, []);

  const handleConfirmPasswordOnChange = useCallback(
    (confirmPassword: string) => {
      setConfirmPasswordError(null);
      setConfirmPassword(confirmPassword);
    },
    []
  );

  const handleFormOnSubmit = () => {
    const isValid = validateInputs(
      username,
      password,
      confirmPassword,
      termsChecked
    );
    if (!isValid) return;
    //handleSignUp();
  };

  const handleOnCheckboxChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTermsError(false);
      setTermsChecked(e.target.checked);
    },
    []
  );

  const validateInputs = useCallback(
    (
      username: string,
      password: string,
      confirmPassword: string,
      termsChecked: boolean
    ): boolean => {
      let isValid = true;

      // validate username
      if (username === "") {
        setUsernameError(INPUT_ERRORS_MESSAGES.EMPTY);
        isValid = false;
      } else if (!USERNAME_REGEX.test(username)) {
        setUsernameError(INPUT_ERRORS_MESSAGES.WRONG_USERNAME);
        isValid = false;
      }

      // validate password
      if (password === "") {
        setPasswordError(INPUT_ERRORS_MESSAGES.EMPTY);
        isValid = false;
      } else if (!PASSWORD_REGEX.test(password)) {
        setPasswordError(INPUT_ERRORS_MESSAGES.WRONG_PASSWORD_FORMAT);
        isValid = false;
      }

      // validate confirm password
      if (confirmPassword === "") {
        setConfirmPasswordError(INPUT_ERRORS_MESSAGES.EMPTY);
        isValid = false;
      } else if (confirmPassword !== password) {
        setConfirmPasswordError(INPUT_ERRORS_MESSAGES.PASSWORDS_NOT_MATCH);
        //setPasswordError(INPUT_ERRORS_MESSAGES.PASSWORDS_NOT_MATCH);
        isValid = false;
      }

      // validate terms checkbox
      if (!termsChecked) {
        setTermsError(true);
        isValid = false;
      }

      return isValid;
    },
    []
  );

  const showTermsAndConditions = () => {
    setModalContent(TERMS_CONDITION);
    setShowModal(true);
  };

  const showPrivacyStatement = () => {
    setModalContent(PRIVACY_STATEMENT);
    setShowModal(true);
  };

  return (
    <div className={classes.signUpForm}>
      <h2>Sign Up</h2>
      <h4>
        Don't have an account yet? Create a new account and enjoy browsing the
        many fake jobs &#128526;
      </h4>
      <Input
        type="text"
        id="username"
        label={
          <>
            <SvgIcon id="icon-info" elementId="username-info-icon" />
            <span>
              Username<span className={classes.required}>*</span>
            </span>
            <Tooltip
              anchorSelect="#username-info-icon"
              place="bottom-start"
              variant="info"
              content="Username must be alphanumeric, so it requires at least one letter and at least one number.  The total length should be between 6 and 12 characters."
            />
          </>
        }
        errorText={usernameError ?? ""}
        hasError={usernameError !== ""}
        onChange={handleUsernameOnChange}
        placeholder="Your new username"
      />

      <Input
        type="password"
        id="password"
        label={
          <>
            <SvgIcon id="icon-info" elementId="password-info-icon" />
            <span>
              Password<span className={classes.required}>*</span>
            </span>
            <Tooltip
              anchorSelect="#password-info-icon"
              place="bottom-start"
              variant="info"
              content="Password should contain at least one uppercase and lowercase letter, one number, one special character, and a total length of at least 8 characters."
            />
          </>
        }
        errorText={passwordError ?? ""}
        hasError={passwordError !== ""}
        onChange={handlePasswordOnChange}
        placeholder="Your password"
      />

      <Input
        type="text"
        id="confirm-password"
        label={
          <>
            <SvgIcon id="icon-info" elementId="confirm-password-info-icon" />
            <span>
              Confirm password<span className={classes.required}>*</span>
            </span>
            <Tooltip
              anchorSelect="#confirm-password-info-icon"
              place="bottom-start"
              variant="info"
              content="Password and confirmation password must be equal"
            />
          </>
        }
        errorText={confirmPasswordError ?? ""}
        hasError={confirmPasswordError !== ""}
        onChange={handleConfirmPasswordOnChange}
        placeholder="Confirm your password"
      />

      <div className={classes.termsBox}>
        <Checkbox
          onChange={handleOnCheckboxChange}
          isChecked={termsChecked}
          hasError={Boolean(termsError)}
        />
        <p>
          I agree to the
          <span onClick={showTermsAndConditions}>
            {" "}
            Terms and Conditions
          </span>{" "}
          and
          <span onClick={showPrivacyStatement}> Privacy Statement</span>
          <span className={classes.required}>*</span>
        </p>
      </div>

      <Button type="button" variant="secondary" onClick={handleFormOnSubmit}>
        Sign Up
      </Button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default SignUpForm;
