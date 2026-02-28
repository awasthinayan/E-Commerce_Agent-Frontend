// src/api/config.ts

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 30000,
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    GET_ME: '/auth/me',
    CHANGE_PASSWORD: '/auth/change-password',
  },
  USERS: {
    GET_ALL: '/users/allusers',
    GET_BY_ID: (id: string) => `/users/users/${id}`,
    UPDATE_PREFERENCES: (id: string) => `/users/users/${id}/preferences`,
  },
  CHAT: {
    SEND_MESSAGE: '/chat',
    GET_CONVERSATIONS: '/conversations',
    GET_MESSAGES: (conversationId: string) => `/conversations/${conversationId}`,
  },
} as const;