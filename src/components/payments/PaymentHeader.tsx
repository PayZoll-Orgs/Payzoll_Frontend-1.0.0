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
    <div className="mb-8">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
        <Link href="/dashboard" className="hover:text-white transition-colors flex items-center">
          <Home className="w-4 h-4 mr-1" />
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-white">Payments</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold logo-gradient-text">
            Payments Management
          </h1>
          <p className="text-gray-400 mt-1">Process and manage your payroll transactions</p>
        </div>

        <div className="flex items-center space-x-4 w-full sm:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 sm:flex-initial">
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full sm:w-64 bg-[#1D202D] border border-[#3B4058]/20 text-white rounded-xl py-2 pl-10 pr-4
                       focus:outline-none focus:ring-2 focus:ring-[#98E4C9]/50 transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Quick Pay Button with gradient text */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onQuickPay}
            className="bg-[#1D202D] text-white px-6 py-2 rounded-xl flex items-center space-x-2"
          >
            {/* <DollarSign className="w-5 h-5" /> */}
            <span className="font-bold logo-gradient-text">Quick Pay</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PaymentsHeader;
