"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/employerDashboard/Sidebar";
import PaymentsHeader from "@/components/payments/PaymentHeader";
import PaymentsOverview from "@/components/payments/PaymentOverview";
import PaymentOptions from "@/components/payments/PaymentOptions";
import TransactionsLog from "@/components/payments/TransactionsLog";
import QuickPayModal from "@/components/payments/QuickPayModal";
import PaymentDashboard from "@/components/payments/PaymentDashboard";



// Define types for our data models
interface Employee {
  id: number;
  name: string;
  accountId: string;
  salary: { $numberDecimal: string };
}

interface PayrollHistoryItem {
  id: number;
  totalAmount: { $numberDecimal: string };
  timestamp: string;
  status: string;
}

const PaymentsPage: React.FC = () => {
  const [showQuickPayModal, setShowQuickPayModal] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [totalSalary, setTotalSalary] = useState(0);
  const [payrollHistory, setPayrollHistory] = useState<PayrollHistoryItem[]>([]);

  // Mock data for employees and payroll history
  useEffect(() => {
    const mockEmployees: Employee[] = [
      { id: 1, name: "John Doe", accountId: "0x123", salary: { $numberDecimal: "5000" } },
      { id: 2, name: "Jane Smith", accountId: "0x456", salary: { $numberDecimal: "7000" } },
    ];

    const mockPayrollHistory: PayrollHistoryItem[] = [
      { id: 1, totalAmount: { $numberDecimal: "5000" }, timestamp: "2023-01-01", status: "completed" },
      { id: 2, totalAmount: { $numberDecimal: "7000" }, timestamp: "2023-02-01", status: "pending" },
    ];

    setEmployees(mockEmployees);
    setTotalSalary(mockEmployees.reduce((sum, emp) => sum + parseFloat(emp.salary.$numberDecimal || "0"), 0));
    setPayrollHistory(mockPayrollHistory);
  }, []);

  const payEmployees = () => {
    console.log("Pay employees logic goes here.");
    // Mock implementation for paying employees
  };

  return (
    <div className="min-h-screen bg-crypto-dark text-white flex">
      <Sidebar isWalletConnected={false} onConnectWallet={() => console.log("Todo")} account={undefined} />
      <main className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-8 pt-16 lg:pt-8 relative">
        <div className="max-w-[1600px] my-0 mx-auto">
          <PaymentsHeader onQuickPay={() => setShowQuickPayModal(true)} />

          {/* CHANGES made to remove the model payment */}
          {/* <div className="mt-6">
            <PaymentsOverview
              employees={employees.length}
              totalSalary={totalSalary.toString()}
              totalSalaryPaid={payrollHistory.reduce((sum, item) => sum + parseFloat(item.totalAmount.$numberDecimal || "0"), 0)}
            />
          </div> */}

          {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mt-6"> */}
          <div className="col-span-1 lg:col-span-8 space-y-4 md:space-y-6">
            <PaymentDashboard />
          </div>
          <div className="col-span-1 lg:col-span-8 space-y-4 md:space-y-6">
            <TransactionsLog />
          </div>


          {/* <div className="col-span-1 lg:col-span-4 space-y-4 md:space-y-6">
              <PaymentOptions />
            </div> */}
          {/* </div> */}
        </div>
      </main>
      <QuickPayModal
        isOpen={showQuickPayModal}
        onClose={() => setShowQuickPayModal(false)}
        payEmployees={payEmployees}
        totalSalary={totalSalary}
        network={{ name: "Default Network" }}
        account=""
        employees={employees}
      />
    </div>
  );
};

export default PaymentsPage;