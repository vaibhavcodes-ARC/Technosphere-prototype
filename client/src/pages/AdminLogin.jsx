import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api.js';
import toast from 'react-hot-toast';
import { Key, ArrowRight, Lock } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [adminCode, setAdminCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (adminCode.length !== 10) {
      toast.error('Admin code must be 10 characters');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/cms-auth/login', {
        adminCode: adminCode.toUpperCase(),
      });

      // Save token
      localStorage.setItem('adminToken', res.data.token);
      localStorage.setItem('adminUser', JSON.stringify(res.data.admin));

      toast.success('Logged in successfully');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-black/50 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text mb-2">
              TECHNOSPHERE
            </h1>
            <p className="text-gray-400">Admin Login</p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-300">
              Use your 10-character Admin Code to login. Do not share your code with anyone.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Admin Code */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Admin Code</label>
              <div className="relative">
                <Key className="absolute left-3 top-3 text-blue-400" size={20} />
                <input
                  type="text"
                  maxLength="10"
                  value={adminCode.toUpperCase()}
                  onChange={(e) => setAdminCode(e.target.value.toUpperCase())}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white text-center text-xl tracking-widest placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  placeholder="XXXXXXXXXX"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">10 characters (A-Z, 0-9)</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'} <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-center text-gray-400 text-sm">
              Don't have an admin account?{' '}
              <Link to="/admin/register" className="text-blue-400 hover:underline">
                Register here
              </Link>
            </p>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="flex gap-2">
              <Lock className="text-yellow-500 shrink-0" size={18} />
              <p className="text-xs text-yellow-300">
                This is a secure admin portal. Make sure you're on the official Technosphere website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
