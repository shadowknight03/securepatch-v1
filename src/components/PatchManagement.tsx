import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, AlertOctagon } from 'lucide-react';

const mockPatchData = [
  { id: 1, system: 'Server-001', patch: 'Security Update KB4019472', severity: 'Critical', status: 'Pending' },
  { id: 2, system: 'Workstation-105', patch: 'OS Patch 2023-03', severity: 'High', status: 'Pending' },
  { id: 3, system: 'Database-002', patch: 'SQL Injection Fix', severity: 'Medium', status: 'Pending' },
  { id: 4, system: 'Firewall-003', patch: 'Firmware Update v2.1', severity: 'Low', status: 'Pending' },
];

const PatchManagement: React.FC = () => {
  const [patches, setPatches] = useState(mockPatchData);
  const [filter, setFilter] = useState('all');

  const handleApprove = (id: number) => {
    setPatches(patches.map(patch => 
      patch.id === id ? { ...patch, status: 'Approved' } : patch
    ));
  };

  const filteredPatches = patches.filter(patch => 
    filter === 'all' || patch.severity.toLowerCase() === filter
  );

  const SeverityIcon = ({ severity }: { severity: string }) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return <AlertOctagon className="h-5 w-5 text-red-600" />;
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <AlertTriangle className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Patch Management</h1>
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('critical')}
            className={`px-3 py-1 rounded ${filter === 'critical' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Critical
          </button>
          <button
            onClick={() => setFilter('high')}
            className={`px-3 py-1 rounded ${filter === 'high' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            High
          </button>
          <button
            onClick={() => setFilter('medium')}
            className={`px-3 py-1 rounded ${filter === 'medium' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Medium
          </button>
          <button
            onClick={() => setFilter('low')}
            className={`px-3 py-1 rounded ${filter === 'low' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Low
          </button>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredPatches.map((patch) => (
            <li key={patch.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <SeverityIcon severity={patch.severity} />
                    <p className="ml-2 text-sm font-medium text-gray-900 dark:text-white">{patch.system}</p>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {patch.severity}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                      {patch.patch}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    {patch.status === 'Pending' ? (
                      <button
                        onClick={() => handleApprove(patch.id)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Approve and Deploy
                      </button>
                    ) : (
                      <span className="flex items-center text-green-500">
                        <CheckCircle className="h-5 w-5 mr-1" />
                        Approved
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PatchManagement;