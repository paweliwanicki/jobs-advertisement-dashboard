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

const Button = ({ variant, classNames, children }: ButtonProps) => {
  return (
    <button className={`${classes.button} ${classes[variant]} ${classNames}`}>
      {children}
    </button>
  );
};

export default Button;
