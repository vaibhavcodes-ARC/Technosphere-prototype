import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

const Footer = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <footer className="mt-auto py-8 border-t border-white/10 bg-black/50 text-center text-sm text-gray-400">
      <div className="container mx-auto px-6">
        {user && (
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-3 bg-black/90 backdrop-blur-md text-red-500 font-bold border border-red-500/30 rounded-full hover:bg-red-500 hover:text-white transition shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] uppercase tracking-widest text-sm"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        )}

        <p className="mb-2 uppercase tracking-widest text-glow-blue text-sm">
          &copy; 2026 Technosphere, Netaji Subhas University
        </p>
        <p className="font-mono text-xs opacity-50">Built for the future.</p>
      </div>
    </footer>
  );
};

export default Footer;
