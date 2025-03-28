"use client";

import React, { useState } from "react";
import { User, Mail, Phone, Shield, Plus, Trash2 } from "lucide-react";

interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const AccountSettings: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Super Admin", status: "active" },
    { id: 2, name: "Sarah Smith", email: "sarah@example.com", role: "Admin", status: "active" },
  ]);

  return (
    <div className="space-y-6">
      {/* Admin Profile */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
        <h2 className="text-xl font-bold mb-6">Admin Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileInput label="Full Name" type="text" placeholder="Enter your name" Icon={User} />
          <ProfileInput label="Email Address" type="email" placeholder="Enter your email" Icon={Mail} />
          <ProfileInput label="Phone Number" type="tel" placeholder="Enter your phone number" Icon={Phone} />
          <ProfileSelect label="Role" Icon={Shield} options={["Super Admin", "Admin", "Manager"]} />
        </div>
      </div>

      {/* Admin Management */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Admin Management</h2>
          <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 rounded-xl text-white hover:shadow-lg hover:shadow-indigo-500/20 transition-all">
            <Plus className="w-4 h-4" />
            <span>Add Admin</span>
          </button>
        </div>

        <AdminTable admins={admins} />
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2 rounded-xl bg-indigo-600 text-white hover:shadow-lg hover:shadow-indigo-500/20 transition-all">
          Save Changes
        </button>
      </div>
    </div>
  );
};

const ProfileInput: React.FC<{ label: string; type: string; placeholder: string; Icon: any }> = ({ label, type, placeholder, Icon }) => (
  <div>
    <label className="block text-sm text-gray-400 mb-2">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input type={type} className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-indigo-500 transition-colors" placeholder={placeholder} />
    </div>
  </div>
);

const ProfileSelect: React.FC<{ label: string; Icon: any; options: string[] }> = ({ label, Icon, options }) => (
  <div>
    <label className="block text-sm text-gray-400 mb-2">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <select className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-indigo-500 transition-colors">
        {options.map((option) => (
          <option key={option} value={option.toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const AdminTable: React.FC<{ admins: Admin[] }> = ({ admins }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm text-gray-400">
      <thead className="bg-gray-800">
        <tr>
          {['Name', 'Email', 'Role', 'Status', 'Actions'].map((heading) => (
            <th key={heading} className="px-6 py-4 text-left font-medium">{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-700">
        {admins.map((admin) => (
          <tr key={admin.id} className="hover:bg-gray-800 transition-colors">
            <td className="px-6 py-4">{admin.name}</td>
            <td className="px-6 py-4">{admin.email}</td>
            <td className="px-6 py-4">
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {admin.role}
              </span>
            </td>
            <td className="px-6 py-4">
              <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400">
                {admin.status}
              </span>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center space-x-3">
                <button className="text-gray-400 hover:text-white transition-colors">Edit</button>
                <button className="text-red-400 hover:text-red-300 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AccountSettings;