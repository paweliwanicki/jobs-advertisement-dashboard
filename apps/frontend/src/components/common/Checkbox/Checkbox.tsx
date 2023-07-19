import classes from './Checkbox.module.scss';

type CheckboxSize = 'medium' | 'large';

type CheckboxProps = {
  isChecked: boolean;
  label?: React.ReactNode;
  size?: CheckboxSize;
  hasError?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({
  isChecked,
  label,
  hasError,
  size = 'large',
  onChange,
}: CheckboxProps) => (
  <label className={`${classes.checkbox}`}>
    <div className={`${classes.checkboxContainer} ${classes[size]}`}>
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      <span
        className={`${classes.checkmark} ${hasError ? classes.error : ''} ${
          classes[size]
        }`}
        id="checkmark"
      ></span>
    </div>
    {label && <span className={classes.checkboxLabel}>{label}</span>}
  </label>
);

export default Checkbox;
