// components/ModelSelector.tsx
'use client';

import { useChatStore } from '@/store/chat-store';
import { LLM_MODELS, PROVIDER_INFO } from '@/lib/llm-providers';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function ModelSelector() {
  const { selectedProvider, selectedModel, setSelectedProvider, setSelectedModel } = useChatStore();
  const [isOpen, setIsOpen] = useState(false);

  const currentProvider = PROVIDER_INFO[selectedProvider];
  const currentModel = LLM_MODELS[selectedProvider].find((m) => m.id === selectedModel);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
      >
        <div className={`w-3 h-3 rounded-full ${currentProvider.color}`} />
        <div className="text-left">
          <div className="text-sm font-semibold">{currentModel?.name}</div>
          <div className="text-xs text-gray-500">{currentProvider.name}</div>
        </div>
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-xl border z-20 max-h-96 overflow-y-auto">
            {Object.entries(LLM_MODELS).map(([provider, models]) => (
              <div key={provider} className="border-b last:border-b-0">
                <div className="px-4 py-2 bg-gray-50">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${PROVIDER_INFO[provider as keyof typeof PROVIDER_INFO].color}`} />
                    <span className="font-semibold text-sm">{PROVIDER_INFO[provider as keyof typeof PROVIDER_INFO].name}</span>
                  </div>
                </div>
                {models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => {
                      setSelectedProvider(provider as any);
                      setSelectedModel(model.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                      selectedModel === model.id && selectedProvider === provider
                        ? 'bg-blue-50 border-l-2 border-blue-500'
                        : ''
                    }`}
                  >
                    <div className="font-medium text-sm">{model.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{model.description}</div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-400">
                        Context: {(model.contextWindow / 1000).toFixed(0)}K tokens
                      </span>
                      {model.pricing && (
                        <span className="text-xs text-gray-400">
                          ${model.pricing.input}/{model.pricing.output} per 1M tokens
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
