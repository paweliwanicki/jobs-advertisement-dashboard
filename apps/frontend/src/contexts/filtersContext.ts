import { createContext } from "react";
import {
  OffersFiltersState,
  OffersFiltersValues,
} from "../providers/FiltersProvider";
import { PaginationValues } from "../hooks/usePagination";

export type FiltersValuesType = OffersFiltersValues & PaginationValues;

type FiltersContextType = {
  getFiltersValues: () => OffersFiltersValues;
  getFiltersStates: () => OffersFiltersState;
  handleSetTitle: (title: string) => void;
  handleSetLocation: (location: any) => void;
  handleSetCompany: (company: any) => void;
  handleSetContract: (contract: any) => void;
  handleClearFilters: () => void;
};

export const FiltersContext = createContext<FiltersContextType>({
  getFiltersValues: () => ({
    location: undefined,
  }),
  getFiltersStates: () => ({
    location: null,
    company: null,
    contract: null,
  }),
  handleSetTitle: () => undefined,
  handleSetLocation: () => undefined,
  handleSetCompany: () => undefined,
  handleSetContract: () => undefined,
  handleClearFilters: () => undefined,
});
