import { useState, useEffect, useCallback, useMemo } from 'react';
import { Company } from '../types/Company';
import { useApi } from './useApi';
import { HttpMethod } from '../enums/HttpMethods';
import { Option } from 'react-google-places-autocomplete/build/types';
import { Contract } from '../types/Contract';

type Dictionaries = {
  companies: Company[];
  companySelectOptions: Option[];
  createCompany: (company: Company) => Promise<Company>;
  createContract: (contract: Contract) => Promise<Contract>;
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

export const useDictionaries = (): Dictionaries => {
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
    if (response.statusCode !== 404 && response.statusCode !== 401) {
      setCompanies(allCompanies);
      setCompanySelectOptions(generateSelectOptions(allCompanies));
    }
  }, []);

  const createCompany = useCallback(async (company: Company) => {
    const [newCompany, response] = await fetch<Company>(HttpMethod.POST, {
      path: '/api/dict/company/',
      payload: JSON.stringify(company),
    });
    if (response.statusCode !== 404 && response.statusCode !== 401) {
      await getCompanies();
    }
    return newCompany;
  }, []);

  const getContracts = useCallback(async () => {
    const [allContracts, response] = await fetch<Contract[]>(HttpMethod.GET, {
      path: '/api/dict/contract/',
    });
    if (response.statusCode !== 404 && response.statusCode !== 401) {
      console.log(allContracts);
      setContracts(allContracts);
      setContractSelectOptions(generateSelectOptions(allContracts));
    }
  }, []);

  const createContract = useCallback(async (contract: Company) => {
    const [newContract, response] = await fetch<Company>(HttpMethod.POST, {
      path: '/api/dict/contract/',
      payload: JSON.stringify(contract),
    });
    if (response.statusCode !== 404 && response.statusCode !== 401) {
      await getContracts();
    }
    return newContract;
  }, []);

  useEffect(() => {
    getCompanies();
  }, []);

  const dict = useMemo(
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

  return dict;
};
