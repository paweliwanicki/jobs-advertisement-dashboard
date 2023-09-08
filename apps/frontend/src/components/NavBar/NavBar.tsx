import classes from './NavBar.module.scss';
import logoImage from '../../assets/logos/logo.png';
import Switch from '../common/Switch/Switch';
import SvgIcon from '../common/SvgIcon/SvgIcon';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

const NavBar = () => {
  const { isAuthenticated } = useAuth();
  const { theme, setTheme } = useTheme();
  const handleChangeThemeContext = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

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
            <Link to="/user">
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
                elementId="icon-login"
              />
              <Tooltip
                anchorSelect={`#icon-login`}
                place="bottom-end"
                variant="info"
                content="Log in!"
              />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
