"use client";

import React from "react";
import {
  Wallet,
  DollarSign,
  Award,
  ArrowUpRight,
} from "lucide-react";

export default function EmployeeOverview({
  employeeInfo,
  employeeTokenInfo,
  employeeHistoryInfo,
}: {
  employeeInfo: { salary?: { $numberDecimal?: string } };
  employeeTokenInfo: { allocated: number }[];
  employeeHistoryInfo: { amount?: { $numberDecimal?: string } }[];
}) {
  const totalTokens = () => {
    return employeeTokenInfo.reduce((sum, token) => sum + token.allocated, 0);
  };

  const totalEarning = () => {
    return employeeHistoryInfo.reduce(
      (sum, history) =>
        sum + (parseFloat(history.amount?.$numberDecimal || "0") || 0),
      0
    );
  };

  return (
    <div className="bg-[#14161E] border border-[#3B4058]/20 rounded-xl p-6 hover:border-[#3B4058]/50 transition-all h-[420px] flex flex-col">
      <h2 className="text-xl font-bold mb-6 text-white">Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-auto">
        <div className="bg-[#14161E] rounded-xl p-4 border border-[#3B4058]/20">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-6 h-6 text-green-400" />
            <div className="flex items-center text-green-400 text-sm">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +12.5%
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-gray-400 text-sm">Total Earnings</div>
            <div className="text-2xl font-bold text-white">{totalEarning().toFixed(6)} ETH</div>
            <div className="text-sm text-gray-400">≈ 45.5 USD</div>
          </div>
        </div>

        <div className="bg-[#14161E] rounded-xl p-4 border border-[#3B4058]/20">
          <div className="flex items-center justify-between mb-4">
            <Wallet className="w-6 h-6 text-[#93c5fd]" />
            <div className="flex items-center text-yellow-400 text-sm">Pending</div>
          </div>
          <div className="space-y-1">
            <div className="text-gray-400 text-sm">Next Payment</div>
            <div className="text-2xl font-bold text-white">
              {employeeInfo.salary?.$numberDecimal || "0"} ETH
            </div>
            <div className="text-sm text-gray-400">Due in 5 days</div>
          </div>
        </div>

        <div className="bg-[#14161E] rounded-xl p-4 border border-[#3B4058]/20">
          <div className="flex items-center justify-between mb-4">
            <Award className="w-6 h-6 text-[#93c5fd]" />
            <div className="flex items-center text-green-400 text-sm">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +8.3%
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-gray-400 text-sm">ESOP Tokens</div>
            <div className="text-2xl font-bold text-white">{totalTokens()}</div>
            <div className="text-sm text-gray-400">{totalTokens()} vested</div>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Vesting Progress</span>
            <span className="text-[#93c5fd]">60%</span>
          </div>
          <div className="h-2 bg-[#1D202D] rounded-full overflow-hidden">
            <div
              className="h-full w-[60%] bg-gradient-to-r from-[#3B4058] to-[#93c5fd] rounded-full"
              style={{ transition: "width 1s ease-in-out" }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Performance Metrics</span>
            <span className="text-green-400">85%</span>
          </div>
          <div className="h-2 bg-[#1D202D] rounded-full overflow-hidden">
            <div
              className="h-full w-[85%] bg-gradient-to-r from-[#3B4058] to-[#93c5fd] rounded-full"
              style={{ transition: "width 1s ease-in-out" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}