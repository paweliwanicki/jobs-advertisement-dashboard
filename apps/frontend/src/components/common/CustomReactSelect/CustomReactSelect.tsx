import { useCallback, ReactNode } from "react";
import Select, { OptionsOrGroups } from "react-select";
import classes from "./CustomReactSelect.module.scss";

type CustomReactSelectProps = {
  id: string;
  options: OptionsOrGroups<any, never>;
  value?: any;
  classNames?: string;
  isClearable?: boolean;
  icon?: ReactNode;
  placeholder?: string;
  onChange: (selected: OptionsOrGroups<any, never> | undefined) => void;
};

const CustomReactSelect = ({
  id,
  icon,
  options,
  isClearable,
  placeholder,
  value,
  classNames = "",
  onChange,
}: CustomReactSelectProps) => {
  const handleSelection = useCallback(
    (items: OptionsOrGroups<any, never> | undefined) => {
      onChange && onChange(items);
    },
    []
  );

  return (
    <label className={classes.customReactSelectLabel}>
      {icon && <span className={classes.icon}>{icon}</span>}
      <Select
        id={id}
        onChange={handleSelection}
        options={options}
        className={`${classes.customReactSelect} ${
          classNames ? classNames : ""
        }`}
        value={value}
        isClearable={isClearable}
        placeholder={placeholder}
      />
    </label>
  );
};

export default CustomReactSelect;
