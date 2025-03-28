"use client";

import React, { FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Briefcase, Wallet, PhoneCall, Mail } from "lucide-react";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEmployee: (employee: EmployeeData) => void;
}

interface EmployeeData {
  firstName: string;
  lastName: string;
  designation: string;
  phoneNumber: string;
  walletAddress: string;
  monthlySalary: string;
  email: string;
  status: string;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ isOpen, onClose, onAddEmployee }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const employeeData: EmployeeData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      designation: formData.get("designation") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      walletAddress: formData.get("walletAddress") as string,
      monthlySalary: formData.get("monthlySalary") as string,
      email: formData.get("email") as string,
      status: formData.get("status") as string,
    };

    if (Object.values(employeeData).some((value) => !value.trim())) {
      alert("Please fill out all fields.");
      return;
    }

    onAddEmployee(employeeData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-crypto-card w-full max-w-xl mx-4 rounded-2xl border border-gray-800 overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <h2 className="text-xl font-bold">Add New Employee</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="grid grid-cols-2 gap-4">
              <InputField label="First Name" name="firstName" icon={User} placeholder="John" />
              <InputField label="Last Name" name="lastName" icon={User} placeholder="Doe" />
            </div>
            
            {/* Work Information */}
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Designation" name="designation" icon={Briefcase} placeholder="Senior Developer" />
              <InputField label="Email" name="email" icon={Mail} type="email" placeholder="john@abc.com" />
            </div>
            
            {/* Payment Information */}
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Wallet Address" name="walletAddress" icon={Wallet} placeholder="0x..." />
              <InputField label="Monthly Salary (ETH)" name="monthlySalary" placeholder="0.00" type="number" />
            </div>
            
            {/* Additional Information */}
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Phone Number" name="phoneNumber" icon={PhoneCall} placeholder="+1234567890" />
              <SelectField label="Employee Status" name="status" options={["Active", "Pending", "On Leave"]} />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-800">
              <button type="button" onClick={onClose} className="px-6 py-2 rounded-xl border border-gray-800 text-gray-400 hover:text-white transition-colors">Cancel</button>
              <button type="submit" className="px-6 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white transition-colors">Add Employee</button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

interface InputFieldProps {
  label: string;
  name: string;
  icon?: React.ComponentType<{ className: string }>;
  placeholder?: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, icon: Icon, placeholder, type = "text" }) => (
  <div>
    <label className="block text-sm text-gray-400 mb-1">{label}</label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />}
      <input type={type} name={name} className="w-full bg-crypto-dark border border-gray-800 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-indigo-500 transition-colors" placeholder={placeholder} />
    </div>
  </div>
);

interface SelectFieldProps {
  label: string;
  name: string;
  options: string[];
}

const SelectField: React.FC<SelectFieldProps> = ({ label, name, options }) => (
  <div>
    <label className="block text-sm text-gray-400 mb-1">{label}</label>
    <select name={name} className="w-full bg-crypto-dark border border-gray-800 rounded-xl py-2 px-4 focus:outline-none focus:border-indigo-500 transition-colors">
      {options.map((option) => (
        <option key={option} value={option.toLowerCase()}>{option}</option>
      ))}
    </select>
  </div>
);

export default AddEmployeeModal;
