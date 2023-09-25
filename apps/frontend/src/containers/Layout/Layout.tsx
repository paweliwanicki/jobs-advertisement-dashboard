import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import classes from './Layout.module.scss';
import { useTheme } from '../../hooks/useTheme';

const Layout = () => {
  const { theme } = useTheme();
  return (
    <div className={`${classes.layout} theme-${theme}`}>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
