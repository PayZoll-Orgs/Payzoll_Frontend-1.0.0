"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/employerDashboard/Sidebar";
import EmployeeHeader from "@/components/employeesDashboard/EmployeeHeader";
import EmployeeTable from "@/components/employeesDashboard/EmployeeTable";
import QuickActions from "@/components/employeesDashboard/AuditLogs";
import AddEmployeeModal from "@/components/employeesDashboard/AddEmployeeModal";
import BulkUploadModal from "@/components/employeesDashboard/BulkuploadModal";
//import CompanyDetails from "@/components/employeesDashboard/CompanyDetails";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Employee Interface
interface Employee {
  _id: string;
  name: string;
  designation: string;
  salary: { $numberDecimal: string };
  wallet: string;
  email?: string;
}

// Employee Data Interface
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

// Company Interface
interface Company {
  _id: string;
  companyname: string;
  employeetotal: string;
  salarytotal: string;
  lifetimesalary: string;
}

// Salary Data Interface for Pie Chart
interface SalaryData {
  name: string;
  value: number;
}

// Props for Tooltip
interface CustomTooltipProps {
  active?: boolean;
  payload?: { name: string; value: number }[];
}

// Color Palette for Pie Chart (updated to match Midnight Emerald theme)
const COLORS = ["#2D8B75", "#22304a", "#B38D36", "#449C90", "#1A5F4F", "#D4AB57"];

// Custom Tooltip Component
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0c0f16]/90 backdrop-blur-sm text-[#F2F2F2] p-2 rounded-lg shadow-md border border-[#22304a]/30">
        <p className="font-bold">{payload[0].name}</p>
        <p>Total Salary: {payload[0].value.toLocaleString()} ETH</p>
      </div>
    );
  }
  return null;
};

const EmployeesPage: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [companyDetails, setCompanyDetails] = useState<Company[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Fetch Employees Data (Mock for Now)
  useEffect(() => {
    const mockEmployees: Employee[] = [
      { _id: "1", name: "John Doe", designation: "Software Engineer", salary: { $numberDecimal: "5000" }, wallet: "0x1234567890abcdef", email: "doejon@payzoll.com" },
      { _id: "2", name: "Alice Johnson", designation: "Product Manager", salary: { $numberDecimal: "7000" }, wallet: "0xabcdef1234567890", email: "aliceJhonson@payzoll.com" },
    ];
    setEmployees(mockEmployees);
  }, []);

  // Fetch Company Data (Mock for Now)
  useEffect(() => {
    const mockCompanies: Company[] = [
      { _id: "1", companyname: "Ethereum Inc.", employeetotal: "150", salarytotal: "750000", lifetimesalary: "5000000" },
      { _id: "2", companyname: "JP Morgan", employeetotal: "500", salarytotal: "3500000", lifetimesalary: "25000000" },
    ];
    setCompanyDetails(mockCompanies);
  }, []);

  // Remove Company by ID
  const deleteCompanyById = (id: string) => {
    setCompanyDetails((prev) => prev.filter((company) => company._id !== id));
  };

  // Remove Employee by ID
  const deleteEmployeeById = (id: string) => {
    setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== id));
  };

  // Edit Employee handler
  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowAddModal(true);
  };

  // Add Employee
  const onAddEmployee = (employee: EmployeeData) => {
    const newEmployee: Employee = {
      _id: (employees.length + 1).toString(),
      name: `${employee.firstName} ${employee.lastName}`,
      designation: employee.designation,
      salary: { $numberDecimal: employee.monthlySalary },
      wallet: employee.walletAddress,
      email: employee.email,
    };
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  // Update Employee
  const handleUpdateEmployee = (id: string, updatedData: EmployeeData) => {
    setEmployees(prevEmployees =>
      prevEmployees.map(employee =>
        employee._id === id
          ? {
            ...employee,
            name: `${updatedData.firstName} ${updatedData.lastName}`,
            designation: updatedData.designation,
            salary: { $numberDecimal: updatedData.monthlySalary },
            wallet: updatedData.walletAddress
          }
          : employee
      )
    );
  };

  // Compute Salary Data for Pie Chart
  const salaryData: SalaryData[] = employees.reduce<SalaryData[]>((acc, employee) => {
    const existingIndex = acc.findIndex((entry) => entry.name === employee.designation);

    if (existingIndex !== -1) {
      acc[existingIndex].value += parseFloat(employee.salary.$numberDecimal);
    } else {
      acc.push({ name: employee.designation, value: parseFloat(employee.salary.$numberDecimal) });
    }
    return acc;
  }, []);

  return (
    <div className="min-h-screen bg-[#131620] text-white flex">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[#0c0f16]/30 bg-grid-pattern opacity-[0.02]"></div>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-[800px] h-[800px] rounded-full blur-[150px] opacity-10 bg-[#2D8B75] -top-[400px] -right-[400px]"></div>
        <div className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-5 bg-[#B38D36] bottom-0 -left-[300px]"></div>
      </div>

      {/* Sidebar */}
      <Sidebar isWalletConnected={false} onConnectWallet={() => {}} account={undefined} />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Header Section */}
          <EmployeeHeader onAddEmployee={() => {
            setSelectedEmployee(null);
            setShowAddModal(true);
          }} onSearch={setSearchQuery} />

          {/* Employee Table */}
          <div className="w-full overflow-hidden">
            <EmployeeTable
              filterDepartment={filterDepartment}
              filterStatus={filterStatus}
              searchQuery={searchQuery}
              employees={employees}
              deleteEmployeeById={deleteEmployeeById}
              onEditEmployee={handleEditEmployee}
            />
          </div>

          {/* Quick Actions & Pie Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <QuickActions onAddEmployee={() => {
              setSelectedEmployee(null);
              setShowAddModal(true);
            }} onBulkUpload={() => setShowBulkUploadModal(true)} />

            {/* Pie Chart for Salary Distribution */}
            <div className="bg-[#131620]/90 backdrop-blur-sm border border-[#22304a]/30 rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 hover:border-[#2D8B75]/30 transition-all shadow-lg h-96">
              <h2 className="text-xl font-bold text-[#F2F2F2] font-mono" style={{
                textShadow: "0 0 5px rgba(45, 139, 117, 0.4), 0 0 10px rgba(45, 139, 117, 0.2)"
              }}>Salary Distribution by Designation</h2>
              <p className="text-gray-400 text-xs sm:text-sm font-mono mb-4">Breakdown of salary allocation across roles</p>
              {salaryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="80%">
                  <PieChart>
                    <Pie
                      data={salaryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                    >
                      {salaryData.map((dataPoint, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend layout="vertical" align="right" verticalAlign="middle" />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-gray-400 font-mono">No salary data available.</p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <AddEmployeeModal 
        isOpen={showAddModal} 
        onClose={() => {
          setShowAddModal(false);
          setSelectedEmployee(null);
        }} 
        onAddEmployee={onAddEmployee}
        onUpdateEmployee={handleUpdateEmployee}
        editEmployee={selectedEmployee}
      />
      <BulkUploadModal isOpen={showBulkUploadModal} onClose={() => setShowBulkUploadModal(false)} />
    </div>
  );
};

export default EmployeesPage;