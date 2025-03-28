"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, TrendingUp, Lock, ArrowUpRight } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const tokenPriceData = [
  { date: "Jan", price: 2.5 },
  { date: "Feb", price: 2.7 },
  { date: "Mar", price: 2.8 },
  { date: "Apr", price: 3.1 },
  { date: "May", price: 3.2 },
  { date: "Jun", price: 3.5 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 p-3 rounded-lg border border-gray-700">
        <p className="text-white font-semibold">{label}</p>
        <p className="text-indigo-400">${payload[0].value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

export default function ESOPSection({ employeeTokenInfo }: { employeeTokenInfo: { allocated: number }[] }) {
  const totalTokens = () => {
    return employeeTokenInfo.reduce((sum, token) => sum + token.allocated, 0);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">ESOP Overview</h2>
        <button
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/20 transition-all"
        >
          Claim Tokens
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Total Tokens</div>
              <div className="text-2xl font-bold">{totalTokens()} ESOP</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-400">Vested</div>
              <div className="text-lg font-semibold text-green-400">{totalTokens()} ESOP</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Locked</div>
              <div className="text-lg font-semibold text-yellow-400">{0} ESOP</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-white">Token Price History</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={tokenPriceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="price" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}