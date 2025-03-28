"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MoreVertical,
  Edit2,
  Trash2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Filter,
  Download,
} from "lucide-react";

interface Employee {
  _id: string;
  name: string;
  employeeId: string;
  dateOfJoining: string;
  designation: string;
  salary: { $numberDecimal: string };
  accountId: string;
}

interface EmployeeTableProps {
  employees: Employee[];
  deleteEmployeeById: (id: string) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, deleteEmployeeById }) => {
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showFilters, setShowFilters] = useState(false);

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
        <table className="w-full">
          <thead className="bg-crypto-dark/90 backdrop-blur-sm">
            <tr>
              {["Employee Name", "Employee ID", "Date Of Joining", "Designation", "Salary (ETH)", "Wallet Address", "Actions"].map(
                (label, index) => (
                  <th
                    key={index}
                    className="px-6 py-4 text-left text-sm font-medium text-gray-400 cursor-pointer"
                    onClick={() => handleSort(label)}
                  >
                    <div className="flex items-center space-x-2">
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
                <td className="px-6 py-4 whitespace-nowrap text-gray-400">{employee.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-400">{employee.employeeId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-400">{employee.dateOfJoining}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-400">{employee.designation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-400">{employee.salary.$numberDecimal} ETH</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                  <ExternalLink className="w-4 h-4 text-indigo-400 cursor-pointer" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
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