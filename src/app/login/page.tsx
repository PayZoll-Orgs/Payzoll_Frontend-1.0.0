"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Wallet2 } from "lucide-react";
import EnhancedLoginForm from "@/components/login/EnhancedLoginForm";
import EnhancedSignupForm from "@/components/login/EnhancedSignupForm";
import WelcomeSection from "@/components/login/WelcomeSection";

const LoginPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(searchParams.get("mode") !== "signup");

  useEffect(() => {
    setIsLogin(searchParams.get("mode") !== "signup");
  }, [searchParams]);

  const toggleForm = () => {
    router.push(`/login?mode=${isLogin ? "signup" : "login"}`);
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-crypto-dark text-white overflow-hidden">
      {/* Back Button */}
      <Link
        href="/"
        className="fixed top-6 left-6 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors z-50 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Home</span>
      </Link>

      <div className="flex min-h-screen">
        {/* Welcome Section */}
        <WelcomeSection isLogin={isLogin} />

        {/* Auth Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            {/* Auth Heading & Icon */}
            <div className="text-center mb-8">
              <motion.div
                className="flex justify-center mb-4"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="relative p-3">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
                  <div className="relative bg-crypto-dark p-3 rounded-2xl border border-gray-800">
                    <Wallet2 className="h-12 w-12 text-indigo-400" />
                  </div>
                </div>
              </motion.div>

              <motion.h1
                className="text-3xl font-bold mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {isLogin ? "Welcome Back!" : "Register Your Company"}
              </motion.h1>

              <motion.p
                className="text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {isLogin
                  ? "Enter your credentials to access your account"
                  : "Create an employer account to manage payroll"}
              </motion.p>
            </div>

            {/* Login or Signup Form */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : "signup"}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {isLogin ? <EnhancedLoginForm /> : <EnhancedSignupForm />}
              </motion.div>
            </AnimatePresence>

            {/* Toggle between Login & Signup */}
            <motion.div
              className="text-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {isLogin ? (
                <button
                  onClick={toggleForm}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Register your company
                </button>
              ) : (
                <button
                  onClick={toggleForm}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Already have an account? Login
                </button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
