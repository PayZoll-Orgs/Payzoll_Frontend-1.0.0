"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, DollarSign, ArrowUpRight, Clock } from "lucide-react";

export default function PaymentSection({ employeeHistoryInfo, employeeInfo }: {
  employeeHistoryInfo: { createdAt: string; accountId: string; amount: { $numberDecimal: string } }[];
  employeeInfo: { salary: { $numberDecimal: string } };
}) {
  const upcomingPayments = [
    {
      date: "Dec 31, 2024",
      amount: `${employeeInfo.salary.$numberDecimal} ETH`,
      type: "Monthly Salary",
      status: "scheduled",
    },
    {
      date: "Feb 15, 2025",
      amount: "$2,500",
      type: "Performance Bonus",
      status: "pending",
    },
  ];

  return (
    <div className="bg-[#14161E] border border-[#3B4058]/20 rounded-xl p-6 hover:border-[#3B4058]/50 transition-all h-full">
      <h2 className="text-xl font-bold mb-6 text-white">Payments</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Upcoming Payments</h3>
        <div className="space-y-4">
          {upcomingPayments.map((payment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#14161E] rounded-xl p-4 border border-[#3B4058]/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Calendar className="w-6 h-6 text-[#93c5fd]" />
                  <div>
                    <div className="font-semibold text-white">{payment.type}</div>
                    <div className="text-sm text-gray-400">{payment.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-white">{payment.amount}</div>
                  <div className={`text-sm ${payment.status === "scheduled" ? "text-green-400" : "text-yellow-400"}`}>
                    {payment.status}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Payment History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1D202D]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Account Address</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3B4058]/20">
              {employeeHistoryInfo.map((history, index) => (
                <tr key={index} className="group hover:bg-[#1D202D]/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {new Date(history.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{history.accountId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">
                    {history.amount.$numberDecimal} ETH
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-400/10 text-green-400">
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
