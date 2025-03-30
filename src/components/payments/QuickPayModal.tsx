"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, DollarSign, Users, AlertCircle } from "lucide-react";

interface QuickPayModalProps {
  isOpen: boolean;
  onClose: () => void;
  payEmployees: () => void;
  totalSalary: number;
  network: { name: string };
  account: string;
  employees: any[];
}

const QuickPayModal: React.FC<QuickPayModalProps> = ({
  isOpen,
  onClose,
  payEmployees,
  totalSalary,
  network,
  account,
  employees,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#14161E] w-full max-w-xl mx-4 rounded-2xl border border-[#3B4058]/20 overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#3B4058]/20">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Quick Pay</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Payment Summary */}
            <div className="bg-[#1D202D] rounded-xl p-6 border border-[#3B4058]/20 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-10 h-10 text-[#93c5fd]" />
                  <div>
                    <h3 className="font-semibold text-white">Total Amount</h3>
                    <div className="text-2xl font-bold text-[#93c5fd]">
                      {totalSalary} ETH
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{employees.length} Employees</span>
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    {account.substring(0, 20)}...
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="bg-[#14161E]/50 rounded-lg p-3">
                  <div className="text-gray-400">Gas Fee (Est.)</div>
                  <div className="font-semibold text-green-400">$0.01</div>
                </div>
                <div className="bg-[#14161E]/50 rounded-lg p-3">
                  <div className="text-gray-400">Processing Time</div>
                  <div className="font-semibold text-white">~30 seconds</div>
                </div>
                <div className="bg-[#14161E]/50 rounded-lg p-3">
                  <div className="text-gray-400">Network</div>
                  <div className="font-semibold text-white">{network.name}</div>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20 mb-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-orange-200 font-semibold">Important Notice:</p>
                  <p className="text-orange-200/80 mt-1">
                    This action will process payments for all active employees.
                    Please ensure you have sufficient funds in your wallet
                    before proceeding.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 border-t border-[#3B4058]/20">
            <div className="flex items-center justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-xl border border-[#3B4058]/20 text-gray-400
                         hover:text-white hover:border-[#3B4058]/50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={payEmployees}
                className="px-6 py-2 rounded-xl bg-[#93c5fd]
                         text-white hover:bg-[#93c5fd]/90 transition-all"
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuickPayModal;
