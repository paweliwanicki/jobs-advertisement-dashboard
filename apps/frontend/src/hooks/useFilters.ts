import { useCallback, useState } from "react";
import { useOffer } from "../providers/OfferProvider";

export type OffersFiltersState = {
  title?: string;
  location: any | null;
  company: any | null;
  contract: any | null;
  archived: boolean;
};

export type OffersFiltersValues = {
  title?: string;
  location: string;
  archived: boolean;
  company?: {
    id: number;
  };
  contract?: { id: number };
};

type FiltersType = {
  getFiltersValues: () => OffersFiltersValues;
  getFiltersStates: () => OffersFiltersState;
  handleSetTitle: (title: string) => void;
  handleSetLocation: (location: any) => void;
  handleSetCompany: (company: any) => void;
  handleSetContract: (contract: any) => void;
  handleSetShowArchived: (archived: boolean) => void;
  handleClearFilters: () => void;
};

export const useFilters = (): FiltersType => {
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
  }, [title, location, company, contract, archived, clearFilteredOffers]);

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

  return {
    getFiltersValues,
    getFiltersStates,
    handleSetTitle,
    handleSetLocation,
    handleSetCompany,
    handleSetContract,
    handleSetShowArchived,
    handleClearFilters,
  };
};
