
"use client";

import React, { useState, useMemo } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const sortedEmployees = useMemo(() => {
    return [...employees].sort((a, b) => {
      const aValue = sortField === "salary" ? parseFloat(a.salary.$numberDecimal) : a[sortField];
      const bValue = sortField === "salary" ? parseFloat(b.salary.$numberDecimal) : b[sortField];
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });
  }, [employees, sortField, sortDirection]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = sortedEmployees.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-crypto-card border border-gray-800 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all"
    >
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead className="bg-crypto-dark/90 backdrop-blur-sm">
            <tr>
              {[
                { label: "Employee Name", key: "name" },
                { label: "Designation", key: "designation" },
                { label: "Salary (ETH)", key: "salary" },
                { label: "Wallet Address", key: "" },
                { label: "Actions", key: "" }
              ].map(({ label, key }, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-sm font-medium text-gray-400 w-1/5 text-center"
                >
                  {key ? (
                    <button onClick={() => handleSort(key)} className="flex items-center justify-center space-x-2">
                      <span>{label}</span>
                      <SortIcon field={key} />
                    </button>
                  ) : (
                    label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {currentEmployees.map((employee) => (
              <tr key={employee._id} className="hover:bg-crypto-dark/30 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 w-1/5">{employee.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 w-1/5">{employee.designation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 w-1/5">{employee.salary.$numberDecimal} ETH</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 w-1/5">
                  <ExternalLink className="w-4 h-4 text-indigo-400 cursor-pointer" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap w-1/5">
                  <div className="flex justify-center items-center space-x-3 opacity-0 group-hover:opacity-100 transition">
                    <Edit2 className="w-4 h-4 text-yellow-400 cursor-pointer" />
                    <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" onClick={() => deleteEmployeeById(employee._id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default EmployeeTable;
