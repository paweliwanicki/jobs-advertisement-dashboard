import { useEffect } from "react";
import { useOffer } from "../../providers/OfferProvider";
import OfferList from "../OfferList/OfferList";
import classes from "./Dashboard.module.scss";

const Dashboard = () => {
  const { offers, fetchOffers } = useOffer();

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div className={classes.dashboard}>
      <OfferList offers={offers} />
    </div>
  );
};

export default Dashboard;
