"use client";

import React, { useState } from "react";
import { Wallet, ArrowUpRight, Plus, RefreshCcw } from "lucide-react";

interface PayrollBudgetProps {
  totalSalary: number;
}

const PayrollBudget: React.FC<PayrollBudgetProps> = ({ totalSalary }) => {
  const [balance, setBalance] = useState<number>(0); // Default balance set to 0

  const fetchAccountBalance = () => {
    // Simulate fetching balance (mock data)
    const mockBalance = 100; // Replace with actual logic if needed
    setBalance(mockBalance);
  };

  return (
    <div className="bg-[#14161E] border border-[#3B4058]/20 rounded-xl p-6 hover:border-[#3B4058]/50 transition-all">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Payroll Budget</h2>
        <button
          className="text-gray-400 hover:text-white transition-colors"
          onClick={fetchAccountBalance}
        >
          <RefreshCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Wallet Balance */}
      <div className="bg-[#1D202D] rounded-xl p-6 border border-[#3B4058]/20 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <Wallet className="w-10 h-10 text-[#93c5fd]" />
          <div>
            <div className="text-sm text-gray-400">Available Balance</div>
            <div className="text-2xl font-bold text-white">{balance} ETH</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-[#14161E]/50 rounded-lg p-3">
            <div className="text-gray-400">Required</div>
            <div className="font-semibold text-[#93c5fd]">{totalSalary} ETH</div>
          </div>
          <div className="bg-[#14161E]/50 rounded-lg p-3">
            <div className="text-gray-400">Surplus</div>
            <div className="font-semibold text-green-400 overflow-x-auto">
              {balance - totalSalary} ETH
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button
          className="group bg-[#1D202D] hover:bg-[#1D202D]/70 border border-[#3B4058]/20 
                         hover:border-[#3B4058]/50 rounded-xl p-4 transition-all"
        >
          <div className="flex items-center justify-center space-x-2">
            <Plus className="w-5 h-5 text-[#93c5fd] group-hover:scale-110 transition-transform" />
            <span className="text-gray-400 group-hover:text-white transition-colors">
              Add Funds
            </span>
          </div>
        </button>

        <button
          className="group bg-[#1D202D] hover:bg-[#1D202D]/70 border border-[#3B4058]/20 
                         hover:border-[#3B4058]/50 rounded-xl p-4 transition-all"
        >
          <div className="flex items-center justify-center space-x-2">
            <ArrowUpRight className="w-5 h-5 text-[#93c5fd] group-hover:scale-110 transition-transform" />
            <span className="text-gray-400 group-hover:text-white transition-colors">
              Withdraw
            </span>
          </div>
        </button>
      </div>

      {/* Connected Wallet */}
      <div className="mt-6 p-4 bg-[#1D202D]/50 rounded-xl border border-[#3B4058]/20">
        <div className="flex items-center justify-between overflow-x-auto">
          <div>
            <div className="text-sm text-gray-400">Connected Wallet</div>
            <div className="font-mono text-sm mt-1 text-white">N/A</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollBudget;