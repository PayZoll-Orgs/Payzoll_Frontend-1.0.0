"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Download, CheckCircle, XCircle, Clock } from "lucide-react";
import "../../styles/gradients.css";

// Mock Transaction Data
const transactions = [
  {
    id: 1,
    contract: "0x82838092",
    payment: "$50,000",
    block: "Fx7182736",
    status: "completed",
    timestamp: "2023-06-15 14:30:22"
  },
  {
    id: 2,
    contract: "0xAC123DEF",
    payment: "$25,000",
    block: "Fx6782345",
    status: "pending",
    timestamp: "2023-06-14 09:45:11"
  },
  {
    id: 3,
    contract: "0x9876ABC",
    payment: "$75,000",
    block: "Fx3457821",
    status: "failed",
    timestamp: "2023-06-13 17:22:05"
  },
];

// Status Icon Component
interface StatusIconProps {
  status: "completed" | "pending" | "failed";
}

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  if (status === "completed") return <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />;
  if (status === "pending") return <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-[#93c5fd]" />;
  return <XCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />;
};

// TransactionsLog Component
const TransactionsLog = () => {
  const [search, setSearch] = useState("");

  // Filtered Transactions
  const filteredTransactions = transactions.filter(
    (t) =>
      t.contract.toLowerCase().includes(search.toLowerCase()) ||
      t.payment.toLowerCase().includes(search.toLowerCase()) ||
      t.block.toLowerCase().includes(search.toLowerCase()) ||
      t.timestamp.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full bg-[#14161E] border border-[#3B4058]/30 rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 
                    hover:border-[#93c5fd]/30 transition-all shadow-lg">
      {/* Header */}
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-3 sm:mb-4 md:mb-5 lg:mb-6 gap-2 xs:gap-0">
        <h2 className="text-lg sm:text-xl font-bold text-[#c8ceee] font-mono text-shadow-glow">Transaction Log</h2>
        <button 
          className="bg-[#1D202D] text-white px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-xl flex items-center space-x-1 sm:space-x-2 shadow-md
                   hover:bg-[#252837] transition-all border border-[#3B4058]/30 text-xs sm:text-sm"
          aria-label="Export transactions"
        >
          <Download className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#93c5fd]" />
          <span className="font-bold font-mono">Export</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-2 sm:mb-3 md:mb-4">
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0c0e14] border border-[#3B4058]/30 text-white rounded-xl py-1 sm:py-2 pl-8 sm:pl-10 pr-3 sm:pr-4
                     focus:outline-none focus:ring-2 focus:ring-[#93c5fd]/50 transition-all font-mono text-xs sm:text-sm"
        />
        <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-[#93c5fd]/60" />
      </div>

      {/* Transactions List */}
      <div className="space-y-2 sm:space-y-3 md:space-y-4">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((tx, index) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 sm:p-3 md:p-4 rounded-xl border border-[#3B4058]/30 
                          ${
                            tx.status === "completed"
                              ? "bg-[#14161E]"
                              : tx.status === "pending"
                              ? "bg-[#14161E]"
                              : "bg-[#14161E]"
                          }`}
            >
              <div className="mb-2 sm:mb-0">
                <h3 className="text-base sm:text-lg font-semibold text-white font-mono">{tx.contract}</h3>
                <p className="text-xs sm:text-sm text-gray-400 font-mono">{tx.payment}</p>
                <p className="text-xs sm:text-sm text-gray-400 font-mono">{tx.block}</p>
              </div>
              <div className="flex items-center space-x-2 self-end sm:self-auto">
                {/* <StatusIcon status={tx.status as "completed" | "pending" | "failed"} /> */}
                <span
                  className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold font-mono
                              bg-green-400/10 text-green-400`}
                >
                  {tx.timestamp}
                </span>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-400 font-mono text-xs sm:text-sm">No transactions found.</p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 md:pt-4 border-t border-[#3B4058]/30 flex flex-col xs:flex-row items-start xs:items-center justify-between text-xs sm:text-sm gap-2 xs:gap-0">
        <span className="text-gray-400 font-mono">
          Showing recent {filteredTransactions.length} transaction
          {filteredTransactions.length !== 1 ? "s" : ""}
        </span>
        <button className="text-[#93c5fd] hover:text-[#93c5fd]/80 transition-colors font-mono">
          View All Transactions
        </button>
      </div>
    </div>
  );
};

export default TransactionsLog;
