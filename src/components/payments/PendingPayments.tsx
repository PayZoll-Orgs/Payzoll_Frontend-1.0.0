"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Clock, ChevronDown, FileCheck } from "lucide-react";
import "../../styles/gradients.css";

// Mock data for pending payments
const pendingPayments = [
  {
    id: 1,
    address: "0xABCDEF1234...",
    name: "Contract #2341",
    amount: "$25,000",
    date: "Jun 15, 2023",
  },
  {
    id: 2,
    address: "0x9876ABCDEF...",
    name: "Contract #5432",
    amount: "$18,500",
    date: "Jun 17, 2023",
  },
  {
    id: 3,
    address: "0x5678ABCDEF...",
    name: "Contract #8765",
    amount: "$32,500",
    date: "Jun 18, 2023",
  },
];

const PendingPayments: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="w-full bg-[#14161E] border border-[#3B4058]/30 rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 
                    hover:border-[#93c5fd]/30 transition-all shadow-lg">
      {/* Header */}
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-3 sm:mb-4 md:mb-5 lg:mb-6 gap-2 xs:gap-0">
        <h2 className="text-lg sm:text-xl font-bold text-[#c8ceee] font-mono text-shadow-glow">Pending Payments</h2>
        <div className="text-xs sm:text-sm text-blue-300 flex items-center font-mono">
          <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          <span>Updated: Today, 2:30 PM</span>
        </div>
      </div>

      {/* Pending Payments List */}
      <div className="space-y-2 sm:space-y-3 md:space-y-4">
        {pendingPayments.map((payment) => (
          <motion.div
            key={payment.id}
            className="border border-[#3B4058]/30 rounded-xl bg-[#14161E] overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Payment Summary */}
            <div
              className="flex justify-between items-center p-2 sm:p-3 md:p-4 cursor-pointer"
              onClick={() => setExpanded(expanded === payment.id ? null : payment.id)}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-[#93c5fd]/10">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#93c5fd]" />
                </div>
                <div className="ml-2 sm:ml-3 md:ml-4">
                  <h3 className="text-white text-xs sm:text-sm md:text-base font-semibold font-mono">{payment.name}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm font-mono">{payment.address}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-right mr-2 sm:mr-3 md:mr-4">
                  <div className="text-white text-xs sm:text-sm md:text-base font-semibold font-mono">{payment.amount}</div>
                  <div className="text-gray-400 text-xs sm:text-sm font-mono">{payment.date}</div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 sm:w-5 sm:h-5 text-[#93c5fd] transition-transform ${
                    expanded === payment.id ? "transform rotate-180" : ""
                  }`}
                />
              </div>
            </div>

            {/* Expanded Details */}
            {expanded === payment.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-[#3B4058]/30 p-2 sm:p-3 md:p-4 bg-[#0c0e14]"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                  <div>
                    <h4 className="text-gray-400 text-xs sm:text-sm mb-1 font-mono">Contract Details</h4>
                    <p className="text-white text-xs sm:text-sm md:text-base font-mono">Milestone Payment</p>
                    <p className="text-gray-400 text-xs sm:text-sm font-mono">Awaiting Signature</p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <h4 className="text-gray-400 text-xs sm:text-sm mb-1 font-mono">Payment Method</h4>
                    <p className="text-white text-xs sm:text-sm md:text-base font-mono">ETH Transfer</p>
                    <p className="text-gray-400 text-xs sm:text-sm font-mono">Gas Fee: ~$2.50</p>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 md:pt-4 border-t border-[#3B4058]/30 flex justify-end">
                  <button
                    className="bg-[#93c5fd]/10 text-[#93c5fd] px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg flex items-center hover:bg-[#93c5fd]/20 transition-all font-mono text-xs sm:text-sm"
                  >
                    <FileCheck className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Approve Payment
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 pt-2 sm:pt-3 md:pt-4 border-t border-[#3B4058]/30 flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 xs:gap-0">
        <span className="text-gray-400 text-xs sm:text-sm font-mono">
          {pendingPayments.length} pending payment{pendingPayments.length !== 1 ? "s" : ""}
        </span>
        <button
          className="text-[#93c5fd] hover:text-[#93c5fd]/80 transition-colors text-xs sm:text-sm font-mono"
        >
          View All Pending
        </button>
      </div>
    </div>
  );
};

export default PendingPayments; 