import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Home, Shield, Server, FileCheck, Bell, LogOut, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  setShowNotifications: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ setShowNotifications }) => {
  const location = useLocation();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-800 h-screen w-64 flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">SecurePatch</h1>
      </div>
      <ul className="flex-grow">
        <NavItem to="/" icon={<Home />} text="Dashboard" isActive={isActive('/')} />
        <NavItem to="/patch-management" icon={<FileCheck />} text="Patch Management" isActive={isActive('/patch-management')} />
        <NavItem to="/system-hardening" icon={<Shield />} text="System Hardening" isActive={isActive('/system-hardening')} />
        <NavItem to="/compliance-reporting" icon={<Server />} text="Compliance Reporting" isActive={isActive('/compliance-reporting')} />
      </ul>
      <div className="p-4 space-y-2">
        <button
          onClick={() => setShowNotifications(true)}
          className="flex items-center w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          <Bell className="h-5 w-5 mr-2" />
          Notifications
        </button>
        <button
          onClick={toggleTheme}
          className="flex items-center w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          {theme === 'light' ? <Moon className="h-5 w-5 mr-2" /> : <Sun className="h-5 w-5 mr-2" />}
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </button>
      </div>
    </nav>
  );
};

const NavItem: React.FC<{ to: string; icon: React.ReactNode; text: string; isActive: boolean }> = ({ to, icon, text, isActive }) => (
  <li>
    <Link
      to={to}
      className={`flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
        isActive ? 'bg-gray-100 dark:bg-gray-700' : ''
      }`}
    >
      {React.cloneElement(icon as React.ReactElement, { className: 'h-5 w-5 mr-2' })}
      {text}
    </Link>
  </li>
);

export default Navbar;