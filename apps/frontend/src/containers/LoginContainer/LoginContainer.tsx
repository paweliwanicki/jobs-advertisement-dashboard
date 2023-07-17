import { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import classes from "./LoginContainer.module.scss";
import SignInForm from "../../components/SignInForm/SignInForm";

type Form = "SIGN_UP" | "SIGN_IN";

const FORM_CHANGE_TEXT: Record<Form, Record<string, string>> = {
  SIGN_UP: {
    label: "Have already an account?",
    btn: "Sign in!",
  },
  SIGN_IN: {
    label: "Do not have an account yet?",
    btn: "Sign up!",
  },
} as const;

const LoginContainer = () => {
  const [activeForm, setActiveForm] = useState<Form>("SIGN_IN");

  return (
    <div className={classes.loginContainer}>
      {activeForm === "SIGN_UP" ? <SignUpForm /> : <SignInForm />}

      <div className={classes.formChangeBox}>
        <p>{FORM_CHANGE_TEXT[activeForm].label}</p>
        <button
          className={classes.formChangeBtn}
          onClick={() =>
            setActiveForm(activeForm === "SIGN_IN" ? "SIGN_UP" : "SIGN_IN")
          }
        >
          {FORM_CHANGE_TEXT[activeForm].btn}
        </button>
      </div>
    </div>
  );
};

export default LoginContainer;
