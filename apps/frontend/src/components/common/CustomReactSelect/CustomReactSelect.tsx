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
  isDisabled?: boolean;
  instanceId?: string;
  onChange: (selected: OptionsOrGroups<any, never> | undefined) => void;
  onCreateOption?: (value: string) => Promise<any>;
};

const CustomReactSelect = ({
  id,
  icon,
  options,
  isClearable,
  placeholder,
  value,
  instanceId,
  classNames = "",
  isDisabled = false,
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
        isDisabled={isDisabled}
        instanceId={instanceId}
      />
    </label>
  );
};

export default CustomReactSelect;
