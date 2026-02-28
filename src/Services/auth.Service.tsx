// src/services/auth.service.ts

import apiClient from './apiClient';
import { ENDPOINTS } from '../API/api.Config';
import type { LoginRequest, RegisterRequest, AuthResponse, ChangePasswordRequest } from '../Types/auth.types';
import type{ User } from '../Types/user.types';

class AuthService {
  async register(data: RegisterRequest): Promise<User> {
    const response = await apiClient.post<AuthResponse>(ENDPOINTS.AUTH.REGISTER, data);
    return response.data.user;
  }

  async login(credentials: LoginRequest): Promise<{ token: string; user: User }> {
    const response = await apiClient.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, credentials);
    const { token, user } = response.data;

    this.storeCredentials(token, user);
    return { token, user };
  }

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<{ message: string; user: User }>(ENDPOINTS.AUTH.GET_ME);
    return response.data.user;
  }

  async changePassword(data: ChangePasswordRequest): Promise<{ message: string }> {
    return apiClient.put(ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
  }

  logout(): void {
    this.clearCredentials();
  }

  private storeCredentials(token: string, user: User): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  private clearCredentials(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getStoredUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}

export const authService = new AuthService();
export default authService;