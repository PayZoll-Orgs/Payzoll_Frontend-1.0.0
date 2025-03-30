"use client";

import React, { useState } from "react";
import { 
  Key, Copy, Eye, EyeOff, 
  Plus, Trash2, RefreshCcw, AlertTriangle 
} from "lucide-react";

const APISettings: React.FC = () => {
  const [showKey, setShowKey] = useState(false);

  const apiKeys = [
    {
      id: 1,
      name: "Production API Key",
      key: "sk_live_123...abc",
      created: "2024-01-15",
      lastUsed: "2 hours ago",
      permissions: ["read", "write"],
      status: "active"
    },
    {
      id: 2,
      name: "Development API Key",
      key: "sk_test_456...xyz",
      created: "2024-01-10",
      lastUsed: "1 day ago",
      permissions: ["read"],
      status: "active"
    }
  ];

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    // Add toast notification here
  };

  return (
    <div className="space-y-6">
      {/* API Keys Section */}
      <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
              <Key className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">API Keys</h2>
              <p className="text-sm text-gray-400">Manage your API access tokens</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white hover:shadow-lg transition-all">
            <Plus className="w-4 h-4" /> Generate New Key
          </button>
        </div>

        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="bg-crypto-dark rounded-xl p-4 border border-gray-800 hover:border-indigo-500/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold">{apiKey.name}</h3>
                  <div className="text-sm text-gray-400">Created: {apiKey.created} • Last used: {apiKey.lastUsed}</div>
                </div>
                <div className="flex space-x-3">
                  <button onClick={() => setShowKey(!showKey)} className="text-gray-400 hover:text-white transition-colors">
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button onClick={() => handleCopyKey(apiKey.key)} className="text-gray-400 hover:text-white transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <RefreshCcw className="w-4 h-4" />
                  </button>
                  <button className="text-red-400 hover:text-red-300 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="font-mono text-sm bg-crypto-card/50 p-2 rounded">
                {showKey ? apiKey.key : "•".repeat(20)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-yellow-200 font-semibold">Security Notice:</p>
              <p className="text-yellow-200/80 mt-1">
                Keep your API keys secure and never share them publicly. Rotate keys regularly
                and revoke any that may have been compromised.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APISettings;
