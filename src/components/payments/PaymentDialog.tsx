"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Check, DollarSign } from "lucide-react";
import "../../styles/gradients.css";

export interface Employee {
  id: number;
  name: string;
  accountId: string;
  salary: { $numberDecimal: string };
}

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  employees: Employee[];
  dialogType: "payAll" | "paySelective" | "customPayment";
  totalAmount: number;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  employees,
  dialogType,
  totalAmount,
}) => {
  // State for selected employees
  const [selectedEmployees, setSelectedEmployees] = React.useState<number[]>([]);
  // State for search functionality
  const [searchTerm, setSearchTerm] = React.useState("");
  // State for custom amounts (for custom payment)
  const [customAmounts, setCustomAmounts] = React.useState<Record<number, string>>({});
  // Loading state for payment processing
  const [isProcessing, setIsProcessing] = React.useState(false);

  // Filter employees based on search term
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.accountId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle employee selection
  const toggleEmployeeSelection = (empId: number) => {
    setSelectedEmployees((prev) =>
      prev.includes(empId)
        ? prev.filter((id) => id !== empId)
        : [...prev, empId]
    );
  };

  // Handle custom amount change
  const handleCustomAmountChange = (empId: number, amount: string) => {
    setCustomAmounts((prev) => ({
      ...prev,
      [empId]: amount,
    }));
  };

  // Handle dialog close (reset states)
  const handleClose = () => {
    setSelectedEmployees([]);
    setSearchTerm("");
    setCustomAmounts({});
    setIsProcessing(false);
    onClose();
  };

  // Handle payment confirmation
  const handleConfirm = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm();
      handleClose();
    }, 2000);
  };

  // Select all employees
  const selectAllEmployees = () => {
    setSelectedEmployees(employees.map(emp => emp.id));
  };

  // Deselect all employees
  const deselectAllEmployees = () => {
    setSelectedEmployees([]);
  };

  // Calculate the total amount to be paid
  const calculateTotal = () => {
    if (dialogType === "payAll") {
      return totalAmount;
    } else if (dialogType === "paySelective") {
      return selectedEmployees.reduce((sum, empId) => {
        const emp = employees.find(e => e.id === empId);
        return emp ? sum + parseFloat(emp.salary.$numberDecimal) : sum;
      }, 0);
    } else {
      return Object.entries(customAmounts).reduce((sum, [empId, amount]) => {
        return selectedEmployees.includes(Number(empId))
          ? sum + (parseFloat(amount) || 0)
          : sum;
      }, 0);
    }
  };

  // If dialog is not open, don't render anything
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50"
            onClick={handleClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#14161E] border border-[#3B4058]/30 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center p-4 sm:p-6 border-b border-[#3B4058]/30">
                <div>
                  <h2 className="text-xl font-bold text-[#c8ceee] font-mono text-shadow-glow">{title}</h2>
                  <p className="text-gray-400 text-sm mt-1">{description}</p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#1D202D] hover:text-white transition-colors"
                  aria-label="Close dialog"
                  title="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
                {/* Search Input */}
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#0c0e14] border border-[#3B4058]/30 text-white rounded-xl py-2 pl-10 pr-4
                           focus:outline-none focus:ring-2 focus:ring-[#93c5fd]/50 transition-all font-mono text-sm"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#93c5fd]/60" />
                </div>

                {/* Employee Selection Controls */}
                {dialogType !== "payAll" && (
                  <div className="flex justify-between mb-4">
                    <button
                      onClick={selectAllEmployees}
                      className="text-xs font-mono text-[#93c5fd] hover:text-[#93c5fd]/80 transition-colors flex items-center"
                    >
                      <Check className="w-3 h-3 mr-1" />
                      Select All
                    </button>
                    <button
                      onClick={deselectAllEmployees}
                      className="text-xs font-mono text-[#93c5fd] hover:text-[#93c5fd]/80 transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                )}

                {/* Employees List */}
                <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-1">
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                      <div
                        key={employee.id}
                        className={`p-3 rounded-xl border transition-all ${
                          selectedEmployees.includes(employee.id) || dialogType === "payAll"
                            ? "border-[#93c5fd]/50 bg-[#1D202D]"
                            : "border-[#3B4058]/30 bg-[#14161E] hover:bg-[#1A1C25]"
                        }`}
                      >
                        <div className="flex items-center">
                          {dialogType !== "payAll" && (
                            <div className="mr-3">
                              <div
                                onClick={() => toggleEmployeeSelection(employee.id)}
                                className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors ${
                                  selectedEmployees.includes(employee.id)
                                    ? "border-[#93c5fd] bg-[#93c5fd]/20 text-[#93c5fd]"
                                    : "border-gray-600"
                                }`}
                              >
                                {selectedEmployees.includes(employee.id) && <Check className="w-3 h-3" />}
                              </div>
                            </div>
                          )}
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm font-mono text-white">{employee.name}</p>
                                <p className="text-xs font-mono text-gray-400">{employee.accountId}</p>
                              </div>
                              {dialogType === "customPayment" && selectedEmployees.includes(employee.id) ? (
                                <div className="relative flex items-center">
                                  <DollarSign className="w-3 h-3 absolute left-2 text-[#93c5fd]" />
                                  <input
                                    type="text"
                                    value={customAmounts[employee.id] || ""}
                                    onChange={(e) => handleCustomAmountChange(employee.id, e.target.value)}
                                    placeholder="0.00"
                                    className="pl-6 pr-2 py-1 w-24 bg-[#0c0e14] border border-[#3B4058]/30 rounded-lg text-white text-xs font-mono"
                                  />
                                </div>
                              ) : (
                                <p className="text-sm font-mono text-[#93c5fd]">
                                  ${parseFloat(employee.salary.$numberDecimal).toFixed(2)}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-400 py-4">No employees found</p>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 sm:p-6 border-t border-[#3B4058]/30">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                  <div>
                    <p className="text-sm text-gray-400 font-mono">Total Amount</p>
                    <p className="text-xl font-bold text-[#93c5fd] font-mono">${calculateTotal().toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400 font-mono">
                      {dialogType === "payAll" 
                        ? `${employees.length} employees`
                        : `${selectedEmployees.length} selected`}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleClose}
                    className="py-2 px-4 bg-[#1D202D] text-white rounded-xl border border-[#3B4058]/30 hover:bg-[#252837] transition-all flex-1 text-sm font-mono"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={
                      isProcessing || 
                      (dialogType !== "payAll" && selectedEmployees.length === 0) ||
                      (dialogType === "customPayment" && selectedEmployees.every(id => !customAmounts[id]))
                    }
                    className={`py-2 px-4 rounded-xl flex-1 flex items-center justify-center text-sm font-mono transition-all
                            ${
                              isProcessing
                                ? "bg-[#3B4058] cursor-wait text-white"
                                : "bg-gradient-to-r from-[#93c5fd] to-[#6366f1] hover:brightness-110 text-white"
                            }`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <span>Confirm Payment</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PaymentDialog; 