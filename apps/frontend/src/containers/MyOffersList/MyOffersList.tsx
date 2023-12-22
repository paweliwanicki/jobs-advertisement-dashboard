import OfferList from "../OfferList/OfferList";
import classes from "./MyOffersList.module.scss";
import { useOffer } from "../../providers/OfferProvider";

const MyOffersList = () => {
  const { myOffers, filteredMyOffers, getMyOffers } = useOffer();

  return (
    <div className={classes.myOffersList}>
      <OfferList
        onFilterSubmit={getMyOffers}
        offers={filteredMyOffers ? filteredMyOffers : myOffers}
        showControls
      />
    </div>
  );
};

export default MyOffersList;
