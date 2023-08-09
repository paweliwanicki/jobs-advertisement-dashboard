import { Tooltip } from 'react-tooltip';
import classes from './Checkbox.module.scss';

type CheckboxSize = 'medium' | 'large';

type CheckboxProps = {
  isChecked: boolean;
  label?: React.ReactNode;
  size?: CheckboxSize;
  hasError?: boolean;
  errorText?: string;
  errorTooltip?: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({
  isChecked,
  label,
  hasError,
  errorText,
  errorTooltip,
  size = 'large',
  onChange,
}: CheckboxProps) => {
  const showErrorTooltip = hasError && errorTooltip && errorText;
  return (
    <label className={`${classes.checkbox}`}>
      <div className={`${classes.checkboxContainer} ${classes[size]}`}>
        <input type="checkbox" onChange={onChange} checked={isChecked} />
        <span
          className={`${classes.checkmark} ${classes[size]} ${
            hasError ? classes.error : ''
          }`}
        ></span>
        {showErrorTooltip && (
          <Tooltip
            anchorSelect={`.${classes.checkmark}`}
            place="bottom-start"
            variant="error"
            content={errorText}
            className={classes.tooltip}
          />
        )}
      </div>
      {label && <span className={classes.checkboxLabel}>{label}</span>}
    </label>
  );
};

export default Checkbox;
