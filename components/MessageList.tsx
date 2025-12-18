// components/MessageList.tsx
import { User, Bot, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
      {messages.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <Bot className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>Start a conversation by typing your message below.</p>
        </div>
      ) : null}

      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex gap-4 ${
            message.role === "user" ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              message.role === "user" ? "bg-blue-500" : "bg-gray-700"
            }`}
          >
            {message.role === "user" ? (
              <User className="w-4 h-4 text-white" />
            ) : (
              <Bot className="w-4 h-4 text-white" />
            )}
          </div>

          <div
            className={`flex-1 max-w-3xl px-4 py-3 rounded-2xl ${
              message.role === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-900"
            }`}
          >
            <div className="whitespace-pre-wrap">{message.content}</div>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 max-w-3xl px-4 py-3 rounded-2xl bg-gray-100 text-gray-900">
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm text-gray-500">AI is thinking...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
