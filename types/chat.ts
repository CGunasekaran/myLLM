// types/chat.ts
export type LLMProvider = 
  | 'openai'
  | 'anthropic'
  | 'google'
  | 'cohere'
  | 'mistral'
  | 'ollama'
  | 'huggingface';

export interface LLMModel {
  id: string;
  name: string;
  provider: LLMProvider;
  contextWindow: number;
  description: string;
  pricing?: {
    input: number;  // per 1M tokens
    output: number;
  };
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  model?: string;
  provider?: LLMProvider;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  model: string;
  provider: LLMProvider;
}

export interface ChatSettings {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  systemPrompt?: string;
}

export interface APIKeys {
  openai?: string;
  anthropic?: string;
  google?: string;
  cohere?: string;
  mistral?: string;
  huggingface?: string;
}
