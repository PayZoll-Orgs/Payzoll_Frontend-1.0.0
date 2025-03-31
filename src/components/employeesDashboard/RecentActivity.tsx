"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  UserMinus,
  Wallet,
  RefreshCcw,
  Clock,
  CheckCircle,
} from "lucide-react";
import "../../styles/gradients.css";

interface Activity {
  id: number;
  type: string;
  message: string;
  timestamp: string;
  icon: React.ElementType;
  color: string;
}

const activities: Activity[] = [
  {
    id: 1,
    type: "employee_added",
    message: "New employee John Doe added to Engineering team",
    timestamp: "2 hours ago",
    icon: UserPlus,
    color: "text-[#93c5fd]",
  },
  {
    id: 2,
    type: "salary_paid",
    message: "Monthly salary processed for Marketing team",
    timestamp: "5 hours ago",
    icon: Wallet,
    color: "text-[#93c5fd]",
  },
  {
    id: 3,
    type: "wallet_updated",
    message: "Sarah Smith updated their wallet address",
    timestamp: "1 day ago",
    icon: RefreshCcw,
    color: "text-[#93c5fd]",
  },
  {
    id: 4,
    type: "employee_left",
    message: "Mike Johnson has been deactivated",
    timestamp: "2 days ago",
    icon: UserMinus,
    color: "text-[#93c5fd]",
  },
];

const RecentActivity: React.FC = () => {
  return (
    <div className="w-full bg-[#14161E] border border-[#3B4058]/30 rounded-xl p-6 hover:border-[#93c5fd]/30 transition-all shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#c8ceee] font-mono text-shadow-glow">Recent Activity</h3>
        <button 
          className="text-sm text-[#93c5fd] hover:text-[#c8ceee] transition-colors font-mono"
          aria-label="View all activities"
        >
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-[#0c0e14] rounded-xl p-4 border border-[#3B4058]/30 hover:border-[#93c5fd]/30 transition-all"
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-[#1D202D] flex items-center justify-center transform transition-transform group-hover:scale-110">
                <activity.icon className={`w-5 h-5 ${activity.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-gray-300 group-hover:text-white transition-colors font-mono text-sm">
                  {activity.message}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-400 font-mono">
                    {activity.timestamp}
                  </span>
                </div>
              </div>
              <button 
                className="text-gray-400 hover:text-[#93c5fd] transition-colors"
                aria-label="Mark as read"
                title="Mark as read"
              >
                <CheckCircle className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
