"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Edit2,
  Trash2,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface Employee {
  _id: string;
  name: string;
  designation: string;
  salary: { $numberDecimal: string };
  wallet: string;
}

interface EmployeeTableProps {
  employees: Employee[];
  deleteEmployeeById: (id: string) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, deleteEmployeeById }) => {
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  // const [showFilters, setShowFilters] = useState(false);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-crypto-card border border-gray-800 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all"
    >
      {/* Table */}
      <div className="overflow-x-auto">
  <table className="w-full table-fixed">
    <thead className="bg-crypto-dark/90 backdrop-blur-sm">
      <tr>
        {["Employee Name", "Designation", "Salary (ETH)", "Wallet Address", "Actions"].map(
          (label, index) => (
            <th
              key={index}
              className="px-6 py-4 text-sm font-medium text-gray-400 cursor-pointer w-1/5 text-center"
              onClick={() => handleSort(label)}
            >
              <div className="flex items-center justify-center space-x-2">
                <span>{label}</span>
                <SortIcon field={label} />
              </div>
            </th>
          )
        )}
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-800">
      {employees.map((employee) => (
        <tr key={employee._id} className="hover:bg-crypto-dark/30 transition-colors group">
          <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 w-1/5">{employee.name}</td>
          <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 w-1/5">{employee.designation}</td>
          <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 w-1/5">{employee.salary.$numberDecimal} ETH</td>
          <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 w-1/5">
            <ExternalLink className="w-4 h-4 text-indigo-400 cursor-pointer" />
          </td>
          <td className="px-6 py-4 whitespace-nowrap w-1/5">
            <div className="flex justify-center items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-gray-400 hover:text-white transition-colors">
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                className="text-gray-400 hover:text-red-400 transition-colors"
                onClick={() => deleteEmployeeById(employee._id)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </motion.div>
  );
};

export default EmployeeTable;