"use client";

import React from "react";
import { Users, UserPlus, Clock } from "lucide-react";
import { motion } from "framer-motion";
import "../../styles/gradients.css";

interface Employee {
  dateOfJoining: string;
}

interface EmployeeStatsProps {
  employees: Employee[];
}

const EmployeeStats: React.FC<EmployeeStatsProps> = ({ employees }) => {
  const getNewEmployeesThisMonth = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return employees.filter((employee) => {
      const joinDate = new Date(employee.dateOfJoining);
      return joinDate.getMonth() === currentMonth && joinDate.getFullYear() === currentYear;
    }).length;
  };

  const totalEmployees = employees.length;
  const newThisMonth = getNewEmployeesThisMonth();
  
  const stats = [
    {
      title: "Total Employees",
      value: totalEmployees,
      change: `+${((newThisMonth / (totalEmployees || 1)) * 100).toFixed(1)}%`,
      icon: Users,
      color: "text-[#2D8B75]",
      message: "from last year",
    },
    {
      title: "New This Month",
      value: newThisMonth,
      change: `+${((newThisMonth / (totalEmployees || 1)) * 100).toFixed(1)}%`,
      icon: UserPlus,
      color: "text-[#2D8B75]",
      message: "from last month",
    },
    {
      title: "Pending Activation",
      value: 5,
      change: "-2%",
      isNegative: true,
      icon: Clock,
      color: "text-[#2D8B75]",
      message: "from last year",
    },
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-[#131620]/90 backdrop-blur-sm border border-[#22304a]/30 rounded-xl p-6 hover:border-[#2D8B75]/30 transition-all shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-gray-400 text-sm font-mono">{stat.title}</h3>
              <div className="text-3xl font-bold mt-1 text-[#F2F2F2] font-mono" style={{
                textShadow: "0 0 5px rgba(45, 139, 117, 0.3), 0 0 10px rgba(45, 139, 117, 0.2)"
              }}>
                {stat.value}
              </div>
            </div>
            <div
              className="w-12 h-12 rounded-lg bg-[#0c0f16]/80 backdrop-blur-sm flex items-center justify-center border border-[#22304a]/30"
            >
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
          <div className={`text-sm font-mono ${stat.isNegative ? "text-red-400" : "text-green-400"}`}>
            {stat.change} {stat.message}
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default EmployeeStats;