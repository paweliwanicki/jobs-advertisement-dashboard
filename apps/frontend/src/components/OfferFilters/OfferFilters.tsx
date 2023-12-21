import {
  ChangeEvent,
  FormEvent,
  useCallback,
} from "react";
import Button from "../common/Button/Button";
import Checkbox from "../common/Checkbox/Checkbox";
import Input from "../common/Input/Input";
import classes from "./OfferFilters.module.scss";
import SvgIcon from "../common/SvgIcon/SvgIcon";
import CustomReactSelect from "../common/CustomReactSelect/CustomReactSelect";
import { useDictionaries } from "../../contexts/dictionaryContext";
import GoogleLocationSelect from "../common/GoogleLocationSelect/GoogleLocationSelect";
import { useFilters } from "../../hooks/useFilters";
import { useOffer } from "../../contexts/offerContext";

const OfferFilters = ({}) => {
  const {
    handleSetPosition,
    handleSetLocation,
    handleSetCompany,
    handleSetContract,
    handleSetShowArchived,
    getFiltersValues,
    handleClearFiltersValues,
  } = useFilters();

  const { fetchOffers } = useOffer();

  const { position, location, company, contract, showArchived } =
    getFiltersValues();

  const { companySelectOptions, contractSelectOptions } = useDictionaries();

  const handleFilterFormOnSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const filtersValues = getFiltersValues();
      fetchOffers(filtersValues);
    },
    []
  );

  const handlePositionOnChange = useCallback(
    (position: string) => {
      handleSetPosition(position);
    },
    [position]
  );

  const handleShowArchivedOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      handleSetShowArchived(event.target.checked);
    },
    [showArchived]
  );

  return (
    <div className={classes.offerFilters}>
      <form onSubmit={handleFilterFormOnSubmit}>
        <div className={classes.filtersBox}>
          <Input
            id="position"
            onChange={handlePositionOnChange}
            classNames={classes.inputFilterBox}
            size="medium"
            placeholder="Filter by position..."
            icon={<SvgIcon id="icon-search" />}
            value={position}
          />

          <GoogleLocationSelect
            id="location-filter"
            icon={<SvgIcon id="icon-location" color="#5964e0" />}
            onChange={handleSetLocation}
            value={location}
          />

          <CustomReactSelect
            icon={<SvgIcon id="icon-company" color="#5964e0" />}
            id="company-filter"
            onChange={handleSetCompany}
            placeholder="company..."
            options={companySelectOptions}
            value={company}
            isClearable
          />

          <CustomReactSelect
            icon={<SvgIcon id="icon-contract" color="#5964e0" />}
            id="contract-filter"
            onChange={handleSetContract}
            placeholder="contract..."
            options={contractSelectOptions}
            value={contract}
            isClearable
          />
        </div>

        <div className={classes.filtersControls}>
          <label className={classes.showArchivedCheckbox}>
            <Checkbox
              onChange={handleShowArchivedOnChange}
              isChecked={showArchived}
              id="checkbox-show-archived"
              size="medium"
            />
            Show archived offers
          </label>

          <div className={classes.buttonsBox}>
            <Button
              variant="secondary"
              type="button"
              onClick={handleClearFiltersValues}
            >
              Clear
            </Button>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OfferFilters;
