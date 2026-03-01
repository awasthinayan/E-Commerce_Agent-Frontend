// src/Pages/Chat/ChatPage.tsx

import { useState, useCallback, useEffect, useRef } from 'react';
import { Plus, MessageSquare, Trash2, Menu, X } from 'lucide-react';
import useChat from '../../Hooks/useChat';
import Navbar from '../../Components/Common/Navbar';
import type { Message, Conversation, ChatRequest } from '../../Types/chat.types';
import apiClient from '../../API/api.Client';
import {ENDPOINTS}  from '../../API/api.Config';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<'thorough' | 'fast'>('thorough');
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const {
    sendMessage,
    sendMessageLoading,
    sendMessageError,
    lastMessage,
    isSuccess,
    reset
  } = useChat();

  const conversationList = Array.isArray(conversations) ? conversations : [];

  const lastProcessedRef = useRef<string | null>(null);
  const lastSentQueryRef = useRef<string>('');
  const hasInitializedRef = useRef(false);

  // ✅ Fetch conversations helper
  const fetchConversations = useCallback(async () => {
    try {
      console.log('🔄 Fetching conversations...');
      const response = await apiClient.get(ENDPOINTS.CHAT.GET_CONVERSATIONS);
      if (response.data?.data) {
        setConversations(response.data.data);
        console.log('✅ Conversations fetched:', response.data.data.length);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  }, []);

  // ✅ Fetch on mount - wrapped properly to avoid warning
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      // Call fetchConversations outside the effect body
      const init = async () => {
        await fetchConversations();
      };
      init();
    }
  }, []); // ✅ Empty deps - runs once

  const loadConversation = useCallback(async (conversationId: string) => {
    try {
      const response = await apiClient.get(
        `${ENDPOINTS.CHAT.GET_CONVERSATIONS}/${conversationId}`
      );
      if (response.data?.data?.messages) {
        setMessages(response.data.data.messages);
        setCurrentConversationId(conversationId);
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
    }
  }, []);

  const startNewChat = () => {
    setMessages([]);
    setCurrentConversationId(null);
    setQuery('');
    lastProcessedRef.current = null;
    lastSentQueryRef.current = '';
    reset();
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    lastSentQueryRef.current = query.trim();

    try {
      const request: ChatRequest = {
        query: lastSentQueryRef.current,
        mode,
        ...(currentConversationId && { conversationId: currentConversationId })
      };

      await sendMessage(request);
      setQuery('');

      // Refetch after message
      setTimeout(() => {
        console.log('🔄 Refetching conversations...');
        fetchConversations();
      }, 1000);

    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message: ' + sendMessageError || 'Unknown error');
    }
  };

  const deleteConversation = async (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this conversation?')) {
      try {
        if (currentConversationId === conversationId) {
          startNewChat();
        }
      } catch (error) {
        console.error('Error deleting conversation:', error);
      }
    }
  };

  useEffect(() => {
    if (isSuccess && lastMessage) {
      const messageKey = lastMessage.conversationId + lastMessage.response;
      
      if (lastProcessedRef.current === messageKey) {
        return;
      }
      
      lastProcessedRef.current = messageKey;

      const userMessage: Message = {
        _id: Date.now().toString(),
        conversationId: lastMessage.conversationId,
        role: 'user',
        content: lastSentQueryRef.current,
        createdAt: new Date().toISOString()
      };

      const aiMessage: Message = {
        _id: (Date.now() + 1).toString(),
        conversationId: lastMessage.conversationId,
        role: 'assistant',
        content: lastMessage.response,
        tokens: lastMessage.tokens,
        cost: lastMessage.cost,
        confidence: lastMessage.confidence,
        createdAt: new Date().toISOString()
      };

      setMessages((prev) => [...prev, userMessage, aiMessage]);
      setCurrentConversationId(lastMessage.conversationId);
      
      console.log('✅ Messages added to UI');
    }
  }, [isSuccess, lastMessage]);

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ${
            sidebarOpen ? 'w-64' : 'w-0'
          } border-r border-gray-200 bg-white shadow-lg overflow-hidden`}
        >
          <div className="flex h-full flex-col">
            {/* New Chat Button */}
            <div className="border-b border-gray-200 p-4">
              <button
                onClick={startNewChat}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
              >
                <Plus size={20} />
                New Chat
              </button>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {conversationList.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <MessageSquare size={32} className="mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No conversations yet</p>
                </div>
              ) : (
                <div className="space-y-2 p-4">
                  {conversationList.map((conversation: Conversation) => (
                    <button
                      key={conversation._id}
                      onClick={() => loadConversation(conversation._id)}
                      className={`w-full group relative rounded-lg p-3 text-left transition ${
                        currentConversationId === conversation._id
                          ? 'bg-blue-100 text-blue-900'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="truncate font-medium text-sm mb-1">
                        {conversation.title}
                      </div>
                      <div className="text-xs opacity-70 mb-2">
                        {new Date(conversation.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <div className="text-xs px-2 py-1 rounded bg-gray-200 w-fit">
                        {conversation.mode}
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={(e) => deleteConversation(conversation._id, e)}
                        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition p-1 hover:bg-red-100 rounded"
                        title="Delete conversation"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Toggle Sidebar Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-4 text-gray-600 hover:text-gray-900 lg:hidden"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-6 py-8">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="mx-auto mb-4 h-16 w-16 text-blue-300" />
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Start a Conversation
                  </h1>
                  <p className="text-gray-600 max-w-md">
                    Ask me anything about e-commerce, product optimization, marketing,
                    pricing strategies, and more!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-w-2xl mx-auto">
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md rounded-lg px-4 py-2 ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 bg-white px-6 py-6">
            <div className="max-w-2xl mx-auto">
              {/* Mode Toggle */}
              <div className="mb-4 flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Mode:</span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    value="thorough"
                    checked={mode === 'thorough'}
                    onChange={(e) => setMode(e.target.value as 'thorough' | 'fast')}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">Thorough</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    value="fast"
                    checked={mode === 'fast'}
                    onChange={(e) => setMode(e.target.value as 'thorough' | 'fast')}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">Fast</span>
                </label>
              </div>

              {/* Error Message */}
              {sendMessageError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {sendMessageError}
                </div>
              )}

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="flex gap-4">
                <input
                  type="text"
                  placeholder="Ask me about e-commerce strategies..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={sendMessageLoading}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={sendMessageLoading || !query.trim()}
                  className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
                >
                  {sendMessageLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}