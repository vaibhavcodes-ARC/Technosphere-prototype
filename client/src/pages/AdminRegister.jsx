import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api.js';
import toast from 'react-hot-toast';
import { Mail, Lock, Phone, User, ArrowRight } from 'lucide-react';

const AdminRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('form'); // form, otp, code
  const [adminId, setAdminId] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [otp, setOtp] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.email.endsWith('@nsuniv.ac.in')) {
      toast.error('Only @nsuniv.ac.in emails are allowed');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/cms-auth/register', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      setAdminId(res.data.adminId);
      setStep('otp');
      toast.success('OTP sent to your email');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error('Please enter a valid OTP');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/cms-auth/verify-otp', {
        adminId,
        otp,
      });

      setGeneratedCode(res.data.adminCode);
      setStep('code');
      toast.success('Email verified successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      await api.post('/cms-auth/resend-otp', { adminId });
      toast.success('New OTP sent to your email');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend OTP');
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
            <p className="text-gray-400">Admin Registration</p>
          </div>

          {step === 'form' && (
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-blue-400" size={20} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="Your name"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email (must be @nsuniv.ac.in)</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-blue-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="your.email@nsuniv.ac.in"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-blue-400" size={20} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="+91 XXXXXXXXXX"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-blue-400" size={20} />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="At least 6 characters"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-blue-400" size={20} />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="Confirm password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                {loading ? 'Registering...' : 'Register'} <ArrowRight size={20} />
              </button>

              <p className="text-center text-gray-400">
                Already have an account? <Link to="/admin/login" className="text-blue-400 hover:underline">Login</Link>
              </p>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="text-center mb-6">
                <p className="text-gray-300 mb-2">Enter the 6-digit OTP sent to</p>
                <p className="text-blue-400 font-mono">{formData.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">OTP</label>
                <input
                  type="text"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white text-center text-2xl tracking-widest focus:outline-none focus:border-blue-500"
                  placeholder="000000"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 rounded-lg transition disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>

              <button
                type="button"
                onClick={handleResendOTP}
                disabled={loading}
                className="w-full text-blue-400 hover:underline text-sm"
              >
                Resend OTP
              </button>
            </form>
          )}

          {step === 'code' && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="inline-block bg-green-500/20 border border-green-500 rounded-full p-4 mb-4">
                  <span className="text-green-400 text-2xl">✓</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Registration Complete!</h2>
                <p className="text-gray-400 mb-4">Your admin account has been verified. Save your Admin Code below.</p>
              </div>

              <div className="bg-gray-800/50 border border-yellow-500/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">Your Admin Code:</p>
                <p className="text-2xl font-mono font-bold text-yellow-400 text-center break-all">
                  {generatedCode}
                </p>
              </div>

              <p className="text-xs text-gray-500 text-center">
                Save this code now. Future admin login works only with this code.
              </p>

              <button
                onClick={() => navigate('/admin/login')}
                className="w-full bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 rounded-lg transition"
              >
                Go to Admin Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
