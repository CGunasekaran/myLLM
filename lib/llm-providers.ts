// lib/llm-providers.ts
import { LLMModel, LLMProvider } from '@/types/chat';

export const LLM_MODELS: Record<LLMProvider, LLMModel[]> = {
  openai: [
    {
      id: 'gpt-4-turbo-preview',
      name: 'GPT-4 Turbo',
      provider: 'openai',
      contextWindow: 128000,
      description: 'Most capable model, best for complex tasks',
      pricing: { input: 10, output: 30 }
    },
    {
      id: 'gpt-4',
      name: 'GPT-4',
      provider: 'openai',
      contextWindow: 8192,
      description: 'Previous generation flagship model',
      pricing: { input: 30, output: 60 }
    },
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      provider: 'openai',
      contextWindow: 16385,
      description: 'Fast and efficient for most tasks',
      pricing: { input: 0.5, output: 1.5 }
    }
  ],
  anthropic: [
    {
      id: 'claude-3-opus-20240229',
      name: 'Claude 3 Opus',
      provider: 'anthropic',
      contextWindow: 200000,
      description: 'Most intelligent model, best performance',
      pricing: { input: 15, output: 75 }
    },
    {
      id: 'claude-3-sonnet-20240229',
      name: 'Claude 3 Sonnet',
      provider: 'anthropic',
      contextWindow: 200000,
      description: 'Balanced performance and speed',
      pricing: { input: 3, output: 15 }
    },
    {
      id: 'claude-3-haiku-20240307',
      name: 'Claude 3 Haiku',
      provider: 'anthropic',
      contextWindow: 200000,
      description: 'Fastest model, near-instant responses',
      pricing: { input: 0.25, output: 1.25 }
    }
  ],
  google: [
    {
      id: 'gemini-1.5-pro',
      name: 'Gemini 1.5 Pro',
      provider: 'google',
      contextWindow: 1000000,
      description: 'Long context window, multimodal',
      pricing: { input: 3.5, output: 10.5 }
    },
    {
      id: 'gemini-pro',
      name: 'Gemini Pro',
      provider: 'google',
      contextWindow: 32000,
      description: 'Efficient general-purpose model',
      pricing: { input: 0.5, output: 1.5 }
    }
  ],
  cohere: [
    {
      id: 'command-r-plus',
      name: 'Command R+',
      provider: 'cohere',
      contextWindow: 128000,
      description: 'Advanced RAG capabilities',
      pricing: { input: 3, output: 15 }
    },
    {
      id: 'command-r',
      name: 'Command R',
      provider: 'cohere',
      contextWindow: 128000,
      description: 'Balanced performance',
      pricing: { input: 0.5, output: 1.5 }
    }
  ],
  mistral: [
    {
      id: 'mistral-large-latest',
      name: 'Mistral Large',
      provider: 'mistral',
      contextWindow: 32000,
      description: 'Flagship model with top performance',
      pricing: { input: 4, output: 12 }
    },
    {
      id: 'mistral-medium-latest',
      name: 'Mistral Medium',
      provider: 'mistral',
      contextWindow: 32000,
      description: 'Balanced cost and performance',
      pricing: { input: 2.7, output: 8.1 }
    }
  ],
  ollama: [
    {
      id: 'llama2',
      name: 'Llama 2',
      provider: 'ollama',
      contextWindow: 4096,
      description: 'Open source, runs locally'
    },
    {
      id: 'mistral',
      name: 'Mistral',
      provider: 'ollama',
      contextWindow: 8192,
      description: 'Open source, efficient'
    },
    {
      id: 'codellama',
      name: 'Code Llama',
      provider: 'ollama',
      contextWindow: 4096,
      description: 'Specialized for code generation'
    }
  ],
  huggingface: [
    {
      id: 'meta-llama/Llama-2-70b-chat-hf',
      name: 'Llama 2 70B',
      provider: 'huggingface',
      contextWindow: 4096,
      description: 'Open source large language model'
    }
  ]
};

export const PROVIDER_INFO = {
  openai: {
    name: 'OpenAI',
    description: 'Industry-leading models from OpenAI',
    requiresApiKey: true,
    website: 'https://platform.openai.com',
    color: 'bg-green-500'
  },
  anthropic: {
    name: 'Anthropic',
    description: 'Claude models focused on safety and helpfulness',
    requiresApiKey: true,
    website: 'https://console.anthropic.com',
    color: 'bg-orange-500'
  },
  google: {
    name: 'Google AI',
    description: 'Gemini models with long context windows',
    requiresApiKey: true,
    website: 'https://ai.google.dev',
    color: 'bg-blue-500'
  },
  cohere: {
    name: 'Cohere',
    description: 'Enterprise-focused language models',
    requiresApiKey: true,
    website: 'https://cohere.ai',
    color: 'bg-purple-500'
  },
  mistral: {
    name: 'Mistral AI',
    description: 'Efficient European AI models',
    requiresApiKey: true,
    website: 'https://mistral.ai',
    color: 'bg-indigo-500'
  },
  ollama: {
    name: 'Ollama',
    description: 'Run models locally on your machine',
    requiresApiKey: false,
    website: 'https://ollama.ai',
    color: 'bg-gray-700'
  },
  huggingface: {
    name: 'Hugging Face',
    description: 'Open source model inference',
    requiresApiKey: true,
    website: 'https://huggingface.co',
    color: 'bg-yellow-500'
  }
};
