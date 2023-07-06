import classes from './Input.module.scss';

type InputTypes = 'text' | 'number' | 'password' | 'email';

type InputProps = {
  id: string;
  type: InputTypes;
  onChange: (val: string) => void;
  value?: string;
  labelText: string;
  errorText: string;
  hasError: boolean;
  isValid: boolean;
  showIsValid?: boolean;
};

const Input = ({
  id,
  labelText,
  errorText,
  hasError,
  value,
  isValid,
  showIsValid = false,
  onChange,
}: InputProps) => {
  return (
    <label className={classes.inputLabel}>
      {labelText}
      <input
        type="text"
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {hasError ?? <p className={classes.error}>{errorText}</p>}
    </label>
  );
};

export default Input;
