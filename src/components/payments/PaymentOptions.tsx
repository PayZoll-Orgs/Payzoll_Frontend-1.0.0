"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  UserPlus,
  Building2,
  Calendar,
  ArrowRight,
} from "lucide-react";

interface PaymentOption {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  amount?: string;
  employees?: number;
  departments?: string[];
  scheduled?: number;
}

const options: PaymentOption[] = [
  {
    title: "Pay All Employees",
    description: "Process payments for all active employees",
    icon: Users,
    color: "text-[#93c5fd]",
    amount: "$145,678",
    employees: 156,
  },
  {
    title: "Pay Selected Employees",
    description: "Choose specific employees to pay",
    icon: UserPlus,
    color: "text-[#93c5fd]",
  },
  {
    title: "Pay by Department",
    description: "Process payments by department",
    icon: Building2,
    color: "text-purple-400",
    departments: ["Engineering", "Marketing", "Sales"],
  },
  {
    title: "Schedule Payment",
    description: "Set up future dated payments",
    icon: Calendar,
    color: "text-green-400",
    scheduled: 3,
  },
];

const PaymentOptions: React.FC = () => {
  return (
    <div className="bg-[#14161E] border border-[#3B4058]/20 rounded-xl p-4 sm:p-6 hover:border-[#3B4058]/50 transition-all">
      <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-white">Payment Options</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {options.map((option, index) => (
          <motion.button
            key={option.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-[#1D202D] hover:bg-[#1D202D]/70 border border-[#3B4058]/20 hover:border-[#3B4058]/50 
                     rounded-xl p-4 sm:p-6 transition-all text-left w-full"
          >
            <div className="flex items-start space-x-3 sm:space-x-4">
              <option.icon className={`w-8 h-8 sm:w-10 sm:h-10 ${option.color} transform transition-transform group-hover:scale-110 flex-shrink-0`} />

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold mb-1 group-hover:text-white transition-colors text-sm sm:text-base">
                  {option.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3">{option.description}</p>

                {option.amount && (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-base sm:text-xl font-bold text-[#93c5fd]">
                        {option.amount}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-400">
                        {option.employees} employees
                      </div>
                    </div>
                    <div
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-full text-[#93c5fd] flex items-center justify-center
                                group-hover:text-white transition-colors"
                    >
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                )}

                {option.departments && (
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {option.departments.map((dept) => (
                      <span
                        key={dept}
                        className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs rounded-full bg-[#3B4058]/20 text-[#93c5fd]
                                border border-[#3B4058]/20"
                      >
                        {dept}
                      </span>
                    ))}
                  </div>
                )}

                {option.scheduled && (
                  <div className="text-xs sm:text-sm text-gray-400">
                    {option.scheduled} payments scheduled
                  </div>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-[#1D202D]/50 rounded-xl border border-[#3B4058]/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
          <div className="w-full sm:w-auto">
            <div className="text-xs sm:text-sm text-gray-400">Next Payroll Date</div>
            <div className="font-semibold text-sm sm:text-base text-white">December 31, 2024</div>
          </div>
          <div className="w-full sm:w-auto">
            <div className="text-xs sm:text-sm text-gray-400">Processing Time</div>
            <div className="font-semibold text-sm sm:text-base text-white">~30 seconds</div>
          </div>
          <div className="w-full sm:w-auto">
            <div className="text-xs sm:text-sm text-gray-400">Gas Fees (Est.)</div>
            <div className="font-semibold text-sm sm:text-base text-green-400">$0.01</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
