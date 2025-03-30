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
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#14161E] w-full max-w-xl rounded-2xl border border-[#3B4058]/30 overflow-hidden font-mono"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 md:p-6 border-b border-[#3B4058]/30">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-[#c8ceee] text-shadow-glow">Quick Pay</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-[#93c5fd] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5 md:p-6">
            {/* Payment Summary */}
            <div className="bg-[#0c0e14] rounded-xl p-4 sm:p-5 md:p-6 border border-[#3B4058]/30 mb-4 sm:mb-5 md:mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3 sm:gap-0">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#93c5fd]/10 p-2 sm:p-3 rounded-full">
                    <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#93c5fd]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-300 text-sm sm:text-base">Total Amount</h3>
                    <div className="text-xl sm:text-2xl font-bold text-[#93c5fd]">
                      {totalSalary} ETH
                    </div>
                  </div>
                </div>
                <div className="text-left sm:text-right w-full sm:w-auto">
                  <div className="flex items-center space-x-2 text-gray-400 text-xs sm:text-sm">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 text-[#93c5fd]/60" />
                    <span>{employees.length} Employees</span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 mt-1 truncate max-w-[200px] sm:max-w-none">
                    {account.substring(0, 10)}...{account.substring(account.length - 4)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm">
                <div className="bg-[#14161E] rounded-lg p-2 sm:p-3 border border-[#3B4058]/20">
                  <div className="text-gray-400">Gas Fee (Est.)</div>
                  <div className="font-semibold text-[#93c5fd]">$0.01</div>
                </div>
                <div className="bg-[#14161E] rounded-lg p-2 sm:p-3 border border-[#3B4058]/20">
                  <div className="text-gray-400">Processing Time</div>
                  <div className="font-semibold text-white">~30 seconds</div>
                </div>
                <div className="bg-[#14161E] rounded-lg p-2 sm:p-3 border border-[#3B4058]/20">
                  <div className="text-gray-400">Network</div>
                  <div className="font-semibold text-white">{network.name}</div>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-[#1D202D] rounded-xl p-3 sm:p-4 border border-[#93c5fd]/20 mb-4 sm:mb-5 md:mb-6">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#93c5fd] flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="text-[#c8ceee] font-semibold">Important Notice:</p>
                  <p className="text-gray-400 mt-1">
                    This action will process payments for all active employees.
                    Please ensure you have sufficient funds in your wallet
                    before proceeding.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 sm:p-5 md:p-6 border-t border-[#3B4058]/30">
            <div className="flex flex-col sm:flex-row items-center sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 rounded-xl border border-[#3B4058]/30 text-gray-400
                         hover:text-white hover:border-[#93c5fd]/40 transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={payEmployees}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 rounded-xl bg-gradient-to-r from-[#3B4058] to-[#93c5fd]
                         text-white hover:shadow-lg hover:shadow-[#93c5fd]/20 transition-all text-sm sm:text-base"
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
