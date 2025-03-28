"use client";

import React from "react";
import { Users, UserPlus, Clock } from "lucide-react";
import { motion } from "framer-motion";

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
      color: "from-indigo-600 to-purple-600",
      message: "from last year",
    },
    {
      title: "New This Month",
      value: newThisMonth,
      change: `+${((newThisMonth / (totalEmployees || 1)) * 100).toFixed(1)}%`,
      icon: UserPlus,
      color: "from-green-600 to-emerald-600",
      message: "from last month",
    },
    {
      title: "Pending Activation",
      value: 5,
      change: "-2%",
      isNegative: true,
      icon: Clock,
      color: "from-orange-600 to-red-600",
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
          className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-gray-400 text-sm">{stat.title}</h3>
              <div className="text-3xl font-bold mt-1 group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                {stat.value}
              </div>
            </div>
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center transform transition-transform group-hover:scale-110`}
            >
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className={`text-sm ${stat.isNegative ? "text-red-400" : "text-green-400"}`}>
            {stat.change} {stat.message}
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default EmployeeStats;