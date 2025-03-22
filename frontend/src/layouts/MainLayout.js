import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Bars3Icon, 
  XMarkIcon,
  HomeIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/main', icon: HomeIcon },
  { name: 'Patients', href: '/main/patients', icon: UserGroupIcon },
  { name: 'Benefits', href: '/main/benefits', icon: ClipboardDocumentListIcon },
  { name: 'AI Copilot', href: '/main/copilot', icon: ChatBubbleLeftRightIcon },
];

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  
  // Determine if a nav item is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
        
        {/* Sidebar content */}
        <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-primary-800">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center px-4">
            <span className="text-white text-2xl font-bold">Care Team AI</span>
          </div>
          
          {/* Navigation */}
          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`${
                    isActive(item.href)
                      ? 'bg-primary-900 text-white'
                      : 'text-primary-100 hover:bg-primary-700'
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                >
                  <item.icon
                    className="mr-4 h-6 w-6 text-primary-200"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-primary-800">
              <span className="text-white text-xl font-bold">Care Team AI</span>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto bg-primary-800">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      isActive(item.href)
                        ? 'bg-primary-900 text-white'
                        : 'text-primary-100 hover:bg-primary-700'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    <item.icon
                      className="mr-3 h-6 w-6 text-primary-200"
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top header */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900">
                {navigation.find(item => isActive(item.href))?.name || 'Dashboard'}
              </h1>
            </div>
            {/* User profile dropdown */}
            <div className="ml-3 relative flex items-center">
              <span className="px-3 text-sm mr-1 hidden md:block">
                {currentUser?.first_name} {currentUser?.last_name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                <span className="hidden md:inline-block">Logout</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 