'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Scale, FileText, Download, AlertTriangle, CheckCircle,
} from 'lucide-react';

const ComplianceSettings: React.FC = () => {
  const [region, setRegion] = useState<string>('us');
  //

  const complianceStatus = [
    {
      title: 'GDPR Compliance',
      status: 'compliant',
      lastCheck: '2 hours ago',
      description: 'Data protection and privacy requirements'
    },
    {
      title: 'KYC/AML',
      status: 'attention',
      lastCheck: '1 day ago',
      description: 'Identity verification and anti-money laundering'
    },
    {
      title: 'Tax Reporting',
      status: 'compliant',
      lastCheck: '5 hours ago',
      description: 'Automated tax calculations and reporting'
    }
  ];

  const documents = [
    {
      name: 'Privacy Policy',
      type: 'PDF',
      size: '2.5 MB',
      lastUpdated: '2024-01-15'
    },
    {
      name: 'Terms of Service',
      type: 'PDF',
      size: '1.8 MB',
      lastUpdated: '2024-01-15'
    },
    {
      name: 'Data Processing Agreement',
      type: 'PDF',
      size: '3.2 MB',
      lastUpdated: '2024-01-10'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Scale className="w-6 h-6 text-indigo-500" />
          <h2 className="text-xl font-bold text-white">Compliance Status</h2>
        </div>

        <div className="space-y-4">
          {complianceStatus.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 p-4 rounded-xl border border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {item.status === 'compliant' ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  )}
                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">Last checked: {item.lastCheck}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Regional Settings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Primary Region</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl py-2 px-4 text-white"
            >
              <option value="us">United States</option>
              <option value="eu">European Union</option>
              <option value="uk">United Kingdom</option>
              <option value="asia">Asia Pacific</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Legal Documents</h2>

        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-900 p-4 rounded-xl border border-gray-700"
            >
              <div className="flex items-center space-x-4">
                <FileText className="w-5 h-5 text-indigo-400" />
                <div>
                  <h3 className="font-semibold text-white">{doc.name}</h3>
                  <p className="text-sm text-gray-400">{doc.type} • {doc.size} • Last updated: {doc.lastUpdated}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-white">
                <Download className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ComplianceSettings;
