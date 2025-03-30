"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Home } from "lucide-react";
import Link from "next/link";
import "../../styles/gradients.css";

interface PaymentsHeaderProps {
  onQuickPay: () => void;
}

const PaymentsHeader: React.FC<PaymentsHeaderProps> = ({ onQuickPay }) => {
  return (
    <div className="mb-8 w-full px-4 md:px-6">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-400 mb-4 font-mono overflow-x-auto">
        <Link href="/dashboard" className="hover:text-[#93c5fd] transition-colors flex items-center whitespace-nowrap">
          <Home className="w-3 h-3 md:w-4 md:h-4 mr-1" />
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-[#c8ceee] whitespace-nowrap">Payments</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="w-full md:w-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-[#c8ceee] font-mono text-shadow-glow">
            Payments Management
          </h1>
          <p className="text-sm md:text-base text-gray-400 mt-1 font-mono">Process and manage your payroll transactions</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
          {/* Search Bar */}
          {/* <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full sm:w-64 bg-[#14161E] border border-[#3B4058]/30 text-white rounded-xl py-2 pl-10 pr-4
                       focus:outline-none focus:ring-2 focus:ring-[#93c5fd]/50 transition-all font-mono text-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#93c5fd]/60" />
          </div> */}

          {/* Quick Pay Button with gradient text */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onQuickPay}
            className="bg-gradient-to-r from-[#3B4058] to-[#93c5fd] text-white px-4 md:px-6 py-2 rounded-xl flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-[#93c5fd]/20 transition-all w-full sm:w-auto"
          >
            <span className="font-bold font-mono text-sm md:text-base">Quick Pay</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PaymentsHeader;
