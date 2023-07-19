import { ChangeEvent, ReactNode, useCallback, useState } from 'react';
import Input from '../common/Input/Input';
import classes from './SignUpForm.module.scss';
import Button from '../common/Button/Button';
import { Tooltip } from 'react-tooltip';
import Checkbox from '../common/Checkbox/Checkbox';
import Modal from '../common/Modal/Modal';
import SvgIcon from '../common/SvgIcon/SvgIcon';
import { useSignForm } from '../../hooks/useSignForm';
import { SignForm } from '../../containers/LoginContainer/LoginContainer';

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

const SignUpForm = ({ onSubmit }: SignForm) => {
  const { validateSignUpForm } = useSignForm();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [termsChecked, setTermsChecked] = useState<boolean>(false);

  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [termsError, setTermsError] = useState<boolean>(false);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode>();

  const handleUsernameOnChange = useCallback(
    (username: string) => {
      usernameError !== '' && setUsernameError('');
      setUsername(username);
    },
    [usernameError]
  );

  const handlePasswordOnChange = useCallback(
    (password: string) => {
      passwordError != '' && setPasswordError('');
      setPassword(password);
    },
    [passwordError]
  );

  const handleConfirmPasswordOnChange = useCallback(
    (confirmPassword: string) => {
      confirmPasswordError !== '' && setConfirmPasswordError('');
      setConfirmPassword(confirmPassword);
    },
    [confirmPasswordError]
  );

  const handleOnCheckboxChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      termsError && setTermsError(false);
      setTermsChecked(e.target.checked);
    },
    [termsError]
  );

  const handleFormOnSubmit = useCallback(() => {
    const {
      isValid,
      usernameError,
      passwordError,
      confirmPasswordError,
      termsCheckedError,
    } = validateSignUpForm(username, password, confirmPassword, termsChecked);

    if (!isValid) {
      usernameError && setUsernameError(usernameError);
      passwordError && setPasswordError(passwordError);
      confirmPasswordError && setConfirmPasswordError(confirmPasswordError);
      termsCheckedError && setTermsError(termsCheckedError);
      return;
    }

    onSubmit(username, password);
  }, [
    username,
    password,
    confirmPassword,
    termsChecked,
    validateSignUpForm,
    onSubmit,
  ]);

  const showTermsAndConditions = useCallback(() => {
    setModalContent(TERMS_CONDITION);
    setShowModal(true);
  }, []);

  const showPrivacyStatement = useCallback(() => {
    setModalContent(PRIVACY_STATEMENT);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalContent(null);
    setShowModal(false);
  }, []);

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
        errorText={usernameError}
        hasError={usernameError !== ''}
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
        errorText={passwordError}
        hasError={passwordError !== ''}
        onChange={handlePasswordOnChange}
        placeholder="Your password"
      />

      <Input
        type="password"
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
        errorText={confirmPasswordError}
        hasError={confirmPasswordError !== ''}
        onChange={handleConfirmPasswordOnChange}
        placeholder="Confirm your password"
      />

      <div className={classes.termsBox}>
        <Checkbox
          onChange={handleOnCheckboxChange}
          isChecked={termsChecked}
          hasError={Boolean(termsError)}
          size="medium"
        />
        <p>
          I agree to the
          <span onClick={showTermsAndConditions}>
            {' '}
            Terms and Conditions
          </span>{' '}
          and
          <span onClick={showPrivacyStatement}> Privacy Statement</span>
          <span className={classes.required}>*</span>
        </p>
      </div>

      <Button type="button" variant="secondary" onClick={handleFormOnSubmit}>
        Sign Up
      </Button>

      <Modal isOpen={showModal} onClose={closeModal}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default SignUpForm;
