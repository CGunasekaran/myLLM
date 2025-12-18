// components/ChatInterface.tsx
"use client";

import SimpleChatInterface from "./SimpleChatInterface";

export default function ChatInterface() {
  // For now, just use the SimpleChatInterface which we know works
  // This avoids the useChat hook compatibility issues with the AI SDK
  return <SimpleChatInterface />;
}