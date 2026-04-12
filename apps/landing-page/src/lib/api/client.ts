import type { ApiError, ApiResponse, RequestOptions } from '@staamina/types';

import { API_CONFIG } from './config';

export class ApiClientError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

async function buildHeaders(customHeaders?: HeadersInit): Promise<HeadersInit> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  return headers;
}

async function handleResponse<T>(
  response: Response,
  retryCount: number = 0
): Promise<ApiResponse<T>> {
  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    let errorData: unknown = null;

    if (isJson) {
      try {
        errorData = await response.json();
        errorMessage =
          (errorData as { message?: string; error?: string }).message ||
          (errorData as { message?: string; error?: string }).error ||
          errorMessage;
      } catch {
        // If JSON parsing fails, use default error message
      }
    }

    // Log detailed error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('[API Client] Request failed:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        url: response.url,
        retryCount,
      });
    }

    const error: ApiError = {
      message: errorMessage,
      statusCode: response.status,
      error: (errorData as { error?: string })?.error,
    };

    throw new ApiClientError(response.status, errorMessage, error);
  }

  if (isJson) {
    return await response.json();
  }

  const text = await response.text();

  return {
    success: true,
    data: text as unknown as T,
  };
}

export async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { onError, headers: customHeaders, ...fetchOptions } = options;

  const url = endpoint.startsWith('http')
    ? endpoint
    : `${API_CONFIG.baseURL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const maxRetries = 1;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const headers = await buildHeaders(customHeaders);

      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        API_CONFIG.timeout
      );

      const response = await fetch(url, {
        ...fetchOptions,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      return await handleResponse<T>(response, attempt);
    } catch (error) {
      lastError = error as Error;

      // Si ce n'est pas une erreur 401 ou qu'on a déjà réessayé, on propage l'erreur
      if (error instanceof ApiClientError) {
        if (onError) {
          onError({
            message: error.message,
            statusCode: error.statusCode,
          });
        }
        throw error;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        const timeoutError = new ApiClientError(408, 'Request timeout');
        if (onError) {
          onError({
            message: timeoutError.message,
            statusCode: timeoutError.statusCode,
          });
        }
        throw timeoutError;
      }

      const unknownError = new ApiClientError(
        500,
        error instanceof Error ? error.message : 'Unknown error occurred',
        error
      );

      if (onError) {
        onError({
          message: unknownError.message,
          statusCode: unknownError.statusCode,
        });
      }

      throw unknownError;
    }
  }

  throw lastError || new ApiClientError(500, 'Request failed after retries');
}

export async function apiGet<T = unknown>(
  endpoint: string,
  options?: RequestOptions
): Promise<ApiResponse<T>> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'GET',
  });
}

export async function apiPost<T = unknown>(
  endpoint: string,
  data?: unknown,
  options?: RequestOptions
): Promise<ApiResponse<T>> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
}

export async function apiPut<T = unknown>(
  endpoint: string,
  data?: unknown,
  options?: RequestOptions
): Promise<ApiResponse<T>> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
}

export async function apiPatch<T = unknown>(
  endpoint: string,
  data?: unknown,
  options?: RequestOptions
): Promise<ApiResponse<T>> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined,
  });
}

export async function apiDelete<T = unknown>(
  endpoint: string,
  options?: RequestOptions
): Promise<ApiResponse<T>> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'DELETE',
  });
}
