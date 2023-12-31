import OfferList from "../OfferList/OfferList";
import { useOffer } from "../../providers/OfferProvider";
import { useEffect } from "react";

const ArchivedOffersList = () => {
  const { offers, fetchArchivedOffers } = useOffer();

  useEffect(() => {
    fetchArchivedOffers();
  }, []);

  return <OfferList offers={offers} view="ARCHIVE" />;
};

export default ArchivedOffersList;
