// src/hooks/useChat.ts

import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import chatService from '../Services/chat.Service';
import type { ChatRequest, ChatResponse } from '../Types/chat.types';
import { getErrorMessage } from '../API/api.errorHandler';

export const useChat = () => {
  const sendMessageMutation = useMutation({
    mutationFn: (request: ChatRequest) => chatService.sendMessage(request),
  });

  const { data: conversations, isLoading: conversationsLoading } = useQuery({
    queryKey: ['conversations'],
    queryFn: () => chatService.getConversations(),
    staleTime: 1000 * 60,
  });

  // ✅ Wrap sendMessage with useCallback to get consistent reference
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
    // ✅ Return the last successful response (not the mutation object)
    lastMessage: sendMessageMutation.data as ChatResponse | undefined,
    conversations,
    conversationsLoading,
    isSuccess: sendMessageMutation.isSuccess,
    reset: sendMessageMutation.reset,
  };
};

export default useChat;