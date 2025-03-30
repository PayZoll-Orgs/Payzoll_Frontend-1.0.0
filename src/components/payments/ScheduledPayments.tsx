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

const ScheduledPayments: React.FC = () => {
  return (
    <div className="bg-[#14161E] border border-[#3B4058]/30 rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 hover:border-[#93c5fd]/30 transition-all">
      <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-5 lg:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-[#c8ceee] font-mono text-shadow-glow">Scheduled Payments</h2>
        <button className="text-xs sm:text-sm text-[#93c5fd] hover:text-[#93c5fd]/80 transition-colors font-mono">
          View All
        </button>
      </div>

      <div className="space-y-2 sm:space-y-3 md:space-y-4">
        {scheduledPayments.map((payment, index) => (
          <motion.div
            key={payment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-[#0c0e14] rounded-xl p-2 sm:p-3 md:p-4 border border-[#3B4058]/30 hover:border-[#93c5fd]/30 transition-all"
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="bg-[#93c5fd]/10 p-1 sm:p-2 rounded-lg">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[#93c5fd] transform transition-transform group-hover:scale-110" />
                </div>
                <div>
                  <h3 className="font-semibold text-white font-mono text-sm sm:text-base">
                    {payment.title}
                  </h3>
                  <div className="text-xs sm:text-sm text-gray-400 font-mono">{payment.amount}</div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-[#93c5fd] transition-colors" aria-label="More options">
                <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between text-xs sm:text-sm gap-2 xs:gap-0">
              <div className="flex flex-col xs:flex-row items-start xs:items-center xs:space-x-2 sm:space-x-4 gap-1 xs:gap-0">
                <div className="flex items-center text-gray-400 font-mono">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-[#93c5fd]/60" />
                  {payment.date}
                </div>
                <div className="flex items-center text-gray-400 font-mono">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-[#93c5fd]/60" />
                  {payment.employees} employees
                </div>
              </div>
              <span
                className={`px-2 sm:px-3 py-1 rounded-full text-xs font-mono ${
                  payment.status === "scheduled"
                    ? "bg-green-400/10 text-green-400"
                    : "bg-[#93c5fd]/10 text-[#93c5fd]"
                }`}
              >
                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-3 sm:mt-4 md:mt-5 lg:mt-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-[#3B4058] to-[#93c5fd] 
                       text-white font-mono text-sm sm:text-base hover:shadow-lg hover:shadow-[#93c5fd]/20 transition-all">
        Schedule New Payment
      </button>
      
      <style jsx>{`
        * {
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>
    </div>
  );
};

export default ScheduledPayments;
