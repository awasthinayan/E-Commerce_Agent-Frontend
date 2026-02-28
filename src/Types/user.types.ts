// src/types/user.types.ts

export interface User {
  _id: string;
  name: string;
  email: string;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  kpis: string[];
  marketplaces: string[];
  categories: string[];
}

export interface UpdatePreferencesRequest {
  preferences: UserPreferences;
}

export interface UserResponse {
  message: string;
  user: User;
}