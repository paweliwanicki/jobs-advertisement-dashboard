import { useCallback, useEffect, useState } from "react";
import classes from "./OfferList.module.scss";
import { useApi } from "../../hooks/useApi";
import { HttpMethod } from "../../enums/HttpMethods";
import OfferCard, {
  OfferCardProps,
} from "../../components/OfferCard/OfferCard";
import { LoadingSpinner } from "../../components/common/LoadingSpinner/LoadingSpinner";

type OfferListProps = {};

const OfferList = () => {
  const { fetch, isFetching } = useApi();
  const [offers, setOffers] = useState<OfferCardProps[]>([]);

  const fetchOffers = useCallback(async () => {
    const [fetchedOffers] = await fetch<OfferCardProps[]>(HttpMethod.GET, {
      path: "/api/offers",
    });
    if (fetchedOffers) {
      setOffers(fetchedOffers);
    }
  }, []);

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div className={classes.offerList}>
      {isFetching && <LoadingSpinner />}
      {offers.map(
        ({ id, company, title, country, workTime }: OfferCardProps) => (
          <OfferCard
            key={`offer-${id}`}
            id={id}
            title={title}
            company={company}
            country={country}
            workTime={workTime}
          />
        )
      )}
    </div>
  );
};

export default OfferList;
