import OfferList from "../OfferList/OfferList";
import { useOffer } from "../../providers/OfferProvider";
import { useEffect } from "react";

const ArchivedMyOffersList = () => {
  const { offers, fetchMyArchivedOffers } = useOffer();

  useEffect(() => {
    fetchMyArchivedOffers();
  }, []);

  return <OfferList offers={offers} view="MY_ARCHIVE" />;
};

export default ArchivedMyOffersList;
