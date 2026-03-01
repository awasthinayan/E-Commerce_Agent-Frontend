// src/hooks/useChat.ts

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import chatService from '../Services/chat.Service';
import type { ChatRequest, ChatResponse } from '../Types/chat.types';
import { getErrorMessage } from '../API/api.errorHandler';

export const useChat = () => {
  const queryClient = useQueryClient();

  const sendMessageMutation = useMutation({
    mutationFn: (request: ChatRequest) => chatService.sendMessage(request),
    onSuccess: () => {
      // Force immediate refetch
      console.log('✅ Message sent, refetching conversations...');
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
    onError: (error) => {
      console.error('❌ Mutation error:', error);
    }
  });

  const { data: conversations, isLoading: conversationsLoading, refetch } = useQuery({
    queryKey: ['conversations'],
    queryFn: () => chatService.getConversations(),
    staleTime: 5000, // Only cache for 5 seconds
    retry: 2
  });

  const sendMessage = useCallback(
    (request: ChatRequest) => sendMessageMutation.mutateAsync(request),
    [sendMessageMutation]
  );

  return {
    sendMessage,
    sendMessageLoading: sendMessageMutation.isPending,
    sendMessageError: sendMessageMutation.error
      ? getErrorMessage(sendMessageMutation.error)
      : null,
    lastMessage: sendMessageMutation.data as ChatResponse | undefined,
    conversations: Array.isArray(conversations) ? conversations : [],
    conversationsLoading,
    isSuccess: sendMessageMutation.isSuccess,
    reset: sendMessageMutation.reset,
    refetch
  };
};

export default useChat;