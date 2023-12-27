import { ReactNode } from "react";
import classes from "./InfoBox.module.scss";

type InfoBoxVariant = "success" | "error" | "info";

type InfoBoxProps = {
  children: ReactNode;
  variant: InfoBoxVariant;
};

const InfoBox = ({ children, variant = "info" }: InfoBoxProps) => {
  return (
    <div className={`${classes.infoBox} ${classes[variant]}`}>{children}</div>
  );
};

export default InfoBox;
