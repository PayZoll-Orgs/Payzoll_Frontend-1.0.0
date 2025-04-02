"use client";
import { useState, useEffect } from 'react';
import { X, User, Briefcase, Wallet as WalletIcon, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

export interface Employee {
    id: string;
    name: string;
    wallet: string;
    salary: string;
    department: string;
}

interface EditEmployeeModalProps {
    employee: Employee | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (employee: Employee) => void;
}

const EditEmployeeModal = ({ employee, isOpen, onClose, onSave }: EditEmployeeModalProps) => {
    const [formData, setFormData] = useState<Employee>({
        id: '',
        name: '',
        wallet: '',
        salary: '',
        department: ''
    });

    const [errors, setErrors] = useState({
        wallet: '',
        salary: ''
    });

    useEffect(() => {
        if (employee) {
            setFormData(employee);
        }
    }, [employee]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validation
        if (name === 'wallet') {
            if (!value.startsWith('0x') || value.length !== 42) {
                setErrors(prev => ({
                    ...prev,
                    wallet: 'Invalid wallet address. Must start with 0x and be 42 characters long.'
                }));
            } else {
                setErrors(prev => ({
                    ...prev,
                    wallet: ''
                }));
            }
        } else if (name === 'salary') {
            if (isNaN(parseFloat(value)) || parseFloat(value) <= 0) {
                setErrors(prev => ({
                    ...prev,
                    salary: 'Salary must be a positive number.'
                }));
            } else {
                setErrors(prev => ({
                    ...prev,
                    salary: ''
                }));
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Final validation before save
        if (!formData.wallet.startsWith('0x') || formData.wallet.length !== 42) {
            setErrors(prev => ({
                ...prev,
                wallet: 'Invalid wallet address. Must start with 0x and be 42 characters long.'
            }));
            return;
        }

        if (isNaN(parseFloat(formData.salary)) || parseFloat(formData.salary) <= 0) {
            setErrors(prev => ({
                ...prev,
                salary: 'Salary must be a positive number.'
            }));
            return;
        }

        if (!errors.wallet && !errors.salary) {
            onSave(formData);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-[#131620]/95 rounded-xl w-full max-w-md p-6 border border-[#2D8B75]/30 shadow-lg"
            >
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#2D8B75]/20 p-2 rounded-md">
                            <User className="w-5 h-5 text-[#2D8B75]" />
                        </div>
                        <h2 className="text-xl font-bold text-[#F2F2F2] font-mono" style={{
                            textShadow: "0 0 5px rgba(45, 139, 117, 0.4), 0 0 10px rgba(45, 139, 117, 0.2)"
                        }}>
                            {employee ? 'Edit Employee' : 'Add Employee'}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-[#F2F2F2] p-2 rounded-full hover:bg-[#0c0f16]/80 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="flex gap-2 items-center text-sm text-gray-400 font-mono">
                            <User className="w-4 h-4 text-[#2D8B75]" />
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 bg-[#0c0f16]/80 backdrop-blur-sm border border-[#22304a]/30 rounded-xl text-[#F2F2F2] font-mono
                                      focus:outline-none focus:border-[#2D8B75] focus:ring-1 focus:ring-[#2D8B75]/50 transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex gap-2 items-center text-sm text-gray-400 font-mono">
                            <Briefcase className="w-4 h-4 text-[#2D8B75]" />
                            Department
                        </label>
                        <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                            className="w-full p-3 bg-[#0c0f16]/80 backdrop-blur-sm border border-[#22304a]/30 rounded-xl text-[#F2F2F2] font-mono
                                      focus:outline-none focus:border-[#2D8B75] focus:ring-1 focus:ring-[#2D8B75]/50 transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex gap-2 items-center text-sm text-gray-400 font-mono">
                            <WalletIcon className="w-4 h-4 text-[#2D8B75]" />
                            Wallet Address
                        </label>
                        <input
                            type="text"
                            name="wallet"
                            value={formData.wallet}
                            onChange={handleChange}
                            required
                            className={`w-full p-3 bg-[#0c0f16]/80 backdrop-blur-sm border rounded-xl text-[#F2F2F2] font-mono
                                       focus:outline-none focus:ring-1 transition-all ${errors.wallet
                                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400/50'
                                    : 'border-[#22304a]/30 focus:border-[#2D8B75] focus:ring-[#2D8B75]/50'
                                }`}
                        />
                        {errors.wallet && (
                            <p className="text-xs text-red-400 mt-1 font-mono">{errors.wallet}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="flex gap-2 items-center text-sm text-gray-400 font-mono">
                            <DollarSign className="w-4 h-4 text-[#2D8B75]" />
                            Salary (USD)
                        </label>
                        <input
                            type="text"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            required
                            className={`w-full p-3 bg-[#0c0f16]/80 backdrop-blur-sm border rounded-xl text-[#F2F2F2] font-mono
                                       focus:outline-none focus:ring-1 transition-all ${errors.salary
                                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400/50'
                                    : 'border-[#22304a]/30 focus:border-[#2D8B75] focus:ring-[#2D8B75]/50'
                                }`}
                        />
                        {errors.salary && (
                            <p className="text-xs text-red-400 mt-1 font-mono">{errors.salary}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-[#22304a]/30">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 bg-[#0c0f16]/80 text-[#F2F2F2] rounded-xl hover:bg-[#0c0f16] 
                                     transition-colors border border-[#22304a]/30 font-mono"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 bg-[#2D8B75] text-white rounded-xl hover:bg-[#2D8B75]/80 
                                     transition-colors shadow-md font-mono"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default EditEmployeeModal;