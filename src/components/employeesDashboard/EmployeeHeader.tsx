"use client";

import React from "react";
import { Search, Home } from "lucide-react";
import "../../styles/gradients.css";

interface EmployeeHeaderProps {
  onAddEmployee: () => void;
  onSearch: (query: string) => void;
}

const EmployeeHeader: React.FC<EmployeeHeaderProps> = ({ onAddEmployee, onSearch }) => {
  return (
    <div className="mb-8">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400 mb-4 font-mono">
        <Home className="w-3 h-3 sm:w-4 sm:h-4 text-[#93c5fd]" />
        <span>/</span>
        <span className="text-[#c8ceee]">Management</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#c8ceee] font-mono text-shadow-glow">
            Management
          </h1>
          <p className="text-gray-400 mt-1 font-mono text-xs sm:text-sm">Manage your workforce and payroll efficiently</p>
        </div>

        <div className="flex items-center space-x-4 w-full sm:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 sm:flex-initial">
            <input
              type="text"
              placeholder="Search employees..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full sm:w-64 bg-[#0c0e14] border border-[#3B4058]/30 text-white rounded-xl py-1 sm:py-2 pl-8 sm:pl-10 pr-3 sm:pr-4
                        focus:outline-none focus:ring-2 focus:ring-[#93c5fd]/50 transition-all font-mono text-xs sm:text-sm"
            />
            <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-[#93c5fd]/60" />
          </div>

          <button
            onClick={onAddEmployee}
            className="bg-[#1D202D] text-white px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-xl flex items-center space-x-1 sm:space-x-2 shadow-md
                     hover:bg-[#252837] transition-all border border-[#3B4058]/30 text-xs sm:text-sm"
            aria-label="Add employee"
          >
            {/* <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#93c5fd]" /> */}
            <span className="font-bold font-mono">Add Employee</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHeader;
