// src/types/auth.types.ts

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  preferences?: UserPreferences;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

// Import User from user.types to avoid circular dependency
import type { User, UserPreferences } from './user.types';