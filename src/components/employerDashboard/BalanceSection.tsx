"use client";

import React, { useState } from "react";
import { Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/gradients.css";

interface CryptoBalance {
  currency: string;
  amount: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const cryptoBalances: CryptoBalance[] = [
  {
    currency: "ETH",
    amount: "12.5",
    value: "$24,500",
    change: "+5.2%",
    isPositive: true,
  },
  {
    currency: "BTC",
    amount: "1.2",
    value: "$45,600",
    change: "-2.1%",
    isPositive: false,
  },
  {
    currency: "USDT",
    amount: "50,000",
    value: "$50,000",
    change: "+0.1%",
    isPositive: true,
  },
];

const BalanceSection: React.FC = () => {
  const [showAddFunds, setShowAddFunds] = useState<boolean>(false);

  return (
    <div className="bg-[#131620]/90 backdrop-blur-sm border border-[#22304a]/30 rounded-xl p-6 h-[420px] overflow-hidden hover:border-[#2D8B75]/30 transition-all shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#F2F2F2] font-mono" style={{
            textShadow: "0 0 5px rgba(45, 139, 117, 0.4), 0 0 10px rgba(45, 139, 117, 0.2)"
          }}>
            Token Balance
          </h2>
          <p className="text-gray-400 text-sm mt-1 font-mono">Your token details</p>
        </div>
      </div>

      <div className="bg-[#0c0f16]/80 backdrop-blur-sm rounded-xl p-6 mb-6 border border-[#22304a]/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 font-mono">Total Coins</span>
          <span className="text-[#2D8B75] text-sm font-mono">+3.2% this month</span>
        </div>
        <div className="text-3xl font-bold text-[#F2F2F2] font-mono" style={{
          textShadow: "0 0 5px rgba(45, 139, 117, 0.3), 0 0 10px rgba(45, 139, 117, 0.1)"
        }}>0</div>
      </div>

      <div className="space-y-4 overflow-y-auto scrollbar-hide pr-2" style={{ maxHeight: "180px" }}>
        {cryptoBalances.map((crypto, index) => (
          <motion.div
            key={crypto.currency}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group/item bg-[#0c0f16]/80 backdrop-blur-sm rounded-xl p-4 border border-[#22304a]/30 hover:border-[#2D8B75]/30 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Wallet className="w-6 h-6 text-[#2D8B75]" />
                <div>
                  <div className="font-semibold text-[#F2F2F2] font-mono">{crypto.currency}</div>
                  <div className="text-sm text-gray-400 font-mono">{crypto.amount} {crypto.currency}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-[#F2F2F2] font-mono">{crypto.value}</div>
                <div className={`text-sm flex items-center font-mono ${crypto.isPositive ? "text-green-400" : "text-red-400"}`}>
                  {crypto.isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                  {crypto.change}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showAddFunds && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowAddFunds(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-[#131620]/90 backdrop-filter backdrop-blur-md p-6 rounded-2xl border border-[#22304a]/40 w-full max-w-md m-4 hover:border-[#2D8B75]/30 transition-all shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4 text-[#F2F2F2] font-mono" style={{
                textShadow: "0 0 5px rgba(45, 139, 117, 0.3), 0 0 10px rgba(45, 139, 117, 0.1)"
              }}>Add Funds</h3>
              <button className="w-full bg-[#2D8B75] text-white py-3 rounded-xl hover:bg-[#2D8B75]/90 transition-all border border-[#2D8B75]/30 font-mono shadow-md shadow-[#2D8B75]/20">
                Proceed to Payment
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BalanceSection;