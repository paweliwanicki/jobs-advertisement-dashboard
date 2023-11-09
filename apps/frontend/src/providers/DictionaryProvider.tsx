import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { HttpMethod } from '../enums/HttpMethods';
import { useApi } from '../hooks/useApi';
import { Company } from '../types/Company';
import { Option } from 'react-google-places-autocomplete/build/types';
import { Contract } from '../types/Contract';
import { DictionaryContext } from '../contexts/dictionaryContext';

type DictionaryProviderProps = {
  children: ReactNode;
};

type SelectOptionsData = Company[] | Contract[];

const generateSelectOptions = (
  data: SelectOptionsData,
  valueKey = 'id',
  labelKey = 'name'
) => {
  return data.map((obj: any) => {
    return {
      value: obj[valueKey],
      label: obj[labelKey],
    };
  });
};

export const uploadCompanyLogo = async (file: Blob, companyId: number) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('companyId', companyId.toString());
  const response = await fetch('/api/offers/uploadCompanyLogo', {
    method: HttpMethod.POST,
    body: formData,
  });
  return response;
};

const DictionaryProvider = ({ children }: DictionaryProviderProps) => {
  const { fetch } = useApi();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [companySelectOptions, setCompanySelectOptions] = useState<Option[]>(
    []
  );

  const [contracts, setContracts] = useState<Contract[]>([]);
  const [contractSelectOptions, setContractSelectOptions] = useState<Option[]>(
    []
  );

  const getCompanies = useCallback(async () => {
    const [allCompanies, response] = await fetch<Company[]>(HttpMethod.GET, {
      path: '/api/dict/company/',
    });

    console.log(response);
    if (response.statusCode === 200) {
      setCompanies(allCompanies);
      setCompanySelectOptions(generateSelectOptions(allCompanies));
    }
  }, []);

  const createCompany = useCallback(async (company: Company) => {
    const [newCompany, response] = await fetch<Company>(HttpMethod.POST, {
      path: '/api/dict/company/',
      payload: JSON.stringify(company),
    });
    console.log(response);
    if (response.statusCode === 201) {
      await getCompanies();
    }
    return newCompany;
  }, []);

  const getContracts = useCallback(async () => {
    const [allContracts, response] = await fetch<Contract[]>(HttpMethod.GET, {
      path: '/api/dict/contract/',
    });
    if (response.statusCode === 200) {
      console.log(allContracts);
      setContracts(allContracts);
      setContractSelectOptions(generateSelectOptions(allContracts));
    }
  }, []);

  const createContract = useCallback(async (contract: Contract) => {
    const [newContract, response] = await fetch<Contract>(HttpMethod.POST, {
      path: '/api/dict/contract/',
      payload: JSON.stringify(contract),
    });
    if (response.statusCode === 201) {
      await getContracts();
    }
    return newContract;
  }, []);

  useEffect(() => {
    getCompanies();
    getContracts();
  }, []);

  const value = useMemo(
    () => ({
      companies,
      companySelectOptions,
      contracts,
      contractSelectOptions,
      createCompany,
      createContract,
    }),
    [
      companies,
      companySelectOptions,
      contracts,
      contractSelectOptions,
      createCompany,
      createContract,
    ]
  );

  return (
    <DictionaryContext.Provider value={value}>
      {children}
    </DictionaryContext.Provider>
  );
};

export default DictionaryProvider;
