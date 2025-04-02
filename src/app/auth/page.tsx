"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import WelcomeSection from "@/components/login/WelcomeSection";
import EnhancedLoginForm from "@/components/login/EnhancedLoginForm";
import EnhancedSignupForm from "@/components/login/EnhancedSignupForm";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"login" | "signup">("login");

  // Set mode based on URL parameter
  useEffect(() => {
    const modeParam = searchParams.get("mode");
    if (modeParam === "signup" || modeParam === "login") {
      setMode(modeParam);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex bg-[#0B0D15] text-white">
      {/* Left Side - Welcome Section */}
      <WelcomeSection isLogin={mode === "login"} />

      {/* Right Side - Authentication Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo for mobile */}
          <div className="lg:hidden flex flex-col items-center justify-center space-y-4 mb-8">
            <div className="text-2xl font-bold">
              <span className="bg-[#93c5fd] bg-clip-text text-transparent">
                PayZoll
              </span>
            </div>
          </div>

          {/* Auth Card */}
          <div className="bg-[#14161E] rounded-2xl p-6 lg:p-8 border border-[#3B4058]/20">
            {/* Header */}
            <div className="mb-8 space-y-2">
              <h1 className="text-2xl font-bold">
                {mode === "login" ? "Welcome Back" : "Create an Account"}
              </h1>
              <p className="text-gray-400">
                {mode === "login"
                  ? "Enter your credentials to access your account"
                  : "Sign up to create your employer account"}
              </p>
            </div>

            {/* Form Toggle */}
            <div className="flex mb-8 border-b border-[#3B4058]/20">
              <button
                onClick={() => setMode("login")}
                className={`flex-1 py-3 ${
                  mode === "login"
                    ? "border-b-2 border-[#93c5fd] text-white font-medium"
                    : "text-gray-400"
                } transition-colors`}
              >
                Login
              </button>
              <button
                onClick={() => setMode("signup")}
                className={`flex-1 py-3 ${
                  mode === "signup"
                    ? "border-b-2 border-[#93c5fd] text-white font-medium"
                    : "text-gray-400"
                } transition-colors`}
              >
                Sign Up
              </button>
            </div>

            {/* Auth Form */}
            {mode === "login" ? <EnhancedLoginForm /> : <EnhancedSignupForm />}
          </div>

          {/* Mode Switch Link */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              {mode === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <Link
                href={`/auth?mode=${mode === "login" ? "signup" : "login"}`}
                className="text-[#93c5fd] hover:text-[#93c5fd]/80 transition-colors"
              >
                {mode === "login" ? "Sign Up" : "Login"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}