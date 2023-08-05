import classes from './Button.module.scss';

type ButtonType = 'button' | 'submit';
type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  children: React.ReactNode;
  variant: ButtonVariant;
  type?: ButtonType;
  classNames?: string;
  onClick: () => void;
};

const Button = ({
  children,
  variant,
  classNames = '',
  type = 'button',
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`${classes.button} ${classes[variant]} ${classNames}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
