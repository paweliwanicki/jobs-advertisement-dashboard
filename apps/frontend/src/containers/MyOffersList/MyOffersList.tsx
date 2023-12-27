import OfferList from "../OfferList/OfferList";
import { useOffer } from "../../providers/OfferProvider";
import { useEffect } from "react";

const MyOffersList = () => {
  const { myOffers, filteredMyOffers, getMyOffers } = useOffer();

  useEffect(() => {
    getMyOffers();
  }, []);

  return (
    <div>
      <OfferList
        offers={filteredMyOffers ? filteredMyOffers : myOffers}
        view="MY"
        showControls
      />
    </div>
  );
};

export default MyOffersList;
