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
    <div className="bg-[#14161E] border border-[#3B4058]/20 rounded-xl p-4 hover:border-[#3B4058]/50 transition-all">
      <h2 className="text-lg font-bold mb-4 text-white">Payment Options</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option, index) => (
          <motion.button
            key={option.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-[#1D202D] hover:bg-[#1D202D]/70 border border-[#3B4058]/20 hover:border-[#3B4058]/50 
                     rounded-xl p-4 transition-all text-left w-full"
          >
            <div className="flex items-start space-x-3">
              <option.icon className={`w-7 h-7 ${option.color} transform transition-transform group-hover:scale-110 flex-shrink-0`} />

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold mb-1 group-hover:text-white transition-colors text-sm">
                  {option.title}
                </h3>
                <p className="text-xs text-gray-400 mb-2">{option.description}</p>

                {option.amount && (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-base font-bold text-[#93c5fd]">
                        {option.amount}
                      </div>
                      <div className="text-xs text-gray-400">
                        {option.employees} employees
                      </div>
                    </div>
                    <div
                      className="w-6 h-6 rounded-full text-[#93c5fd] flex items-center justify-center
                                group-hover:text-white transition-colors"
                    >
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                )}

                {option.departments && (
                  <div className="flex flex-wrap gap-1">
                    {option.departments.map((dept) => (
                      <span
                        key={dept}
                        className="px-1.5 py-0.5 text-xs rounded-full bg-[#3B4058]/20 text-[#93c5fd]
                                border border-[#3B4058]/20"
                      >
                        {dept}
                      </span>
                    ))}
                  </div>
                )}

                {option.scheduled && (
                  <div className="text-xs text-gray-400">
                    {option.scheduled} payments scheduled
                  </div>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-4 p-3 bg-[#1D202D]/50 rounded-xl border border-[#3B4058]/20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="w-full">
            <div className="text-xs text-gray-400">Next Payroll Date</div>
            <div className="font-semibold text-sm text-white">December 31, 2024</div>
          </div>
          <div className="w-full">
            <div className="text-xs text-gray-400">Processing Time</div>
            <div className="font-semibold text-sm text-white">~30 seconds</div>
          </div>
          <div className="w-full">
            <div className="text-xs text-gray-400">Gas Fees (Est.)</div>
            <div className="font-semibold text-sm text-green-400">$0.01</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
