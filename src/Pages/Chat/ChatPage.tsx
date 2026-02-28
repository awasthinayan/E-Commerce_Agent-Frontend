// src/Pages/Chat/ChatPage.tsx

import { useState, useRef, useEffect } from 'react';
import { Send, Loader, MessageCircle } from 'lucide-react';
import Navbar from '../../Components/Common/Navbar';
import useChat from '../../Hooks/useChat';
import type { Message } from '../../Types/chat.types';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<'thorough' | 'fast'>('thorough');
  const [conversationId, setConversationId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // ✅ Get the hook - this returns lastMessage when mutation succeeds
  const { sendMessage, sendMessageLoading, sendMessageError, lastMessage } = useChat();

  // ✅ Auto-scroll effect (safe - no setState)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Guard: if no message or query, exit early
    if (!lastMessage || !query.trim()) {
      return;
    }

    Promise.resolve().then(() => {
      setMessages((prev) => [
        ...prev,
        {
          conversationId: lastMessage.conversationId,
          role: 'user' as const,
          content: query,
        },
        {
          conversationId: lastMessage.conversationId,
          role: 'assistant' as const,
          content: lastMessage.response,
          tokens: lastMessage.tokens,
          confidence: lastMessage.confidence,
        },
      ]);

      setConversationId(lastMessage.conversationId);
      setQuery('');
    });
  }, [lastMessage]); // ✅ Only depend on lastMessage

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    try {
      await sendMessage({ query, mode });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <div className="max-w-4xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center animate-fadeIn">
                <MessageCircle className="w-16 h-16 text-blue-400 mx-auto mb-4 opacity-50" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Start a Conversation</h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  Ask me anything about e-commerce, product optimization, marketing, pricing strategies, and more!
                </p>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                } animate-slideInUp`}
              >
                <div
                  className={`max-w-2xl px-6 py-4 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none'
                      : 'bg-white border border-gray-200 text-gray-900 rounded-bl-none shadow-lg'
                  }`}
                >
                  <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
                  {message.role === 'assistant' && message.confidence && (
                    <p className="text-xs mt-2 opacity-60">
                      Confidence: {(message.confidence * 100).toFixed(0)}%
                    </p>
                  )}
                </div>
              </div>
            ))
          )}

          {sendMessageLoading && (
            <div className="flex justify-start animate-slideInUp">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-4 shadow-lg">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div 
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div 
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {sendMessageError && (
            <div className="flex justify-center animate-slideInDown">
              <div className="bg-red-100 border border-red-300 rounded-lg p-4 max-w-md">
                <p className="text-sm text-red-800">
                  Error sending message. Please try again.
                </p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Area */}
        <div className="border-t border-gray-200 bg-white/80 backdrop-blur-sm p-6">
          <form onSubmit={handleSendMessage} className="space-y-4">
            {/* Mode Selection */}
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="thorough"
                  checked={mode === 'thorough'}
                  onChange={(e) => setMode(e.target.value as 'thorough' | 'fast')}
                  disabled={sendMessageLoading}
                  className="w-4 h-4 text-blue-600 cursor-pointer"
                />
                <span className="text-sm text-gray-700 font-medium">Thorough</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="fast"
                  checked={mode === 'fast'}
                  onChange={(e) => setMode(e.target.value as 'thorough' | 'fast')}
                  disabled={sendMessageLoading}
                  className="w-4 h-4 text-blue-600 cursor-pointer"
                />
                <span className="text-sm text-gray-700 font-medium">Fast</span>
              </label>
            </div>

            {/* Input Field */}
            <div className="flex gap-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask me about e-commerce strategies..."
                disabled={sendMessageLoading}
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-all duration-300 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={sendMessageLoading || !query.trim()}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sendMessageLoading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>

            {conversationId && (
              <p className="text-xs text-gray-500 text-center">
                Conversation ID: {conversationId.substring(0, 8)}...
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}