import { useOffer } from '../../providers/OfferProvider';
import OfferList from '../OfferList/OfferList';
import classes from './Dashboard.module.scss';

const Dashboard = () => {
  const { offers, countOffers } = useOffer();

  return (
    <div className={classes.dashboard}>
      <OfferList
        classNames={`${classes.mainOfferList} ${
          !countOffers ? classes.empty : ''
        }`}
        offers={offers}
      />
    </div>
  );
};

export default Dashboard;
