import classes from "./Input.module.scss";
import { ReactNode, useState, useCallback } from "react";
import { Tooltip } from "react-tooltip";
import SvgIcon from "../SvgIcon/SvgIcon";

type InputTypes = "text" | "number" | "password" | "email";

type InputSize = "small" | "medium" | "large";

type InputProps = {
  id: string;
  type: InputTypes;
  label: ReactNode;
  isValidated?: boolean;
  hasError?: boolean;
  icon?: ReactNode;
  value?: string;
  errorText?: string;
  validText?: string;
  placeholder?: string;
  size?: InputSize;
  onChange: (val: string) => void;
};

const Input = ({
  id,
  type,
  label,
  isValidated,
  hasError,
  icon,
  value,
  errorText,
  validText,
  placeholder,
  size = "medium",
  onChange,
}: InputProps) => {
  const [inputType, setInputType] = useState<InputTypes>(type);

  let inputBoxClassNames = `${classes.inputBox}`;

  const showValidationInfo =
    (errorText !== "" || validText !== "") && isValidated;
  if (showValidationInfo) {
    const validClassName = !hasError ? classes.valid : classes.error;
    inputBoxClassNames = `${inputBoxClassNames} ${validClassName}`;
  }

  const handleShowPassword = useCallback(() => {
    setInputType("text");
  }, []);

  const handleHidePassword = useCallback(() => {
    setInputType("password");
  }, []);

  return (
    <label className={classes.inputLabel}>
      <div className={classes.labelText}>{label}</div>
      <div className={inputBoxClassNames}>
        {icon}
        <input
          type={inputType}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={
            icon ? `${classes.withIcon} ${classes[size]}` : classes[size]
          }
        />

        {type === "password" && (
          <>
            <SvgIcon
              classNames={
                hasError
                  ? `${classes.showPasswordIcon} ${classes.error}`
                  : classes.showPasswordIcon
              }
              id={inputType === "text" ? "icon-eye" : "icon-eye-crossed"}
              elementId={`show-password-icon-${id}`}
              color="#6e8098"
              hoverColor="#6e8098"
              width={24}
              height={24}
              onMouseDown={handleShowPassword}
              onMouseUp={handleHidePassword}
            />
            <Tooltip
              anchorSelect={`#show-password-icon-${id}`}
              place="bottom-end"
              content="Show password"
              className={classes.showPasswordTooltip}
            />
          </>
        )}
        {showValidationInfo && (
          <>
            <SvgIcon
              classNames={classes.validationIcon}
              id={hasError ? "icon-error" : "icon-valid"}
              elementId={`validation-icon-${id}`}
              color="#bb0909"
              hoverColor="#bb0909"
              width={24}
              height={24}
            />

            <Tooltip
              anchorSelect={`#validation-icon-${id}`}
              place="bottom-end"
              variant={hasError ? "error" : "success"}
              content={hasError ? errorText : validText}
              className={classes.tooltipError}
            />
          </>
        )}
      </div>
    </label>
  );
};

export default Input;
