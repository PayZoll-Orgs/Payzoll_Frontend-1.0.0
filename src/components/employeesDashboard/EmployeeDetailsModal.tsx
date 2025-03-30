"use client";

import React from "react";
import "./scrollbar-styles.css";
import { motion, AnimatePresence } from "framer-motion";
import { X, Briefcase, Wallet, Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface Payment {
  id: string;
  amount: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

interface Employee {
  name: string;
  designation: string;
  salary: string;
  walletAddress: string;
  paymentHistory?: Payment[]; // Optional payment history
}

interface EmployeeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
}

const EmployeeDetailsModal: React.FC<EmployeeDetailsModalProps> = ({ isOpen, onClose, employee }) => {
  if (!isOpen || !employee) return null;

  // Mock payment history if none provided
  const paymentHistory = employee.paymentHistory || [
    { id: "pay123", amount: employee.salary, date: "March 28, 2025", status: "completed" },
    { id: "pay456", amount: employee.salary, date: "February 28, 2025", status: "completed" },
    { id: "pay789", amount: employee.salary, date: "January 28, 2025", status: "completed" },
  ];

  // Status color mapping
  const statusColors: Record<string, string> = {
    completed: "text-green-400 bg-green-400/10",
    pending: "text-yellow-400 bg-yellow-400/10",
    failed: "text-red-400 bg-red-400/10",
  };

  // Status icon mapping
  const StatusIcon = ({ status }: { status: string }) => {
    if (status === "completed") return <CheckCircle className="w-4 h-4 text-green-400" />;
    if (status === "pending") return <Clock className="w-4 h-4 text-yellow-400" />;
    return <AlertCircle className="w-4 h-4 text-red-400" />;
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-crypto-card w-full max-w-xl mx-4 rounded-2xl border border-gray-800 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <h2 className="text-xl font-bold">Employee Details</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Employee Info */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400">Name</label>
                <p className="text-lg font-semibold">{employee.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-gray-400" />
                <div>
                  <label className="text-sm text-gray-400">Designation</label>
                  <p className="text-lg font-semibold">{employee.designation}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-gray-400" />
                <div>
                  <label className="text-sm text-gray-400">Wallet Address</label>
                  <p className="text-lg font-semibold">{employee.walletAddress}</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400">Monthly Salary (USD)</label>
                <p className="text-lg font-semibold">${employee.salary}</p>
              </div>
            </div>

            {/* Payment History Section */}
            <div className="pt-4 border-t border-gray-800">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                Payment History
              </h3>
              
              <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-hide">
                {paymentHistory.map((payment) => (
                  <div 
                    key={payment.id}
                    className="bg-[#1D202D]/50 rounded-xl p-4 border border-[#3B4058]/20 hover:border-[#3B4058]/50 transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <StatusIcon status={payment.status} />
                        <span className="ml-2 font-medium">${payment.amount}</span>
                      </div>
                      <span className="text-sm text-gray-400">{payment.date}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${statusColors[payment.status]}`}
                      >
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                      <span className="text-xs text-gray-400">TX: {payment.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="p-6 border-t border-gray-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmployeeDetailsModal;