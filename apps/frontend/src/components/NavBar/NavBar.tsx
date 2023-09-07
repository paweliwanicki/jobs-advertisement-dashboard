import classes from './NavBar.module.scss';
import logoImage from '../../assets/logos/logo.png';
import Switch from '../common/Switch/Switch';
import SvgIcon from '../common/SvgIcon/SvgIcon';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/themeContext';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';

const NavBar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const handleChangeThemeContext = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const { isAuthenticated } = useContext(AuthContext);

  return (
    <nav className={classes.navBar}>
      <div className={classes.content}>
        <Link to="/">
          <img className={classes.logo} src={logoImage} alt="website logo" />
        </Link>
        <div className={classes.userMenu}>
          <Switch
            checked={theme === 'dark'}
            onChange={handleChangeThemeContext}
            leftLabel={<SvgIcon id="icon-sun" height={22} width={22} />}
            rightLabel={<SvgIcon id="icon-moon" height={18} width={18} />}
          />
          {isAuthenticated ? (
            <Link to="/userpanel">
              <SvgIcon
                id="icon-user"
                height={48}
                width={48}
                classNames={classes.userAvatar}
              />
            </Link>
          ) : (
            <Link to="login">
              <SvgIcon
                id="icon-login"
                height={48}
                width={48}
                classNames={classes.loginBtn}
              />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
