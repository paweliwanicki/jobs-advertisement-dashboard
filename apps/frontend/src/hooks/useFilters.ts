import { useCallback, useState } from "react";

export type OffersFilters = {
  position?: string;
  location: any | null;
  company: any | null;
  contract: any | null;
  showArchived: boolean;
};

type FiltersType = {
  getFiltersValues: () => OffersFilters;
  handleSetPosition: (position: string) => void;
  handleSetLocation: (location: any) => void;
  handleSetCompany: (company: any) => void;
  handleSetContract: (contract: any) => void;
  handleSetShowArchived: (archived: boolean) => void;
  handleClearFiltersValues: () => void;
};

export const useFilters = (): FiltersType => {
  const [position, setPosition] = useState<string>('');
  const [location, setLocation] = useState<any | null>();
  const [company, setCompany] = useState<any | null>();
  const [contract, setContract] = useState<any | null>();
  const [showArchived, setShowArchived] = useState<boolean>(false);

  const handleSetShowArchived = useCallback(() => {
    setShowArchived((isChecked) => !isChecked);
  }, []);

  const handleSetPosition = useCallback((position: string) => {
    setPosition(position);
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

  const handleClearFiltersValues = useCallback(() => {
    setPosition("");
    setLocation(null);
    setCompany(null);
    setContract(null);
    setShowArchived(false);
  }, [position, location, company, contract, showArchived]);

  const getFiltersValues = useCallback(() => {
    return {
      position,
      location,
      company,
      contract,
      showArchived,
    };
  }, [position, location, company, contract, showArchived]);

  return {
    getFiltersValues,
    handleSetPosition,
    handleSetLocation,
    handleSetCompany,
    handleSetContract,
    handleSetShowArchived,
    handleClearFiltersValues,
  };
};
