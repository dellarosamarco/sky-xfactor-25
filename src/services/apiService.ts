import { fetchAuthSession } from 'aws-amplify/auth';
import awsConfig from '../aws-exports';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type RequestOptions = {
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

type ApiErrorShape = {
  message: string;
  statusCode: number;
  payload?: unknown;
};

const getConfiguredEndpoint = () => {
  const preferredApiName = process.env.REACT_APP_AWS_API_NAME || 'XFactorApi';
  const fromEnv = process.env.REACT_APP_API_BASE_URL;

  if (fromEnv) {
    return fromEnv.replace(/\/$/, '');
  }

  const endpoints = awsConfig.aws_cloud_logic_custom || [];
  const matched = endpoints.find((endpoint) => endpoint.name === preferredApiName) || endpoints[0];

  return matched?.endpoint?.replace(/\/$/, '');
};

const API_BASE_URL = getConfiguredEndpoint();

const buildAuthHeaders = async (): Promise<Record<string, string>> => {
  const headers: Record<string, string> = {};

  try {
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken?.toString();

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    // No active session. Return empty headers and let backend enforce auth if needed.
  }

  return headers;
};

const parseResponse = async <T>(response: Response): Promise<T> => {
  if (response.status === 204) {
    return undefined as unknown as T;
  }

  const text = await response.text();

  if (!text) {
    return undefined as unknown as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch (error) {
    // Non JSON payload
    return text as unknown as T;
  }
};

const handleError = async (response: Response): Promise<never> => {
  const errorBody = await parseResponse<ApiErrorShape | string>(response);

  if (typeof errorBody === 'string') {
    throw new Error(errorBody || `Richiesta fallita con codice ${response.status}`);
  }

  const message = errorBody?.message || `Richiesta fallita con codice ${response.status}`;
  const err = new Error(message) as Error & ApiErrorShape;
  err.statusCode = response.status;
  err.payload = errorBody?.payload;
  throw err;
};

const request = async <T>(method: HttpMethod, path: string, options: RequestOptions = {}): Promise<T> => {
  if (!API_BASE_URL) {
    throw new Error('API Gateway endpoint non configurato. Verifica aws-exports.js o le variabili ambiente.');
  }

  const { headers = {}, body, signal } = options;

  const authHeaders = await buildAuthHeaders();
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...authHeaders,
    ...headers,
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal,
  });

  if (!response.ok) {
    await handleError(response);
  }

  return parseResponse<T>(response);
};

export const apiGet = async <T>(path: string, options?: RequestOptions) => request<T>('GET', path, options);

export const apiPost = async <T>(path: string, body?: unknown, options?: RequestOptions) =>
  request<T>('POST', path, { ...options, body });

export const apiPut = async <T>(path: string, body?: unknown, options?: RequestOptions) =>
  request<T>('PUT', path, { ...options, body });

export const apiPatch = async <T>(path: string, body?: unknown, options?: RequestOptions) =>
  request<T>('PATCH', path, { ...options, body });

export const apiDelete = async <T>(path: string, options?: RequestOptions) => request<T>('DELETE', path, options);
