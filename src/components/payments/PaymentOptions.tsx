"use client";

import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, TooltipProps, ResponsiveContainer, Legend
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

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0c0f16]/90 backdrop-blur-sm p-2 sm:p-3 rounded-lg border border-[#22304a]/30 font-mono text-xs sm:text-sm">
        <p className="text-[#F2F2F2] font-semibold">{label}</p>
        <p className="text-[#2D8B75]">${(payload[0]?.value ?? 0).toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const PaymentOptions = () => {
  return (
    <div className="w-full h-1/2 bg-[#131620]/90 backdrop-blur-sm border border-[#22304a]/20 rounded-xl p-4 hover:border-[#22304a]/50 transition-all shadow-lg">
      <h2 className="text-lg font-bold mb-4 text-[#F2F2F2] font-mono" style={{
        textShadow: "0 0 5px rgba(45, 139, 117, 0.3), 0 0 10px rgba(45, 139, 117, 0.1)"
      }}>Payment History</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={monthlyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#22304a" />
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
            stroke="#2D8B75"
            strokeWidth={2}
            dot={{ r: 3, fill: "#2D8B75" }}
            activeDot={{ r: 6, fill: "#2D8B75" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentOptions;