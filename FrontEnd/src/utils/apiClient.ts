/*
1. Api response
2. methods
3. fetch


*/
import config from "../config/env";
const BASE_URL = config.BASE_URL;

type ApiResult<apiReturnType> =
  | { ok: true; data: apiReturnType }
  | { ok: false; error: string; status: number };

async function apiClient<apiReturnType>(
  endpoint: string,
  options: RequestInit = {},
  token?: string,
): Promise<ApiResult<apiReturnType>> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    const body = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error: body?.message ?? `Request failed (${response.status})`,
      };
    }

    return {
      ok: true,
      data: body,
    };
    
<<<<<<< HEAD
<<<<<<< HEAD
  } catch {
    return {
      ok: false,
      status: 0,
      error: "Network Error",
=======
=======
>>>>>>> df74b623a7b6298d7808ef36925c80a3cb2275a2
  } catch (error) {
    return {
      ok: false,
      status: 0,
      error: error instanceof Error ? error.message : String(error),
<<<<<<< HEAD
>>>>>>> df74b623a7b6298d7808ef36925c80a3cb2275a2
=======
>>>>>>> df74b623a7b6298d7808ef36925c80a3cb2275a2
    };
  }
}



export const api = {
  get: <apiRequest>(endpoint: string, token?: string) =>
    apiClient<apiRequest>(endpoint, { method: `GET` }, token),
  
  post: <apiRequest>(endpoint: string, body: unknown, token?: string) =>
    apiClient<apiRequest>(
      endpoint,
      { method: `POST`, body: JSON.stringify(body) },
      token,
    ),
  
  patch: <apiRequest>(endpoint: string, body: unknown, token?: string) =>
    apiClient<apiRequest>(
      endpoint,
      { method: `PATCH`, body: JSON.stringify(body) },
      token,
    ),
  
  delete: <apiRequest>(endpoint: string, token?: string) =>
    apiClient<apiRequest>(endpoint, { method: `DELETE` }, token),
};
