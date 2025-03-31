"use client";

import React from "react";
import "./scrollbar-styles.css";
import { motion, AnimatePresence } from "framer-motion";
import { X, Briefcase, Wallet, Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react";
import "../../styles/gradients.css";

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
    pending: "text-[#B38D36] bg-[#B38D36]/10",
    failed: "text-red-400 bg-red-400/10",
  };

  // Status icon mapping
  const StatusIcon = ({ status }: { status: string }) => {
    if (status === "completed") return <CheckCircle className="w-4 h-4 text-green-400" />;
    if (status === "pending") return <Clock className="w-4 h-4 text-[#B38D36]" />;
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
          className="bg-[#131620] w-full max-w-xl mx-4 rounded-2xl border border-[#22304a]/30 overflow-hidden shadow-lg"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          {/* Header */}
          <div className="p-6 border-b border-[#22304a]/30 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#F2F2F2] font-mono" style={{
              textShadow: "0 0 5px rgba(45, 139, 117, 0.5), 0 0 10px rgba(45, 139, 117, 0.3)"
            }}>Employee Details</h2>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Employee Info */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 font-mono">Name</label>
                <p className="text-lg font-semibold text-[#F2F2F2] font-mono">{employee.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#2D8B75]" />
                <div>
                  <label className="text-sm text-gray-400 font-mono">Designation</label>
                  <p className="text-lg font-semibold text-[#F2F2F2] font-mono">{employee.designation}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-[#2D8B75]" />
                <div>
                  <label className="text-sm text-gray-400 font-mono">Wallet Address</label>
                  <p className="text-lg font-semibold text-[#F2F2F2] font-mono">{employee.walletAddress}</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 font-mono">Monthly Salary (USD)</label>
                <p className="text-lg font-semibold text-[#F2F2F2] font-mono">${employee.salary}</p>
              </div>
            </div>

            {/* Payment History Section */}
            <div className="pt-4 border-t border-[#22304a]/30">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-[#F2F2F2] font-mono" style={{
                textShadow: "0 0 5px rgba(45, 139, 117, 0.3), 0 0 10px rgba(45, 139, 117, 0.2)"
              }}>
                <Calendar className="w-5 h-5 text-[#2D8B75] mr-2" />
                Payment History
              </h3>
              
              <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-hide">
                {paymentHistory.map((payment) => (
                  <div 
                    key={payment.id}
                    className="bg-[#0c0f16] rounded-xl p-4 border border-[#22304a]/30 hover:border-[#2D8B75]/30 transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <StatusIcon status={payment.status} />
                        <span className="ml-2 font-medium text-[#F2F2F2] font-mono">${payment.amount}</span>
                      </div>
                      <span className="text-sm text-gray-400 font-mono">{payment.date}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${statusColors[payment.status]} font-mono`}
                      >
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">TX: {payment.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="p-6 border-t border-[#22304a]/30 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-[#0c0f16] hover:bg-[#22304a] text-white transition-colors border border-[#22304a]/30 font-mono"
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