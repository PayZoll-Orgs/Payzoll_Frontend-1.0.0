"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Edit2,
  Trash2,
  Mail,
  ChevronDown,
  ChevronUp,
  Search
} from "lucide-react";
import EmployeeDetailsModal from "./EmployeeDetailsModal";
import "../../styles/gradients.css";

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
  const [localSearchQuery, setLocalSearchQuery] = useState("");
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

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const searchFilter = localSearchQuery.toLowerCase();
      return (
        employee.name.toLowerCase().includes(searchFilter) ||
        employee.designation.toLowerCase().includes(searchFilter) ||
        (employee.email && employee.email.toLowerCase().includes(searchFilter))
      );
    });
  }, [employees, localSearchQuery]);

  const sortedEmployees = useMemo(() => {
    return [...filteredEmployees].sort((a, b) => {
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
  }, [filteredEmployees, sortField, sortDirection]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = sortedEmployees.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);

  return (
    <>
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search employees..."
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            className="w-full sm:w-64 bg-[#0c0e14] border border-[#3B4058]/30 text-white rounded-xl py-1 sm:py-2 pl-8 sm:pl-10 pr-3 sm:pr-4
                      focus:outline-none focus:ring-2 focus:ring-[#93c5fd]/50 transition-all font-mono text-xs sm:text-sm"
          />
          <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-[#93c5fd]/60" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-crypto-card border border-[#3B4058]/30 rounded-xl overflow-hidden hover:border-[#93c5fd]/30 transition-all shadow-lg"
      >
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-[#14161E] backdrop-blur-sm">
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
                    className="px-6 py-4 text-sm font-medium text-[#c8ceee] w-1/6 text-center font-mono"
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
            <tbody className="divide-y divide-[#3B4058]/30">
              {currentEmployees.map((employee) => (
                <tr key={employee._id} className="hover:bg-[#1D202D] transition-colors group">
                  <td 
                    className="px-6 py-4 whitespace-nowrap text-center text-gray-400 cursor-pointer hover:text-[#93c5fd] transition-colors font-mono"
                    onClick={() => handleViewDetails(employee)}
                  >
                    {employee.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 font-mono">{employee.designation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 font-mono">
                    <div className="flex items-center justify-center">
                      <Mail className="w-4 h-4 mr-2 text-[#93c5fd]" />
                      <span>{employee.email || "—"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 font-mono">{employee.salary.$numberDecimal} $</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 font-mono text-sm">
                    {formatWalletAddress(employee.wallet)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-center items-center space-x-3 opacity-0 group-hover:opacity-100 transition">
                      <Edit2 
                        className="w-4 h-4 text-[#93c5fd] cursor-pointer" 
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

        <div className="px-6 py-4 border-t border-[#3B4058]/30 flex justify-between items-center">
          <div className="text-sm text-gray-400 font-mono">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedEmployees.length)} of {sortedEmployees.length} entries
          </div>
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 flex items-center justify-center rounded-md text-sm transition-colors font-mono ${
                  currentPage === i + 1
                    ? 'bg-[#93c5fd] text-[#14161E]'
                    : 'bg-[#1D202D] text-gray-400 hover:bg-[#252837] hover:text-[#c8ceee]'
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