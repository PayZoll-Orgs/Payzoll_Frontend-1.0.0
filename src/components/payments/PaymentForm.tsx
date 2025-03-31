"use client";

import React, { useState } from "react";
import { AlertCircle, DollarSign, Send, Info } from "lucide-react";
import "../../styles/gradients.css";

const PaymentForm: React.FC = () => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      // Reset form or show success
      setAddress("");
      setAmount("");
      setDescription("");
      alert("Payment initiated successfully!");
    }, 2000);
  };

  return (
    <div className="w-full bg-[#131620]/90 backdrop-blur-sm border border-[#22304a]/30 rounded-xl p-4 sm:p-6 
                    hover:border-[#2D8B75]/30 transition-all shadow-lg max-w-3xl mx-auto">
      <h2 className="text-lg sm:text-xl font-bold text-[#F2F2F2] mb-4 sm:mb-6 font-mono" style={{
        textShadow: "0 0 5px rgba(45, 139, 117, 0.4), 0 0 10px rgba(45, 139, 117, 0.2)"
      }}>Send Payment</h2>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Receiver Address Input */}
        <div>
          <label htmlFor="address" className="block text-gray-400 mb-1 sm:mb-2 font-mono text-sm sm:text-base">
            Receiver Address
          </label>
          <div className="relative">
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="0x..."
              className="w-full bg-[#0c0f16]/80 backdrop-blur-sm border border-[#22304a]/30 text-white rounded-xl py-2 sm:py-3 px-3 sm:px-4
                         focus:outline-none focus:ring-2 focus:ring-[#2D8B75]/50 transition-all font-mono text-sm sm:text-base"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Info className="h-4 w-4 sm:h-5 sm:w-5 text-[#2D8B75]" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-1 font-mono">Enter a valid Ethereum address</p>
        </div>

        {/* Amount Input */}
        <div>
          <label htmlFor="amount" className="block text-gray-400 mb-1 sm:mb-2 font-mono text-sm sm:text-base">
            Amount
          </label>
          <div className="relative">
            <input
              id="amount"
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-[#0c0f16]/80 backdrop-blur-sm border border-[#22304a]/30 text-white rounded-xl py-2 sm:py-3 pl-8 sm:pl-10 pr-3 sm:pr-4
                         focus:outline-none focus:ring-2 focus:ring-[#2D8B75]/50 transition-all font-mono text-sm sm:text-base"
              required
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-[#2D8B75]" />
            </div>
          </div>
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="description" className="block text-gray-400 mb-1 sm:mb-2 font-mono text-sm sm:text-base">
            Description (Optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter payment details..."
            className="w-full bg-[#0c0f16]/80 backdrop-blur-sm border border-[#22304a]/30 text-white rounded-xl py-2 sm:py-3 px-3 sm:px-4 h-16 sm:h-24
                      focus:outline-none focus:ring-2 focus:ring-[#2D8B75]/50 transition-all font-mono resize-none text-sm sm:text-base"
          />
        </div>

        {/* Fee Estimate */}
        <div className="bg-[#0c0f16]/80 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-[#22304a]/30 flex items-start space-x-2 sm:space-x-3">
          <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#2D8B75] mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-white font-semibold mb-0.5 sm:mb-1 font-mono text-sm sm:text-base">Estimated Gas Fee</h4>
            <p className="text-gray-400 text-xs sm:text-sm font-mono">
              Current gas price: <span className="text-white">25 Gwei</span><br />
              Estimated fee: <span className="text-white">~$2.50</span>
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 sm:py-3 rounded-xl flex items-center justify-center space-x-2 font-semibold text-sm sm:text-base
                      ${
                        isLoading
                          ? "bg-[#22304a] cursor-wait"
                          : "bg-gradient-to-r from-[#22304a] to-[#2D8B75] hover:shadow-lg hover:shadow-[#2D8B75]/20"
                      } text-white transition-all font-mono shadow-lg`}
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Send Payment</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;