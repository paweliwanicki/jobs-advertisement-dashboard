import classes from './NavBar.module.scss';
import logoImage from '../../assets/logos/logo.png';

const NavBar = () => (
  <nav className={classes.navBar}>
    <div className={classes.content}>
      <img className={classes.logo} src={logoImage} alt="website logo" />
      switch
    </div>
  </nav>
);

export default NavBar;
