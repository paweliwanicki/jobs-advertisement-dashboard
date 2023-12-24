import { useCallback, useState } from "react";
import { usePagination } from "../../../hooks/usePagination";
import classes from "./Pagination.module.scss";
import CustomReactSelect from "../CustomReactSelect/CustomReactSelect";
import { SingleValue } from "react-select";
import { Option } from "react-google-places-autocomplete/build/types";
import SvgIcon from "../SvgIcon/SvgIcon";

export const ITEMS_PER_PAGE_OPTIONS = [
  { label: "12", value: 12 },
  { label: "24", value: 24 },
  { label: "48", value: 48 },
  { label: "96", value: 96 },
] as const;

type PaginationProps = {
  totalItems: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ totalItems, onPageChange }: PaginationProps) => {
  const { activePage, totalPages, handleSetPage, handleSetItemsPerPage } =
    usePagination({
      totalItems,
      onPageChange,
    });

  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState<
    SingleValue<Option>
  >(ITEMS_PER_PAGE_OPTIONS[0]);

  const handleChangePage = useCallback(
    (page: number) => {
      handleSetPage(page);
    },
    [handleSetPage]
  );

  const handleChangeItemsPerPage = useCallback((option: any) => {
    setSelectedItemsPerPage(option);
    handleSetItemsPerPage(option?.value);
  }, []);

  const renderPagesList = useCallback(() => {
    const separator = "...";

    let allPages: number[] = [...Array(totalPages).keys()].map((i) => i + 1);
    let pages: number[] = [...allPages];

    if (totalPages > 6) {
      const indexOfActivePage = allPages.indexOf(activePage);
      if (activePage >= totalPages - 5) {
        pages = allPages.slice(-6);
      } else {
        const firstThreePages = allPages.slice(
          indexOfActivePage,
          indexOfActivePage + 3
        );
        const lastThreePages = allPages.slice(-3);
        pages = [...firstThreePages, 0, ...lastThreePages];
      }
    }

    const pagesList = pages.map((pageNumber: number) => {
      if (!pageNumber) {
        return separator;
      }
      return (
        <button
          key={`page-${pageNumber}`}
          onClick={() => handleChangePage(pageNumber)}
          className={activePage === pageNumber ? classes.active : ""}
        >
          {pageNumber}
        </button>
      );
    });
    return pagesList;
  }, [activePage, totalPages]);

  return totalPages ? (
    <div className={classes.pagination}>
      <div className={classes.perPageSelectBox}>
        <CustomReactSelect
          value={selectedItemsPerPage}
          id="items-per-page-select"
          instanceId="items-per-page"
          size="small"
          options={ITEMS_PER_PAGE_OPTIONS}
          onChange={handleChangeItemsPerPage}
          isClearable={false}
          isSearchable={false}
        />
        Items per page
      </div>
      <div className={classes.pagesList}>
        <SvgIcon
          id="double-left-arrow"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          onClick={() => handleChangePage(1)}
        />
        <SvgIcon
          id="left-arrow"
          width={16}
          height={16}
          viewBox="0 0 20 20"
          onClick={() => handleChangePage(activePage - 1)}
        />
        {renderPagesList()}
        <SvgIcon
          id="right-arrow"
          width={16}
          height={16}
          viewBox="0 0 20 20"
          onClick={() => handleChangePage(activePage + 1)}
        />
        <SvgIcon
          id="double-right-arrow"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          onClick={() => handleChangePage(totalPages)}
        />
      </div>
    </div>
  ) : null;
};

export default Pagination;
