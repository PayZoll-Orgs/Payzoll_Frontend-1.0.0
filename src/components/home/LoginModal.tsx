"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, X, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { loginWithCredentials, loginWithWallet } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await loginWithCredentials({
        email: data.email,
        password: data.password
      });
      
      // Close modal and reset form on success
      onClose();
      reset();
      
      // Redirect will be handled by the auth context
    } catch (err) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletLogin = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await loginWithWallet();
      
      // Close modal and reset form on success
      onClose();
      reset();
      
      // Redirect will be handled by the auth context
    } catch (err) {
      console.error("Wallet login error:", err);
      setError(err instanceof Error ? err.message : "Wallet login failed. Please try again.");
    } finally {
      setIsLoading(false);
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

  // Debug logging
  useEffect(() => {
    console.log("Login Modal isOpen:", isOpen);
  }, [isOpen]);

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
            className="bg-[#0c0f16] w-full max-w-md mx-4 rounded-2xl border border-[#22304a] overflow-hidden"
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
              <h2 className="text-xl font-bold text-[#F2F2F2]">Sign In</h2>
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

                {/* Password Input */}
                <div>
                  <label className="text-sm text-[#A9A9A9] mb-2 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A9A9A9]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      disabled={isLoading}
                      {...register("password", {
                        required: "Password is required"
                      })}
                      className="w-full p-3 pl-10 pr-10 border border-[#22304a]/70 rounded-xl bg-[#131620] text-[#F2F2F2] focus:border-[#2D8B75] focus:outline-none transition-colors"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A9A9A9] hover:text-[#F2F2F2]"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#2D8B75] to-[#B38D36] text-[#F2F2F2] py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-[#2D8B75]/20 transition-all duration-300 flex items-center justify-center disabled:opacity-70"
                  style={{
                    boxShadow: "0 0 5px rgba(45, 139, 117, 0.5)"
                  }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              {/* OR Divider */}
              <div className="relative flex items-center py-5">
                <div className="flex-grow border-t border-[#22304a]/50"></div>
                <span className="flex-shrink mx-4 text-[#A9A9A9] text-sm">OR</span>
                <div className="flex-grow border-t border-[#22304a]/50"></div>
              </div>

              {/* Wallet Login Button */}
              <button
                type="button"
                disabled={isLoading}
                onClick={handleWalletLogin}
                className="w-full flex items-center justify-center p-3 border border-[#22304a]/70 rounded-xl bg-[#131620] hover:bg-[#0c0f16] text-[#F2F2F2] transition-all group"
              >
                <Wallet className="w-5 h-5 text-[#2D8B75] mr-3" />
                <span className="font-medium">
                  {isLoading ? "Connecting..." : "Login with Wallet"}
                </span>
              </button>

              {/* Test Credentials */}
              <div className="mt-4 text-center">
                <p className="text-xs text-[#A9A9A9]">
                  <span className="block mb-1">Test Credentials:</span>
                  <span className="block">Employee: employee@example.com / password123</span>
                  <span className="block">Employer: employer@example.com / password123</span>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;