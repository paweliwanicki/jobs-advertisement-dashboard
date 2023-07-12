import classes from './Input.module.scss';
import { ReactNode } from 'react';
import validIcon from '../../../assets/icons/valid.svg';
import errorIcon from '../../../assets/icons/error.svg';

type InputTypes = 'text' | 'number' | 'password' | 'email';

type InputSize = 'small' | 'medium' | 'large';

type InputProps = {
  id: string;
  type: InputTypes;
  labelText: string;
  size?: InputSize;
  hasError?: boolean;
  icon?: ReactNode;
  value?: string;
  errorText?: string;
  validText?: string;
  placeholder?: string;
  onChange: (val: string) => void;
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
  size = 'medium',
  onChange,
}: InputProps) => {
  let inputBoxClassNames = `${classes.inputBox}`;

  const showValidationInfo = errorText || validText;
  if (showValidationInfo) {
    const validClassName = !hasError ? classes.valid : classes.error;
    inputBoxClassNames = `${inputBoxClassNames} ${validClassName}`;
  }

  return (
    <label className={classes.inputLabel}>
      <p>{labelText}</p>

      <div className={inputBoxClassNames}>
        {icon}
        <input
          type="text"
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={
            icon ? `${classes.withIcon} ${classes[size]}` : classes[size]
          }
        />
        {showValidationInfo && (
          <img
            className={classes.validationIcon}
            src={hasError ? errorIcon : validIcon}
            alt="validation"
          />
        )}
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
