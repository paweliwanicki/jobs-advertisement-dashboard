import classes from './NavBar.module.scss';
import logoImage from '../../assets/logos/logo.png';
import Switch from '../common/Switch/Switch';
import SvgIcon from '../common/SvgIcon/SvgIcon';

const NavBar = () => {
  const handleChangeThemeContext = (dark: boolean) => {
    console.log(dark ? 'dark' : 'light');
  };

  return (
    <nav className={classes.navBar}>
      <div className={classes.content}>
        <img className={classes.logo} src={logoImage} alt="website logo" />
        <Switch
          onChange={handleChangeThemeContext}
          leftLabel={<SvgIcon id="icon-sun" height={22} width={22} />}
          rightLabel={<SvgIcon id="icon-moon" height={18} width={18} />}
        />
      </div>
    </nav>
  );
};

export default NavBar;
