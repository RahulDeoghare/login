import React from 'react';
import { NavLink } from 'react-router-dom';
import { CheckSquare, Home, Plus, Settings, User, X } from 'lucide-react';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Profile', href: '/profile', icon: User },
  ];
  
  return (
    <div className="h-full flex flex-col border-r border-gray-200 bg-white">
      <div className="flex items-center justify-between h-16 flex-shrink-0 px-4 border-b border-gray-200">
        <div className="flex items-center">
          <CheckSquare className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">TaskHub</span>
        </div>
        {onClose && (
          <button
            type="button"
            className="lg:hidden rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={onClose}
          >
            <span className="sr-only">Close sidebar</span>
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        )}
      </div>
      
      <div className="mt-5 flex-grow flex flex-col">
        <nav className="flex-1 px-2 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => `
                group flex items-center px-2 py-2 text-sm font-medium rounded-md
                ${isActive 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              `}
              onClick={onClose}
            >
              <item.icon 
                className={`mr-3 h-5 w-5 flex-shrink-0`}
                aria-hidden="true" 
              />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <NavLink
          to="/tasks/new"
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={onClose}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;