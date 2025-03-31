"use client";

import React from "react";
import { Home } from "lucide-react";
import "../../styles/gradients.css";

const EmployerHeader: React.FC = () => {
  return (
    <div className="mb-8">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400 mb-4 font-mono">
        <Home className="w-3 h-3 sm:w-4 sm:h-4 text-[#2D8B75]" />
        <span>/</span>
        <span className="text-[#F2F2F2]">Dashboard</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F2F2F2] font-mono" style={{
            textShadow: "0 0 5px rgba(45, 139, 117, 0.4), 0 0 10px rgba(45, 139, 117, 0.2)"
          }}>
            Employee Dashboard
          </h1>
          <p className="text-gray-400 mt-1 font-mono text-xs sm:text-sm">Manage your company and payroll efficiently</p>
        </div>

        <div className="flex items-center space-x-4 w-full sm:w-auto">
        </div>
      </div>
    </div>
  );
};

export default EmployerHeader;