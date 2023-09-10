import { useCookies } from 'react-cookie';
import { useCallback } from 'react';

type RequestOptions = {
  path: string;
  customHeaders?: Record<string, string>[];
};

type ExtendedRequestOptions = RequestOptions & {
  payload?: string;
};

type ResponseParams = {
  status: number;
};

type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type ApiService = {
  refreshJwtToken: () => Promise<void>;
  fetch: <T>(
    method: HttpMethod,
    params: ExtendedRequestOptions
  ) => Promise<[body: T, resParams: ResponseParams]>;
};

const forceApiTokenRefresh = async (
  jwtRefreshToken: string
): Promise<RefreshTokenResponse> => {
  const headers: Record<string, string> = buildHeaders(jwtRefreshToken);

  const refreshTokenResponse = await fetch('/api/auth/refreshToken', {
    headers,
    method: HttpMethod.GET,
  });

  if (refreshTokenResponse.status === 200) {
    return (await refreshTokenResponse.json()) as RefreshTokenResponse;
  } else {
    throw Error('Error while refreshing the jwt token');
  }
};

const buildHeaders = (
  jwtToken: string | undefined,
  customHeaders: Record<string, string>[] = []
): Record<string, string> => {
  let headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (jwtToken) {
    headers.Authorization = `Bearer ${jwtToken}`;
  }

  if (customHeaders.length) {
    customHeaders.forEach((header) => {
      headers = { ...headers, ...header };
    });
  }

  return headers;
};

/**
 * Generic HTTP request
 */

const request = async (
  method: HttpMethod,
  params: ExtendedRequestOptions | RequestOptions,
  jwtToken: string
): Promise<[body: any, resParams: ResponseParams]> => {
  let body;
  const { path, customHeaders } = params;

  const payload = 'payload' in params ? params.payload : undefined;
  const headers: Record<string, string> = buildHeaders(jwtToken, customHeaders);

  const response = await fetch(path, { headers, method, body: payload });
  try {
    body = (await response.json()) as ResponseParams;
  } catch {
    body = null;
  }

  if (body?.status === 200) {
    return await request(method, params, jwtToken);
  } else {
    return [body, { status: response.status }];
  }
};

export const useApi = (): ApiService => {
  const [cookies, setCookies] = useCookies(['jwtToken', 'jwtRefreshToken']);

  const fetch = useCallback(
    async (method: HttpMethod, params: ExtendedRequestOptions) => {
      return await request(method, params, cookies.jwtToken);
    },
    []
  );

  const refreshJwtToken = useCallback(async () => {
    const { accessToken, refreshToken } = await forceApiTokenRefresh(
      cookies.jwtRefreshToken
    );
    if (accessToken && refreshToken) {
      setCookies('jwtToken', accessToken);
      setCookies('jwtRefreshToken', refreshToken);
    }
  }, []);

  return {
    fetch,
    refreshJwtToken,
  };
};
