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
  { name: "Marketing", value: 35000, color: "#8b5cf6" },
  { name: "Sales", value: 28000, color: "#a855f7" },
  { name: "HR", value: 12000, color: "#d946ef" },
  { name: "Finance", value: 15000, color: "#ec4899" }
];

const paymentMethodData = [
  { method: "ETH", amount: 85000 },
  { method: "USDT", amount: 45000 },
  { method: "USDC", amount: 25000 }
];

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1D202D] p-3 rounded-lg border border-[#3B4058]/20">
        <p className="text-white font-semibold">{label}</p>
        <p className="text-[#93c5fd]">${(payload[0]?.value ?? 0).toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const PayrollAnalytics: React.FC = () => {
  return (
    <div className="bg-[#14161E] border border-[#3B4058]/20 rounded-xl p-6 hover:border-[#3B4058]/50 transition-all">
      <h2 className="text-xl font-bold mb-6 text-white">Payroll Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1D202D] rounded-xl p-4 border border-[#3B4058]/20"
        >
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-10 h-10 text-[#93c5fd]" />
            <div>
              <h3 className="font-semibold text-white">Monthly Trend</h3>
              <p className="text-sm text-gray-400">Last 6 months</p>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis 
                  stroke="#9ca3af"
                  tickFormatter={(value) => `$${(value / 1000)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#93c5fd"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
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
          className="bg-[#1D202D] rounded-xl p-4 border border-[#3B4058]/20"
        >
          <div className="flex items-center space-x-3 mb-4">
            <PieChartIcon className="w-10 h-10 text-purple-400" />
            <div>
              <h3 className="font-semibold text-white">Department Split</h3>
              <p className="text-sm text-gray-400">Current month</p>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
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
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PayrollAnalytics;
