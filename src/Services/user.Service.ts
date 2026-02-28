// src/services/user.service.ts

import apiClient from './apiClient';
import { ENDPOINTS } from '../API/api.Config';
import type { User, UserPreferences } from '../Types/user.types';

class UserService {
  async getAllUsers(): Promise<User[]> {
    const response = await apiClient.get<User[]>(ENDPOINTS.USERS.GET_ALL);
    return response.data;
  }

  async getUserById(id: string): Promise<User> {
    const response = await apiClient.get<User>(ENDPOINTS.USERS.GET_BY_ID(id));
    return response.data;
  }

  async updatePreferences(id: string, preferences: UserPreferences): Promise<User> {
    const response = await apiClient.put<User>(
      ENDPOINTS.USERS.UPDATE_PREFERENCES(id),
      { preferences }
    );
    return response.data;
  }
}

export const userService = new UserService();
export default userService;