import { useCallback, useEffect, useState } from "react";
import classes from "./OfferList.module.scss";
import { useApi } from "../../hooks/useApi";
import { HttpMethod } from "../../enums/HttpMethods";
import OfferCard, {
  OfferCardProps,
} from "../../components/OfferCard/OfferCard";
import { LoadingSpinner } from "../../components/common/LoadingSpinner/LoadingSpinner";
import { useUser } from "../../hooks/useUser";
import Button from "../../components/common/Button/Button";
import { Link } from "react-router-dom";

type OfferListProps = {};

const OfferList = () => {
  const { fetch, isFetching } = useApi();
  const [offers, setOffers] = useState<OfferCardProps[]>([]);
  const { user } = useUser();

  const fetchOffers = useCallback(async () => {
    const [fetchedOffers] = await fetch<OfferCardProps[]>(HttpMethod.GET, {
      path: "/api/offers",
    });
    if (fetchedOffers.length) {
      setOffers(fetchedOffers);
    }
  }, []);

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div className={classes.offerList}>
      {isFetching && <LoadingSpinner />}
      {user && (
        <div className={classes.controlsBox}>
          <Link to="/offer/edit">
            <Button variant="primary">Add offer</Button>
          </Link>
        </div>
      )}

      <div className={classes.list}>
        {offers.map(
          ({
            id,
            company,
            title,
            location,
            workTime,
            createdAt,
          }: OfferCardProps) => (
            <OfferCard
              key={`offer-${id}`}
              id={id}
              title={title}
              company={company}
              location={location}
              workTime={workTime}
              createdAt={createdAt}
            />
          )
        )}
      </div>
    </div>
  );
};

export default OfferList;
