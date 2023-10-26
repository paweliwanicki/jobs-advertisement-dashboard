import { useState, useEffect, useCallback } from 'react';
import { Company } from '../types/Company';
import { useApi } from './useApi';
import { HttpMethod } from '../enums/HttpMethods';

type Dictionaries = {
  companies: Company[];
  addCompany: () => void;
};

export const useDictionaries = (): Dictionaries => {
  const { fetch } = useApi();

  const [companies, setCompanies] = useState<Company[]>([]);

  const getCompanies = useCallback(async () => {
    const [companies, response] = await fetch<Company[]>(HttpMethod.GET, {
      path: '/api/dict/company/',
    });
    if (response.message === 'OK') {
      setCompanies(companies);
    }
  }, []);

  const addCompany = useCallback(async () => {
    const [company, response] = await fetch(HttpMethod.POST, {
      path: '/api/dict/company/',
    });
    if (response.message === 'OK') {
      await getCompanies();
    }
    return company;
  }, []);

  useEffect(() => {
    getCompanies();
  }, []);

  return {
    companies,
    addCompany,
  };
};
