// components/SettingsPanel.tsx
'use client';

import { useChatStore } from '@/store/chat-store';
import { PROVIDER_INFO } from '@/lib/llm-providers';
import { X, Key, Sliders } from 'lucide-react';

interface SettingsPanelProps {
  onClose: () => void;
}

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { apiKeys, setApiKey, settings, updateSettings } = useChatStore();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* API Keys Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Key className="w-5 h-5" />
              <h3 className="text-lg font-semibold">API Keys</h3>
            </div>
            <div className="space-y-4">
              {Object.entries(PROVIDER_INFO).map(([provider, info]) => {
                if (!info.requiresApiKey) return null;
                
                return (
                  <div key={provider}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {info.name}
                    </label>
                    <input
                      type="password"
                      value={apiKeys[provider as keyof typeof apiKeys] || ''}
                      onChange={(e) => setApiKey(provider as any, e.target.value)}
                      placeholder={`Enter ${info.name} API key`}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <a
                      href={info.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 hover:underline mt-1 inline-block"
                    >
                      Get API key →
                    </a>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Model Parameters Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Sliders className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Model Parameters</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temperature: {settings.temperature}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={settings.temperature}
                  onChange={(e) => updateSettings({ temperature: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Lower = more focused, Higher = more creative
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Tokens: {settings.maxTokens}
                </label>
                <input
                  type="range"
                  min="256"
                  max="4096"
                  step="256"
                  value={settings.maxTokens}
                  onChange={(e) => updateSettings({ maxTokens: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Top P: {settings.topP}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.topP}
                  onChange={(e) => updateSettings({ topP: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4">
          <button
            onClick={onClose}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
