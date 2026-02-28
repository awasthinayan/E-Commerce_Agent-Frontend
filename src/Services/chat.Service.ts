// src/services/chat.service.ts

import apiClient from './apiClient';
import { ENDPOINTS } from '../API/api.Config';
import type { ChatRequest, ChatResponse, Conversation } from '../Types/chat.types';

class ChatService {
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    const response = await apiClient.post<ChatResponse>(ENDPOINTS.CHAT.SEND_MESSAGE, request);
    return response.data;
  }

  async getConversations(): Promise<Conversation[]> {
    try {
      const response = await apiClient.get<Conversation[]>(ENDPOINTS.CHAT.GET_CONVERSATIONS);
      return response.data;
    } catch (error) {
      console.warn('Conversations endpoint not available and error is:',error);
      return [];
    }
  }

  async getConversationMessages(conversationId: string): Promise<unknown[]> {
    try {
      const response = await apiClient.get<unknown[]>(
        ENDPOINTS.CHAT.GET_MESSAGES(conversationId)
      );
      return response.data;
    } catch (error) {
      console.warn('Conversation messages endpoint not available and error is:',error);
      return [];
    }
  }
}

export const chatService = new ChatService();
export default chatService;