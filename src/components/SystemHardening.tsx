import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const mockHardeningData = [
  { id: 1, recommendation: 'Disable unnecessary services', status: 'Pending' },
  { id: 2, recommendation: 'Enable firewall', status: 'Pending' },
  { id: 3, recommendation: 'Update password policy', status: 'Pending' },
  { id: 4, recommendation: 'Enable disk encryption', status: 'Pending' },
  { id: 5, recommendation: 'Configure system auditing', status: 'Pending' },
];

const SystemHardening: React.FC = () => {
  const [recommendations, setRecommendations] = useState(mockHardeningData);

  const handleApply = async (id: number) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setRecommendations(recommendations.map(rec => 
      rec.id === id ? { ...rec, status: Math.random() > 0.2 ? 'Applied' : 'Failed' } : rec
    ));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">System Hardening</h1>
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {recommendations.map((rec) => (
            <li key={rec.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{rec.recommendation}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    {rec.status === 'Pending' ? (
                      <button
                        onClick={() => handleApply(rec.id)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Apply
                      </button>
                    ) : rec.status === 'Applied' ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        <CheckCircle className="h-5 w-5 mr-1" />
                        Applied
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        <XCircle className="h-5 w-5 mr-1" />
                        Failed
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

export default SystemHardening;