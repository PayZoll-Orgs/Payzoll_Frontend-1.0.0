"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/employerDashboard/Sidebar";
import PaymentsHeader from "@/components/payments/PaymentHeader";
import PaymentsOverview from "@/components/payments/PaymentOverview";
import PaymentOptions from "@/components/payments/PaymentOptions";
import ScheduledPayments from "@/components/payments/ScheduledPayments";
import TransactionsLog from "@/components/payments/TransactionsLog";
import PayrollBudget from "@/components/payments/PayrollBudget";
import PayrollAnalytics from "@/components/payments/PayrollAnalytics";
import QuickPayModal from "@/components/payments/QuickPayModal";

const PaymentsPage: React.FC = () => {
  const [showQuickPayModal, setShowQuickPayModal] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [totalSalary, setTotalSalary] = useState(0);
  const [payrollHistory, setPayrollHistory] = useState<any[]>([]);

  // Mock data for employees and payroll history
  useEffect(() => {
    const mockEmployees = [
      { id: 1, name: "John Doe", accountId: "0x123", salary: { $numberDecimal: "5000" } },
      { id: 2, name: "Jane Smith", accountId: "0x456", salary: { $numberDecimal: "7000" } },
    ];

    const mockPayrollHistory = [
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
      <main className="flex-1 ml-64 p-8 relative">
        <div className="max-w-[1600px] my-0 mx-auto">
          <PaymentsHeader onQuickPay={() => setShowQuickPayModal(true)} />
          <PaymentsOverview
            employees={employees.length}
            totalSalary={totalSalary.toString()}
            totalSalaryPaid={payrollHistory.reduce((sum, item) => sum + parseFloat(item.totalAmount.$numberDecimal || "0"), 0)}
          />
          
            <div className="col-span-12 mt-8 lg:col-span-8 space-y-6">
             
              <TransactionsLog payrollHistory={payrollHistory} />
            </div>
            
     
         
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