import { ReactNode, ChangeEvent } from 'react';
import classes from './Switch.module.scss';

type SwitchProps = {
  leftLabel: ReactNode;
  rightLabel: ReactNode;
  onChange: (checked: boolean) => void;
};

const Switch = ({ leftLabel, rightLabel, onChange }: SwitchProps) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div className={classes.switchBox}>
      {leftLabel}
      <label className={classes.switch}>
        <input type="checkbox" onChange={handleOnChange} />
        <span className={classes.slider}></span>
      </label>
      {rightLabel}
    </div>
  );
};

export default Switch;
