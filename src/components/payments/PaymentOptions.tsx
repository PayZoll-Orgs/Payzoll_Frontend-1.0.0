"use client";

import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";


interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
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

const monthlyData = [
  { month: "Jan", amount: 125000 },
  { month: "Feb", amount: 132000 },
  { month: "Mar", amount: 130000 },
  { month: "Apr", amount: 135000 },
  { month: "May", amount: 142000 },
  { month: "Jun", amount: 145678 },
  { month: "Jul", amount: 156342 },
  { month: "Aug", amount: 110293 },
  { month: "Sep", amount:  92733 },
  { month: "Oct", amount: 189373 },
  { month: "Nov", amount: 199383 },
  { month: "Dec", amount: 236479 }
];


const PaymentOptions = () => {
  return (
    <div className="w-full h-1/2 bg-[#14161E] border border-[#3B4058]/20 rounded-xl p-4 hover:border-[#3B4058]/50 transition-all">
      <h2 className="text-lg font-bold mb-4 text-white">Payment History</h2>
      <ResponsiveContainer width="100%" height={250}>
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
  );
};

export default PaymentOptions;