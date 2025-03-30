"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, DollarSign, CreditCard } from "lucide-react";
import "../../styles/gradients.css";

// Interface for the stats data
interface StatCardProps {
  title: string;
  value: string;
  trend: number;
  icon: React.ReactNode;
  color: string;
}

// Individual Stat Card Component
const StatCard: 
React.FC<StatCardProps> = ({ title, value, trend, icon, color }) => {
  const isPositive = trend > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-[#14161E] p-4 sm:p-5 rounded-xl border border-[#3B4058]/30 hover:border-[${color}]/30 transition-all shadow-lg`}
    >
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center bg-[${color}]/10`}
        >
          {icon}
        </div>
        <div className={`flex items-center space-x-1 ${isPositive ? "text-green-400" : "text-red-400"} text-xs sm:text-sm font-mono`}>
          {isPositive ? (
            <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
          ) : (
            <ArrowDownRight className="w-3 h-3 sm:w-4 sm:h-4" />
          )}
          <span>{Math.abs(trend)}%</span>
        </div>
      </div>
      <h3 className="text-gray-400 text-xs sm:text-sm mb-1 font-mono">{title}</h3>
      <p className="text-xl sm:text-2xl font-bold text-white font-mono text-shadow-glow">{value}</p>
    </motion.div>
  );
};

// Payment Stats Component
const PaymentStats: React.FC = () => {
  // Mock stats data
  const statsData = [
    {
      title: "Total Payments",
      value: "$256,578",
      trend: 12.5,
      icon: <DollarSign className="text-[#93c5fd] w-5 h-5 sm:w-6 sm:h-6" />,
      color: "#93c5fd",
    },
    {
      title: "Pending Payments",
      value: "$45,215",
      trend: -2.4,
      icon: <CreditCard className="text-[#93c5fd] w-5 h-5 sm:w-6 sm:h-6" />,
      color: "#93c5fd",
    },
    {
      title: "Gas Fees",
      value: "$1,245",
      trend: 18.3,
      icon: <DollarSign className="text-[#93c5fd] w-5 h-5 sm:w-6 sm:h-6" />,
      color: "#93c5fd",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
      {statsData.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default PaymentStats; 