import { useCallback, useMemo } from "react";
import { HttpMethod } from "../../enums/HttpMethods";
import { Link } from "react-router-dom";
import classes from "./OfferList.module.scss";
import Button from "../../components/common/Button/Button";
import SvgIcon from "../../components/common/SvgIcon/SvgIcon";
import OfferCard, {
  OfferCardProps,
} from "../../components/OfferCard/OfferCard";
import { LoadingSpinner } from "../../components/common/LoadingSpinner/LoadingSpinner";
import OfferFilters from "../../components/OfferFilters/OfferFilters";
import Pagination from "../../components/common/Pagination/Pagination";
import { useUser } from "../../providers/UserProvider";
import { useOffer } from "../../providers/OfferProvider";
import { useApi } from "../../hooks/useApi";
import { usePagination } from "../../hooks/usePagination";
import { FiltersValuesType } from "../../contexts/filtersContext";
import { Offer } from "../../types/Offer";

type OfferListProps = {
  offers: Offer[];
  classNames?: string;
  showControls?: boolean;
};

const OfferList = ({
  offers,
  classNames = "",
  showControls = false,
}: OfferListProps) => {
  const { fetch, isFetching } = useApi();
  const { user } = useUser();
  const { fetchOffers, countOffers } = useOffer();

  const {
    activePage,
    totalPages,
    itemsPerPage,
    handleSetPage,
    handleSetItemsPerPage,
  } = usePagination({ totalItems: countOffers });

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
  }, [fetchOffers]);

  const handleFilterList = useCallback(
    (filters: FiltersValuesType) => {
      fetchOffers(filters);
    },
    [fetchOffers]
  );

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
      <OfferFilters
        onSubmit={handleFilterList}
        totalItems={offers.length}
        activePage={activePage}
        itemsPerPage={itemsPerPage}
      />
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
      <Pagination
        onSubmit={handleFilterList}
        onSetPage={handleSetPage}
        onSetItemsPerPage={handleSetItemsPerPage}
        activePage={activePage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default OfferList;
