// components/ChatInterface.tsx
"use client";

import { useChat } from "@ai-sdk/react";
import { useChatStore } from "@/store/chat-store";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ModelSelector from "./ModelSelector";
import { useEffect } from "react";

export default function ChatInterface() {
  const {
    currentSessionId,
    sessions,
    addMessage,
    selectedProvider,
    selectedModel,
    settings,
    apiKeys,
    createSession,
  } = useChatStore();

  // Ensure we have a session
  useEffect(() => {
    if (!currentSessionId && sessions.length === 0) {
      createSession(selectedProvider, selectedModel);
    }
  }, [
    currentSessionId,
    sessions,
    selectedProvider,
    selectedModel,
    createSession,
  ]);

  const currentSession = sessions.find((s) => s.id === currentSessionId);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: "/api/chat",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        provider: selectedProvider,
        model: selectedModel,
        settings,
        apiKey: apiKeys[selectedProvider],
      },
      initialMessages:
        currentSession?.messages.map((msg) => ({
          id: msg.id,
          role: msg.role,
          content: msg.content,
        })) || [],
      onFinish: (message) => {
        if (currentSessionId) {
          addMessage(currentSessionId, {
            id: message.id || crypto.randomUUID(),
            role: "assistant",
            content: message.content,
            timestamp: new Date(),
            model: selectedModel,
            provider: selectedProvider,
          });
        }
      },
    });

  // Sync messages to store
  useEffect(() => {
    if (
      currentSessionId &&
      messages.length > (currentSession?.messages.length || 0) &&
      messages.length > 0
    ) {
      const latestMessage = messages[messages.length - 1];
      if (latestMessage.role === "user") {
        addMessage(currentSessionId, {
          id: latestMessage.id || crypto.randomUUID(),
          role: "user",
          content: latestMessage.content,
          timestamp: new Date(),
        });
      }
    }
  }, [messages, currentSessionId, currentSession, addMessage]);

  return (
    <div className="flex flex-col h-full">
      {/* Header with Model Selector */}
      <header className="border-b bg-white px-6 py-4">
        <ModelSelector />
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <MessageList messages={messages} isLoading={isLoading} />
      </div>

      {/* Error Display */}
      {error && (
        <div className="px-6 py-3 bg-red-50 border-t border-red-200 text-red-700">
          <p className="text-sm">Error: {error.message}</p>
        </div>
      )}

      {/* Input */}
      <MessageInput
        input={input || ""}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
