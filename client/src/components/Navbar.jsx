import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, LayoutDashboard, Menu, X, Calendar, ShieldAlert, UserPlus, Zap, Home, Info, MapPin, Gift, Star, HelpCircle, Phone, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const adminToken = localStorage.getItem('adminToken');

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-4">
          {/* Hamburger Icon */}
          <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-cyber-neonBlue transition focus:outline-none z-50">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <Link to="/" onClick={closeMenu} className="text-2xl font-mono font-bold tracking-widest text-glow-blue z-50 inline-block">
            TECHNO<span className="text-cyber-neonGreen">26</span>
          </Link>
        </div>

        {/* NSU Logo - Moved to Right */}
        <a href="https://nsuniv.ac.in" target="_blank" rel="noopener noreferrer" className="relative group block">
          <div className="absolute inset-0 bg-cyber-neonGreen/20 blur-md rounded-full group-hover:bg-cyber-neonGreen/40 transition duration-300"></div>
          <img 
            src="/nsulogo.png" 
            alt="NSU Logo" 
            className="w-10 h-10 object-contain relative z-10 group-hover:scale-110 transition duration-300 drop-shadow-[0_0_8px_rgba(57,255,20,0.4)]"
          />
        </a>
      </nav>

      {/* Mobile / Hamburger Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed top-0 left-0 bottom-0 w-70 z-50 bg-cyber-black border-r border-cyber-neonBlue/20 shadow-[0_0_30px_rgba(0,243,255,0.1)] flex flex-col pt-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center px-6 mb-8 mt-2">
                <span className="text-xl font-mono font-bold tracking-widest text-glow-blue">MENU</span>
                <button onClick={closeMenu} className="text-gray-400 hover:text-white transition">
                  <X size={28} />
                </button>
              </div>

              <div className="flex flex-col gap-2 font-mono tracking-widest px-4">
                {[
                  { name: 'Home', path: '/', Icon: Home },
                  { name: 'Schedule', path: '/schedule', Icon: Calendar },
                  { name: 'About Us', path: '/about', Icon: Info },
                  { name: 'Venue', path: '/venue', Icon: MapPin },
                  { name: 'Prizes (TBD)', path: '/prizes', Icon: Gift },
                  { name: 'Sponsors', path: '/sponsors', Icon: Star },
                  { name: 'FAQ', path: '/faq', Icon: HelpCircle },
                  { name: 'Contact Us', path: '/contact', Icon: Phone }
                ].map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.path}
                    onClick={closeMenu}
                    className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-lg transition ${isActive ? 'bg-cyber-neonBlue/10 text-cyber-neonBlue border border-cyber-neonBlue/30' : 'text-gray-300 hover:text-cyber-neonBlue hover:bg-white/5 border border-transparent'}`}
                  >
                    <item.Icon size={20} /> <span className="uppercase text-sm">{item.name}</span>
                  </NavLink>
                ))}

                <hr className="border-white/10 my-4" />

                {/* CMS Admin Portal */}
                {!adminToken ? (
                  <div className="flex flex-col gap-2">
                    <NavLink to="/admin/login" onClick={closeMenu} className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-lg transition ${isActive ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' : 'text-purple-400 hover:text-white hover:bg-white/5 border border-transparent'}`}>
                      <Lock size={20} /> <span className="uppercase text-sm">Admin Login</span>
                    </NavLink>
                  </div>
                ) : (
                  <NavLink to="/admin/dashboard" onClick={closeMenu} className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-lg transition ${isActive ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' : 'text-purple-400 hover:text-white hover:bg-white/5 border border-transparent'}`}>
                    <Zap size={20} /> <span className="uppercase text-sm">CMS Admin</span>
                  </NavLink>
                )}

                <hr className="border-white/10 my-4" />

                {!user && (
                  <NavLink to="/register" onClick={closeMenu} className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-lg transition ${isActive ? 'bg-cyber-neonGreen/10 text-cyber-neonGreen border border-cyber-neonGreen/30' : 'text-cyber-neonGreen hover:text-white hover:bg-white/5 border border-transparent'}`}>
                    <UserPlus size={20} /> <span className="uppercase text-sm">Register</span>
                  </NavLink>
                )}

                {user && user.isAdmin && (
                  <NavLink to="/admin" onClick={closeMenu} className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-lg transition ${isActive ? 'bg-red-500/10 text-red-500 border border-red-500/30' : 'text-red-500 hover:text-white hover:bg-white/5 border border-transparent'}`}>
                    <ShieldAlert size={20} /> <span className="uppercase text-sm">Admin Panel</span>
                  </NavLink>
                )}

                {user ? (
                  <NavLink to="/dashboard" onClick={closeMenu} className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-lg transition ${isActive ? 'bg-cyber-neonBlue/10 text-cyber-neonBlue border border-cyber-neonBlue/30' : 'text-cyber-neonBlue hover:text-white hover:bg-white/5 border border-transparent'}`}>
                    <LayoutDashboard size={20} /> <span className="uppercase text-sm">Dashboard</span>
                  </NavLink>
                ) : null}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
