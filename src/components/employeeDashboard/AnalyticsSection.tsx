"use client";

import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, PieChart as BarChart2 } from "lucide-react";

const salaryData = [
  { month: "Jan", salary: 12500, bonus: 0 },
  { month: "Feb", salary: 12500, bonus: 2500 },
  { month: "Mar", salary: 12500, bonus: 0 },
  { month: "Apr", salary: 12500, bonus: 1500 },
  { month: "May", salary: 12500, bonus: 0 },
  { month: "Jun", salary: 12500, bonus: 3000 },
];

const performanceData = [
  { metric: "Productivity", value: 85 },
  { metric: "Quality", value: 92 },
  { metric: "Teamwork", value: 88 },
  { metric: "Innovation", value: 78 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 p-3 rounded-lg border border-gray-700">
        <p className="text-white font-semibold">{label}</p>
        {payload.map((p: any, index: number) => (
          <p key={index} style={{ color: p.color }} className="text-sm">
            {p.name}: ${p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsSection() {
  return (
    <div className="bg-[#14161E] border border-[#3B4058]/20 rounded-xl p-6 hover:border-[#3B4058]/50 transition-all">
      <h2 className="text-xl font-bold mb-6 text-white">Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#14161E] rounded-xl p-4 border border-[#3B4058]/20">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-6 h-6 text-[#93c5fd]" />
            <div>
              <h3 className="font-semibold text-white">Salary Trends</h3>
              <p className="text-sm text-gray-400">6-month history</p>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="salary" name="Base Salary" fill="#93c5fd" radius={[4, 4, 0, 0]} />
                <Bar dataKey="bonus" name="Bonus" fill="#3B4058" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#14161E] rounded-xl p-4 border border-[#3B4058]/20">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart2 className="w-6 h-6 text-[#93c5fd]" />
            <div>
              <h3 className="font-semibold text-white">Performance Metrics</h3>
              <p className="text-sm text-gray-400">Current quarter</p>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={performanceData} 
                layout="vertical"
                margin={{ left: 100, right: 20, top: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" domain={[0, 100]} stroke="#9ca3af" />
                <YAxis dataKey="metric" type="category" stroke="#9ca3af" width={90} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#93c5fd" radius={[0, 4, 4, 0]}>
                  {performanceData.map((entry, index) => (
                    <Cell 
                      key={index}
                      fill={entry.value >= 90 ? '#10b981' : entry.value >= 80 ? '#93c5fd' : '#f59e0b'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
