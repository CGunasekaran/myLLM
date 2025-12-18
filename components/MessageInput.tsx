// components/MessageInput.tsx
import { Send } from "lucide-react";
import { ChangeEvent, FormEvent } from "react";

interface MessageInputProps {
  input: string;
  handleInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export default function MessageInput({
  input = "",
  handleInputChange,
  handleSubmit,
  isLoading,
}: MessageInputProps) {
  const safeHandleInputChange = handleInputChange || (() => {});
  const safeHandleSubmit = handleSubmit || ((e) => e.preventDefault());

  return (
    <div className="border-t bg-white px-6 py-4">
      <form onSubmit={safeHandleSubmit} className="max-w-4xl mx-auto">
        <div className="flex gap-3 items-end">
          <textarea
            value={input}
            onChange={safeHandleInputChange}
            placeholder="Type your message..."
            rows={1}
            disabled={isLoading}
            className="flex-1 resize-none rounded-lg border border-gray-300 px-4 py-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                safeHandleSubmit(e as any);
              }
            }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to send, Shift + Enter for new line
        </p>
      </form>
    </div>
  );
}
