import { ReactNode } from 'react';
import classes from './Checkbox.module.scss';

type CheckboxProps = {
  isChecked?: boolean;
  errorText?: ReactNode;
  hasError?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({
  isChecked,
  errorText,
  hasError,
  onChange,
}: CheckboxProps) => {
  const showValidation = errorText !== '';
  let checkmarkClasses = classes.checkmark;

  if (showValidation) {
    checkmarkClasses = `${checkmarkClasses} ${
      hasError ? classes.error : classes.valid
    }`;
  }

  return (
    <label className={classes.checkboxContainer}>
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      <span className={checkmarkClasses}></span>
    </label>
  );
};

export default Checkbox;
