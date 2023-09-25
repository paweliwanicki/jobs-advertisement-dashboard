import classes from './Input.module.scss';
import { ReactNode, useCallback, useEffect, ChangeEvent } from 'react';
import { Tooltip } from 'react-tooltip';
import SvgIcon from '../SvgIcon/SvgIcon';
import { useMotionAnimate } from 'motion-hooks';
import { KeyboardEvent } from 'react';

type InputTypes = 'text' | 'number' | 'password' | 'email';
type InputSize = 'small' | 'medium' | 'large';

export type InputProps = {
  id: string;
  label?: ReactNode;
  type?: InputTypes;
  isValidated?: boolean;
  hasError?: boolean;
  autocomplete?: boolean;
  icon?: ReactNode;
  value?: string;
  errorText?: string;
  validText?: string;
  placeholder?: string;
  size?: InputSize;
  autoComplete?: string;
  children?: ReactNode;
  onChange: (val: string) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
};

const Input = ({
  id,
  label,
  isValidated,
  hasError,
  icon,
  value,
  errorText,
  validText,
  placeholder,
  autoComplete,
  children,
  size = 'medium',
  type = 'text',
  onChange,
  onKeyDown,
}: InputProps) => {
  const validationIconAnimation = useMotionAnimate(
    `.${classes.validationIcon}`,
    { opacity: 1 },
    {
      duration: 0.5,
      easing: [0.22, 0.03, 0.26, 1],
    }
  );

  let validClassName = '';
  let inputBoxClassNames = `${classes.inputBox}`;

  const showValidationInfo =
    (errorText !== '' || validText !== '') && isValidated;
  if (showValidationInfo) {
    validClassName = !hasError ? classes.valid : classes.error;
    inputBoxClassNames = `${inputBoxClassNames} ${validClassName}`;
  }

  const handleInputOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  useEffect(() => {
    if (showValidationInfo) {
      void validationIconAnimation.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidated]);

  return (
    <label className={classes.inputLabel} htmlFor={id}>
      <div className={classes.labelText}>{label}</div>
      <div className={inputBoxClassNames}>
        {icon}
        <input
          id={id}
          type={type}
          name={id}
          value={value}
          onChange={handleInputOnChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className={`${classes[size]} ${icon ? classes.withIcon : ''}`}
          autoComplete={autoComplete}
        />

        <div
          className={`${classes.iconsBox} 
          ${classes[type]}
          ${isValidated ? classes.isValidated : ''}`}
        >
          {children}
          {showValidationInfo && (
            <>
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
                content={hasError ? errorText : validText}
                className={classes.tooltipError}
              />
            </>
          )}
        </div>
      </div>
    </label>
  );
};

export default Input;
