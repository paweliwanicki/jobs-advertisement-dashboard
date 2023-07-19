import classes from './Input.module.scss';
import { ReactNode } from 'react';
import validIcon from '../../../assets/icons/valid.svg';
import errorIcon from '../../../assets/icons/error.svg';
import { Tooltip } from 'react-tooltip';

type InputTypes = 'text' | 'number' | 'password' | 'email';

type InputSize = 'small' | 'medium' | 'large';

type InputProps = {
  id: string;
  type: InputTypes;
  label: ReactNode;
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
  label,
  hasError,
  value,
  validText,
  errorText,
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
      <div className={classes.labelText}>{label}</div>
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
          <>
            <img
              className={classes.validationIcon}
              src={hasError ? errorIcon : validIcon}
              alt="validation"
              id={`validation-icon-${id}`}
            />
            <Tooltip
              anchorSelect={`#validation-icon-${id}`}
              place="bottom-end"
              variant={hasError ? 'error' : 'success'}
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
