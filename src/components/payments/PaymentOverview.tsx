"use client";

import React from "react";
import { motion } from "framer-motion";
import { DollarSign, X } from "lucide-react";

interface PaymentsOverviewProps {
  employees: number;
  totalSalary: string;
  totalSalaryPaid: string;
}

const PaymentsOverview: React.FC<PaymentsOverviewProps> = ({  totalSalary, totalSalaryPaid }) => {
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
      color: "text-green-400",
    },
    {
      title: "Custom Payment ",
      value: `${totalSalary} ETH`,
      icon: DollarSign,
      color: "text-[#93c5fd]",
    },
  ];

  return (
    <div className="grid grid-cols h-[500px] md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="h-1/2 text-3xl bg-[#14161E] border border-[#3B4058]/20 rounded-xl p-6 hover:border-[#3B4058]/50 transition-all group"
        >
          <div className="flex items-center text-3xl justify-between mb-4 mt-4">
            <div>
              <h3 className="text-gray-400 text-3xl mb-4">{stat.title}</h3>
              <div className="text-3xl font-bold mt-1 text-white transition-all">
                {stat.value}
              </div>
            </div>
            <stat.icon className={`w-10 h-10 ${stat.color} transform transition-transform group-hover:scale-110`} />
          </div>
        
          <button
  className="text-xl mt-4 bg-gradient-to-r from-purple-600 to-black text-white 
             px-6 py-2 rounded-lg shadow-lg transition-all 
             hover:from-purple-700 hover:to-gray-900 
             hover:scale-105 focus:outline-none focus:ring-2 
             focus:ring-purple-400 focus:ring-offset-2"
>
  Pay Now
</button>
        </motion.div>
      ))}
    </div>
  );
};

export default PaymentsOverview;
