"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {

  Sparkles,
} from "lucide-react";
import QuickPanel from "@/components/employeeDashboard/QuickPanel";
import EmployeeOverview from "@/components/employeeDashboard/EmployeeOverview";
import PaymentSection from "@/components/employeeDashboard/PaymentSection";
import ESOPSection from "@/components/employeeDashboard/ESOPSection";
import AnalyticsSection from "@/components/employeeDashboard/AnalyticsSection";
import RecentActivity from "@/components/employeeDashboard/RecentActivity";

export default function EmployeeDashboard() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [employeeInfo, setEmployeeInfo] = useState<any>(undefined);
  const [employeeTokenInfo, setEmployeeTokenInfo] = useState<any[]>([]);
  const [employeeHistoryInfo, setEmployeeHistoryInfo] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const handleLogout = () => {
    localStorage.setItem("token", "");
    router.push("/login?mode=login");
  };

  // Mock data for employee information
  useEffect(() => {
    setIsLoading(true);

    // Simulate fetching data
    setTimeout(() => {
      const mockEmployeeInfo = {
        name: "John Doe",
        position: "Software Engineer",
        department: "Engineering",
        salary: { $numberDecimal: "5000" }, // Ensure salary is properly structured
      };

      const mockEmployeeTokenInfo = [
        { allocated: 1000 }, // Ensure token info is an array with allocated values
      ];

      const mockEmployeeHistoryInfo = [
        { date: "2023-01-01", amount: { $numberDecimal: "5000" }, status: "Completed" },
        { date: "2023-02-01", amount: { $numberDecimal: "7000" }, status: "Pending" },
      ];

      setEmployeeInfo(mockEmployeeInfo);
      setEmployeeTokenInfo(mockEmployeeTokenInfo);
      setEmployeeHistoryInfo(mockEmployeeHistoryInfo);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading || !employeeInfo || !employeeTokenInfo || !employeeHistoryInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="flex items-center space-x-2"
        >
          <Sparkles className="w-6 h-6 text-indigo-400" />
          <span className="text-xl font-medium">Loading...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <QuickPanel isWalletConnected={isWalletConnected} />

        <div className="grid grid-cols-12 gap-6 mt-6">
          <div className="col-span-12 lg:col-span-8">
            <EmployeeOverview
              employeeInfo={employeeInfo}
              employeeTokenInfo={employeeTokenInfo}
              employeeHistoryInfo={employeeHistoryInfo}
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <RecentActivity
              employeeInfo={employeeInfo}
              employeeTokenInfo={employeeTokenInfo}
            />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <PaymentSection
              employeeHistoryInfo={employeeHistoryInfo}
              employeeInfo={employeeInfo}
            />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <ESOPSection employeeTokenInfo={employeeTokenInfo} />
          </div>
          <div className="col-span-12">
            <AnalyticsSection />
          </div>
        </div>
      </div>
    </div>
  );
}