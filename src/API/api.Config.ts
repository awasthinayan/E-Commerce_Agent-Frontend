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
    FORGOT_PASSWORD:'/auth/forgot-password',
    RESET_PASSWORD:(token:string) =>`/auth/reset-password/${token}`
  },
  USERS: {
    GET_ALL: '/users/allUsers',
    GET_BY_ID: (id: string) => `/users/user/${id}`,
    UPDATE_PREFERENCES: (id: string) => `/users/user/${id}/preferences`,
  },
  CHAT: {
    SEND_MESSAGE: '/chat',
    GET_CONVERSATIONS: '/chat/conversations',
    GET_MESSAGES: (conversationId: string) => `/chat/conversations/${conversationId}`,
  },
} as const;