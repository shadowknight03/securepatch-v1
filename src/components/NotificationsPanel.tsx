import React, { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'warning' | 'error';
  timestamp: Date;
}

const NotificationsPanel: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Simulating real-time notifications
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now(),
        message: `New notification ${Math.floor(Math.random() * 100)}`,
        type: ['info', 'warning', 'error'][Math.floor(Math.random() * 3)] as 'info' | 'warning' | 'error',
        timestamp: new Date(),
      };
      setNotifications(prev => [newNotification, ...prev].slice(0, 5));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        <Bell className="h-6 w-6" />
      </button>
      {isOpen && (
        <div className="absolute bottom-12 right-0 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="p-4 bg-blue-500 text-white flex justify-between items-center">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="p-4 text-gray-500 dark:text-gray-400">No new notifications</p>
            ) : (
              notifications.map(notification => (
                <div key={notification.id} className="p-4 border-b dark:border-gray-700 flex justify-between items-start">
                  <div>
                    <p className={`text-sm ${
                      notification.type === 'info' ? 'text-blue-500' :
                      notification.type === 'warning' ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {notification.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPanel;