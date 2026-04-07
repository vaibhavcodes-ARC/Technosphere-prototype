import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, CalendarDays, Receipt, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const AdminSidebar = () => {
  const { logout } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navClass = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive ? 'bg-cyber-neonBlue text-black font-bold shadow-[0_0_15px_rgba(0,243,255,0.4)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`;

  return (
    <div className="w-64 bg-black/80 border-r border-white/10 flex flex-col min-h-screen p-4 glass">
      <div className="text-2xl font-bold text-glow-blue mb-10 px-4 mt-4">ADMIN PANEL</div>
      <nav className="flex-1 space-y-2">
        <NavLink to="/admin" end className={navClass}>
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>
        <NavLink to="/admin/registrations" className={navClass}>
          <Receipt size={20} /> Registrations
        </NavLink>
        <NavLink to="/admin/events" className={navClass}>
          <CalendarDays size={20} /> Events
        </NavLink>
        <NavLink to="/admin/users" className={navClass}>
          <Users size={20} /> Users
        </NavLink>
      </nav>
      <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all duration-300 mt-auto">
        <LogOut size={20} /> Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
