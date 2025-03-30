"use client";

import React, { FormEvent, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Briefcase, Wallet, PhoneCall, Mail, Upload } from "lucide-react";
import BulkUploadModal from "./BulkuploadModal";

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
      <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
        <motion.div className="bg-crypto-card w-full max-w-xl mx-4 rounded-2xl border border-gray-800 overflow-hidden" onClick={(e) => e.stopPropagation()}>
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <h2 className="text-xl font-bold">{isEditing ? "Edit Employee" : "Add New Employee"}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
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
            <div className="grid grid-cols-2 gap-4">
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
            <div className="grid grid-cols-2 gap-4">
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
            <div className="grid grid-cols-2 gap-4">
              {/* <InputField 
                label="Phone Number" 
                name="phoneNumber" 
                icon={PhoneCall} 
                placeholder="+1234567890" 
                error={errors.phoneNumber}
                value={formData.phoneNumber}
                onChange={handleInputChange}
              /> */}
              {/* <SelectField 
                label="Employee Status" 
                name="status" 
                options={["Active", "Pending", "On Leave"]} 
                error={errors.status}
                value={formData.status}
                onChange={(e) => {
                  setFormData(prev => ({
                    ...prev,
                    status: e.target.value
                  }));
                }}
              /> */}
            </div>

            <div className="flex justify-between pt-4 border-t border-gray-800">
              {/* Bulk Upload Button - Bottom Left - Only show when not editing */}
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsBulkUploadOpen(true)}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span className="text-sm">Bulk Upload</span>
                </button>
              )}

              <div className={`flex justify-end space-x-4 ${isEditing ? "w-full" : ""}`}>
                <button type="button" onClick={onClose} className="px-6 py-2 rounded-xl border border-gray-800 text-gray-400 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white transition-colors">
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
    <label className="block text-sm text-gray-400 mb-1">{label}</label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />}
      <input 
        type={type} 
        name={name} 
        value={value}
        onChange={onChange}
        className={`w-full bg-crypto-dark border ${error ? "border-red-500" : "border-gray-800"} rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-indigo-500 transition-colors`} 
        placeholder={placeholder} 
      />
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

interface SelectFieldProps {
  label: string;
  name: string;
  options: string[];
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({ 
  label, 
  name, 
  options, 
  error,
  value,
  onChange
}) => (
  <div>
    <label className="block text-sm text-gray-400 mb-1">{label}</label>
    <select 
      name={name} 
      value={value}
      onChange={onChange}
      className={`w-full bg-crypto-dark border ${error ? "border-red-500" : "border-gray-800"} rounded-xl py-2 px-4 focus:outline-none focus:border-indigo-500 transition-colors`}
    >
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option} value={option.toLowerCase()}>{option}</option>
      ))}
    </select>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default AddEmployeeModal;