import { useOffer } from '../../contexts/offerContext';
import OfferList from '../OfferList/OfferList';
import classes from './Dashboard.module.scss';

const Dashboard = () => {
  const { offers } = useOffer();
  return (
    <div className={classes.dashboard}>
      <OfferList offers={offers} />
    </div>
  );
};

export default Dashboard;
