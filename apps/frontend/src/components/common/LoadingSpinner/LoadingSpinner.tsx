import spinner from './spinner.svg';
import classes from './LoadingSpinner.module.scss';

export const LoadingSpinner = () => {
  return (
    <div className={classes.loadingSpinnerOverlay}>
      <img
        className={classes.loadingSpinner}
        src={spinner}
        alt="loading spinner"
      />
    </div>
  );
};
