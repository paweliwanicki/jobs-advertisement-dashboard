import classes from "./Input.module.scss";
import { ReactNode } from "react";

type InputTypes = "text" | "number" | "password" | "email";

type InputProps = {
  id: string;
  type: InputTypes;
  icon?: ReactNode;
  hasError: boolean;
  onChange: (val: string) => void;
  value?: string;
  labelText: string;
  errorText?: string;
  validText?: string;
  placeholder?: string;
};

const Input = ({
  id,
  icon,
  labelText,
  errorText,
  validText,
  hasError,
  value,
  placeholder,
  onChange,
}: InputProps) => {
  let inputBoxClassNames = `${classes.inputBox}`;

  const showValidationInfo = errorText && validText;
  if (showValidationInfo) {
    const validClassName = !hasError ? classes.valid : classes.error;
    inputBoxClassNames = `${inputBoxClassNames} ${validClassName}`;
  }

  return (
    <label className={classes.inputLabel}>
      {labelText}

      <div className={inputBoxClassNames}>
        {icon}
        <input
          type="text"
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={icon ? classes.withIcon : ""}
        />
      </div>
      {showValidationInfo && (
        <p
          className={`${classes.validationInfo} ${
            !hasError ? classes.valid : classes.error
          }`}
        >
          {hasError ? errorText : validText}
        </p>
      )}
    </label>
  );
};

export default Input;
