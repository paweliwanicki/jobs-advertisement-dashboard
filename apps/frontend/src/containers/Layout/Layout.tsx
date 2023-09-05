import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import { Theme } from '../../contexts/themeContext';
import classes from './Layout.module.scss';

type LayoutProps = {
  theme: Theme;
  children: React.ReactNode;
};

const Layout = ({ children, theme }: LayoutProps) => {
  return (
    <div className={`${classes.layout} theme-${theme}`}>
      <NavBar />
      <main>
        <Outlet />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
