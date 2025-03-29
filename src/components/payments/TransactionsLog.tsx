"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import "../../styles/gradients.css";

interface Transaction {
  id: number;
  type: string;
  amount: string;
  timestamp: string; // Directly display the timestamp
  status: "completed" | "pending" | "failed";
  recipient: string;
  txHash: string;
}

const transactions: Transaction[] = [
  {
    id: 1,
    type: "Salary Payment",
    amount: "-$98,500",
    timestamp: "2 hours ago",
    status: "completed",
    recipient: "Engineering Team (45 employees)",
    txHash: "0x1234...5678",
  },
  {
    id: 2,
    type: "Add Funds",
    amount: "+$150,000",
    timestamp: "1 day ago",
    status: "completed",
    recipient: "Company Wallet",
    txHash: "0x8765...4321",
  },
  {
    id: 3,
    type: "Bonus Payment",
    amount: "-$25,000",
    timestamp: "2 days ago",
    status: "pending",
    recipient: "Sales Team (12 employees)",
    txHash: "Pending...",
  },
];

const statusColors = {
  completed: "text-green-400 bg-green-400/10",
  pending: "text-yellow-400 bg-yellow-400/10",
  failed: "text-red-400 bg-red-400/10",
};

const StatusIcon: React.FC<{ status: string }> = ({ status }) => {
  if (status === "completed") return <CheckCircle className="w-4 h-4" />;
  if (status === "pending") return <Clock className="w-4 h-4" />;
  return <XCircle className="w-4 h-4" />;
};

const TransactionsLog: React.FC<{ payrollHistory: Transaction[] }> = ({ payrollHistory }) => {
  return (
    <div className="bg-[#14161E] border border-[#3B4058]/20 rounded-xl p-6 hover:border-[#3B4058]/50 transition-all">
      <h2 className="text-xl font-bold mb-6 logo-gradient-text">Transaction Log</h2>

      <div className="flex justify-between items-center mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full bg-[#1D202D] border border-[#3B4058]/20 text-white rounded-xl py-2 pl-10 pr-4
                     focus:outline-none focus:ring-2 focus:ring-[#98E4C9]/50 transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        <button className="bg-[#1D202D] text-white px-4 py-2 rounded-xl flex items-center space-x-2 ml-4">
          <Download className="w-5 h-5" />
          <span className="font-bold logo-gradient-text">Export</span>
        </button>
      </div>

      <div className="space-y-4">
        {payrollHistory.map((payroll, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex justify-between items-center p-4 rounded-xl border border-[#3B4058]/20 
                        ${payroll.status === "completed" ? "bg-green-500/10" : payroll.status === "pending" ? "bg-yellow-500/10" : "bg-red-500/10"}`}
          >
            <div>
              <h3 className="text-lg font-semibold text-white">{payroll.amount}</h3>
              <p className="text-sm text-gray-400">{payroll.timestamp}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs ${payroll.status === "completed" ? "bg-green-400/10 text-green-400" : payroll.status === "pending" ? "bg-yellow-400/10 text-yellow-400" : "bg-red-400/10 text-red-400"}`}>
              {payroll.status.charAt(0).toUpperCase() + payroll.status.slice(1)}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between text-sm">
        <span className="text-gray-400">
          Showing recent {payrollHistory.length} transactions
        </span>
        <button className="text-indigo-400 hover:text-indigo-300 transition-colors">
          View All Transactions
        </button>
      </div>
    </div>
  );
};

export default TransactionsLog;