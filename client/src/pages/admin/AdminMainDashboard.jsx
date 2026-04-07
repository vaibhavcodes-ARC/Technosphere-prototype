import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Home, Settings, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminUser, setAdminUser] = useState(null);
  const [stats, setStats] = useState({
    visitors: 1250,
    registrations: 87,
    events: 12,
    sponsors: 24,
  });

  useEffect(() => {
    const user = localStorage.getItem('adminUser');
    if (user) {
      setAdminUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: Home },
    { name: 'Hero Section', path: '/admin/hero', icon: Zap },
    { name: 'About Us', path: '/admin/about', icon: Settings },
    { name: 'Venue', path: '/admin/venue', icon: Settings },
    { name: 'Sponsors', path: '/admin/sponsors', icon: Settings },
    { name: 'FAQs', path: '/admin/faqs', icon: Settings },
    { name: 'Contacts', path: '/admin/contacts', icon: Settings },
    { name: 'Organizers', path: '/admin/organizers', icon: Settings },
    { name: 'Prizes', path: '/admin/prizes', icon: Settings },
    { name: 'Footer', path: '/admin/footer', icon: Settings },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex text-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-screen bg-gray-950 border-r border-gray-800 transition-transform duration-300 ${
          sidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-transparent bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text">
            TECHNOSPHERE
          </h1>
          <p className="text-gray-500 text-sm">Admin Panel</p>
        </div>

        <nav className="p-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition text-left text-gray-300 hover:text-white"
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 border-t border-gray-800 pt-6">
          <div className="mb-4">
            <p className="text-sm text-gray-500">Admin</p>
            <p className="text-white font-medium">{adminUser?.name}</p>
            <p className="text-xs text-gray-500">{adminUser?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-gray-950 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h2 className="text-2xl font-bold text-white">Dashboard</h2>
          <div className="text-right">
            <p className="text-sm text-gray-500">Welcome back</p>
            <p className="text-white font-medium">{adminUser?.name}</p>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Visitors', value: stats.visitors, color: 'blue' },
              { label: 'Registrations', value: stats.registrations, color: 'purple' },
              { label: 'Events', value: stats.events, color: 'green' },
              { label: 'Sponsors', value: stats.sponsors, color: 'orange' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition`}
              >
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <p className={`text-4xl font-bold text-${stat.color}-400`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Edit Hero Section', path: '/admin/hero' },
                { name: 'Manage Sponsors', path: '/admin/sponsors' },
                { name: 'Manage FAQs', path: '/admin/faqs' },
                { name: 'Edit About Us', path: '/admin/about' },
                { name: 'Update Contact Info', path: '/admin/contacts' },
                { name: 'View Settings', path: '/admin/settings' },
              ].map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(action.path)}
                  className="bg-linear-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30 rounded-lg px-4 py-3 text-white font-medium transition"
                >
                  {action.name}
                </button>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
            <h4 className="text-white font-bold mb-2">Welcome to Admin Panel</h4>
            <p className="text-gray-300">
              You can manage all website content from here. All changes are applied in real-time to the website.
              Use the navigation menu to access different sections.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminDashboard;
