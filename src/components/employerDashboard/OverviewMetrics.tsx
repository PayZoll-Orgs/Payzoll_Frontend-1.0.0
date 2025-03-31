"use client";

import React from "react";
import { Users, DollarSign } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const colorPalette = [
  "#93c5fd", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899",
  "#f43f5e", "#f97316", "#fb923c", "#facc15", "#84cc16",
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#14161E] p-3 rounded-lg border border-[#3B4058]/20">
        <p className="text-white font-semibold">{payload[0].name}</p>
        <p className="text-[#93c5fd]">{`${payload[0].value} Employees`}</p>
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
      <div className="bg-var(--bg-secondary) border border-var(--border-color)/20 rounded-xl p-6 h-[420px] hover:border-var(--border-color)/50 transition-all">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-var(--text-secondary) mb-2">Total Employees</h3>
            <div className="text-4xl font-bold text-white">
              {employees.length}
            </div>
            <div className="text-var(--accent-primary) text-sm mt-1">+12% from last month</div>
          </div>
          <Users className="w-10 h-10 text-[#93c5fd]" />
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
    <div className="bg-[#14161E] border border-[#3B4058]/20 rounded-xl p-6 h-[420px] hover:border-[#3B4058]/50 transition-all">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-gray-400 mb-2">Total Amount to be Paid</h3>
          <div className="text-4xl font-bold text-green-400">{totalSalary} ether</div>
          <div className="text-green-400 text-sm mt-1">75% already processed</div>
        </div>
        <DollarSign className="w-10 h-10 text-green-400" />
      </div>
    </div>
  );
};

export default OverviewMetrics;