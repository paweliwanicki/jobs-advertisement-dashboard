import { ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { useOffer } from "./OfferProvider";
import { FiltersContext } from "../contexts/filtersContext";

export type OffersFiltersState = {
  title?: string;
  location: any | null;
  company: any | null;
  contract: any | null;
  archived: boolean;
};

export type OffersFiltersValues = {
  title?: string;
  location?: string;
  archived: boolean;
  company?: {
    id: number;
  };
  contract?: { id: number };
};

type FiltersProviderProps = {
  children: ReactNode;
};

const FiltersProvider = ({ children }: FiltersProviderProps) => {
  const { clearFilteredOffers } = useOffer();

  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<any | null>();
  const [company, setCompany] = useState<any | null>();
  const [contract, setContract] = useState<any | null>();
  const [archived, setShowArchived] = useState<boolean>(false);

  const handleSetShowArchived = useCallback(() => {
    setShowArchived((isChecked) => !isChecked);
  }, []);

  const handleSetTitle = useCallback((title: string) => {
    setTitle(title);
  }, []);

  const handleSetLocation = useCallback((location: string) => {
    setLocation(location);
  }, []);

  const handleSetCompany = useCallback((company: any) => {
    setCompany(company);
  }, []);

  const handleSetContract = useCallback((contract: any) => {
    setContract(contract);
  }, []);

  const handleClearFilters = useCallback(() => {
    setTitle("");
    setLocation(null);
    setCompany(null);
    setContract(null);
    setShowArchived(false);
    clearFilteredOffers();
  }, [clearFilteredOffers]);

  const getFiltersValues = useCallback(() => {
    const values: OffersFiltersValues = {
      archived,
      title: title === "" ? undefined : title,
      location: location?.value.description,
    };
    if (company) {
      values.company = { id: company?.value };
    }

    if (contract) {
      values.contract = { id: contract?.value };
    }

    return values;
  }, [title, location, company, contract, archived]);

  const getFiltersStates = useCallback(() => {
    return {
      title,
      location,
      company,
      contract,
      archived,
    };
  }, [title, location, company, contract, archived]);

  const value = useMemo(
    () => ({
      getFiltersValues,
      getFiltersStates,
      handleSetTitle,
      handleSetLocation,
      handleSetCompany,
      handleSetContract,
      handleSetShowArchived,
      handleClearFilters,
    }),
    [
      getFiltersValues,
      getFiltersStates,
      handleSetTitle,
      handleSetLocation,
      handleSetCompany,
      handleSetContract,
      handleSetShowArchived,
      handleClearFilters,
    ]
  );

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

export default FiltersProvider;

export const useFilters = () => useContext(FiltersContext);
