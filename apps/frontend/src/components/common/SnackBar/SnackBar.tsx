import { ReactNode, useCallback, useState } from "react";
import classes from "./SnackBar.module.scss";
import Button from "../Button/Button";
import SvgIcon from "../SvgIcon/SvgIcon";

type SnackBarVariant = "error" | "success" | "info";

type SnackBarProps = {
  id: string;
  children: ReactNode;
  isShowing: boolean;
  variant: SnackBarVariant;
  classNames?: string;
};

const SnackBar = ({
  id,
  children,
  isShowing,
  variant,
  classNames = "",
}: SnackBarProps) => {
  const [showSnackBar, setShowSnackBar] = useState<boolean>(isShowing);

  const handleSnackBarIsShowing = useCallback(() => {
    setShowSnackBar((showSnackBar) => !showSnackBar);
  }, []);

  return (
    showSnackBar && (
      <div id={id} className={`${classes.snackBar} ${variant} ${classNames} `}>
        {children}
        <SvgIcon
          id="icon-close"
          onClick={handleSnackBarIsShowing}
          width={24}
          height={24}
          classNames={classes.closeIcon}
        />
      </div>
    )
  );
};

export default SnackBar;
