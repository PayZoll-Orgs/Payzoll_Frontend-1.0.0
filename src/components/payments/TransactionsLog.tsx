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
  },
  {
    id: 2,
    contract: "0xAC123DEF",
    payment: "$25,000",
    block: "Fx6782345",
    status: "pending",
  },
  {
    id: 3,
    contract: "0x9876ABC",
    payment: "$75,000",
    block: "Fx3457821",
    status: "failed",
  },
];

// Status Icon Component
interface StatusIconProps {
  status: "completed" | "pending" | "failed";
}

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  if (status === "completed") return <CheckCircle className="w-4 h-4 text-green-400" />;
  if (status === "pending") return <Clock className="w-4 h-4 text-yellow-400" />;
  return <XCircle className="w-4 h-4 text-red-400" />;
};

// TransactionsLog Component
const TransactionsLog = () => {
  const [search, setSearch] = useState("");

  // Filtered Transactions
  const filteredTransactions = transactions.filter(
    (t) =>
      t.contract.toLowerCase().includes(search.toLowerCase()) ||
      t.payment.toLowerCase().includes(search.toLowerCase()) ||
      t.block.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full bg-[#14161E] border border-[#3B4058]/20 rounded-xl p-6 
                    hover:border-[#3B4058]/50 transition-all shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold logo-gradient-text">Transaction Log</h2>
        <button className="bg-[#1D202D] text-white px-4 py-2 rounded-xl flex items-center space-x-2 shadow-md
                           hover:bg-[#252837] transition-all">
          <Download className="w-5 h-5" />
          <span className="font-bold logo-gradient-text">Export</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#1D202D] border border-[#3B4058]/20 text-white rounded-xl py-2 pl-10 pr-4
                     focus:outline-none focus:ring-2 focus:ring-[#98E4C9]/50 transition-all"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((tx, index) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex justify-between items-center p-4 rounded-xl border border-[#3B4058]/20 
                          ${
                            tx.status === "completed"
                              ? "bg-green-500/10"
                              : tx.status === "pending"
                              ? "bg-yellow-500/10"
                              : "bg-red-500/10"
                          }`}
            >
              <div>
                <h3 className="text-lg font-semibold text-white">{tx.contract}</h3>
                <p className="text-sm text-gray-400">{tx.payment}</p>
                <p className="text-sm text-gray-400">{tx.block}</p>
              </div>
              <div className="flex items-center space-x-2">
                <StatusIcon status={tx.status} />
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold
                              ${
                                tx.status === "completed"
                                  ? "bg-green-400/10 text-green-400"
                                  : tx.status === "pending"
                                  ? "bg-yellow-400/10 text-yellow-400"
                                  : "bg-red-400/10 text-red-400"
                              }`}
                >
                  {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                </span>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-400">No transactions found.</p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between text-sm">
        <span className="text-gray-400">
          Showing recent {filteredTransactions.length} transaction
          {filteredTransactions.length !== 1 ? "s" : ""}
        </span>
        <button className="text-indigo-400 hover:text-indigo-300 transition-colors">
          View All Transactions
        </button>
      </div>
    </div>
  );
};

export default TransactionsLog;
