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
  { icon: LayoutDashboard, label: "Dashboard", path: "/employerDashboard" },
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
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#14161E] border-r border-[#3B4058]/20">
      <div className="flex flex-col h-full">
        {/* Company Name */}
        <div className="p-6 border-b border-[#3B4058]/20 flex flex-col gap-y-3">
          <Link href="/employer/dashboard">
            <h1 className="text-xl font-bold text-[#c8ceee] font-mono text-shadow-glow">PayZoll</h1>
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
                    ? "text-[#c8ceee] border-[#93c5fd]/50 bg-[#93c5fd]/10"
                    : "text-gray-400 border-transparent hover:text-[#c8ceee] hover:bg-white/5"
                }`}
              >
                {/* Active tab background - Matches border width and height */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 w-full h-full bg-[#93c5fd]/10 border border-[#93c5fd]/50 rounded-xl -z-10"
                  />
                )}

                {/* Icon - Always visible */}
                <item.icon
                  className={`w-5 h-5 flex-shrink-0 ${
                    isActive ? "text-[#93c5fd]" : "group-hover:text-[#93c5fd]"
                  }`}
                />

                {/* Text Label */}
                <span className="relative font-mono">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Wallet Connection */}
        <div className="p-4 border-t border-[#3B4058]/20">
          {isWalletConnected ? (
            <div className="bg-[#1D202D]/50 p-4 rounded-xl border border-[#3B4058]/20">
              <div className="text-sm text-gray-400 font-mono">Connected Wallet</div>
              <div className="text-[#93c5fd] font-mono text-sm truncate">
                {account}
              </div>
            </div>
          ) : (
            <button
              onClick={onConnectWallet}
              className="w-full bg-[#93c5fd] text-white py-3 px-4 rounded-xl
                     hover:bg-[#93c5fd]/90 transition-all duration-200 flex items-center justify-center font-mono"
            >
              Connect Wallet
            </button>
          )}
        </div>

        {/* Logout */}
        <button
          className="flex items-center space-x-3 px-8 py-6 text-gray-400 hover:text-[#c8ceee] transition-colors border-t border-[#3B4058]/20 font-mono"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 text-[#93c5fd]/60" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
