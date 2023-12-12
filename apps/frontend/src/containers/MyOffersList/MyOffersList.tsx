import OfferList from '../OfferList/OfferList';
import classes from './MyOffersList.module.scss';
import { useOffer } from '../../contexts/offerContext';

const MyOffersList = () => {
  const { myOffers } = useOffer();

  return (
    <div className={classes.myOffersList}>
      <OfferList offers={myOffers} showControls />
    </div>
  );
};

export default MyOffersList;
