import classes from "./Checkbox.module.scss";

type CheckboxProps = {
  isChecked: boolean;
  hasError?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({ isChecked, hasError, onChange }: CheckboxProps) => (
  <label className={classes.checkboxContainer}>
    <input type="checkbox" checked={isChecked} onChange={onChange} />
    <span
      className={`${classes.checkmark} ${hasError ? classes.error : ""}`}
      id="checkmark"
    ></span>
  </label>
);

export default Checkbox;
