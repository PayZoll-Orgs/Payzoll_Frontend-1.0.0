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
    <div className="bg-[#14161E] border border-[#3B4058]/20 rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 hover:border-[#3B4058]/50 transition-all">
      <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-5 lg:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-white">Payroll Budget</h2>
        <button
          className="text-gray-400 hover:text-white transition-colors"
          onClick={fetchAccountBalance}
          aria-label="Refresh balance"
        >
          <RefreshCcw className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Wallet Balance */}
      <div className="bg-[#1D202D] rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 border border-[#3B4058]/20 mb-3 sm:mb-4 md:mb-5 lg:mb-6">
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 mb-2 sm:mb-3 md:mb-4">
          <Wallet className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-[#93c5fd]" />
          <div>
            <div className="text-xs sm:text-sm text-gray-400">Available Balance</div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">{balance} ETH</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm">
          <div className="bg-[#14161E]/50 rounded-lg p-2 sm:p-3">
            <div className="text-gray-400">Required</div>
            <div className="font-semibold text-[#93c5fd]">{totalSalary} ETH</div>
          </div>
          <div className="bg-[#14161E]/50 rounded-lg p-2 sm:p-3">
            <div className="text-gray-400">Surplus</div>
            <div className="font-semibold text-green-400 overflow-x-auto">
              {balance - totalSalary} ETH
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
        <button
          className="group bg-[#1D202D] hover:bg-[#1D202D]/70 border border-[#3B4058]/20 
                         hover:border-[#3B4058]/50 rounded-xl p-3 sm:p-4 transition-all"
        >
          <div className="flex items-center justify-center space-x-2">
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-[#93c5fd] group-hover:scale-110 transition-transform" />
            <span className="text-xs sm:text-sm text-gray-400 group-hover:text-white transition-colors">
              Add Funds
            </span>
          </div>
        </button>

        <button
          className="group bg-[#1D202D] hover:bg-[#1D202D]/70 border border-[#3B4058]/20 
                         hover:border-[#3B4058]/50 rounded-xl p-3 sm:p-4 transition-all"
        >
          <div className="flex items-center justify-center space-x-2">
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#93c5fd] group-hover:scale-110 transition-transform" />
            <span className="text-xs sm:text-sm text-gray-400 group-hover:text-white transition-colors">
              Withdraw
            </span>
          </div>
        </button>
      </div>

      {/* Connected Wallet */}
      <div className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 p-2 sm:p-3 md:p-4 bg-[#1D202D]/50 rounded-xl border border-[#3B4058]/20">
        <div className="flex items-center justify-between overflow-x-auto">
          <div>
            <div className="text-xs sm:text-sm text-gray-400">Connected Wallet</div>
            <div className="font-mono text-xs sm:text-sm mt-1 text-white">N/A</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollBudget;