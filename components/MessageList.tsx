// components/MessageList.tsx
import { Message } from 'ai';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { User, Bot, Loader2 } from 'lucide-react';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
      {messages.length === 0 && (
        <div className="text-center text-gray-400 mt-20">
          <Bot className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Start a conversation with AI</p>
        </div>
      )}

      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
        >
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              message.role === 'user' ? 'bg-blue-500' : 'bg-gray-700'
            }`}
          >
            {message.role === 'user' ? (
              <User className="w-5 h-5 text-white" />
            ) : (
              <Bot className="w-5 h-5 text-white" />
            )}
          </div>

          <div
            className={`flex-1 ${
              message.role === 'user'
                ? 'bg-blue-500 text-white rounded-2xl rounded-tr-sm px-4 py-3'
                : 'bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border'
            }`}
          >
            {message.role === 'user' ? (
              <p className="whitespace-pre-wrap">{message.content}</p>
            ) : (
              <ReactMarkdown
                className="prose prose-sm max-w-none"
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            )}
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border">
            <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
          </div>
        </div>
      )}
    </div>
  );
}
