"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wallet, Mail, Briefcase, DollarSign, User, Calendar, Home } from "lucide-react";
import "../../styles/gradients.css";

interface EmployeeProfile {
  id: string;
  name: string;
  designation: string;
  salary: string;
  walletAddress: string;
  email: string;
  imageUrl: string;
  company: string;
  joinDate: string;
  department: string;
}

// Sample data for the logged-in employee
const currentEmployee: EmployeeProfile = {
  id: "1",
  name: "John Doe",
  designation: "Software Engineer",
  salary: "5,000 USD",
  walletAddress: "0x6728122",
  email: "john.doe@jpmorgan.com",
  imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23374151'/%3E%3Ccircle cx='100' cy='70' r='40' fill='%236B7280'/%3E%3Cpath d='M160 170c0-33.1-26.9-60-60-60s-60 26.9-60 60' fill='%236B7280'/%3E%3C/svg%3E",
  company: "JP Morgan",
  joinDate: "June 15, 2023",
  department: "Blockchain Development"
};

const EmployeeDashboard: React.FC = () => {
  return (
    <div className="w-full bg-[#14161E] border border-[#3B4058]/30 rounded-xl p-6 hover:border-[#93c5fd]/30 transition-all shadow-lg">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400 mb-4 font-mono">
        <Home className="w-3 h-3 sm:w-4 sm:h-4 text-[#93c5fd]" />
        <span>/</span>
        <span className="text-[#c8ceee]">Profile</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#c8ceee] font-mono text-shadow-glow">
          {currentEmployee.name}
        </h2>
        <p className="text-gray-400 mt-1 font-mono text-xs sm:text-sm">Welcome back!</p>
      </div>

      {/* Employee Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#1D202D] border border-[#3B4058]/30 rounded-xl overflow-hidden hover:border-[#3B4058]/50 transition-all"
      >
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Profile Image */}
          <div className="w-full md:w-1/3 p-6 flex flex-col items-center justify-center">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#3B4058]/50 shadow-lg mb-4">
              <img
                src={currentEmployee.imageUrl}
                alt={currentEmployee.name}
                className="w-full h-full object-cover bg-[#1F2232]"
              />
            </div>
            <h3 className="text-2xl font-bold text-[#c8ceee] text-center font-mono">{currentEmployee.name}</h3>
            <div className="flex items-center text-[#93c5fd] mt-2 font-mono">
              <Briefcase className="w-4 h-4 mr-2" />
              <span>{currentEmployee.designation}</span>
            </div>
          </div>

          {/* Right Side - Employee Details */}
          <div className="w-full md:w-2/3 p-6 bg-[#1F2232]">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-[#c8ceee] mb-2 font-mono text-shadow-glow">Personal Information</h3>
              <div className="h-1 w-20 bg-gradient-to-r from-[#93c5fd] to-[#8b5cf6] rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailItem 
                icon={<User className="w-5 h-5 text-[#93c5fd]" />}
                label="Company" 
                value={currentEmployee.company} 
              />
              <DetailItem 
                icon={<Mail className="w-5 h-5 text-[#93c5fd]" />}
                label="Email" 
                value={currentEmployee.email} 
              />
              <DetailItem 
                icon={<DollarSign className="w-5 h-5 text-[#93c5fd]" />}
                label="Salary" 
                value={currentEmployee.salary} 
              />
              <DetailItem 
                icon={<Wallet className="w-5 h-5 text-[#93c5fd]" />}
                label="Wallet Address" 
                value={currentEmployee.walletAddress} 
              />
              <DetailItem 
                icon={<Calendar className="w-5 h-5 text-[#93c5fd]" />}
                label="Join Date" 
                value={currentEmployee.joinDate} 
              />
              <DetailItem 
                icon={<Briefcase className="w-5 h-5 text-[#93c5fd]" />}
                label="Department" 
                value={currentEmployee.department} 
              />
            </div>
            

          </div>
        </div>
      </motion.div>


    </div>
  );
};

// Helper component for employee details
const DetailItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="bg-[#14161E]/50 rounded-lg p-3 border border-[#3B4058]/20">
    <p className="text-gray-400 text-xs mb-1 font-mono">{label}</p>
    <div className="flex items-center">
      {icon}
      <span className="ml-2 text-[#c8ceee] font-mono">{value}</span>
    </div>
  </div>
);

export default EmployeeDashboard;