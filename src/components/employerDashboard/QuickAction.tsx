"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  ArrowLeftRight,
  PiggyBank,
  Landmark,
  UserPlus,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

const QuickActions: React.FC<{ isWalletConnected: boolean }> = ({ isWalletConnected }) => {
  const router = useRouter();

  const actions = [
    {
      icon: DollarSign,
      label: "Buy/Sell Crypto",
      color: "text-green-400",
      onClick: () => console.log("Buy/Sell Crypto clicked"),
    },
    {
      icon: ArrowLeftRight,
      label: "Swap Crypto",
      color: "text-[#2D8B75]",
      onClick: () => console.log("Swap Crypto clicked"),
    },
    {
      icon: PiggyBank,
      label: "Lending",
      color: "text-[#2D8B75]",
      onClick: () => router.push("/lending"),
    },
    {
      icon: Landmark,
      label: "Stake",
      color: "text-[#2D8B75]",
      onClick: () => router.push("/stake"),
    },
    {
      icon: Users,
      label: "Pay Employees",
      color: "text-[#2D8B75]",
      onClick: () => router.push("/employer/payments"),
    },
    {
      icon: UserPlus,
      label: "Add Employee",
      color: "text-[#2D8B75]",
      onClick: () => router.push("/employer/employees"),
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {actions.map((action, index) => (
        <motion.button
          key={action.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`group relative p-4 bg-[#131620]/90 backdrop-blur-sm rounded-xl border border-[#22304a]/30 
                     hover:border-[#22304a]/50 transition-all duration-300 ${
                       !isWalletConnected ? "opacity-50 cursor-not-allowed" : ""
                     }`}
          disabled={!isWalletConnected}
          onClick={action.onClick}
        >
          <div className="flex flex-col items-center space-y-2">
            <action.icon className={`w-7 h-7 ${action.color} transform group-hover:scale-110 transition-transform`} />
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors font-mono">
              {action.label}
            </span>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default QuickActions;