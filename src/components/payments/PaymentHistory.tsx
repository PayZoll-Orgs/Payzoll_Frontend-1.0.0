"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Download, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import "../../styles/gradients.css";

// Mock data for payment history
const paymentHistoryData = [
  {
    id: 1,
    date: "Jun 12, 2023",
    recipient: "Ethereum Contract",
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    amount: "$32,500",
    status: "Completed",
  },
  {
    id: 2,
    date: "Jun 10, 2023",
    recipient: "Alice Johnson",
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    amount: "$15,750",
    status: "Completed",
  },
  {
    id: 3,
    date: "Jun 8, 2023",
    recipient: "Bob Smith",
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    amount: "$24,320",
    status: "Completed",
  },
  {
    id: 4,
    date: "Jun 5, 2023",
    recipient: "Smart Contract",
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    amount: "$18,650",
    status: "Completed",
  },
];

const PaymentHistory: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(paymentHistoryData.length / itemsPerPage);

  // Calculate paginated data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, paymentHistoryData.length);
  const currentData = paymentHistoryData.slice(startIndex, endIndex);

  return (
    <div className="w-full bg-[#14161E] border border-[#3B4058]/30 rounded-xl p-3 sm:p-4 md:p-6 
                    hover:border-[#93c5fd]/30 transition-all shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-bold text-[#c8ceee] font-mono text-shadow-glow">Payment History</h2>
        <div className="flex flex-wrap gap-2">
          <button 
            className="bg-[#1D202D] text-white px-2 sm:px-4 py-1 sm:py-2 rounded-xl flex items-center space-x-1 sm:space-x-2 
                      hover:bg-[#252837] transition-all border border-[#3B4058]/30 font-mono text-xs sm:text-sm"
          >
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-[#93c5fd]" />
            <span>Jun 2023</span>
          </button>
          <button 
            className="bg-[#1D202D] text-white px-2 sm:px-4 py-1 sm:py-2 rounded-xl flex items-center 
                      hover:bg-[#252837] transition-all border border-[#3B4058]/30 font-mono"
            aria-label="Filter payments"
          >
            <Filter className="w-3 h-3 sm:w-4 sm:h-4 text-[#93c5fd]" />
          </button>
          <button 
            className="bg-[#1D202D] text-white px-2 sm:px-4 py-1 sm:py-2 rounded-xl flex items-center 
                      hover:bg-[#252837] transition-all border border-[#3B4058]/30 font-mono"
            aria-label="Download payment history"
          >
            <Download className="w-3 h-3 sm:w-4 sm:h-4 text-[#93c5fd]" />
          </button>
        </div>
      </div>

      {/* Table Header - Hidden on mobile, visible on larger screens */}
      <div className="hidden sm:grid grid-cols-4 gap-2 sm:gap-4 pb-3 border-b border-[#3B4058]/30 mb-4">
        <div className="text-gray-400 font-medium font-mono text-sm sm:text-base">Date</div>
        <div className="text-gray-400 font-medium font-mono text-sm sm:text-base">Recipient</div>
        <div className="text-gray-400 font-medium font-mono text-sm sm:text-base">Amount</div>
        <div className="text-gray-400 font-medium font-mono text-sm sm:text-base">Status</div>
      </div>

      {/* Table Body */}
      <div className="space-y-4">
        {currentData.map((payment, index) => (
          <motion.div
            key={payment.id}
            className="flex flex-col sm:grid sm:grid-cols-4 gap-2 sm:gap-4 py-3 border-b border-[#3B4058]/20 last:border-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Mobile view - with labels */}
            <div className="sm:hidden grid grid-cols-2 gap-2 w-full mb-2">
              <div className="text-gray-400 font-medium font-mono text-xs">Date:</div>
              <div className="text-white font-mono text-xs">{payment.date}</div>
              
              <div className="text-gray-400 font-medium font-mono text-xs">Recipient:</div>
              <div className="text-white font-mono text-xs">{payment.recipient}</div>
              
              <div className="text-gray-400 font-medium font-mono text-xs">Address:</div>
              <div className="text-white font-mono text-xs truncate">{payment.address}</div>
              
              <div className="text-gray-400 font-medium font-mono text-xs">Amount:</div>
              <div className="text-white font-mono text-xs">{payment.amount}</div>
              
              <div className="text-gray-400 font-medium font-mono text-xs">Status:</div>
              <div>
                <span className="px-2 py-0.5 bg-green-400/10 text-green-400 rounded-full text-xs font-mono">
                  {payment.status}
                </span>
              </div>
            </div>

            {/* Desktop view */}
            <div className="hidden sm:block text-white font-mono text-sm md:text-base">{payment.date}</div>
            <div className="hidden sm:block">
              <div className="text-white font-mono text-sm md:text-base">{payment.recipient}</div>
              <div className="text-gray-400 text-xs md:text-sm truncate font-mono">{payment.address}</div>
            </div>
            <div className="hidden sm:block text-white font-mono text-sm md:text-base">{payment.amount}</div>
            <div className="hidden sm:block">
              <span className="px-3 py-1 bg-green-400/10 text-green-400 rounded-full text-xs font-mono">
                {payment.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
        <div className="text-gray-400 text-xs sm:text-sm font-mono">
          Showing {startIndex + 1} to {endIndex} of {paymentHistoryData.length} entries
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`p-1 sm:p-2 rounded-lg ${
              currentPage === 1
                ? "text-gray-600 cursor-not-allowed"
                : "text-[#93c5fd] hover:bg-[#93c5fd]/10"
            } transition-colors flex items-center justify-center font-mono`}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`p-1 sm:p-2 rounded-lg ${
              currentPage === totalPages
                ? "text-gray-600 cursor-not-allowed"
                : "text-[#93c5fd] hover:bg-[#93c5fd]/10"
            } transition-colors flex items-center justify-center font-mono`}
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory; 