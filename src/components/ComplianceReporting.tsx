import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download } from 'lucide-react';

const mockComplianceData = [
  { month: 'Jan', CIS: 75, NIST: 80, PCIDSS: 70 },
  { month: 'Feb', CIS: 78, NIST: 82, PCIDSS: 73 },
  { month: 'Mar', CIS: 80, NIST: 85, PCIDSS: 75 },
  { month: 'Apr', CIS: 82, NIST: 87, PCIDSS: 78 },
  { month: 'May', CIS: 85, NIST: 89, PCIDSS: 80 },
  { month: 'Jun', CIS: 87, NIST: 90, PCIDSS: 82 },
];

const ComplianceReporting: React.FC = () => {
  const [selectedStandard, setSelectedStandard] = useState('all');

  const handleDownloadReport = () => {
    // Implement PDF download logic here
    alert('Downloading compliance report...');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Compliance Reporting</h1>
        <button
          onClick={handleDownloadReport}
          className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          <Download className="h-5 w-5 mr-2" />
          Download Report
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="mb-4">
          <label htmlFor="standard-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Select Compliance Standard:
          </label>
          <select
            id="standard-select"
            value={selectedStandard}
            onChange={(e) => setSelectedStandard(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="all">All Standards</option>
            <option value="CIS">CIS Benchmarks</option>
            <option value="NIST">NIST</option>
            <option value="PCIDSS">PCI DSS</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={mockComplianceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {(selectedStandard === 'all' || selectedStandard === 'CIS') && (
              <Line type="monotone" dataKey="CIS" stroke="#8884d8" activeDot={{ r: 8 }} />
            )}
            {(selectedStandard === 'all' || selectedStandard === 'NIST') && (
              <Line type="monotone" dataKey="NIST" stroke="#82ca9d" activeDot={{ r: 8 }} />
            )}
            {(selectedStandard === 'all' || selectedStandard === 'PCIDSS') && (
              <Line type="monotone" dataKey="PCIDSS" stroke="#ffc658" activeDot={{ r: 8 }} />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComplianceReporting;