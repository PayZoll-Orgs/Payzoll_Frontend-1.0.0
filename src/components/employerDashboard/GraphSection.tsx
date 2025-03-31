"use client";

import React, { useState } from "react";
import { Calendar } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "../../styles/gradients.css";

const data = [
  { name: "Jan", Engineering: 45000, Marketing: 28000, Sales: 35000 },
  { name: "Feb", Engineering: 48000, Marketing: 29000, Sales: 37000 },
  { name: "Mar", Engineering: 47000, Marketing: 30000, Sales: 38000 },
  { name: "Apr", Engineering: 49000, Marketing: 31000, Sales: 40000 },
  { name: "May", Engineering: 51000, Marketing: 32000, Sales: 41000 },
  { name: "Jun", Engineering: 52000, Marketing: 33000, Sales: 42000 },
];

const timeframes = ["Weekly", "Monthly", "Quarterly"];
const departments = ["All Departments", "Engineering", "Marketing", "Sales"];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#14161E] p-4 rounded-lg border border-[#3B4058]/20">
        <p className="text-white font-semibold mb-2">{label}</p>
        {payload.map((p, index) => (
          <p key={index} style={{ color: p.color }} className="text-sm">
            {`${p.name}: $${p.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const GraphSection: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("Monthly");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");

  return (
    <div className="bg-[#14161E] border border-[#3B4058]/30 rounded-xl p-6 h-[500px] overflow-hidden hover:border-[#93c5fd]/30 transition-all shadow-lg">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-[#c8ceee] font-mono text-shadow-glow">
            Salary Distribution
          </h2>
          <p className="text-gray-400 text-sm mt-1 font-mono">Overview by department</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="bg-[#0c0e14] text-white border border-[#3B4058]/30 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#93c5fd]/50 hover:border-[#3B4058]/50 transition-all cursor-pointer font-mono"
            aria-label="Select department"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-[#93c5fd]/60" />
            <div className="flex bg-[#1D202D] rounded-lg p-1 border border-[#3B4058]/30">
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all font-mono ${
                    selectedTimeframe === timeframe
                      ? "bg-[#93c5fd] text-white"
                      : "text-gray-400 hover:text-white hover:bg-[#252837]"
                  }`}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-[350px] transition-all hover:opacity-95">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
            <YAxis stroke="#9ca3af" tick={{ fill: "#9ca3af" }} tickFormatter={(value) => `$${value.toLocaleString()}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: "20px", opacity: 0.8 }} />
            <Line type="monotone" dataKey="Engineering" stroke="#93c5fd" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Marketing" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Sales" stroke="#a855f7" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraphSection;
