import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import classes from './Layout.module.scss';
import ThemeProvider from '../../providers/ThemeProvider';
import { useTheme } from '../../hooks/useTheme';

const Layout = () => {
  const { theme } = useTheme();
  return (
    <ThemeProvider>
      <div className={`${classes.layout} theme-${theme}`}>
        <NavBar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
