"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Building2 } from "lucide-react";
import FormInput from "./FormInput";
import PasswordStrength from "./PasswordStrength";

interface SignupFormData {
  companyName: string;
  email: string;
  password: string;
  confirmPassword: string;
  tokenName: string;
  tokenSymbol: string;
  initialSupply: string;
}

const SignupForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>();

  const password = watch("password", "");

  const onSubmit = async (data: SignupFormData) => {
    try {
      // Simulate registration logic
      const registerData = {
        email: data.email,
        password: data.confirmPassword,
        name: data.companyName,
        tokenName: data.tokenName,
        tokenSymbol: data.tokenSymbol,
        tokenCount: data.initialSupply,
      };

      console.log("Simulating registration with data:", registerData);

      // Simulate redirection after successful registration
      router.push("/auth?mode=login");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Company Name */}
      <FormInput
        label="Company Name"
        type="text"
        placeholder="Enter company name"
        icon={<Building2 className="w-5 h-5" />}
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
          error={errors.password?.message ? { message: errors.password.message } : undefined}
          endIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-white transition-colors"
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
        error={errors.confirmPassword?.message ? { message: errors.confirmPassword.message } : undefined}
        {...register("confirmPassword", {
          required: "Please confirm your password",
          validate: (value) => value === password || "Passwords do not match",
        })}
      />

      {/* ESOP/RSU Token Name */}
      <FormInput
        label="ESOP/RSU Token Name"
        type="text"
        placeholder="Enter token name"
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
        error={errors.tokenName?.message ? { message: errors.tokenName.message } : undefined}
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
      >
        Create Employer Account
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

export default SignupForm;