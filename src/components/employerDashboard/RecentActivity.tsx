"use client";

import React, { useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";

const statusColors: Record<string, string> = {
  completed: "text-green-400 bg-green-400/10",
  pending: "text-yellow-400 bg-yellow-400/10",
  failed: "text-red-400 bg-red-400/10",
};

const RecentActivity: React.FC = () => {
  // Mock data for payroll history
  const [payrollHistory] = useState<any[]>([
    {
      totalAmount: { $numberDecimal: "500" },
      createdAt: "2025-03-01T12:00:00Z",
      status: "completed",
      team: "Engineering Team",
    },
    {
      totalAmount: { $numberDecimal: "300" },
      createdAt: "2025-03-15T12:00:00Z",
      status: "pending",
      team: "Marketing Team",
    },
  ]);

  return (
    <div className="bg-[#14161E] border border-[#3B4058]/20 rounded-xl p-6 h-[500px] flex flex-col hover:border-[#3B4058]/50 transition-all">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Recent Activity
          </h2>
          <p className="text-gray-400 text-sm mt-1">Last 30 days</p>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search transactions..."
            className="bg-[#1D202D] border border-[#3B4058]/20 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#93c5fd] transition-colors w-48"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
        {payrollHistory.map((payroll, index) => (
          <div
            key={index}
            className="group/item bg-[#1D202D]/50 rounded-xl p-4 border border-[#3B4058]/20 hover:border-[#3B4058]/50 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <ArrowUpRight className="w-6 h-6 text-[#93c5fd] transform transition-transform group-hover/item:scale-110" />
                <div>
                  <div className="font-semibold text-white">
                    Salary Payment
                  </div>
                  <div className="text-sm text-gray-400">{payroll.team}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-white">
                  {payroll.totalAmount?.$numberDecimal || "N/A"}
                </div>
                <div className="text-sm text-gray-400">$500</div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 text-sm">
              <span
                className={`px-3 py-1 rounded-full ${statusColors[payroll.status]}`}
              >
                {payroll.status.charAt(0).toUpperCase() + payroll.status.slice(1)}
              </span>
              <span className="text-gray-400">March 1, 2025</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center pt-4 border-t border-[#3B4058]/20">
        <div className="text-sm text-gray-400">Showing {payrollHistory.length} transactions</div>
        <button className="text-[#93c5fd] hover:text-[#93c5fd]/80 transition-colors text-sm font-medium">
          View All Transactions
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;