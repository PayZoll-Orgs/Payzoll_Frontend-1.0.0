"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, X, User, Mail, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const { register: registerUser, connectWallet, walletAddress, isWalletConnected } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const { 
    register, 
    handleSubmit, 
    setValue,
    formState: { errors }, 
    reset 
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Create user data with password for registration
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password || Math.random().toString(36).slice(2), // Use random password if not provided
        walletAddress: walletAddress,
        role: "employer" // Default role
      };
      
      // Register the user
      await registerUser(userData);
      
      // Close the modal and reset form
      onClose();
      reset();
      
      // Redirect to login
      router.push("/login?mode=login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      setError("Failed to connect wallet. Please try again.");
    }
  };

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      reset();
      setError(null);
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#0c0f16] w-full max-w-xl mx-4 rounded-2xl border border-[#22304a] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              boxShadow: "0 0 5px rgba(45, 139, 117, 0.5), 0 0 10px rgba(45, 139, 117, 0.3)"
            }}
          >
            {/* Header */}
            <div className="p-6 border-b border-[#22304a] flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#F2F2F2]">Register</h2>
              <button 
                onClick={onClose} 
                className="text-[#A9A9A9] hover:text-[#F2F2F2] transition-colors"
                disabled={isLoading}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mx-6 mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-sm">
                {error}
              </div>
            )}

            {/* Form Content */}
            <div className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Input */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-sm text-[#A9A9A9] mb-2 block">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A9A9A9]" />
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        disabled={isLoading}
                        {...register("name", { required: "Name is required" })}
                        className="w-full p-3 pl-10 border border-[#22304a]/70 rounded-xl bg-[#131620] text-[#F2F2F2] focus:border-[#2D8B75] focus:outline-none transition-colors"
                      />
                    </div>
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="text-sm text-[#A9A9A9] mb-2 block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A9A9A9]" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      disabled={isLoading}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Invalid email address",
                        },
                      })}
                      className="w-full p-3 pl-10 border border-[#22304a]/70 rounded-xl bg-[#131620] text-[#F2F2F2] focus:border-[#2D8B75] focus:outline-none transition-colors"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                </div>
                
                {/* Password Input (Optional - added new) */}
                <div>
                  <label className="text-sm text-[#A9A9A9] mb-2 block">Password (Optional)</label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Create a password or connect wallet"
                      disabled={isLoading}
                      {...register("password")}
                      className="w-full p-3 pl-3 border border-[#22304a]/70 rounded-xl bg-[#131620] text-[#F2F2F2] focus:border-[#2D8B75] focus:outline-none transition-colors"
                    />
                  </div>
                  <p className="text-xs text-[#A9A9A9] mt-1">If not provided, we'll generate a secure password for you</p>
                </div>

                {/* Wallet Connection */}
                <div className="pt-6 border-t border-[#22304a]/50">
                  <label className="text-sm text-[#A9A9A9] mb-2 block">Connect Wallet Address</label>
                  <div className="relative">
                    {!isWalletConnected ? (
                      <button
                        type="button"
                        disabled={isLoading}
                        className="w-full flex items-center justify-between p-4 border border-[#22304a]/70 rounded-xl bg-[#131620] hover:bg-[#0c0f16] text-[#F2F2F2] transition-all group"
                        onClick={handleConnectWallet}
                      >
                        <div className="flex items-center">
                          <Wallet className="w-5 h-5 text-[#2D8B75] mr-3" />
                          <span className="font-medium">
                            {isLoading ? "Connecting..." : "Connect Wallet"}
                          </span>
                        </div>
                        <div className="bg-[#2D8B75]/10 group-hover:bg-[#2D8B75]/20 p-2 rounded-lg transition-colors">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19M5 12H19" stroke="#2D8B75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </button>
                    ) : (
                      <div className="w-full flex items-center p-4 border border-[#22304a]/70 rounded-xl bg-[#131620] text-[#F2F2F2]">
                        <Wallet className="w-5 h-5 text-[#2D8B75] mr-3" />
                        <span className="font-mono text-sm truncate flex-1">
                          {walletAddress}
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsWalletConnected(false)}
                          className="ml-2 p-1 rounded-lg bg-[#2D8B75]/10 hover:bg-[#2D8B75]/20 text-[#2D8B75]"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-6 bg-gradient-to-r from-[#2D8B75] to-[#B38D36] text-[#F2F2F2] py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-[#2D8B75]/20 transition-all duration-300 flex items-center justify-center disabled:opacity-70"
                  style={{
                    boxShadow: "0 0 5px rgba(45, 139, 117, 0.5)"
                  }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    "Register Now"
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegisterModal;