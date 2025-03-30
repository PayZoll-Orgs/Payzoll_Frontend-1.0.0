"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  DollarSign,
  Award,
  ArrowLeftRight,
} from "lucide-react";

export default function RecentActivity({ employeeInfo, employeeTokenInfo }: {
  employeeInfo: { salary: { $numberDecimal: string } };
  employeeTokenInfo: { allocated: number }[];
}) {
  const totalTokens = () => {
    return employeeTokenInfo.reduce((sum, token) => sum + token.allocated, 0);
  };

  const activities = [
    {
      id: 1,
      type: "payment_received",
      title: "Salary Payment",
      amount: `${employeeInfo.salary.$numberDecimal} ETH`,
      timestamp: "2 hours ago",
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      id: 2,
      type: "token_vested",
      title: "Tokens Vested",
      amount: `${totalTokens()} ESOP`,
      timestamp: "2 hours ago",
      icon: Award,
      color: "text-[#93c5fd]",
    },
    {
      id: 3,
      type: "swap",
      title: "Token Swap",
      amount: "ETH → USDC",
      timestamp: "2 days ago",
      icon: ArrowLeftRight,
      color: "text-[#93c5fd]",
    },
  ];

  return (
    <div className="bg-[#14161E] border border-[#3B4058]/20 rounded-xl p-6 hover:border-[#3B4058]/50 transition-all h-[420px] flex flex-col">
      <h2 className="text-xl font-bold mb-6 text-white">Recent Activity</h2>

      <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-[#1D202D]/50 rounded-xl p-4 border border-[#3B4058]/20 hover:border-[#3B4058]/50 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <activity.icon className={`w-6 h-6 ${activity.color} transform transition-transform group-hover:scale-110`} />
                <div>
                  <div className="font-semibold text-white group-hover:text-white transition-colors">
                    {activity.title}
                  </div>
                  <div className="text-sm text-gray-400">{activity.amount}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-gray-400 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {activity.timestamp}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        className="w-full mt-4 py-3 rounded-xl bg-[#14161E] border border-[#3B4058]/20 
                       text-gray-400 hover:text-white hover:border-[#3B4058]/50 transition-all"
      >
        View All Activity
      </button>
    </div>
  );
}
