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
        <Link href="/dashboard" className="hover:text-[#2D8B75] transition-colors flex items-center whitespace-nowrap">
          <Home className="w-3 h-3 md:w-4 md:h-4 mr-1 text-[#2D8B75]" />
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-[#F2F2F2] whitespace-nowrap">Payments</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="w-full md:w-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-[#F2F2F2] font-mono" style={{
            textShadow: "0 0 5px rgba(45, 139, 117, 0.4), 0 0 10px rgba(45, 139, 117, 0.2)"
          }}>
            Payments Management
          </h1>
          <p className="text-sm md:text-base text-gray-400 mt-1 font-mono">Process and manage your payroll transactions</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
          {/* Quick Pay Button with gradient background */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onQuickPay}
            className="bg-gradient-to-r from-[#22304a] to-[#2D8B75] text-white px-4 md:px-6 py-2 rounded-xl flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-[#2D8B75]/20 transition-all w-full sm:w-auto font-mono"
          >
            <span className="font-bold text-sm md:text-base">Quick Pay</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PaymentsHeader;