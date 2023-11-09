import { createContext } from 'react';
import { Company } from '../types/Company';
import { Option } from 'react-google-places-autocomplete/build/types';
import { Contract } from '../types/Contract';

type DictionaryContextType = {
  companies: Company[];
  companySelectOptions: Option[];
  contracts: Contract[];
  contractSelectOptions: Option[];
  createCompany: (contract: Company) => Promise<Company> | undefined;
  createContract: (contract: Contract) => Promise<Contract> | undefined;
};

export const DictionaryContext = createContext<DictionaryContextType>({
  companies: [],
  companySelectOptions: [],
  contracts: [],
  contractSelectOptions: [],
  createCompany: () => undefined,
  createContract: () => undefined,
});
