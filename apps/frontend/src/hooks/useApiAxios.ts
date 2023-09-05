import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

type UseApi<T> = {
  data: T | undefined;

  isLoading: boolean;
  error: unknown;
  fetch: (options?: AxiosRequestConfig) => void;
};

axios.defaults.baseURL = '/api/';

export const useApi = <T>(url: string): UseApi<T> => {
  const [data, setData] = useState<T | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState();

  const fetch = async (options?: AxiosRequestConfig) => {
    setIsLoading(true);

    await axios(`${url}/${options?.url}`, {
      ...options,
      headers: {
        Accept: '*/*, application/json, text/plain',
      },
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
        setData(err.response.data);
        console.error(err.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    data,
    isLoading,
    error,
    fetch,
  };
};
