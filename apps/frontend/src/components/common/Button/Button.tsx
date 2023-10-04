import classes from "./Button.module.scss";

type ButtonType = "button" | "submit";
type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  id?: string;
  children: React.ReactNode;
  variant: ButtonVariant;
  type?: ButtonType;
  classNames?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({
  id,
  children,
  variant,
  disabled,
  classNames = "",
  type = "button",
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`${classes.button} ${classes[variant]} ${classNames}`}
      onClick={onClick}
      type={type}
      id={id}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
