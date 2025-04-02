"use client";
import { useState } from 'react';
import { Users, Edit, Trash2, PlusCircle, Search, Download } from 'lucide-react';
import { Employee } from './EditEmployeeModal';
import EditEmployeeModal from './EditEmployeeModal';
import { motion } from 'framer-motion';

interface EmployeeTableProps {
    employees: Employee[];
    selectedEmployees: string[];
    toggleEmployeeSelection: (id: string) => void;
    toggleAllEmployees: () => void;
    allEmployeesSelected: boolean;
    usdToToken: (usdAmount: string) => string;
    selectedTokenSymbol: string;
    isLoading: boolean;
    onEmployeeUpdate: (updatedEmployee: Employee) => void;
    onEmployeeDelete: (id: string) => void;
    onEmployeeAdd: (employee: Employee) => void;
}

const EmployeeTable = ({
    employees,
    selectedEmployees,
    toggleEmployeeSelection,
    toggleAllEmployees,
    allEmployeesSelected,
    usdToToken,
    selectedTokenSymbol,
    isLoading,
    onEmployeeUpdate,
    onEmployeeDelete,
    onEmployeeAdd
}: EmployeeTableProps) => {
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddingEmployee, setIsAddingEmployee] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleEdit = (employee: Employee) => {
        setEditingEmployee(employee);
        setIsAddingEmployee(false);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingEmployee({
            id: (employees.length + 1).toString(), // Generate a new ID
            name: '',
            wallet: '0x',
            salary: '',
            department: ''
        });
        setIsAddingEmployee(true);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to remove this employee?")) {
            onEmployeeDelete(id);
        }
    };

    const handleSave = (employee: Employee) => {
        if (isAddingEmployee) {
            onEmployeeAdd(employee);
        } else {
            onEmployeeUpdate(employee);
        }
    };

    const calculateTotalUSD = () => {
        return employees
            .filter(emp => selectedEmployees.includes(emp.id))
            .reduce((sum, emp) => sum + parseFloat(emp.salary), 0);
    };

    const totalUsd = calculateTotalUSD();
    const totalTokens = usdToToken(totalUsd.toString());

    // Filter employees based on search query
    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.wallet.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.salary.includes(searchQuery)
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-[#131620]/90 backdrop-blur-sm border border-[#22304a]/30 rounded-xl p-4 md:p-5 lg:p-6
                      hover:border-[#2D8B75]/30 transition-all shadow-lg"
        >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3 sm:gap-0">
                <div className="flex items-center gap-3">
                    <div className="bg-[#2D8B75]/20 p-2 rounded-md">
                        <Users className="w-5 h-5 text-[#2D8B75]" />
                    </div>
                    <h2 className="text-lg font-bold text-[#F2F2F2] font-mono" style={{
                        textShadow: "0 0 5px rgba(45, 139, 117, 0.4), 0 0 10px rgba(45, 139, 117, 0.2)"
                    }}>Employee Payroll</h2>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 px-3 py-2 bg-[#0c0f16]/80 backdrop-blur-sm text-[#F2F2F2] rounded-xl 
                                 hover:bg-[#0c0f16] transition-colors border border-[#22304a]/30 shadow-md font-mono text-sm"
                        disabled={isLoading}
                    >
                        <PlusCircle className="w-4 h-4 text-[#2D8B75]" />
                        <span>Add Employee</span>
                    </button>

                    <button
                        className="bg-[#0c0f16]/80 backdrop-blur-sm text-[#F2F2F2] px-3 py-2 rounded-xl flex items-center gap-2
                               hover:bg-[#0c0f16] transition-all border border-[#22304a]/30 shadow-md font-mono text-sm"
                        aria-label="Export employees"
                    >
                        <Download className="w-4 h-4 text-[#2D8B75]" />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#0c0f16]/80 backdrop-blur-sm border border-[#22304a]/30 text-[#F2F2F2] rounded-xl py-2 pl-10 pr-4
                             focus:outline-none focus:ring-2 focus:ring-[#2D8B75]/50 transition-all font-mono text-sm"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D8B75]/60" />
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#22304a]/30 bg-[#0c0f16]/80 backdrop-blur-sm">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-[#22304a]/30">
                            <th className="p-3 text-left w-10">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="selectAll"
                                        checked={allEmployeesSelected}
                                        onChange={toggleAllEmployees}
                                        disabled={isLoading}
                                        className="h-4 w-4 rounded-sm border-[#22304a] text-[#2D8B75] focus:ring-[#2D8B75]/50
                                                focus:ring-offset-0 bg-[#131620]"
                                    />
                                </div>
                            </th>
                            <th className="p-3 text-left text-gray-400 font-normal text-sm font-mono">Name</th>
                            <th className="p-3 text-left text-gray-400 font-normal text-sm font-mono">Department</th>
                            <th className="p-3 text-left text-gray-400 font-normal text-sm font-mono">Wallet</th>
                            <th className="p-3 text-right text-gray-400 font-normal text-sm font-mono">Salary (USD)</th>
                            <th className="p-3 text-right text-gray-400 font-normal text-sm font-mono">
                                Amount ({selectedTokenSymbol})
                            </th>
                            <th className="p-3 text-center text-gray-400 font-normal text-sm font-mono w-20">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#22304a]/30">
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((employee, index) => (
                                <motion.tr
                                    key={employee.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`${selectedEmployees.includes(employee.id)
                                            ? 'bg-[#2D8B75]/5 hover:bg-[#2D8B75]/10'
                                            : 'hover:bg-[#0c0f16]'
                                        } transition-colors`}
                                >
                                    <td className="p-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedEmployees.includes(employee.id)}
                                            onChange={() => toggleEmployeeSelection(employee.id)}
                                            className="h-4 w-4 rounded-sm border-[#22304a] text-[#2D8B75] focus:ring-[#2D8B75]/50
                                                    focus:ring-offset-0 bg-[#131620]"
                                            disabled={isLoading}
                                        />
                                    </td>
                                    <td className="p-3 text-[#F2F2F2] font-mono">
                                        {employee.name}
                                    </td>
                                    <td className="p-3 text-gray-400 font-mono">
                                        {employee.department}
                                    </td>
                                    <td className="p-3 text-sm text-gray-400 font-mono">
                                        {`${employee.wallet.substring(0, 6)}...${employee.wallet.substring(employee.wallet.length - 4)}`}
                                    </td>
                                    <td className="p-3 text-right text-[#F2F2F2] font-mono">
                                        ${parseFloat(employee.salary).toFixed(2)}
                                    </td>
                                    <td className="p-3 text-right text-[#2D8B75] font-mono">
                                        {usdToToken(employee.salary)}
                                    </td>
                                    <td className="p-3">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => handleEdit(employee)}
                                                className="p-1.5 text-gray-400 hover:text-[#F2F2F2] hover:bg-[#2D8B75]/20 rounded-lg transition-colors"
                                                disabled={isLoading}
                                                title="Edit employee"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(employee.id)}
                                                className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
                                                disabled={isLoading}
                                                title="Delete employee"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="p-8 text-center text-gray-400 font-mono">
                                    {searchQuery ? 'No matching employees found.' : 'No employees found. Click "Add Employee" to create a new employee record.'}
                                </td>
                            </tr>
                        )}
                    </tbody>

                    {selectedEmployees.length > 0 && (
                        <tfoot>
                            <tr className="border-t border-[#22304a]/30 bg-[#0c0f16]">
                                <td colSpan={4} className="p-3 text-right text-gray-400 font-medium font-mono">
                                    Total Selected ({selectedEmployees.length}):
                                </td>
                                <td className="p-3 text-right text-[#2D8B75] font-mono font-bold">
                                    ${totalUsd.toFixed(2)}
                                </td>
                                <td className="p-3 text-right text-[#2D8B75] font-mono font-bold">
                                    {totalTokens}
                                </td>
                                <td></td>
                            </tr>
                        </tfoot>
                    )}
                </table>
            </div>

            {/* Status footer */}
            <div className="mt-4 pt-3 border-t border-[#22304a]/30 flex items-center justify-between text-sm">
                <span className="text-gray-400 font-mono">
                    Showing {filteredEmployees.length} employee{filteredEmployees.length !== 1 ? 's' : ''}
                </span>
            </div>

            {/* Edit Modal */}
            <EditEmployeeModal
                employee={editingEmployee}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
            />
        </motion.div>
    );
};

export default EmployeeTable;