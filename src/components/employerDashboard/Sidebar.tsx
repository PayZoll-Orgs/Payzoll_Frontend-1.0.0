"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  BadgeDollarSign,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import "../../styles/gradients.css";

const menuItems = [
  // { icon: LayoutDashboard, label: "Dashboard", path: "/employerDashboard" },
  { icon: Users, label: "Employees", path: "/employeesDashboard" },
  { icon: BadgeDollarSign, label: "Payments", path: "/payments" },
];

interface SidebarProps {
  isWalletConnected: boolean;
  onConnectWallet: () => void;
  account?: string;
}
const Sidebar: React.FC<SidebarProps> = ({
  isWalletConnected,
  onConnectWallet,
  account,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.setItem("token", "null");
    router.push("/auth?mode=login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0c0f16]/90 backdrop-blur-md border-r border-[#22304a]/20 z-30">
      <div className="flex flex-col h-full">
        {/* Company Name */}
        <div className="p-6 border-b border-[#22304a]/20 flex flex-col gap-y-3">
          <Link href="/employer/dashboard">
            <h1 className="text-xl font-bold text-[#F2F2F2] font-mono" style={{
              textShadow: "0 0 5px rgba(45, 139, 117, 0.4), 0 0 10px rgba(45, 139, 117, 0.2)"
            }}>PayZoll</h1>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all group border ${
                  isActive
                    ? "text-[#F2F2F2] border-[#2D8B75]/50 bg-[#2D8B75]/10"
                    : "text-gray-400 border-transparent hover:text-[#F2F2F2] hover:bg-white/5"
                }`}
              >
                {/* Active tab background - Matches border width and height */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 w-full h-full bg-[#2D8B75]/10 border border-[#2D8B75]/50 rounded-xl -z-10"
                  />
                )}

                {/* Icon - Always visible */}
                <item.icon
                  className={`w-5 h-5 flex-shrink-0 ${
                    isActive ? "text-[#2D8B75]" : "group-hover:text-[#2D8B75]"
                  }`}
                />

                {/* Text Label */}
                <span className="relative font-mono">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Wallet Connection */}
        {/* <div className="p-4 border-t border-[#22304a]/20">
          {isWalletConnected ? (
            <div className="bg-[#131620]/70 backdrop-blur-sm p-4 rounded-xl border border-[#22304a]/20">
              <div className="text-sm text-gray-400 font-mono">Connected Wallet</div>
              <div className="text-[#2D8B75] font-mono text-sm truncate">
                {account}
              </div>
            </div>
          ) : (
            <button
              onClick={onConnectWallet}
              className="w-full bg-[#2D8B75] text-white py-3 px-4 rounded-xl
                     hover:bg-[#2D8B75]/90 transition-all duration-200 flex items-center justify-center font-mono shadow-md shadow-[#2D8B75]/20"
            >
              Connect Wallet
            </button>
          )}
        </div> */}

        {/* Logout */}
        <button
          className="flex items-center space-x-3 px-8 py-6 text-gray-400 hover:text-[#F2F2F2] transition-colors border-t border-[#22304a]/20 font-mono"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 text-[#2D8B75]/60" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;