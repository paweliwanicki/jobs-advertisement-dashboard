import classes from './Input.module.scss';
import { ReactNode, useState, useCallback } from 'react';
import validIcon from '../../../assets/icons/valid.svg';
import errorIcon from '../../../assets/icons/error.svg';
import { Tooltip } from 'react-tooltip';
import SvgIcon from '../SvgIcon/SvgIcon';

type InputTypes = 'text' | 'number' | 'password' | 'email';

type InputSize = 'small' | 'medium' | 'large';

type InputProps = {
  id: string;
  type: InputTypes;
  label: ReactNode;
  hasError?: boolean;
  icon?: ReactNode;
  value?: string;
  errorText?: string | null;
  validText?: string;
  placeholder?: string;
  size?: InputSize;
  onChange: (val: string) => void;
};

const Input = ({
  id,
  type,
  label,
  hasError,
  icon,
  value,
  errorText,
  validText,
  placeholder,
  size = 'medium',
  onChange,
}: InputProps) => {
  const [inputType, setInputType] = useState<InputTypes>(type);

  let inputBoxClassNames = `${classes.inputBox}`;

  const showValidationInfo = errorText || validText;
  if (showValidationInfo) {
    const validClassName = !hasError ? classes.valid : classes.error;
    inputBoxClassNames = `${inputBoxClassNames} ${validClassName}`;
  }

  const handleShowPassword = useCallback(() => {
    setInputType('password');
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

        {type === 'password' && (
          <>
            <SvgIcon
              classNames={
                hasError
                  ? `${classes.showPasswordIcon} ${classes.error}`
                  : classes.showPasswordIcon
              }
              id="icon-eye"
              elementId={`show-password-icon-${id}`}
              color="#6e8098"
              hoverColor="#6e8098"
              width={24}
              height={24}
              onMouseDown={handleShowPassword}
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
            {/* <img
              className={classes.validationIcon}
              src={hasError ? errorIcon : validIcon}
              alt="validation"
              id={`validation-icon-${id}`}
            /> */}
            <SvgIcon
              classNames={classes.validationIcon}
              id={hasError ? 'icon-error' : 'icon-valid'}
              elementId={`validation-icon-${id}`}
              color="#bb0909"
              hoverColor="#bb0909"
              width={24}
              height={24}
            />

            <Tooltip
              anchorSelect={`#validation-icon-${id}`}
              place="bottom-end"
              variant={hasError ? 'error' : 'success'}
              content={showValidationInfo && (hasError ? errorText : validText)}
              className={classes.tooltipError}
            />
          </>
        )}
      </div>
    </label>
  );
};

export default Input;
