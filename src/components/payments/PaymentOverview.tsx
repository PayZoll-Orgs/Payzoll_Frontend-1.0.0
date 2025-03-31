"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Grid3X3, DollarSign } from "lucide-react";
import PaymentDialog, { Employee } from "./PaymentDialog";
import "../../styles/gradients.css";

interface PaymentsOverviewProps {
  employees: number;
  totalSalary: string;
  totalSalaryPaid: number;
}

const PaymentsOverview: React.FC<PaymentsOverviewProps> = ({ 
  totalSalary
}) => {
  // States for dialog visibility
  const [showPayAllDialog, setShowPayAllDialog] = useState(false);
  const [showPaySelectiveDialog, setShowPaySelectiveDialog] = useState(false);
  const [showCustomPaymentDialog, setShowCustomPaymentDialog] = useState(false);
  
  // Mock employees data (in a real app, this would come from props or API)
  const mockEmployees: Employee[] = [
    { id: 1, name: "John Doe", accountId: "0x742d35...44e", salary: { $numberDecimal: "5000" } },
    { id: 2, name: "Jane Smith", accountId: "0x742d35...f23", salary: { $numberDecimal: "7000" } },
    { id: 3, name: "Alex Johnson", accountId: "0x742d35...a1b", salary: { $numberDecimal: "4500" } },
    { id: 4, name: "Sam Williams", accountId: "0x742d35...c45", salary: { $numberDecimal: "6200" } },
    { id: 5, name: "Taylor Brown", accountId: "0x742d35...9ef", salary: { $numberDecimal: "5800" } },
  ];

  // Calculate total salary amount
  const totalSalaryAmount = parseFloat(totalSalary);
  
  // Payment confirmation handler (would handle actual payment in a real app)
  const handlePaymentConfirm = () => {
    console.log("Payment confirmed");
    // Here you would trigger the actual payment process
  };

  // Card data with consistent styling
  const cards = [
    {
      title: "Pay All",
      value: `${totalSalary} ETH`,
      icon: Users,
      color: "text-[#2D8B75]",
      onClick: () => setShowPayAllDialog(true),
      dialogTitle: "Pay All Employees",
      dialogDescription: "Process payments for all active employees at once"
    },
    {
      title: "Pay Selective",
      value: `${totalSalary} ETH`,
      icon: Grid3X3,
      color: "text-[#2D8B75]",
      onClick: () => setShowPaySelectiveDialog(true),
      dialogTitle: "Pay Selected Employees",
      dialogDescription: "Choose specific employees to process payments for"
    },
    {
      title: "Custom Payment",
      value: `${totalSalary} ETH`,
      icon: DollarSign,
      color: "text-[#2D8B75]",
      onClick: () => setShowCustomPaymentDialog(true),
      dialogTitle: "Custom Payment",
      dialogDescription: "Specify custom payment amounts for selected employees"
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="h-auto min-h-[180px] sm:min-h-[200px] lg:min-h-[220px] bg-[#131620]/90 backdrop-blur-sm border border-[#22304a]/30 rounded-xl p-4 sm:p-5 lg:p-6 hover:border-[#2D8B75]/40 transition-all group shadow-lg"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-5 lg:mb-6">
              <div>
                <h3 className="text-[#F2F2F2] font-mono text-lg sm:text-xl mb-1 sm:mb-2">{card.title}</h3>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono transition-all group-hover:text-shadow-glow">
                  {card.value}
                </div>
              </div>
              <div className="bg-[#0c0f16]/80 backdrop-blur-sm p-2 sm:p-3 rounded-lg border border-[#22304a]/30">
                <card.icon className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${card.color} transform transition-transform group-hover:scale-110`} />
              </div>
            </div>
            
            <button 
              onClick={card.onClick}
              className="w-full mt-4 sm:mt-5 lg:mt-6 bg-gradient-to-r from-[#22304a] to-[#2D8B75] text-white 
                 px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-mono transition-all 
                 hover:shadow-lg hover:shadow-[#2D8B75]/20 focus:outline-none"
            >
              Pay Now
            </button>
          </motion.div>
        ))}
      </div>

      {/* Payment Dialogs */}
      <PaymentDialog
        isOpen={showPayAllDialog}
        onClose={() => setShowPayAllDialog(false)}
        onConfirm={handlePaymentConfirm}
        title={cards[0].dialogTitle}
        description={cards[0].dialogDescription}
        employees={mockEmployees}
        dialogType="payAll"
        totalAmount={totalSalaryAmount}
      />

      <PaymentDialog
        isOpen={showPaySelectiveDialog}
        onClose={() => setShowPaySelectiveDialog(false)}
        onConfirm={handlePaymentConfirm}
        title={cards[1].dialogTitle}
        description={cards[1].dialogDescription}
        employees={mockEmployees}
        dialogType="paySelective"
        totalAmount={totalSalaryAmount}
      />

      <PaymentDialog
        isOpen={showCustomPaymentDialog}
        onClose={() => setShowCustomPaymentDialog(false)}
        onConfirm={handlePaymentConfirm}
        title={cards[2].dialogTitle}
        description={cards[2].dialogDescription}
        employees={mockEmployees}
        dialogType="customPayment"
        totalAmount={totalSalaryAmount}
      />
    </>
  );
};

export default PaymentsOverview;