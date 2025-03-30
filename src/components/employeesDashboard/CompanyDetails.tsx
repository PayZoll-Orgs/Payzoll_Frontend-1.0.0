"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Edit2, Trash2, ChevronDown, ChevronUp } from "lucide-react";

interface Company {
  _id: string;
  companyname: string;
  employeetotal: string;
  salarytotal: string;
  lifetimesalary: string;
}

interface CompanyDetailsProps {
  companydetails: Company[];
  deleteCompanyById: (id: string) => void;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ companydetails, deleteCompanyById }) => {
  const [sortField, setSortField] = useState<keyof Company>("companyname");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof Company) => {
    setSortDirection(sortField === field ? (sortDirection === "asc" ? "desc" : "asc") : "asc");
    setSortField(field);
  };

  const sortedData = [...companydetails].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    return sortDirection === "asc" ? parseFloat(aValue) - parseFloat(bValue) : parseFloat(bValue) - parseFloat(aValue);
  });

  const SortIcon = ({ field }: { field: keyof Company }) =>
    sortField === field ? (sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />) : null;

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
              {["Company Name", "Total Employees", "Salary (this Month)", "Lifetime Salary"].map((field) => (
                <th
                  key={field}
                  className="px-6 py-4 text-sm font-medium text-gray-400 cursor-pointer w-1/5 text-center"
                  onClick={() => handleSort(field as keyof Company)}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>{field.replace(/([A-Z])/g, " $1").trim()}</span>
                    <SortIcon field={field as keyof Company} />
                  </div>
                </th>
              ))}
              <th className="px-6 py-4 text-sm font-medium text-gray-400 w-1/5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {sortedData.map((companydet) => (
              <tr key={companydet._id} className="hover:bg-crypto-dark/30 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 w-1/5">{companydet.companyname}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 w-1/5">{companydet.employeetotal}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 w-1/5">{companydet.salarytotal} ETH</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 w-1/5">{companydet.lifetimesalary} ETH</td>
                <td className="px-6 py-4 whitespace-nowrap w-1/5">
                  <div className="flex justify-center items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      className="text-gray-400 hover:text-red-400 transition-colors"
                      onClick={() => deleteCompanyById(companydet._id)}
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

export default CompanyDetails;
