"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ClipboardList, 
  UserPlus, 
  Upload, 
  ArrowUpRight, 
  DollarSign,
  FileCheck,
  Clock
} from "lucide-react";

interface QuickActionsProps {
  onAddEmployee: () => void;
  onBulkUpload: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onAddEmployee, onBulkUpload }) => {
  // Define quick action cards
  const actionCards = [
    {
      title: "Add Employee",
      description: "Add a new team member to your organization",
      icon: UserPlus,
      color: "from-green-600 to-emerald-600",
      onClick: onAddEmployee
    },
    {
      title: "Bulk Upload",
      description: "Import multiple employees from CSV/Excel",
      icon: Upload,
      color: "from-indigo-600 to-purple-600",
      onClick: onBulkUpload
    },
    {
      title: "Process Payroll",
      description: "Run monthly payroll for all employees",
      icon: DollarSign,
      color: "from-blue-600 to-indigo-600",
      onClick: () => console.log("Process payroll")
    },
    {
      title: "Generate Reports",
      description: "Create detailed employee reports",
      icon: FileCheck,
      color: "from-purple-600 to-pink-600",
      onClick: () => console.log("Generate reports")
    }
  ];

  // Define recent activity items
  const recentActivities = [
    {
      action: "Salary processed",
      detail: "Monthly payroll completed",
      time: "2 hours ago"
    },
    {
      action: "New employee added",
      detail: "John Doe joined the team",
      time: "1 day ago"
    }
  ];

  return (
    <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
            <ClipboardList className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Quick Actions</h2>
            <p className="text-sm text-gray-400">Manage your workforce efficiently</p>
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {actionCards.map((card, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={card.onClick}
            className="group bg-crypto-dark/50 rounded-xl p-4 border border-gray-800 hover:border-indigo-500/50 transition-all text-left"
          >
            <div className="flex flex-col h-full">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center transform transition-transform group-hover:scale-110 mb-3`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors mb-1">{card.title}</h3>
              <p className="text-sm text-gray-400 flex-grow">{card.description}</p>
              <div className="flex justify-end mt-3">
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-400 transition-colors" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white">Recent Activity</h3>
          <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
            View All
          </button>
        </div>
        
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-crypto-dark/50 rounded-lg p-3 border border-gray-800"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm">{activity.action}</p>
                  <p className="text-gray-400 text-xs">{activity.detail}</p>
                </div>
                <div className="flex items-center text-gray-400 text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {activity.time}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;