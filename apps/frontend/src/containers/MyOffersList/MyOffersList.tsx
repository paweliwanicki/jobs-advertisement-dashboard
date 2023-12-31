import OfferList from "../OfferList/OfferList";
import { useOffer } from "../../providers/OfferProvider";
import { useEffect } from "react";

const MyOffersList = () => {
  const { myOffers, fetchMyOffers } = useOffer();

  useEffect(() => {
    fetchMyOffers();
  }, []);

  return <OfferList offers={myOffers} view="MY" />;
};

export default MyOffersList;
