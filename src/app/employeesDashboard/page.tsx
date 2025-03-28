"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/employerDashboard/Sidebar";
import EmployeeHeader from "@/components/employeesDashboard/EmployeeHeader";
import EmployeeStats from "@/components/employeesDashboard/EmployeeStats";
import EmployeeTable from "@/components/employeesDashboard/EmployeeTable";
import QuickActions from "@/components/employeesDashboard/QuickAction";
import RecentActivity from "@/components/employeesDashboard/RecentActivity";
import AddEmployeeModal from "@/components/employeesDashboard/AddEmployeeModal";
import BulkUploadModal from "@/components/employeesDashboard/BulkuploadModal";

// Define the Employee interface
interface Employee {
  _id: string;
  name: string;
  employeeId: string;
  
  dateOfJoining: string;
  designation: string;
  salary: { $numberDecimal: string };
  accountId: string;
 
}


const EmployeesPage: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);

  // Mock data for employees
  useEffect(() => {
    const mockEmployees: Employee[] = [
      {
        _id: "1",
        name: "John Doe",
        employeeId: "EMP001",
        dateOfJoining: "2023-01-01",
        designation: "Software Engineer",
        salary: { $numberDecimal: "5000" },
        accountId: "0x1234567890abcdef",
      },
      {
        _id: "2",
        name: "Jane Smith",
        employeeId: "EMP002",
        dateOfJoining: "2023-02-01",
        designation: "Product Manager",
        salary: { $numberDecimal: "7000" },
        accountId: "0xabcdef1234567890",
      },
    ];
    setEmployees(mockEmployees);
  }, []);

  const deleteEmployeeById = (id: string) => {
    setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== id));
  };

  const onAddEmployee = (employee: any) => {
    const newEmployee: Employee = {
      _id: (employees.length + 1).toString(),
      name: `${employee.firstName} ${employee.lastName}`,
      employeeId: `EMP00${employees.length + 1}`,
      dateOfJoining: new Date().toISOString().split("T")[0],
      designation: employee.designation,
      salary: { $numberDecimal: employee.monthlySalary },
      accountId: employee.walletAddress,
    };
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  return (
    <div className="min-h-screen bg-crypto-dark text-white flex">
      {/* Sidebar */}
      <Sidebar isWalletConnected={false} onConnectWallet={() => {}} account={undefined} />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Header Section */}
          <EmployeeHeader onAddEmployee={() => setShowAddModal(true)} onSearch={setSearchQuery} />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <EmployeeStats employees={employees} />
          </div>

          {/* Employee Table Section - Full Width */}
          <div className="w-full overflow-hidden">
            <EmployeeTable
              filterDepartment={filterDepartment}
              filterStatus={filterStatus}
              searchQuery={searchQuery}
              employees={employees}
              deleteEmployeeById={deleteEmployeeById}
            />
          </div>

          {/* Quick Actions and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <QuickActions onAddEmployee={() => setShowAddModal(true)} onBulkUpload={() => setShowBulkUploadModal(true)} />
            <RecentActivity />
          </div>
        </div>
      </main>

      {/* Modals */}
      <AddEmployeeModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onAddEmployee={onAddEmployee} />
      <BulkUploadModal isOpen={showBulkUploadModal} onClose={() => setShowBulkUploadModal(false)} />
    </div>
  );
};

export default EmployeesPage;