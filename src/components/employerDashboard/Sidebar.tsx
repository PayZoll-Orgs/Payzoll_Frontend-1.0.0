"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  BadgeDollarSign,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/employerDashboard" },
  { icon: Users, label: "Employees", path: "/employeesDashboard" },
  { icon: BadgeDollarSign, label: "Payments", path: "/payments" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface SidebarProps {
  isWalletConnected: boolean;
  onConnectWallet: () => void;
  account?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isWalletConnected, onConnectWallet, account }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // State to track loading

  const handleLogout = () => {
    localStorage.setItem("token", "null");
    router.push("/auth?mode=login");
  };

  const handlePayZollAgentClick = () => {
    setIsLoading(true); // Set loading to true when PayZollAgent is clicked
    setTimeout(() => {
      setIsLoading(false); // Simulate loading completion after a delay
      window.open("https://web-agent-client.onrender.com/", "_blank");
    }, 2000); // Adjust the delay as needed
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#14161E] border-r border-[#3B4058]/20">
      <div className="flex flex-col h-full">
        {/* Company Name */}
        <div className="p-6 border-b border-[#3B4058]/20 flex flex-col gap-y-3">
          <Link href="/employer/dashboard">
            <h1 className="text-xl font-bold text-white">
              PayZoll
            </h1>
          </Link>
          {isLoading ? (
            <div className="min-h-[48px] flex items-center justify-center bg-[#1D202D] text-white">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="flex items-center space-x-2"
              >
                <Sparkles className="w-6 h-6 text-[#93c5fd]" />
                <span className="text-sm font-medium">Loading...</span>
              </motion.div>
            </div>
          ) : (
            <button
              onClick={handlePayZollAgentClick}
              className="text-center font-bold bg-[#93c5fd] text-white px-6 py-2 rounded-full hover:bg-[#93c5fd]/90 transition-all"
            >
              PayZoll Agent
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all group relative ${
                  isActive
                    ? "text-white bg-[#93c5fd]/10 border border-[#93c5fd]/50"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#1D202D] rounded-xl"
                  />
                )}
                <item.icon
                  className={`w-5 h-5 ${
                    isActive ? "text-[#93c5fd]" : "group-hover:text-[#93c5fd]"
                  }`}
                />
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Wallet Connection */}
        <div className="p-4 border-t border-[#3B4058]/20">
          {isWalletConnected ? (
            <div className="bg-[#1D202D]/50 p-4 rounded-xl border border-[#3B4058]/20">
              <div className="text-sm text-gray-400">Connected Wallet</div>
              <div className="text-[#93c5fd] font-mono text-sm truncate">{account}</div>
            </div>
          ) : (
            <button
              onClick={onConnectWallet}
              className="w-full bg-[#93c5fd] text-white py-3 px-4 rounded-xl
                     hover:bg-[#93c5fd]/90 transition-all duration-200 flex items-center justify-center"
            >
              Connect Wallet
            </button>
          )}
        </div>

        {/* Logout */}
        <button
          className="flex items-center space-x-3 px-8 py-6 text-gray-400 hover:text-white transition-colors border-t border-[#3B4058]/20"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;