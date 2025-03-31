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
    <div className="bg-[#14161E] border border-[#3B4058]/30 rounded-xl p-6 h-[420px] overflow-hidden hover:border-[#93c5fd]/30 transition-all shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#c8ceee] font-mono text-shadow-glow">
            Token Balance
          </h2>
          <p className="text-gray-400 text-sm mt-1 font-mono">Your token details</p>
        </div>
      </div>

      <div className="bg-[#14161E] rounded-xl p-6 mb-6 border border-[#3B4058]/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 font-mono">Total Coins</span>
          <span className="text-[#93c5fd] text-sm font-mono">+3.2% this month</span>
        </div>
        <div className="text-3xl font-bold text-[#c8ceee] font-mono text-shadow-glow">0</div>
      </div>

      <div className="space-y-4 overflow-y-auto scrollbar-hide pr-2" style={{ maxHeight: "180px" }}>
        {cryptoBalances.map((crypto, index) => (
          <motion.div
            key={crypto.currency}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group/item bg-[#1D202D]/50 rounded-xl p-4 border border-[#3B4058]/30 hover:border-[#93c5fd]/30 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Wallet className="w-6 h-6 text-[#93c5fd]" />
                <div>
                  <div className="font-semibold text-[#c8ceee] font-mono">{crypto.currency}</div>
                  <div className="text-sm text-gray-400 font-mono">{crypto.amount} {crypto.currency}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-[#c8ceee] font-mono">{crypto.value}</div>
                <div className={`text-sm flex items-center font-mono ${crypto.isPositive ? "text-[#93c5fd]" : "text-red-400"}`}>
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowAddFunds(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-[#14161E] p-6 rounded-2xl border border-[#3B4058]/30 w-full max-w-md m-4 hover:border-[#93c5fd]/30 transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4 text-[#c8ceee] font-mono text-shadow-glow">Add Funds</h3>
              <button className="w-full bg-[#1D202D] text-[#c8ceee] py-3 rounded-xl hover:bg-[#252837] transition-all border border-[#3B4058]/30 font-mono">
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