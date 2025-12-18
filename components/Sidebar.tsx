// components/Sidebar.tsx
'use client';

import { useChatStore } from '@/store/chat-store';
import { Plus, MessageSquare, Settings, Trash2 } from 'lucide-react';

interface SidebarProps {
  onOpenSettings: () => void;
}

export default function Sidebar({ onOpenSettings }: SidebarProps) {
  const {
    sessions,
    currentSessionId,
    createSession,
    setCurrentSession,
    deleteSession,
    selectedProvider,
    selectedModel,
  } = useChatStore();

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold">LLM Hub</h1>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button
          onClick={() => createSession(selectedProvider, selectedModel)}
          className="w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Chat Sessions */}
      <div className="flex-1 overflow-y-auto px-2">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`group flex items-center gap-2 px-3 py-2 rounded-lg mb-1 cursor-pointer transition-colors ${
              currentSessionId === session.id
                ? 'bg-gray-800'
                : 'hover:bg-gray-800'
            }`}
            onClick={() => setCurrentSession(session.id)}
          >
            <MessageSquare className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1 truncate text-sm">{session.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteSession(session.id);
              }}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-600 rounded transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Settings Button */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={onOpenSettings}
          className="w-full flex items-center gap-2 hover:bg-gray-800 px-4 py-3 rounded-lg transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}
