"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";


interface Employee {
    name: string;
    image: string;
    designation: string;
    salary: string;
    walletAddress: string;
  }

interface Company {
    name: string
  }

  const companies: Company[] = [
    {
        name: "JP Morgan"
    }
  ]
  
  const employees: Employee[] = [
    {
      name: "John Doe",
      image: "", // Placeholder Image will be used
      designation: "Software Engineer",
      salary: "5,000 ETH",
      walletAddress: "0x6728122",
    },
    {
      name: "Alice Johnson",
      image: "",
      designation: "Product Manager",
      salary: "7,000 ETH",
      walletAddress: "0x3F21A5B",
    },
    {
      name: "Michael Smith",
      image: "",
      designation: "Blockchain Developer",
      salary: "6,500 ETH",
      walletAddress: "0xAF21B5C",
    },
    {
      name: "Sarah Lee",
      image: "",
      designation: "UI/UX Designer",
      salary: "4,800 ETH",
      walletAddress: "0xB21F3D",
    },
  ];
  

  const EmployeeProfile: React.FC = () => {
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
  
    // Select a random employee initially
    useEffect(() => {
      const randomEmployee = employees[Math.floor(Math.random() * employees.length)];
      setSelectedEmployee(randomEmployee);
    }, []);
  
    // Function to find an employee by name
    const handleSearch = () => {
      const foundEmployee = employees.find((emp) =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (foundEmployee) {
        setSelectedEmployee(foundEmployee);
      } else {
        setSelectedEmployee(null); // Clear selection if not found
      }
    };
  
    return (
      <div className="w-full min-h-1/2 bg-[#14161E] border border-[#3B4058]/20 rounded-xl p-6 flex flex-col hover:border-[#3B4058]/50 transition-all">
        <div className="w-full flex justify-center justify-items-end">
        <div className="w-1/2 flex items-start justify-start ml-2">
        {companies.map((company, index) => (
  <h2 
    key={index} 
    className="text-3xl my-4 font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
  >
    {company.name}
  </h2>
))}
        </div>
        {/* Search Bar */}
        <div className="w-1/2 ml-185 flex items-end justify-end bg-[#1F2232] p-4 rounded-lg shadow-lg mb-6">
          <input
            type="text"
            placeholder="Search employee..."
            className="flex-1 bg-transparent text-white outline-none border border-[#3B4058]/50 p-2 rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="ml-4 bg-[#3B4058] px-6 py-2 rounded-md text-white hover:bg-[#4B5068] transition-all"
          >
            Find
          </button>
        </div>
        </div>
        {/* Employee Profile Card */}
        {selectedEmployee ? (
          <motion.div
            key={selectedEmployee.name} // Ensures animation plays on change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full bg-[#1F2232] border border-[#3B4058]/20 rounded-xl p-3 flex shadow-lg overflow-hidden hover:border-[#3B4058]/50 transition-all"
          >
            {/* Profile Image (Left Side) */}
            <div className="w-1/3 h-1/2 flex items-start justify-center">
              <div className="w-1/2 h-1/2 border border-[#3B4058] overflow-hidden rounded-lg">
                <Image
                  src={selectedEmployee.image || "/placeholder-profile.png"}
                  alt={selectedEmployee.name}
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
  
            {/* Employee Details (Right Side) */}
            <div className="w-2/3 flex flex-col justify-center pl-8">
              <h3 className="text-4xl font-semibold">{selectedEmployee.name}</h3>
              <i><p className="text-lg text-[#A0AEC0]">{selectedEmployee.designation}</p></i>
  
              <div className="mt-4 bg-[#2A2D3E] p-4 rounded-lg">
                <p className="text-md justify-start text-xl p-4 text-[#E2E8F0]">
                  <span className="font-medium">Salary:</span> {selectedEmployee.salary}
                </p>
                <p className="text-md text-xl justify-start p-4 text-[#E2E8F0]">
                  <span className="font-medium">Wallet:</span> {selectedEmployee.walletAddress}
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="text-center text-gray-400">Employee not found.</div>
        )}
      </div>
    );
  };
  
  export default EmployeeProfile;