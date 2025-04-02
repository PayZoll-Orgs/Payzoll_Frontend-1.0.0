"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff, Building2, Wallet } from "lucide-react";
import FormInput from "./FormInput";
import PasswordStrength from "./PasswordStrength";
import { useAuth } from "@/contexts/AuthContext";

interface SignupFormData {
  companyName: string;
  email: string;
  password: string;
  confirmPassword: string;
  tokenName: string;
  tokenSymbol: string;
  initialSupply: string;
  walletAddress?: string;
}

const EnhancedSignupForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const { register: registerUser, isLoading, connectWallet, walletAddress } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupFormData>();

  const password = watch("password", "");

  const onSubmit = async (data: SignupFormData) => {
    setError(null);
    
    try {
      // Validate passwords match
      if (data.password !== data.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      
      // Add wallet address if connected
      if (walletAddress) {
        data.walletAddress = walletAddress;
      }
      
      await registerUser(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    }
  };

  const handleConnectWallet = async () => {
    try {
      const address = await connectWallet();
      if (address) {
        setWalletConnected(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect wallet");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-sm">
          {error}
        </div>
      )}

      {/* Company Name */}
      <FormInput
        label="Company Name"
        type="text"
        placeholder="Enter company name"
        icon={<Building2 className="w-5 h-5" />}
        disabled={isLoading}
        error={errors.companyName?.message ? { message: errors.companyName.message } : undefined}
        {...register("companyName", {
          required: "Company name is required",
          minLength: {
            value: 2,
            message: "Company name must be at least 2 characters",
          },
        })}
      />

      {/* Business Email */}
      <FormInput
        label="Business Email"
        type="email"
        placeholder="Enter company email"
        icon={<Mail className="w-5 h-5" />}
        disabled={isLoading}
        error={errors.email?.message ? { message: errors.email.message } : undefined}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        })}
      />

      {/* Password + Strength Meter */}
      <div className="space-y-2">
        <FormInput
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Create a password"
          icon={<Lock className="w-5 h-5" />}
          disabled={isLoading}
          error={errors.password?.message ? { message: errors.password.message } : undefined}
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
        <PasswordStrength password={password} />
      </div>

      {/* Confirm Password */}
      <FormInput
        label="Confirm Password"
        type={showPassword ? "text" : "password"}
        placeholder="Confirm your password"
        icon={<Lock className="w-5 h-5" />}
        disabled={isLoading}
        error={errors.confirmPassword?.message ? { message: errors.confirmPassword.message } : undefined}
        {...register("confirmPassword", {
          required: "Please confirm your password",
          validate: (value) => value === password || "Passwords do not match",
        })}
      />

      {/* Wallet Connection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          Connect Wallet (Optional)
        </label>
        <div className="flex space-x-2">
          {!walletConnected && !walletAddress ? (
            <button
              type="button"
              onClick={handleConnectWallet}
              className="w-full bg-[#14161E] text-white py-3 px-4 rounded-xl border border-[#3B4058]/50
                       hover:border-[#93c5fd]/50 hover:bg-[#3B4058]/20 transition-all duration-200 
                       flex items-center justify-center space-x-2"
              disabled={isLoading}
            >
              <Wallet className="w-5 h-5 text-[#93c5fd]" />
              <span>Connect Wallet</span>
            </button>
          ) : (
            <div className="w-full flex">
              <div className="flex-1 bg-[#14161E] text-white py-3 px-4 rounded-l-xl border border-r-0 border-[#3B4058]/50
                            flex items-center">
                <span className="text-gray-400 truncate">
                  {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : ""}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setValue("walletAddress", "");
                  setWalletConnected(false);
                }}
                className="bg-[#14161E] text-white py-3 px-4 rounded-r-xl border border-[#3B4058]/50
                         hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-200"
                disabled={isLoading}
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ESOP/RSU Token Name */}
      <FormInput
        label="ESOP/RSU Token Name"
        type="text"
        placeholder="Enter token name"
        disabled={isLoading}
        error={errors.tokenName?.message ? { message: errors.tokenName.message } : undefined}
        {...register("tokenName", {
          required: "Token name is required",
          minLength: {
            value: 2,
            message: "Token name must be at least 2 characters",
          },
        })}
      />

      {/* ESOP/RSU Token Symbol */}
      <FormInput
        label="ESOP/RSU Token Symbol"
        type="text"
        placeholder="Enter token symbol"
        disabled={isLoading}
        error={errors.tokenSymbol?.message ? { message: errors.tokenSymbol.message } : undefined}
        {...register("tokenSymbol", {
          required: "Token symbol is required",
          maxLength: {
            value: 5,
            message: "Token symbol must not exceed 5 characters",
          },
        })}
      />

      {/* Initial Supply */}
      <FormInput
        label="Initial Supply"
        type="number"
        placeholder="Enter initial supply"
        disabled={isLoading}
        error={errors.initialSupply?.message ? { message: errors.initialSupply.message } : undefined}
        {...register("initialSupply", {
          required: "Initial supply is required",
          min: {
            value: 1,
            message: "Initial supply must be at least 1",
          },
        })}
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#93c5fd] text-white py-3 px-4 rounded-xl
                 hover:bg-[#93c5fd]/90 transition-all duration-200 flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? "Creating Account..." : "Create Employer Account"}
      </button>

      {/* Terms & Privacy Notice */}
      <p className="text-sm text-gray-400 text-center">
        By signing up, you agree to our{" "}
        <a href="#" className="text-[#93c5fd] hover:text-[#93c5fd]/80">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-[#93c5fd] hover:text-[#93c5fd]/80">
          Privacy Policy
        </a>
      </p>
    </form>
  );
};

export default EnhancedSignupForm;