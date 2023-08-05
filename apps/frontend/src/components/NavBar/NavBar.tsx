import classes from './NavBar.module.scss';
import logoImage from '../../assets/logos/logo.png';
import Switch from '../common/Switch/Switch';
import SvgIcon from '../common/SvgIcon/SvgIcon';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/themeContext';

const NavBar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const handleChangeThemeContext = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <nav className={classes.navBar}>
      <div className={classes.content}>
        <img className={classes.logo} src={logoImage} alt="website logo" />
        <Switch
          checked={theme === 'dark'}
          onChange={handleChangeThemeContext}
          leftLabel={<SvgIcon id="icon-sun" height={22} width={22} />}
          rightLabel={<SvgIcon id="icon-moon" height={18} width={18} />}
        />
      </div>
    </nav>
  );
};

export default NavBar;
