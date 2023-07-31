import { ReactNode, ChangeEvent } from 'react';
import classes from './Switch.module.scss';

type SwitchProps = {
  leftLabel: ReactNode;
  rightLabel: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const Switch = ({ leftLabel, rightLabel, checked, onChange }: SwitchProps) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div className={classes.switchBox}>
      {leftLabel}
      <label className={classes.switch}>
        <input type="checkbox" onChange={handleOnChange} checked={checked} />
        <span className={classes.slider}></span>
      </label>
      {rightLabel}
    </div>
  );
};

export default Switch;
