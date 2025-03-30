'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardList, Search, Filter, Download,
  User, Wallet, Settings, Shield,
  ArrowUpRight
} from 'lucide-react';

interface ActivityLog {
  id: number;
  type: string;
  action: string;
  details: string;
  user: string;
  timestamp: string;
  amount?: string;
  status: string;
  address?: string;
}

const activityLogs: ActivityLog[] = [
  {
    id: 1,
    type: 'payment',
    action: 'Payment Processed',
    details: 'Monthly salary payment for Engineering team',
    user: 'John Doe',
    timestamp: '2 hours ago',
    amount: '-145,678 USD',
    status: 'completed'
  },
  {
    id: 2,
    type: 'security',
    action: '2FA Enabled',
    details: 'Two-factor authentication activated',
    user: 'Sarah Smith',
    timestamp: '5 hours ago',
    status: 'success'
  },
  {
    id: 3,
    type: 'wallet',
    action: 'Wallet Connected',
    details: 'New wallet address added',
    user: 'Mike Johnson',
    timestamp: '1 day ago',
    address: '0x1234...5678',
    status: 'success'
  }
];

const getActionIcon = (type: string) => {
  switch (type) {
    case 'payment': return <Wallet className="w-5 h-5 text-white" />;
    case 'security': return <Shield className="w-5 h-5 text-white" />;
    case 'wallet': return <Wallet className="w-5 h-5 text-white" />;
    case 'settings': return <Settings className="w-5 h-5 text-white" />;
    default: return <ClipboardList className="w-5 h-5 text-white" />;
  }
};

export default function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Activity Logs</h2>
              <p className="text-sm text-gray-400">Track all system activities</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search logs..."
                className="w-64 bg-gray-800 border border-gray-700 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-indigo-500 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <button className="px-4 py-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
              <Filter className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {activityLogs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-indigo-500/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                    {getActionIcon(log.type)}
                  </div>
                  <div>
                    <div className="font-semibold group-hover:text-white transition-colors">{log.action}</div>
                    <div className="text-sm text-gray-400">{log.details}</div>
                    <div className="flex items-center space-x-2 mt-1 text-sm text-gray-400">
                      <User className="w-4 h-4" />
                      <span>{log.user}</span>
                      <span>•</span>
                      <span>{log.timestamp}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {log.amount && (
                    <div className="text-red-400 flex items-center space-x-1">
                      <ArrowUpRight className="w-4 h-4" />
                      <span>{log.amount}</span>
                    </div>
                  )}
                  {log.address && (
                    <div className="font-mono text-sm text-gray-400">{log.address}</div>
                  )}
                  <span className="px-3 py-1 rounded-full text-sm mt-2 bg-green-500/10 text-green-400">
                    {log.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
