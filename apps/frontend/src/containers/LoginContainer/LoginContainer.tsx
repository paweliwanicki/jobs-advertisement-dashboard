import { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import classes from "./LoginContainer.module.scss";

type Form = "SIGN_UP" | "SIGN_IN";

const FORM_CHANGE_TEXT: Record<Form, string> = {
  SIGN_UP: "Have already an account? Sign in!",
  SIGN_IN: "Don't have account? Please Sign up!",
} as const;

const LoginContainer = () => {
  const [activeForm, setActiveForm] = useState<Form>("SIGN_IN");

  return (
    <div className={classes.loginContainer}>

      {activeForm === "SIGN_UP" ? <SignUpForm /> : <>sig</>}

      <button
        className={classes.formChangeBtn}
        onClick={() =>
          setActiveForm(activeForm === "SIGN_IN" ? "SIGN_UP" : "SIGN_IN")
        }
      >
        {FORM_CHANGE_TEXT[activeForm]}
      </button>
    </div>
  );
};

export default LoginContainer;
