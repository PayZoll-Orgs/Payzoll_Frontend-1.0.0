"use client";

import React from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/employerDashboard/Sidebar";
import EmployerHeader from "@/components/employerDashboard/EmployerHeader";
import RecentActivity from "@/components/employerDashboard/RecentActivity";
import EmployeeProfile from "@/components/employerDashboard/EmployeeProfile";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

const EmployerDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#131620] text-white flex flex-col md:flex-row">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-[#2D8B75]/10 via-transparent to-transparent" />
      </div>

      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full"
            initial={{ opacity: 0.1 }}
            animate={{
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.2, 1],
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: `radial-gradient(circle, ${
                i === 0
                  ? "rgba(45, 139, 117, 0.1)"
                  : i === 1
                  ? "rgba(34, 48, 74, 0.1)"
                  : "rgba(179, 141, 54, 0.1)"
              } 0%, transparent 70%)`,
              left: `${i * 30}%`,
              top: `${i * 20}%`,
            }}
          />
        ))}
      </div>

      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          isWalletConnected={false}
          onConnectWallet={() => console.log("TODO")}
          account={undefined}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 relative w-full overflow-x-hidden">
        <EmployerHeader />
        <div className="max-w-[1600px] mx-auto space-y-6">
         
          {/* Main Grid Layout */}
          
            {/* First Row: Metrics and Balance */}
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <EmployeeProfile />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {/* Second Row: Graph and Recent Activity */}
           
            <motion.div
              className="col-span-1 md:col-span-12 lg:col-span-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <RecentActivity />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployerDashboard;