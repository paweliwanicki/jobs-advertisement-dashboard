type RequestOptions = {
  path: string;
  tokenRefreshURL?: string;
  clientID?: string;
  jwtToken?: string;
  customHeaders?: Record<string, string>[];
};

type ExtendedRequestOptions = RequestOptions & {
  payload?: string;
};

type TokenRefreshParams = {
  tokenRefreshURL: string;
  clientID?: string;
  jwtToken?: string;
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

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

const forceApiTokenRefresh = async (
  params: TokenRefreshParams
): Promise<void> => {
  params.clientID = localStorage.getItem('clientID') ?? undefined;
  params.jwtToken = localStorage.getItem('jwtToken') ?? undefined;
  const { tokenRefreshURL, clientID, jwtToken } = params;

  const headers: Record<string, string> = buildHeaders(jwtToken, clientID);

  const refreshTokenResponse = await fetch(tokenRefreshURL, {
    headers,
    method: HttpMethod.GET,
  });

  const parsedRefreshToken = (await refreshTokenResponse.json()) as {
    statusCode: number;
    result: { jwtToken: string };
  };

  if (parsedRefreshToken.statusCode === 0) {
    localStorage.setItem('jwtToken', parsedRefreshToken.result.jwtToken);
  } else {
    throw Error('Error while refdreshing the jwt token');
  }
};

// reset portal container to extend session time
function forceSessionTimeExtend(): void {
  window.parent.postMessage('ResetTimer', window.location.origin, []);
}

const buildHeaders = (
  jwtToken = '',
  clientID = '',
  customHeaders: Record<string, string>[] = []
): Record<string, string> => {
  let headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (jwtToken) {
    headers.Authorization = `Bearer ${jwtToken}`;
  }

  if (clientID) {
    headers.clientID = clientID;
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
  params: ExtendedRequestOptions | RequestOptions
): Promise<[body: any, resParams: ResponseParams]> => {
  params.clientID = localStorage.getItem('clientID') ?? undefined;
  params.jwtToken = localStorage.getItem('jwtToken') ?? undefined;

  const { clientID, path, tokenRefreshURL, jwtToken, customHeaders } = params;

  const payload = 'payload' in params ? params.payload : undefined;
  const headers: Record<string, string> = buildHeaders(
    jwtToken,
    clientID,
    customHeaders
  );

  const response = await fetch(path, { headers, method, body: payload });
  

  let body;

  try {
    body = (await response.json()) as RefreshTokenResponse;
  } catch {
    body = null;
  }

  if (body?.statusCode === 200 && tokenRefreshURL) {
    await forceApiTokenRefresh({ tokenRefreshURL, clientID, jwtToken });
    return await request(method, params);
  } else {
    forceSessionTimeExtend();
    return [body, { status: response.status }];
  }
};

export const ApiService = {
  post: async <T>(
    params: ExtendedRequestOptions
  ): Promise<[body: T, resParams: ResponseParams]> =>
    await request(HttpMethod.POST, params),

  get: async <T>(
    params: RequestOptions
  ): Promise<[body: T, resParams: ResponseParams]> =>
    await request(HttpMethod.GET, params),

  put: async <T>(
    params: ExtendedRequestOptions
  ): Promise<[body: T, resParams: ResponseParams]> =>
    await request(HttpMethod.PUT, params),

  patch: async <T>(
    params: ExtendedRequestOptions
  ): Promise<[body: T, resParams: ResponseParams]> =>
    await request(HttpMethod.PATCH, params),

  delete: async <T>(
    params: RequestOptions
  ): Promise<[body: T, resParams: ResponseParams]> =>
    await request(HttpMethod.DELETE, params),

  forceApiTokenRefresh: async (params: TokenRefreshParams): Promise<void> => {
    await forceApiTokenRefresh(params);
  },
};
