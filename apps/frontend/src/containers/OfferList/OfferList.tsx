import classes from './OfferList.module.scss';
import Button from '../../components/common/Button/Button';
import { useApi } from '../../hooks/useApi';
import { HttpMethod } from '../../enums/HttpMethods';
import OfferCard, {
  OfferCardProps,
} from '../../components/OfferCard/OfferCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner/LoadingSpinner';
import { useUser } from '../../hooks/useUser';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

const OfferList = () => {
  const { fetch, isFetching } = useApi();
  const [offers, setOffers] = useState<OfferCardProps[]>([]);
  const { user } = useUser();

  const fetchOffers = useCallback(async () => {
    const [fetchedOffers] = await fetch<OfferCardProps[]>(HttpMethod.GET, {
      path: '/api/offers',
    });
    if (fetchedOffers.length) {
      setOffers(fetchedOffers);
    }
  }, []);

  const handleImportOffers = useCallback(async () => {
    const [offers] = await fetch<any[]>(HttpMethod.GET, {
      path: '/offers.json',
    });
    const [response] = await fetch<OfferCardProps[]>(HttpMethod.POST, {
      path: '/api/offers/import',
      payload: JSON.stringify(offers),
    });
    if (response.length) {
      fetchOffers();
    }
  }, []);

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div className={classes.offerList}>
      {isFetching && <LoadingSpinner />}
      <div className={classes.controlsBox}>
        {user?.isAdmin && (
          <Button
            variant="secondary"
            onClick={handleImportOffers}
            title="This button trigger import json file from /public folder. The file must be in the specified format otherwise it will throw an error."
          >
            Import offers
          </Button>
        )}
        {user && (
          <Link to="/offer/edit">
            <Button variant="primary">Add offer</Button>
          </Link>
        )}
      </div>

      <div className={classes.list}>
        {offers.map(
          ({
            id,
            company,
            title,
            location,
            contract,
            createdAt,
          }: OfferCardProps) => (
            <OfferCard
              key={`offer-${id}`}
              id={id}
              title={title}
              company={company}
              location={location}
              contract={contract}
              createdAt={createdAt}
            />
          )
        )}
      </div>
    </div>
  );
};

export default OfferList;
