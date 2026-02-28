// src/types/api.types.ts

export interface ApiError {
  error: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  message?: string;
  data?: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}