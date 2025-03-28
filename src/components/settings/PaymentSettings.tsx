"use client";

import React, { useState } from "react";
import { Wallet, Clock, DollarSign, Settings, AlertTriangle } from "lucide-react";

const PaymentSettings: React.FC = () => {
  const [recurringPayments, setRecurringPayments] = useState(false);

  return (
    <div className="space-y-6">
      {/* Default Payment Method */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Default Payment Method</h2>
            <p className="text-sm text-gray-400">Configure your preferred payment settings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Primary Currency</label>
            <select className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2 px-4 focus:outline-none focus:border-indigo-500 transition-colors">
              <option value="eth">ETH - Ethereum</option>
              <option value="usdt">USDT - Tether</option>
              <option value="usdc">USDC - USD Coin</option>
              <option value="dai">DAI - Dai</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Gas Fee Strategy</label>
            <select className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2 px-4 focus:outline-none focus:border-indigo-500 transition-colors">
              <option value="standard">Standard</option>
              <option value="fast">Fast</option>
              <option value="instant">Instant</option>
            </select>
          </div>
        </div>
      </div>

      {/* Recurring Payments */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Recurring Payments</h2>
            <p className="text-sm text-gray-400">Set up automated payment schedules</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={recurringPayments} onChange={() => setRecurringPayments(!recurringPayments)} />
          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
        </label>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/20 transition-all">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default PaymentSettings;
