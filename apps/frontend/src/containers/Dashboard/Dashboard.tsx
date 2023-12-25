import { useOffer } from "../../providers/OfferProvider";
import OfferList from "../OfferList/OfferList";
import classes from "./Dashboard.module.scss";

const Dashboard = () => {
  const { offers, filteredOffers } = useOffer();

  return (
    <div className={classes.dashboard}>
      <OfferList
        classNames={classes.mainOfferList}
        offers={filteredOffers ? filteredOffers : offers}
      />
    </div>
  );
};

export default Dashboard;
