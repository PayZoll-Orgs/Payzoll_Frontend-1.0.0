"use client";

import React, { useState } from "react";
import { Users, DollarSign } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const colorPalette = [
  "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899",
  "#f43f5e", "#f97316", "#fb923c", "#facc15", "#84cc16",
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-crypto-dark p-3 rounded-lg border border-gray-800">
        <p className="text-white font-semibold">{payload[0].name}</p>
        <p className="text-indigo-400">{`${payload[0].value} Employees`}</p>
      </div>
    );
  }
  return null;
};

interface OverviewMetricsProps {
  type: "employees" | "salary";
}

const OverviewMetrics: React.FC<OverviewMetricsProps> = ({ type }) => {
  // Mock data for employees and departments
  const employees = [
    { designation: "Developer" },
    { designation: "Designer" },
    { designation: "Manager" },
    { designation: "Developer" },
  ];

  const departmentData = [
    { name: "Developer", value: 2, color: colorPalette[0] },
    { name: "Designer", value: 1, color: colorPalette[1] },
    { name: "Manager", value: 1, color: colorPalette[2] },
  ];

  // Mock data for total salary
  const totalSalary = 100;

  if (type === "employees") {
    return (
      <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 h-[420px] hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/10 group">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-gray-400 mb-2">Total Employees</h3>
            <div className="text-4xl font-bold group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
              {employees.length}
            </div>
            <div className="text-green-400 text-sm mt-1">+12% from last month</div>
          </div>
          <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center transform transition-transform group-hover:scale-110">
            <Users className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className="h-44 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={departmentData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 h-[420px] hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/10 group">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-gray-400 mb-2">Total Amount to be Paid</h3>
          <div className="text-4xl font-bold text-green-400">{totalSalary} ether</div>
          <div className="text-green-400 text-sm mt-1">75% already processed</div>
        </div>
        <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center transform transition-transform group-hover:scale-110">
          <DollarSign className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );
};

export default OverviewMetrics;