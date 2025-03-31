"use client";

import React, { FormEvent, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Briefcase, Wallet, Mail, Upload } from "lucide-react";
import BulkUploadModal from "./BulkuploadModal";
import "../../styles/gradients.css";

interface EmployeeData {
  firstName: string;
  lastName: string;
  designation: string;
  walletAddress: string;
  monthlySalary: string;
  email: string;
}

interface Employee {
  _id: string;
  name: string;
  designation: string;
  salary: { $numberDecimal: string };
  wallet: string;
  email?: string; // Email field in Employee interface
}

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEmployee: (employee: EmployeeData) => void;
  onUpdateEmployee?: (id: string, employee: EmployeeData) => void;
  editEmployee?: Employee | null;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ 
  isOpen, 
  onClose, 
  onAddEmployee, 
  onUpdateEmployee,
  editEmployee 
}) => {
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [errors, setErrors] = useState<Partial<EmployeeData>>({});
  const [formData, setFormData] = useState<EmployeeData>({
    firstName: "",
    lastName: "",
    designation: "",
    walletAddress: "",
    monthlySalary: "",
    email: "",
  });

  useEffect(() => {
    if (editEmployee) {
      // Split name into first and last name
      const nameParts = editEmployee.name.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      setFormData({
        firstName,
        lastName,
        designation: editEmployee.designation,
        walletAddress: editEmployee.wallet,
        monthlySalary: editEmployee.salary.$numberDecimal,
        email: editEmployee.email || "", // Use email from editEmployee
      });
    } else {
      // Reset form when adding
      setFormData({
        firstName: "",
        lastName: "",
        designation: "",
        walletAddress: "",
        monthlySalary: "",
        email: "",
      });
    }
  }, [editEmployee]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user types
    if (errors[name as keyof EmployeeData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const newErrors: Partial<EmployeeData> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.toString().trim()) {
        newErrors[key as keyof EmployeeData] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    
    if (editEmployee && onUpdateEmployee) {
      // Update existing employee
      onUpdateEmployee(editEmployee._id, formData);
    } else {
      // Add new employee
      onAddEmployee(formData);
      // Reset form data after adding employee
      setFormData({
        firstName: "",
        lastName: "",
        designation: "",
        walletAddress: "",
        monthlySalary: "",
        email: "",
      });
    }
    
    onClose();
  };

  if (!isOpen) return null;

  const isEditing = !!editEmployee;

  return (
    <AnimatePresence>
      {isOpen && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" 
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#131620]/90 backdrop-filter backdrop-blur-md w-full max-w-xl rounded-2xl border border-[#22304a]/40 overflow-hidden font-mono shadow-xl"
        >
          <div className="p-4 sm:p-5 md:p-6 border-b border-[#22304a]/30">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-[#F2F2F2]" style={{
                textShadow: "0 0 5px rgba(45, 139, 117, 0.4), 0 0 10px rgba(45, 139, 117, 0.2)"
              }}>
                {isEditing ? "Edit Employee" : "Add New Employee"}
              </h2>
              <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-[#F2F2F2] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <form className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5 md:space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <InputField 
                label="First Name" 
                name="firstName" 
                icon={User} 
                placeholder="John" 
                error={errors.firstName} 
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <InputField 
                label="Last Name" 
                name="lastName" 
                icon={User} 
                placeholder="Doe" 
                error={errors.lastName}
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <InputField 
                label="Designation" 
                name="designation" 
                icon={Briefcase} 
                placeholder="Senior Developer" 
                error={errors.designation}
                value={formData.designation}
                onChange={handleInputChange}
              />
              <InputField 
                label="Email" 
                name="email" 
                icon={Mail} 
                type="email" 
                placeholder="john@abc.com" 
                error={errors.email}
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <InputField 
                label="Wallet Address" 
                name="walletAddress" 
                icon={Wallet} 
                placeholder="0x..." 
                error={errors.walletAddress}
                value={formData.walletAddress}
                onChange={handleInputChange}
              />
              <InputField 
                label="Monthly Salary (USD)" 
                name="monthlySalary" 
                type="number" 
                placeholder="0.00" 
                error={errors.monthlySalary}
                value={formData.monthlySalary}
                onChange={handleInputChange}
              />
            </div>

            <div className="pt-3 sm:pt-4 md:pt-5 mt-3 sm:mt-4 md:mt-5 border-t border-[#22304a]/30 flex justify-between">
              {!isEditing && (
                <button 
                  type="button" 
                  onClick={() => setIsBulkUploadOpen(true)} 
                  className="bg-[#0c0f16]/80 backdrop-blur-sm text-white px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-xl flex items-center space-x-1 sm:space-x-2 shadow-md
                           hover:bg-[#22304a]/90 transition-all border border-[#22304a]/30 text-xs sm:text-sm"
                >
                  <Upload className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#2D8B75]" />
                  <span className="font-bold">Bulk Upload</span>
                </button>
              )}
              <div className="flex gap-3 ml-auto">
                <button 
                  type="button" 
                  onClick={onClose} 
                  className="px-4 sm:px-5 md:px-6 py-1 sm:py-2 rounded-xl bg-[#0c0f16]/80 backdrop-blur-sm text-gray-300 hover:bg-[#0c0f16] transition-colors border border-[#22304a]/30 text-xs sm:text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 sm:px-5 md:px-6 py-1 sm:py-2 rounded-xl bg-[#2D8B75] text-white hover:bg-[#2D8B75]/90 transition-colors border border-[#2D8B75]/30 text-xs sm:text-sm font-bold shadow-md shadow-[#2D8B75]/20"
                >
                  {isEditing ? "Update Employee" : "Add Employee"}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </motion.div>
    )}
      <BulkUploadModal isOpen={isBulkUploadOpen} onClose={() => setIsBulkUploadOpen(false)} />
    </AnimatePresence>
  );
};

interface InputFieldProps {
  label: string;
  name: string;
  icon?: React.ComponentType<{ className: string }>;
  placeholder?: string;
  type?: string;
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  name, 
  icon: Icon, 
  placeholder, 
  type = "text", 
  error,
  value,
  onChange
}) => (
  <div>
    <label className="block text-xs sm:text-sm text-gray-400 mb-1 font-mono">{label}</label>
    <div className="relative">
      {Icon && <Icon className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-[#2D8B75]/60" />}
      <input 
        type={type} 
        name={name} 
        value={value}
        onChange={onChange}
        className={`w-full bg-[#0c0f16]/80 backdrop-blur-sm border ${error ? "border-red-500" : "border-[#22304a]/30"} rounded-xl py-1 sm:py-2 pl-8 sm:pl-10 pr-3 sm:pr-4 text-white focus:outline-none focus:ring-2 focus:ring-[#2D8B75]/50 transition-all font-mono text-xs sm:text-sm`} 
        placeholder={placeholder} 
      />
    </div>
    {error && <p className="text-red-500 text-xs mt-1 font-mono">{error}</p>}
  </div>
);

export default AddEmployeeModal;