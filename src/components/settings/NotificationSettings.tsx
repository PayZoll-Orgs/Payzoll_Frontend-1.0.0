'use client';

import React, { useState } from 'react';
import { Mail, Bell, MessageSquare, Plus, Slack, MessageCircle } from 'lucide-react';

interface NotificationType {
  id: string;
  title: string;
  description: string;
  email: boolean;
  push: boolean;
}

interface Integration {
  id: string;
  name: string;
  icon: React.ElementType;
  status: 'connected' | 'disconnected';
  webhook: string;
}

const notificationTypes: NotificationType[] = [
  {
    id: 'payments',
    title: 'Payment Notifications',
    description: 'Updates about payroll processing and transactions',
    email: true,
    push: true,
  },
  {
    id: 'security',
    title: 'Security Alerts',
    description: 'Important security-related notifications',
    email: true,
    push: true,
  },
  {
    id: 'employees',
    title: 'Employee Updates',
    description: 'Changes to employee information and status',
    email: true,
    push: false,
  },
];

const integrations: Integration[] = [
  {
    id: 'slack',
    name: 'Slack',
    icon: Slack,
    status: 'connected',
    webhook: 'https://hooks.slack.com/...',
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: MessageCircle,
    status: 'disconnected',
    webhook: '',
  },
];

const NotificationSettings: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Mail className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-bold">Email Notifications</h2>
          </div>
          <input
            type="checkbox"
            className="toggle-checkbox"
            checked={emailNotifications}
            onChange={() => setEmailNotifications(!emailNotifications)}
          />
        </div>

        {notificationTypes.map((type) => (
          <div key={type.id} className="flex items-center justify-between p-4 border border-gray-800 rounded-xl">
            <div>
              <h3 className="font-semibold">{type.title}</h3>
              <p className="text-sm text-gray-400">{type.description}</p>
            </div>
            <input type="checkbox" className="toggle-checkbox" disabled={!emailNotifications} defaultChecked={type.email} />
          </div>
        ))}
      </div>

      {/* Push Notifications */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Bell className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold">Push Notifications</h2>
          </div>
          <input
            type="checkbox"
            className="toggle-checkbox"
            checked={pushNotifications}
            onChange={() => setPushNotifications(!pushNotifications)}
          />
        </div>

        {notificationTypes.map((type) => (
          <div key={type.id} className="flex items-center justify-between p-4 border border-gray-800 rounded-xl">
            <div>
              <h3 className="font-semibold">{type.title}</h3>
              <p className="text-sm text-gray-400">{type.description}</p>
            </div>
            <input type="checkbox" className="toggle-checkbox" disabled={!pushNotifications} defaultChecked={type.push} />
          </div>
        ))}
      </div>

      {/* Integrations */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <MessageSquare className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold">Integrations</h2>
          </div>
          <button className="bg-indigo-600 px-4 py-2 rounded-xl text-white flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add New</span>
          </button>
        </div>

        {integrations.map((integration) => (
          <div key={integration.id} className="flex items-center justify-between p-4 border border-gray-800 rounded-xl">
            <div className="flex items-center space-x-4">
              <integration.icon className="w-6 h-6 text-indigo-400" />
              <div>
                <h3 className="font-semibold">{integration.name}</h3>
                <p className="text-sm text-gray-400">{integration.status === 'connected' ? integration.webhook : 'Not connected'}</p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-xl text-sm ${
              integration.status === 'connected' ? 'bg-red-500/20 text-red-400' : 'bg-indigo-500/20 text-indigo-400'
            }`}> {integration.status === 'connected' ? 'Disconnect' : 'Connect'} </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSettings;
