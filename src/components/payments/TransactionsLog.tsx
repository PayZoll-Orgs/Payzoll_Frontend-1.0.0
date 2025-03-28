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
    <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Transaction History</h2>

        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-crypto-dark rounded-lg text-gray-400 hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-crypto-dark rounded-lg text-gray-400 hover:text-white transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {payrollHistory.map((payroll, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-crypto-dark/50 rounded-xl p-4 border border-gray-800 hover:border-indigo-500/50 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transform 
                              transition-transform group-hover:scale-110 bg-gradient-to-r
                              from-indigo-600 to-purple-600`}
                >
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-white transition-colors">
                    {payroll.type}
                  </h3>
                  <div className="text-sm text-gray-400">{payroll.recipient}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-300">
                  {payroll.amount}
                </div>
                <div className="text-sm text-gray-400">{payroll.timestamp}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="text-gray-400">
                Tx: <span className="font-mono">{payroll.txHash}</span>
              </div>
              <div
                className={`flex items-center space-x-1 px-2 py-1 rounded-full ${statusColors[payroll.status]}`}
              >
                <StatusIcon status={payroll.status} />
                <span>{payroll.status.charAt(0).toUpperCase() + payroll.status.slice(1)}</span>
              </div>
            </div>
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