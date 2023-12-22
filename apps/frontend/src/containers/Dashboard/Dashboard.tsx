import { useOffer } from "../../providers/OfferProvider";
import OfferList from "../OfferList/OfferList";
import classes from "./Dashboard.module.scss";

const Dashboard = () => {
  const { offers, filteredOffers, fetchOffers } = useOffer();

  return (
    <div className={classes.dashboard}>
      <OfferList
        classNames={classes.mainOfferList}
        offers={filteredOffers ? filteredOffers : offers}
        onFilterSubmit={fetchOffers}
      />
    </div>
  );
};

export default Dashboard;
