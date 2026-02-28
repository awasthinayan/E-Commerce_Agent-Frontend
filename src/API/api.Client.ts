// src/api/client.ts

import axios from 'axios';
import type { 
  AxiosInstance, 
  AxiosError, 
  AxiosResponse,
  InternalAxiosRequestConfig 
} from 'axios';
import { API_CONFIG } from './api.Config';
import { handleAuthError, handleApiError } from './api.errorHandler';
import type { ApiError } from '../Types';

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: API_CONFIG.HEADERS,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request Interceptor
    this.instance.interceptors.request.use(
      this.requestInterceptor.bind(this),
      this.requestErrorInterceptor.bind(this)
    );

    // Response Interceptor
    this.instance.interceptors.response.use(
      this.responseInterceptor.bind(this),
      this.responseErrorInterceptor.bind(this)
    );
  }

  private requestInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }

  private requestErrorInterceptor(error: AxiosError): Promise<never> {
    return Promise.reject(error);
  }

  private responseInterceptor(
  response: AxiosResponse
): AxiosResponse {
  return response;
}

  private responseErrorInterceptor(error: AxiosError<ApiError>): Promise<never> {
    if (error.response?.status === 401) {
      handleAuthError();
    } else {
      handleApiError(error);
    }

    return Promise.reject(error);
  }

  public getClient(): AxiosInstance {
    return this.instance;
  }
}

export const apiClient = new ApiClient().getClient();
export default apiClient;