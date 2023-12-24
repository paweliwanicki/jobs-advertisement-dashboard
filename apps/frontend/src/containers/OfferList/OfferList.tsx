import classes from "./OfferList.module.scss";
import Button from "../../components/common/Button/Button";
import { useApi } from "../../hooks/useApi";
import { HttpMethod } from "../../enums/HttpMethods";
import OfferCard, {
  OfferCardProps,
} from "../../components/OfferCard/OfferCard";
import { LoadingSpinner } from "../../components/common/LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";
import { useCallback, useMemo } from "react";
import SvgIcon from "../../components/common/SvgIcon/SvgIcon";
import { useOffer } from "../../providers/OfferProvider";
import { Offer } from "../../types/Offer";
import OfferFilters from "../../components/OfferFilters/OfferFilters";
import { useUser } from "../../providers/UserProvider";
import Pagination from "../../components/common/Pagination/Pagination";

type OfferListProps = {
  offers: Offer[];
  classNames?: string;
  showControls?: boolean;
  onFilterSubmit: () => void;
};

const OfferList = ({
  offers,
  classNames = "",
  showControls = false,
  onFilterSubmit,
}: OfferListProps) => {
  const { fetch, isFetching } = useApi();
  const { user } = useUser();
  const { fetchOffers } = useOffer();

  const handleImportOffers = useCallback(async () => {
    const [offers] = await fetch<any[]>(HttpMethod.GET, {
      path: "/offers.json",
    });
    const [, response] = await fetch<OfferCardProps[]>(HttpMethod.POST, {
      path: "/api/offers/import",
      payload: JSON.stringify(offers),
    });

    if (response.statusCode === 201) {
      fetchOffers();
    }
  }, []);

  const handleChangePage = useCallback((page: number) => {
    const filters = {
      page,
    };
    console.log(filters);
    //fetchOffers(filters)
  }, []);

  const controlsBox = useMemo(() => {
    return (
      showControls &&
      user && (
        <div className={classes.controlsBox}>
          {user.isAdmin && (
            <Button
              variant="secondary"
              onClick={handleImportOffers}
              title="This button trigger import json file from /public folder. The file must be in the specified format otherwise it will throw an error."
            >
              Import offers
            </Button>
          )}
          <Link to="/offer/edit">
            <Button variant="primary">Add offer</Button>
          </Link>
        </div>
      )
    );
  }, [user]);

  return (
    <div className={classes.offerList}>
      <OfferFilters onSubmit={onFilterSubmit} />
      {isFetching && <LoadingSpinner message="Fetching offer list" />}
      {controlsBox}
      <div className={`${classes.list} ${classNames}`}>
        {offers.length ? (
          offers.map(
            ({ id, company, title, location, contract, createdAt }: Offer) => (
              <OfferCard
                key={`offer-${id}`}
                id={id}
                title={title}
                company={company}
                location={location}
                contract={contract}
                createdAt={createdAt ?? 0}
                showMenu={showControls}
              />
            )
          )
        ) : (
          <div className={classes.noOffersWarningBox}>
            <SvgIcon id="icon-error" color="black" width={64} height={64} />
            <h3>No jobs offers has been found!</h3>
          </div>
        )}
      </div>
      <Pagination onPageChange={handleChangePage} 
      //totalItems={offers.length} 
      totalItems={100} 
      />
    </div>
  );
};

export default OfferList;
