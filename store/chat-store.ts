// store/chat-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatSession, Message, ChatSettings, APIKeys, LLMProvider } from '@/types/chat';

interface ChatStore {
  // Sessions
  sessions: ChatSession[];
  currentSessionId: string | null;
  
  // Settings
  settings: ChatSettings;
  apiKeys: APIKeys;
  selectedProvider: LLMProvider;
  selectedModel: string;
  
  // Actions
  createSession: (provider: LLMProvider, model: string) => void;
  deleteSession: (sessionId: string) => void;
  setCurrentSession: (sessionId: string) => void;
  addMessage: (sessionId: string, message: Message) => void;
  updateSettings: (settings: Partial<ChatSettings>) => void;
  setApiKey: (provider: LLMProvider, key: string) => void;
  setSelectedProvider: (provider: LLMProvider) => void;
  setSelectedModel: (model: string) => void;
  clearAllSessions: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      sessions: [],
      currentSessionId: null,
      settings: {
        temperature: 0.7,
        maxTokens: 2048,
        topP: 1,
        frequencyPenalty: 0,
        presencePenalty: 0,
      },
      apiKeys: {},
      selectedProvider: 'openai',
      selectedModel: 'gpt-3.5-turbo',

      createSession: (provider, model) => {
        const newSession: ChatSession = {
          id: crypto.randomUUID(),
          title: 'New Chat',
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          model,
          provider,
        };
        
        set((state) => ({
          sessions: [newSession, ...state.sessions],
          currentSessionId: newSession.id,
        }));
      },

      deleteSession: (sessionId) => {
        set((state) => ({
          sessions: state.sessions.filter((s) => s.id !== sessionId),
          currentSessionId:
            state.currentSessionId === sessionId
              ? state.sessions[0]?.id || null
              : state.currentSessionId,
        }));
      },

      setCurrentSession: (sessionId) => {
        set({ currentSessionId: sessionId });
      },

      addMessage: (sessionId, message) => {
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === sessionId
              ? {
                  ...session,
                  messages: [...session.messages, message],
                  updatedAt: new Date(),
                  title:
                    session.messages.length === 0
                      ? message.content.slice(0, 50)
                      : session.title,
                }
              : session
          ),
        }));
      },

      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },

      setApiKey: (provider, key) => {
        set((state) => ({
          apiKeys: { ...state.apiKeys, [provider]: key },
        }));
      },

      setSelectedProvider: (provider) => {
        set({ selectedProvider: provider });
      },

      setSelectedModel: (model) => {
        set({ selectedModel: model });
      },

      clearAllSessions: () => {
        set({ sessions: [], currentSessionId: null });
      },
    }),
    {
      name: 'llm-hub-storage',
    }
  )
);
