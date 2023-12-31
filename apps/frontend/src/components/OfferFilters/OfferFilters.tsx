import { FormEvent, useCallback, useState, useEffect } from "react";
import Button from "../common/Button/Button";
import Input from "../common/Input/Input";
import classes from "./OfferFilters.module.scss";
import SvgIcon from "../common/SvgIcon/SvgIcon";
import CustomReactSelect from "../common/CustomReactSelect/CustomReactSelect";
import { useDictionaries } from "../../providers/DictionaryProvider";
import GoogleLocationSelect from "../common/GoogleLocationSelect/GoogleLocationSelect";
import { useCollapse } from "react-collapsed";
import { useFilters } from "../../providers/FiltersProvider";
import { useTheme } from "../../providers/ThemeProvider";
import { FiltersValuesType } from "../../contexts/filtersContext";

type OfferFiltersProps = {
  activePage: number;
  itemsPerPage: number;
  onSubmit: (filters: FiltersValuesType) => void;
};

const OfferFilters = ({
  activePage,
  itemsPerPage,
  onSubmit,
}: OfferFiltersProps) => {
  const { theme } = useTheme();
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const { getCollapseProps, getToggleProps } = useCollapse();
  const { companySelectOptions, contractSelectOptions } = useDictionaries();

  const {
    handleSetTitle,
    handleSetLocation,
    handleSetCompany,
    handleSetContract,
    getFiltersStates,
    getFiltersValues,
    handleClearFilters,
  } = useFilters();

  const { title, location, company, contract } = getFiltersStates();

  const handleFilterFormOnSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const filtersValues = getFiltersValues();
      const pagination = {
        activePage: 1,
        itemsPerPage,
      };

      onSubmit({ ...filtersValues, ...pagination });
    },
    [activePage, itemsPerPage, getFiltersValues, onSubmit]
  );

  const handleTitleOnChange = useCallback(
    (title: string) => {
      handleSetTitle(title);
    },
    [title]
  );

  const handleSetFiltersExpanded = useCallback(() => {
    setExpanded((isExpanded) => !isExpanded);
  }, []);

  useEffect(() => {
    handleClearFilters();
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
        <SvgIcon
          id={isExpanded ? "arrow-drop-up" : "arrow-drop-down"}
          color={theme === "dark" ? "white" : "#121721"}
        />
      </button>
    </div>
  );
};

export default OfferFilters;
