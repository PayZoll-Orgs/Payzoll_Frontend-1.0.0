"use client";

import React from "react";
import Link from "next/link";
import { Settings, Home } from "lucide-react";

const SettingsHeader: React.FC = () => {
  return (
    <div className="mb-8">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
        <Link href="/dashboard" className="hover:text-white transition-colors flex items-center">
          <Home className="w-4 h-4 mr-1" />
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-white">Settings</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold logo-gradient-text">
            Settings
          </h1>
          <p className="text-gray-400 mt-1">Manage your account preferences and configurations</p>
        </div>


        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 
                      flex items-center justify-center">
          <Settings className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default SettingsHeader;
