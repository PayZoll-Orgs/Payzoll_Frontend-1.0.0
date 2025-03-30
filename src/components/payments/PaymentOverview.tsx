"use client";

import React from "react";
import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";

interface PaymentsOverviewProps {
  employees: number;
  totalSalary: string;
  totalSalaryPaid: string;
}

const PaymentsOverview: React.FC<PaymentsOverviewProps> = ({ totalSalary, totalSalaryPaid }) => {
  const stats = [
    {
      title: "Pay All",
      value: `${totalSalary} ETH`,
      icon: DollarSign,
      color: "text-[#93c5fd]",
    },
    {
      title: "Pay Selective",
      value: `${totalSalaryPaid} ETH`,
      icon: DollarSign,
      color: "text-[#93c5fd]/80",
    },
    {
      title: "Custom Payment",
      value: `${totalSalary} ETH`,
      icon: DollarSign,
      color: "text-[#93c5fd]",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="h-auto min-h-[220px] bg-[#14161E] border border-[#3B4058]/30 rounded-xl p-6 hover:border-[#93c5fd]/40 transition-all group"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-[#c8ceee] font-mono text-xl mb-2">{stat.title}</h3>
              <div className="text-2xl font-bold text-white font-mono transition-all group-hover:text-shadow-glow">
                {stat.value}
              </div>
            </div>
            <div className="bg-black/20 p-3 rounded-lg">
              <stat.icon className={`w-8 h-8 ${stat.color} transform transition-transform group-hover:scale-110`} />
            </div>
          </div>
          
          <button className="w-full mt-6 bg-gradient-to-r from-[#3B4058] to-[#93c5fd] text-white 
             px-6 py-3 rounded-xl font-mono transition-all 
             hover:shadow-lg hover:shadow-[#93c5fd]/20 focus:outline-none">
            Pay Now
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default PaymentsOverview;
