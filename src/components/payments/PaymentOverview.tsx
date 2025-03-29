"use client";

import React from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, CheckCircle } from "lucide-react";

interface PaymentsOverviewProps {
  employees: number;
  totalSalary: string;
  totalSalaryPaid: string;
}

const PaymentsOverview: React.FC<PaymentsOverviewProps> = ({ employees, totalSalary, totalSalaryPaid }) => {
  const stats = [
    {
      title: "Total Payroll (This Month)",
      value: `${totalSalary} ETH`,
      change: "+12%",
      icon: DollarSign,
      color: "text-[#93c5fd]",
    },
    {
      title: "Total Paid (MTD)",
      value: `${totalSalaryPaid} ETH`,
      change: "+8%",
      icon: TrendingUp,
      color: "text-green-400",
    },
    {
      title: "Payment Success Rate",
      value: "98.5%",
      change: "+1.5%",
      icon: CheckCircle,
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
          className="bg-[#14161E] border border-[#3B4058]/20 rounded-xl p-6 hover:border-[#3B4058]/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-gray-400 text-sm">{stat.title}</h3>
              <div className="text-3xl font-bold mt-1 text-white transition-all">
                {stat.value}
              </div>
            </div>
            <stat.icon className={`w-10 h-10 ${stat.color} transform transition-transform group-hover:scale-110`} />
          </div>
          <div className="text-sm text-green-400">{stat.change} from last month</div>
        </motion.div>
      ))}
    </div>
  );
};

export default PaymentsOverview;
