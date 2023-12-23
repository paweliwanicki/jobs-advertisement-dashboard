import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import Button from "../common/Button/Button";
import Checkbox from "../common/Checkbox/Checkbox";
import Input from "../common/Input/Input";
import classes from "./OfferFilters.module.scss";
import SvgIcon from "../common/SvgIcon/SvgIcon";
import CustomReactSelect from "../common/CustomReactSelect/CustomReactSelect";
import { useDictionaries } from "../../providers/DictionaryProvider";
import GoogleLocationSelect from "../common/GoogleLocationSelect/GoogleLocationSelect";
import { OffersFiltersValues, useFilters } from "../../hooks/useFilters";
import { useCollapse } from "react-collapsed";

type OfferFiltersProps = {
  onSubmit: (filters: OffersFiltersValues) => void;
};

const OfferFilters = ({ onSubmit }: OfferFiltersProps) => {
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const { getCollapseProps, getToggleProps } = useCollapse();
  const { companySelectOptions, contractSelectOptions } = useDictionaries();

  const {
    handleSetTitle,
    handleSetLocation,
    handleSetCompany,
    handleSetContract,
    handleSetShowArchived,
    getFiltersStates,
    getFiltersValues,
    handleClearFilters,
  } = useFilters();

  const { title, location, company, contract, archived } = getFiltersStates();

  const handleFilterFormOnSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const filtersValues = getFiltersValues();
      onSubmit(filtersValues);
    },
    [getFiltersValues, onSubmit]
  );

  const handleTitleOnChange = useCallback(
    (title: string) => {
      handleSetTitle(title);
    },
    [title]
  );

  const handleShowArchivedOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      handleSetShowArchived(event.target.checked);
    },
    [archived]
  );

  const handleSetFiltersExpanded = useCallback(() => {
    setExpanded((isExpanded) => !isExpanded);
  }, []);

  return (
    <div className={classes.offerFilters}>
      <form onSubmit={handleFilterFormOnSubmit} {...getCollapseProps()}>
        <div className={classes.filtersBox}>
          <Input
            id="title"
            onChange={handleTitleOnChange}
            classNames={classes.inputFilterBox}
            size="medium"
            placeholder="Filter by title..."
            icon={<SvgIcon id="icon-search" />}
            value={title}
          />

          <GoogleLocationSelect
            id="location-filter"
            instanceId="location"
            onChange={handleSetLocation}
            value={location}
          />

          <CustomReactSelect
            icon={<SvgIcon id="icon-company" color="#5964e0" />}
            id="company-filter"
            instanceId="company"
            onChange={handleSetCompany}
            placeholder="company..."
            options={companySelectOptions}
            value={company}
            isClearable
          />

          <CustomReactSelect
            icon={<SvgIcon id="icon-contract" color="#5964e0" />}
            id="contract-filter"
            instanceId="contract"
            onChange={handleSetContract}
            placeholder="contract..."
            options={contractSelectOptions}
            value={contract}
            isClearable
          />
        </div>

        <div className={classes.filtersControls}>
          <label className={classes.archivedCheckbox}>
            <Checkbox
              onChange={handleShowArchivedOnChange}
              isChecked={archived}
              id="checkbox-show-archived"
              size="medium"
            />
            Show archived offers
          </label>

          <div className={classes.buttonsBox}>
            <Button
              variant="secondary"
              type="button"
              onClick={handleClearFilters}
            >
              Clear
            </Button>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </div>
        </div>
      </form>
      <button
        className={classes.btnExpandFilters}
        {...getToggleProps({
          onClick: handleSetFiltersExpanded,
        })}
      >
        {isExpanded ? "Hide fllters" : "Show filters"}
        <SvgIcon id={isExpanded ? "arrow-drop-up" : "arrow-drop-down"} />
      </button>
    </div>
  );
};

export default OfferFilters;
