import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, ShieldCheck, Server, FileCheck } from 'lucide-react';

const data = [
  { name: 'Systems Scanned', value: 150 },
  { name: 'Pending Patches', value: 45 },
  { name: 'Vulnerabilities', value: 23 },
  { name: 'Compliance Score', value: 85 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Systems Scanned"
          value="150"
          icon={<Server className="h-8 w-8 text-blue-500" />}
        />
        <DashboardCard
          title="Pending Patches"
          value="45"
          icon={<FileCheck className="h-8 w-8 text-yellow-500" />}
        />
        <DashboardCard
          title="Vulnerability Alerts"
          value="23"
          icon={<AlertTriangle className="h-8 w-8 text-red-500" />}
        />
        <DashboardCard
          title="Compliance Score"
          value="85%"
          icon={<ShieldCheck className="h-8 w-8 text-green-500" />}
        />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Security Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const DashboardCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({
  title,
  value,
  icon,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</dt>
            <dd>
              <div className="text-lg font-medium text-gray-900 dark:text-white">{value}</div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;