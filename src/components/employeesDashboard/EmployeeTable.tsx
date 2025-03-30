"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Edit2,
  Trash2,
  Mail,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import EmployeeDetailsModal from "./EmployeeDetailsModal";

interface Employee {
  _id: string;
  name: string;
  designation: string;
  salary: { $numberDecimal: string };
  wallet: string;
  email?: string; // Optional to handle existing data
}

interface EmployeeTableProps {
  employees: Employee[];
  deleteEmployeeById: (id: string) => void;
  onEditEmployee?: (employee: Employee) => void;
  filterDepartment?: string;
  filterStatus?: string;
  searchQuery?: string;
}

// Helper function to format wallet address
const formatWalletAddress = (wallet: string): string => {
  if (!wallet || wallet.length <= 10) return wallet;
  return `${wallet.substring(0, 6)}...${wallet.substring(wallet.length - 4)}`;
};

const EmployeeTable: React.FC<EmployeeTableProps> = ({ 
  employees, 
  deleteEmployeeById, 
  onEditEmployee,
  filterDepartment,
  filterStatus,
  searchQuery
}) => {
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const itemsPerPage = 5;

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleViewDetails = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedEmployee(null);
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  const sortedEmployees = useMemo(() => {
    return [...employees].sort((a, b) => {
      const aValue = sortField === "salary" ? parseFloat(a.salary.$numberDecimal) : a[sortField as keyof Employee];
      const bValue = sortField === "salary" ? parseFloat(b.salary.$numberDecimal) : b[sortField as keyof Employee];
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
    <>
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
                  { label: "Email", key: "email" },
                  { label: "Salary (USD)", key: "salary" },
                  { label: "Wallet Address", key: "" },
                  { label: "Actions", key: "" }
                ].map(({ label, key }, index) => (
                  <th
                    key={index}
                    className="px-6 py-4 text-sm font-medium text-gray-400 w-1/6 text-center"
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
                  <td 
                    className="px-6 py-4 whitespace-nowrap text-center text-gray-400 cursor-pointer hover:text-[#93c5fd] transition-colors"
                    onClick={() => handleViewDetails(employee)}
                  >
                    {employee.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400">{employee.designation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400">
                    <div className="flex items-center justify-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{employee.email || "—"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400">{employee.salary.$numberDecimal} $</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 font-mono text-sm">
                    {formatWalletAddress(employee.wallet)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-center items-center space-x-3 opacity-0 group-hover:opacity-100 transition">
                      <Edit2 
                        className="w-4 h-4 text-yellow-400 cursor-pointer" 
                        onClick={() => onEditEmployee && onEditEmployee(employee)}
                      />
                      <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" onClick={() => deleteEmployeeById(employee._id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-800 flex justify-between items-center">
          <div className="text-sm text-gray-400">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedEmployees.length)} of {sortedEmployees.length} entries
          </div>
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 flex items-center justify-center rounded-md text-sm transition-colors ${
                  currentPage === i + 1
                    ? 'bg-indigo-600 text-white'
                    : 'bg-crypto-dark/50 text-gray-400 hover:bg-crypto-dark hover:text-gray-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Employee Details Modal */}
      <EmployeeDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        employee={selectedEmployee ? {
          name: selectedEmployee.name,
          designation: selectedEmployee.designation,
          salary: selectedEmployee.salary.$numberDecimal,
          walletAddress: selectedEmployee.wallet
        } : null}
      />
    </>
  );
};

export default EmployeeTable;