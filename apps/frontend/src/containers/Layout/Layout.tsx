import NavBar from '../../components/NavBar/NavBar';
import classes from './Layout.module.scss';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={classes.layout}>
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
