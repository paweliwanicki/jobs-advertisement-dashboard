import { useCookies } from 'react-cookie';

type RequestOptions = {
  path: string;
  tokenRefreshURL?: string;
  customHeaders?: Record<string, string>[];
};

type ExtendedRequestOptions = RequestOptions & {
  payload?: string;
};

type TokenRefreshParams = {
  jwtToken: string;
  tokenRefreshURL: string;
};

type ResponseParams = {
  status: number;
};

type RefreshTokenResponse = {
  statusCode: number;
  result: {
    jwtToken: string;
  };
};

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type ApiService = {
  refreshJwtToken: (params: TokenRefreshParams) => Promise<void>;
  fetch: <T>(
    method: HttpMethod,
    params: ExtendedRequestOptions
  ) => Promise<[body: T, resParams: ResponseParams]>;
};

const forceApiTokenRefresh = async (
  params: TokenRefreshParams
): Promise<Error | string> => {
  const { tokenRefreshURL, jwtToken } = params;

  const headers: Record<string, string> = buildHeaders(jwtToken);

  const refreshTokenResponse = await fetch(tokenRefreshURL, {
    headers,
    method: HttpMethod.GET,
  });

  const parsedRefreshToken = (await refreshTokenResponse.json()) as {
    statusCode: number;
    result: { jwtToken: string };
  };

  if (parsedRefreshToken.statusCode === 0) {
    return parsedRefreshToken.result.jwtToken;
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
  const { path, tokenRefreshURL, customHeaders } = params;

  const payload = 'payload' in params ? params.payload : undefined;
  const headers: Record<string, string> = buildHeaders(jwtToken, customHeaders);

  const response = await fetch(path, { headers, method, body: payload });
  try {
    body = (await response.json()) as RefreshTokenResponse;
  } catch {
    body = null;
  }

  if (body?.statusCode === 200 && tokenRefreshURL) {
    await forceApiTokenRefresh({ tokenRefreshURL, jwtToken });
    return await request(method, params, jwtToken);
  } else {
    return [body, { status: response.status }];
  }
};

export const useApi = (): ApiService => {
  const [cookies, setCookies] = useCookies(['jwtToken']);

  const fetch = async (method: HttpMethod, params: ExtendedRequestOptions) => {
    return await request(method, params, cookies.jwtToken);
  };

  const refreshJwtToken = async (params: TokenRefreshParams) => {
    const jwtToken = await forceApiTokenRefresh(params);
    if (jwtToken) {
      setCookies('jwtToken', jwtToken);
    }
  };

  return {
    fetch,
    refreshJwtToken,
  };
};
