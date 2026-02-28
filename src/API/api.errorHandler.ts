// src/api/errorHandler.ts

import { AxiosError } from 'axios';
import type { ApiError } from '../Types/api.types';

export const handleAuthError = (): void => {
  // Clear auth data
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  // Redirect to login
  window.location.href = '/login';
};

export const handleApiError = (error: AxiosError<ApiError>): void => {
  const errorMessage = error.response?.data?.message || error.message;
  
  console.error('API Error:', {
    status: error.response?.status,
    message: errorMessage,
    data: error.response?.data,
  });

  // You can add error toast notification here
  // toast.error(errorMessage);
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message || 'An error occurred';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
};