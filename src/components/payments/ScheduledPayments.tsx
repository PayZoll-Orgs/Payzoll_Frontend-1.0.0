"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, MoreVertical } from "lucide-react";

interface ScheduledPayment {
  id: number;
  title: string;
  amount: string;
  date: string;
  employees: number;
  status: "scheduled" | "pending";
}

const scheduledPayments: ScheduledPayment[] = [
  {
    id: 1,
    title: "Monthly Salary",
    amount: "$145,678",
    date: "Jan 31, 2024",
    employees: 156,
    status: "scheduled",
  },
  {
    id: 2,
    title: "Performance Bonus",
    amount: "$25,000",
    date: "Feb 15, 2024",
    employees: 45,
    status: "pending",
  },
  {
    id: 3,
    title: "Quarterly Incentives",
    amount: "$50,000",
    date: "Mar 1, 2024",
    employees: 78,
    status: "scheduled",
  },
];
const statusColors = {
  scheduled: "text-green-400 bg-green-400/10",
  pending: "text-yellow-400 bg-yellow-400/10",
};

const ScheduledPayments: React.FC = () => {
  return (
    <div className="bg-[#14161E] border border-[#3B4058]/20 rounded-xl p-6 hover:border-[#3B4058]/50 transition-all">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Scheduled Payments</h2>
        <button className="text-sm text-[#93c5fd] hover:text-[#93c5fd]/80 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {scheduledPayments.map((payment, index) => (
          <motion.div
            key={payment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-[#1D202D]/50 rounded-xl p-4 border border-[#3B4058]/20 hover:border-[#3B4058]/50 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Calendar className="w-10 h-10 text-[#93c5fd] transform transition-transform group-hover:scale-110" />
                <div>
                  <h3 className="font-semibold group-hover:text-white transition-colors">
                    {payment.title}
                  </h3>
                  <div className="text-sm text-gray-400">{payment.amount}</div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-white transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  {payment.date}
                </div>
                <div className="flex items-center text-gray-400">
                  <Users className="w-4 h-4 mr-1" />
                  {payment.employees} employees
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  payment.status === "scheduled"
                    ? "bg-green-400/10 text-green-400"
                    : "bg-yellow-400/10 text-yellow-400"
                }`}
              >
                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-4 py-3 rounded-xl bg-[#1D202D] border border-[#3B4058]/20 
                       text-gray-400 hover:text-white hover:border-[#3B4058]/50 transition-all">
        Schedule New Payment
      </button>
    </div>
  );
};

export default ScheduledPayments;
