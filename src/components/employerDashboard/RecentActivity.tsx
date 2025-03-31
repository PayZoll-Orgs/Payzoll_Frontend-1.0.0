"use client";

import React, { useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import "../../styles/gradients.css";

const statusColors: Record<string, string> = {
  completed: "text-green-400 bg-green-400/10",
  pending: "text-yellow-400 bg-yellow-400/10",
  failed: "text-red-400 bg-red-400/10",
};

const RecentActivity: React.FC = () => {
  // Mock data for payroll history
  const [payrollHistory] = useState<{
    totalAmount: { $numberDecimal: string };
    createdAt: string;
    status: string;
    team: string;
  }[]>([
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
    <div className="w-full bg-[#14161E] border border-[#3B4058]/30 rounded-xl p-4 md:p-6 h-[400px] md:h-[500px] flex flex-col hover:border-[#93c5fd]/30 transition-all shadow-lg overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[#c8ceee] font-mono text-shadow-glow">
            Employee Transaction History
          </h2>
          <p className="text-gray-400 text-xs md:text-sm mt-1 font-mono">Recent payment activities</p>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search transactions..."
            className="bg-[#0c0e14] border border-[#3B4058]/30 text-white rounded-xl py-2 pl-10 pr-4 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#93c5fd]/50 transition-all font-mono w-full sm:w-48"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#93c5fd]/60" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 md:space-y-4 pr-2">
        {payrollHistory.map((payroll, index) => (
          <div
            key={index}
            className="group/item bg-[#1D202D]/50 rounded-xl p-3 md:p-4 border border-[#3B4058]/30 hover:border-[#3B4058]/50 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 md:space-x-4">
                <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-[#93c5fd] transform transition-transform group-hover/item:scale-110" />
                <div>
                  <div className="font-semibold text-[#c8ceee] font-mono text-sm md:text-base">
                    Salary Payment
                  </div>
                  <div className="text-xs md:text-sm text-gray-400 font-mono">{payroll.team}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-[#c8ceee] font-mono text-sm md:text-base">
                  {payroll.totalAmount?.$numberDecimal || "N/A"}
                </div>
                <div className="text-xs md:text-sm text-gray-400 font-mono">$500</div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 md:mt-4 text-xs md:text-sm">
              <span
                className={`px-2 md:px-3 py-1 rounded-full ${statusColors[payroll.status]} font-mono`}
              >
                {payroll.status.charAt(0).toUpperCase() + payroll.status.slice(1)}
              </span>
              <span className="text-gray-400 font-mono">March 1, 2025</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 md:mt-4 flex justify-between items-center pt-3 md:pt-4 border-t border-[#3B4058]/20">
        <div className="text-xs md:text-sm text-gray-400 font-mono">Showing {payrollHistory.length} transactions</div>
        <button className="text-[#93c5fd] hover:text-[#93c5fd]/80 transition-colors text-xs md:text-sm font-medium font-mono">
          View All Transactions
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;