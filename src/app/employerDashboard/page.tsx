"use client";

import React from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";
import QuickActions from "@/components/dashboard/QuickAction";
import OverviewMetrics from "@/components/dashboard/OverviewMetrics";
import GraphSection from "@/components/dashboard/GraphSection";
import BalanceSection from "@/components/dashboard/BalanceSection";
import RecentActivity from "@/components/dashboard/RecentActivity";

const EmployerDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-crypto-dark text-white flex">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-indigo-900/20 via-transparent to-transparent" />
      </div>

      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[500px] h-[500px] rounded-full"
            initial={{ opacity: 0.1 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
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
                  ? "rgba(99,102,241,0.1)"
                  : i === 1
                  ? "rgba(139,92,246,0.1)"
                  : "rgba(168,85,247,0.1)"
              } 0%, transparent 70%)`,
              left: `${i * 30}%`,
              top: `${i * 20}%`,
            }}
          />
        ))}
      </div>

      {/* Sidebar */}
      <Sidebar
        isWalletConnected={false}
        onConnectWallet={() => console.log("TODO")}
        account={undefined}
      />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 relative">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Quick Actions */}
          <QuickActions isWalletConnected={false} />

          {/* Main Grid Layout */}
          <div className="grid grid-cols-12 gap-6">
            {/* First Row: Metrics and Balance */}
            <motion.div
              className="col-span-12 lg:col-span-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <OverviewMetrics type="employees" />
            </motion.div>

            <motion.div
              className="col-span-12 lg:col-span-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <OverviewMetrics type="salary" />
            </motion.div>

            <motion.div
              className="col-span-12 lg:col-span-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <BalanceSection />
            </motion.div>

            {/* Second Row: Graph and Recent Activity */}
            <motion.div
              className="col-span-12 lg:col-span-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <GraphSection />
            </motion.div>

            <motion.div
              className="col-span-12 lg:col-span-6"
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