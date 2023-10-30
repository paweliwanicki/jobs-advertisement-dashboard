import { useState, useEffect, useCallback, useMemo } from 'react';
import { Company } from '../types/Company';
import { useApi } from './useApi';
import { HttpMethod } from '../enums/HttpMethods';
import { SingleValue } from 'react-select';
import { Option } from 'react-google-places-autocomplete/build/types';

type Dictionaries = {
  companies: Company[];
  companySelectOptions: SingleValue<Option>[];
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

export const useDictionaries = (): Dictionaries => {
  const { fetch } = useApi();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [companySelectOptions, setCompanySelectOptions] = useState<
    SingleValue<Option>[]
  >([]);

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
