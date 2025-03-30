"use client";

import React from "react";

import { Home } from "lucide-react";

import "../../styles/gradients.css";



const EmployerHeader: React.FC<[]> = () => {
  return (
    <div className="mb-8">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
      
          <Home className="w-4 h-4 mr-1" />
         
      
        <span>/</span>
        <span className="text-white">Dashboard</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-5xl font-bold logo-gradient-text">
            Employee Dashboard
          </h1>
          <p className="text-gray-400 mt-1"></p>
        </div>

        <div className="flex items-center space-x-4 w-full sm:w-auto">
          

        
        </div>
      </div>
    </div>
  );
};

export default EmployerHeader;
