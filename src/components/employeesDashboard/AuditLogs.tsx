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
import "../../styles/gradients.css";

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
      color: "text-[#2D8B75]",
      onClick: onAddEmployee
    },
    {
      title: "Bulk Upload",
      description: "Import multiple employees from CSV/Excel",
      icon: Upload,
      color: "text-[#2D8B75]",
      onClick: onBulkUpload
    },
    // {
    //   title: "Process Payroll",
    //   description: "Run monthly payroll for all employees",
    //   icon: DollarSign,
    //   color: "text-[#2D8B75]",
    //   onClick: () => console.log("Process payroll")
    // },
    // {
    //   title: "Generate Reports",
    //   description: "Create detailed employee reports",
    //   icon: FileCheck,
    //   color: "text-[#2D8B75]",
    //   onClick: () => console.log("Generate reports")
    // }
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
    <div className="bg-[#131620]/90 backdrop-blur-sm border border-[#22304a]/30 rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 hover:border-[#2D8B75]/40 transition-all shadow-lg">
      <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-5 lg:mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#0c0f16]/80 backdrop-blur-sm flex items-center justify-center border border-[#22304a]/30">
            <ClipboardList className="w-4 h-4 sm:w-5 sm:h-5 text-[#2D8B75]" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#F2F2F2] font-mono" style={{
              textShadow: "0 0 5px rgba(45, 139, 117, 0.4), 0 0 10px rgba(45, 139, 117, 0.2)"
            }}>Quick Actions</h2>
            <p className="text-gray-400 text-xs sm:text-sm font-mono">Manage your workforce efficiently</p>
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
        {actionCards.map((card, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={card.onClick}
            className="group bg-[#0c0f16]/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-[#22304a]/30 hover:border-[#2D8B75]/50 transition-all text-left focus:outline-none focus:ring-2 focus:ring-[#2D8B75]/40"
          >
            <div className="flex flex-col h-full">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#131620]/90 flex items-center justify-center transform transition-transform group-hover:scale-110 mb-2 sm:mb-3 border border-[#22304a]/30">
                <card.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#2D8B75]" />
              </div>
              <h3 className="font-semibold text-[#F2F2F2] group-hover:text-[#2D8B75] transition-colors mb-1 font-mono">{card.title}</h3>
              <p className="text-xs sm:text-sm text-gray-400 flex-grow font-mono">{card.description}</p>
              <div className="flex justify-end mt-2 sm:mt-3">
                <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-[#2D8B75] transition-colors" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Recent Activity Section */}
      {/* <div>
        <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
          <h3 className="font-semibold text-[#F2F2F2] font-mono" style={{
            textShadow: "0 0 5px rgba(45, 139, 117, 0.3), 0 0 10px rgba(45, 139, 117, 0.2)"
          }}>Recent Activity</h3>
          <button className="text-xs sm:text-sm text-[#2D8B75] hover:text-[#2D8B75]/80 transition-colors font-mono">
            View All
          </button>
        </div>
        
        <div className="space-y-2 sm:space-y-3">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-[#0c0f16]/80 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-[#22304a]/30 hover:border-[#2D8B75]/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#F2F2F2] text-xs sm:text-sm font-mono">{activity.action}</p>
                  <p className="text-gray-400 text-xs font-mono">{activity.detail}</p>
                </div>
                <div className="flex items-center text-gray-400 text-xs font-mono">
                  <Clock className="w-3 h-3 mr-1 text-[#2D8B75]/60" />
                  {activity.time}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default QuickActions;