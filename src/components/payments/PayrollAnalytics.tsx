"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, TooltipProps,ResponsiveContainer, Legend
} from "recharts";

import { TrendingUp, PieChart as PieChartIcon} from "lucide-react";

const monthlyData = [
  { month: "Jan", amount: 125000 },
  { month: "Feb", amount: 132000 },
  { month: "Mar", amount: 130000 },
  { month: "Apr", amount: 135000 },
  { month: "May", amount: 142000 },
  { month: "Jun", amount: 145678 }
];

const departmentData = [
  { name: "Engineering", value: 65000, color: "#93c5fd" },
  { name: "Marketing", value: 35000, color: "#3B4058" },
  { name: "Sales", value: 28000, color: "#6366f1" },
  { name: "HR", value: 12000, color: "#8b5cf6" },
  { name: "Finance", value: 15000, color: "#4f46e5" }
];

const paymentMethodData = [
  { method: "ETH", amount: 85000 },
  { method: "USDT", amount: 45000 },
  { method: "USDC", amount: 25000 }
];

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#14161E] p-2 sm:p-3 rounded-lg border border-[#3B4058]/30 font-mono text-xs sm:text-sm">
        <p className="text-[#c8ceee] font-semibold">{label}</p>
        <p className="text-[#93c5fd]">${(payload[0]?.value ?? 0).toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const PayrollAnalytics: React.FC = () => {
  return (
    <div className="bg-[#14161E] border border-[#3B4058]/30 rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 hover:border-[#93c5fd]/30 transition-all">
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-[#c8ceee] font-mono text-shadow-glow">Payroll Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {/* Monthly Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0c0e14] rounded-xl p-3 sm:p-4 md:p-5 border border-[#3B4058]/30"
        >
          <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
            <div className="bg-[#93c5fd]/10 p-1 sm:p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[#93c5fd]" />
            </div>
            <div>
              <h3 className="font-semibold text-white font-mono text-sm sm:text-base">Monthly Trend</h3>
              <p className="text-xs sm:text-sm text-gray-400 font-mono">Last 6 months</p>
            </div>
          </div>

          <div className="h-48 sm:h-56 md:h-60 lg:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3B4058" />
                <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem' }} />
                <YAxis 
                  stroke="#9ca3af"
                  tickFormatter={(value) => `$${(value / 1000)}k`}
                  tick={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem' }}
                  width={40}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#93c5fd"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#93c5fd" }}
                  activeDot={{ r: 6, fill: "#93c5fd" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Department Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0c0e14] rounded-xl p-3 sm:p-4 md:p-5 border border-[#3B4058]/30"
        >
          <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
            <div className="bg-[#93c5fd]/10 p-1 sm:p-2 rounded-lg">
              <PieChartIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[#93c5fd]" />
            </div>
            <div>
              <h3 className="font-semibold text-white font-mono text-sm sm:text-base">Department Split</h3>
              <p className="text-xs sm:text-sm text-gray-400 font-mono">Current month</p>
            </div>
          </div>

          <div className="h-48 sm:h-56 md:h-60 lg:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                  labelLine={false}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  layout="vertical" 
                  align="right"
                  verticalAlign="middle"
                  formatter={(value) => <span className="text-gray-400 font-mono text-xs sm:text-sm">{value}</span>}
                  wrapperStyle={{ fontSize: '0.75rem' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0c0e14] rounded-xl p-3 sm:p-4 md:p-5 border border-[#3B4058]/30 md:col-span-2 lg:col-span-1"
        >
          <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
            <div className="bg-[#93c5fd]/10 p-1 sm:p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[#93c5fd]" />
            </div>
            <div>
              <h3 className="font-semibold text-white font-mono text-sm sm:text-base">Payment Methods</h3>
              <p className="text-xs sm:text-sm text-gray-400 font-mono">Distribution by token</p>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
            {paymentMethodData.map((item, index) => (
              <div key={index} className="relative">
                <div className="flex justify-between mb-1">
                  <span className="text-white font-mono text-xs sm:text-sm">{item.method}</span>
                  <span className="text-gray-400 font-mono text-xs sm:text-sm">${item.amount.toLocaleString()}</span>
                </div>
                <div className="h-1.5 sm:h-2 bg-[#1D202D] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#3B4058] to-[#93c5fd] rounded-full"
                    style={{ width: `${(item.amount / 155000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
      <style jsx>{`
        * {
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>
    </div>
  );
};

export default PayrollAnalytics;
