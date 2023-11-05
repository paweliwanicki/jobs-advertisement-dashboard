import { useState, useEffect, useCallback, useMemo } from 'react';
import { Company } from '../types/Company';
import { useApi } from './useApi';
import { HttpMethod } from '../enums/HttpMethods';
import { Option } from 'react-google-places-autocomplete/build/types';

type Dictionaries = {
  companies: Company[];
  companySelectOptions: Option[];
  createCompany: (company: Company) => Promise<Company>;
};

type SelectOptionsData = Company[];

const generateSelectOptions = (
  data: SelectOptionsData,
  valueKey: string,
  labelKey: string
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

  const getCompanies = useCallback(async () => {
    const [allCompanies, response] = await fetch<Company[]>(HttpMethod.GET, {
      path: '/api/dict/company/',
    });
    if (response.statusCode !== 404 && response.statusCode !== 401) {
      console.log(allCompanies);
      setCompanies(allCompanies);
      setCompanySelectOptions(
        generateSelectOptions(allCompanies, 'id', 'name')
      );
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

  useEffect(() => {
    getCompanies();
  }, []);

  const dict = useMemo(
    () => ({
      companies,
      companySelectOptions,
      createCompany,
    }),
    [companies, companySelectOptions, createCompany]
  );

  return dict;
};
