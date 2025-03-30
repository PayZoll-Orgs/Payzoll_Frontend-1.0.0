"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  Upload,
  Download,
  FileSpreadsheet,
  Send,
  Wallet,
} from "lucide-react";

interface QuickActionsProps {
  onAddEmployee: () => void;
  onBulkUpload: () => void;
}

const actions = [
 
  {
    icon: Upload,
    label: "Bulk Upload",
    actionKey: "onBulkUpload",
    color: "from-blue-600 to-indigo-600",
  },
  {
    icon: Download,
    label: "Export Data",
    actionKey: "exportData",
    color: "from-green-600 to-emerald-600",
  },
  
  {
    icon: Wallet,
    label: "Bulk Payment",
    actionKey: "bulkPayment",
    color: "from-pink-600 to-rose-600",
  },
];

const QuickActions: React.FC<QuickActionsProps> = ({ onAddEmployee, onBulkUpload }) => {
  const handleClick = (actionKey: string) => {
    switch (actionKey) {
      case "onAddEmployee":
        onAddEmployee();
        break;
      case "onBulkUpload":
        onBulkUpload();
        break;
      default:
        console.log(`${actionKey} clicked`);
    }
  };

  return (
    <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
      <h3 className="text-xl font-bold mb-6">Audit Logs</h3>
      
      <div className="space-y-3">
        {actions.map((action, index) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleClick(action.actionKey)}
            className="w-full group bg-crypto-dark hover:bg-crypto-dark/70 border border-gray-800 hover:border-indigo-500/50 
                     rounded-xl p-4 transition-all flex items-center space-x-3"
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} 
                          flex items-center justify-center transform transition-transform 
                          group-hover:scale-110`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-400 group-hover:text-white transition-colors">
              {action.label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Help Section */}
      {/* <div className="mt-6 p-4 bg-crypto-dark/50 rounded-xl border border-gray-800">
        <h4 className="text-sm font-semibold mb-2">Need Help?</h4>
        <p className="text-sm text-gray-400">
          Check our documentation for detailed guides on employee management.
        </p>
        <button className="mt-3 text-indigo-400 text-sm hover:text-indigo-300 transition-colors">
          View Documentation →
        </button>
      </div> */}
    </div>
  );
};

export default QuickActions;
