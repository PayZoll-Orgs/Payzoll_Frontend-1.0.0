"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff, Building2, User, Wallet } from "lucide-react";
import FormInput from "./FormInput";
import { useAuth } from "@/contexts/AuthContext";

interface LoginFormData {
  email: string;
  password: string;
}

const EnhancedLoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userType, setUserType] = useState<"employee" | "employer">("employee");
  const [error, setError] = useState<string | null>(null);
  const { loginWithCredentials, loginWithWallet, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    
    try {
      await loginWithCredentials({
        email: data.email,
        password: data.password
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    }
  };

  const handleWalletLogin = async () => {
    setError(null);
    
    try {
      await loginWithWallet();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Wallet login failed. Please try again.");
    }
  };

  const handleUserTypeChange = (type: "employee" | "employer") => {
    if (type !== userType) {
      setUserType(type);
      reset();
      setError(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* User Type Toggle */}
      <div className="flex space-x-4 mb-6">
        {[
          { type: "employee", icon: User, label: "Employee" },
          { type: "employer", icon: Building2, label: "Employer" },
        ].map(({ type, icon: Icon, label }) => (
          <button
            key={type}
            type="button"
            onClick={() => handleUserTypeChange(type as "employee" | "employer")}
            className={`flex-1 py-3 px-4 rounded-xl border ${
              userType === type
                ? "border-[#93c5fd] bg-[#93c5fd]/10 text-white"
                : "border-[#3B4058]/20 text-gray-400 hover:border-[#93c5fd]/50"
            } transition-all flex items-center justify-center space-x-2 group cursor-pointer`}
            disabled={isLoading}
          >
            <Icon
              className={`w-4 h-4 ${
                userType === type
                  ? "text-[#93c5fd]"
                  : "text-gray-400 group-hover:text-[#93c5fd]"
              } transition-colors`}
            />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-sm">
          {error}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Input */}
        <FormInput
          label={userType === "employer" ? "Company Email" : "Email Address"}
          type="email"
          placeholder={
            userType === "employer" ? "Enter company email" : "Enter your email"
          }
          icon={<Mail className="w-5 h-5" />}
          error={errors.email?.message ? { message: errors.email.message } : undefined}
          disabled={isLoading}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />

        {/* Password Input */}
        <FormInput
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          icon={<Lock className="w-5 h-5" />}
          error={errors.password?.message ? { message: errors.password.message } : undefined}
          disabled={isLoading}
          endIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-white transition-colors"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          }
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />

        {/* Forgot Password Link */}
        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm text-[#93c5fd] hover:text-[#93c5fd]/80 transition-colors"
            disabled={isLoading}
          >
            Forgot Password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#93c5fd] text-white py-3 px-4 rounded-xl
                   hover:bg-[#93c5fd]/90 transition-all duration-200 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : `Login as ${userType === "employer" ? "Employer" : "Employee"}`}
        </button>
      </form>

      {/* OR Divider */}
      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-[#3B4058]/30"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
        <div className="flex-grow border-t border-[#3B4058]/30"></div>
      </div>

      {/* Wallet Login Button */}
      <button
        type="button"
        onClick={handleWalletLogin}
        className="w-full bg-[#14161E] text-white py-3 px-4 rounded-xl border border-[#3B4058]/50
                 hover:border-[#93c5fd]/50 hover:bg-[#3B4058]/20 transition-all duration-200 
                 flex items-center justify-center space-x-2"
        disabled={isLoading}
      >
        <Wallet className="w-5 h-5 text-[#93c5fd]" />
        <span>{isLoading ? "Connecting..." : "Login with Wallet"}</span>
      </button>
    </div>
  );
};

export default EnhancedLoginForm;