import { ReactNode, useCallback } from "react";
import classes from "../CustomReactSelect/CustomReactSelect.module.scss";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { SingleValue } from "react-select";
import { Option } from "react-google-places-autocomplete/build/types";

type CustomReactSelectProps = {
  id?: string;
  value?: any;
  classNames?: string;
  isClearable?: boolean;
  icon?: ReactNode;
  placeholder?: string;
  onChange: (selected: SingleValue<Option> | null) => void;
};

const GoogleLocationSelect = ({
  id,
  icon,
  value,
  onChange,
}: CustomReactSelectProps) => {
  const handleSelection = useCallback((items: SingleValue<Option> | null) => {
    onChange && onChange(items);
  }, []);

  return (
    <label className={classes.customReactSelectLabel}>
      <span className={classes.icon}>{icon}</span>
      <GooglePlacesAutocomplete
        apiKey="AIzaSyBa7WIrBOkKT7YRiTJFzhFMYZfCTc_6iRY"
        minLengthAutocomplete={3}
        selectProps={{
          value: value,
          id: id,
          instanceId: "location",
          placeholder: "location...",
          className: classes.customReactSelect,
          isClearable: true,
          noOptionsMessage: () => "Please type min 3 chars...",
          onChange: handleSelection,
        }}
      />
    </label>
  );
};

export default GoogleLocationSelect;
