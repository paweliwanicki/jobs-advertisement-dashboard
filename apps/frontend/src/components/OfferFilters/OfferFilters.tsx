import { useCallback, useRef, useState } from 'react';
import Button from '../common/Button/Button';
import Checkbox from '../common/Checkbox/Checkbox';
import Input from '../common/Input/Input';
import classes from './OfferFilters.module.scss';
import SvgIcon from '../common/SvgIcon/SvgIcon';

const OfferFilters = ({}) => {
  //const {} = useFilters();

  const positionInputRef = useRef(null);
  const locationSelectRef = useRef();
  const companySelectRef = useRef();
  const contractSelectRef = useRef();

  const [position, setPosition] = useState<string>();
  const [location, setLocation] = useState<unknown>();
  const [company, setCompany] = useState<number>();
  const [contract, setContract] = useState<number>();
  const [showArchived, setShowArchived] = useState<boolean>(false);

  const handleFilter = useCallback(() => {}, []);
  const handlePositionOnChange = useCallback(() => {}, []);
  const handleLocationOnChange = useCallback(() => {}, []);
  const handleCompanyOnChange = useCallback(() => {}, []);
  const handleContractOnChange = useCallback(() => {}, []);
  const handleShowArchivedOnChange = useCallback(() => {
    setShowArchived((isChecked) => !isChecked);
  }, []);

  return (
    <div className={classes.offerFilters}>
      <form onSubmit={handleFilter}>
        <div className={classes.filtersBox}>
          <Input
            id="position"
            onChange={handlePositionOnChange}
            classNames={classes.inputFilterBox}
            size="medium"
            placeholder="Filter by position..."
            icon={<SvgIcon id="icon-search" />}
            inputRef={positionInputRef}
            // value={title}
          />
          <Input
            id="location"
            onChange={handleLocationOnChange}
            size="medium"
            classNames={classes.inputFilterBox}
            placeholder="location..."
            icon={<SvgIcon id="icon-location" />}

            // value={title}
          />
          <Input
            id="company"
            onChange={handleLocationOnChange}
            size="medium"
            classNames={classes.inputFilterBox}
            placeholder="company..."
            icon={<SvgIcon id="icon-company" color="#5964e0" />}
            // value={title}
          />
          <Input
            id="contract"
            onChange={handleLocationOnChange}
            size="medium"
            classNames={classes.inputFilterBox}
            placeholder="contract..."
            icon={<SvgIcon id="icon-contract" color="#5964e0" />}
            // value={title}
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
            <Button variant="secondary" type="button">
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
