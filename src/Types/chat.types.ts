// src/types/chat.types.ts

export interface ChatRequest {
  query: string;
  mode?: 'thorough' | 'fast';
}

export interface ChatResponse {
  message: string;
  conversationId: string;
  response: string;
  tokens: number;
  cost: number;
  confidence: number;
}

export interface Message {
  _id?: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  tokens?: number;
  cost?: number;
  confidence?: number;
  createdAt?: string;
}

export interface Conversation {
  _id: string;
  userId: string;
  title: string;
  mode: 'thorough' | 'fast';
  createdAt: string;
  updatedAt: string;
}

export interface ConversationsResponse {
  message: string;
  conversations: Conversation[];
}