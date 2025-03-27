"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Building2, User } from "lucide-react";
import FormInput from "./FormInput";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userType, setUserType] = useState<"employee" | "employer">("employee");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    const loginData = {
      email: data.email,
      password: data.password,
      isEmployer: userType === "employer",
    };

    try {
      console.log("Simulating login with data:", loginData);

      // Simulate token storage and redirection
      const fakeToken = "fake-jwt-token";
      localStorage.setItem("token", fakeToken);

      if (userType === "employee") {
        router.push("/employee/dashboard");
      } else {
        router.push("/employer/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleUserTypeChange = (type: "employee" | "employer") => {
    if (type !== userType) {
      setUserType(type);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                ? "border-indigo-500 bg-indigo-500/10 text-white"
                : "border-gray-700 text-gray-400 hover:border-indigo-500/50"
            } transition-all flex items-center justify-center space-x-2 group cursor-pointer`}
          >
            <Icon
              className={`w-4 h-4 ${
                userType === type
                  ? "text-indigo-400"
                  : "text-gray-400 group-hover:text-indigo-400"
              } transition-colors`}
            />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Email Input */}
      <FormInput
        label={userType === "employer" ? "Company Email" : "Email Address"}
        type="email"
        placeholder={
          userType === "employer" ? "Enter company email" : "Enter your email"
        }
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

      {/* Password Input */}
      <FormInput
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
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

      {/* Forgot Password Link */}
      <div className="flex justify-end">
        <button
          type="button"
          className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Forgot Password?
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl
                 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-200 flex items-center justify-center"
      >
        Login as {userType === "employer" ? "Employer" : "Employee"}
      </button>
    </form>
  );
};

export default LoginForm;