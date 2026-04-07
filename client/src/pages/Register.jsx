import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const { register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match!');
    }
    try {
      await register(formData.name, formData.email, formData.phone, formData.password);
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass w-full max-w-lg p-8 rounded-2xl box-glow-blue"
      >
        <div className="text-center mb-8">
          <UserPlus size={40} className="mx-auto text-cyber-neonGreen mb-4" />
          <h2 className="text-3xl font-bold text-glow-green">Enlist Now</h2>
          <p className="text-gray-400 mt-2">Create your presence in the Technosphere</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-cyber-neonGreen mb-1 font-mono text-sm">IDENTIFIER (NAME)</label>
            <input 
              name="name" type="text" onChange={handleChange} required
              className="w-full bg-black/50 border border-cyber-neonGreen/30 rounded p-2 text-white focus:outline-none focus:border-cyber-neonGreen focus:ring-1 focus:ring-cyber-neonGreen"
            />
          </div>
          <div>
            <label className="block text-cyber-neonGreen mb-1 font-mono text-sm">COMMS_LINK (EMAIL)</label>
            <input 
              name="email" type="email" onChange={handleChange} required
              className="w-full bg-black/50 border border-cyber-neonGreen/30 rounded p-2 text-white focus:outline-none focus:border-cyber-neonGreen focus:ring-1 focus:ring-cyber-neonGreen"
            />
          </div>
          <div>
            <label className="block text-cyber-neonGreen mb-1 font-mono text-sm">CONTACT (PHONE)</label>
            <input 
              name="phone" type="tel" onChange={handleChange} required
              className="w-full bg-black/50 border border-cyber-neonGreen/30 rounded p-2 text-white focus:outline-none focus:border-cyber-neonGreen focus:ring-1 focus:ring-cyber-neonGreen"
            />
          </div>
          <div>
            <label className="block text-cyber-neonGreen mb-1 font-mono text-sm">SECURITY_KEY</label>
            <input 
              name="password" type="password" onChange={handleChange} required
              className="w-full bg-black/50 border border-cyber-neonGreen/30 rounded p-2 text-white focus:outline-none focus:border-cyber-neonGreen focus:ring-1 focus:ring-cyber-neonGreen"
            />
          </div>
          <div>
            <label className="block text-cyber-neonGreen mb-1 font-mono text-sm">CONFIRM_KEY</label>
            <input 
              name="confirmPassword" type="password" onChange={handleChange} required
              className="w-full bg-black/50 border border-cyber-neonGreen/30 rounded p-2 text-white focus:outline-none focus:border-cyber-neonGreen focus:ring-1 focus:ring-cyber-neonGreen"
            />
          </div>
          <button 
            type="submit" 
            className="mt-6 bg-cyber-neonGreen text-black font-bold py-3 rounded hover:bg-white transition duration-300 shadow-[0_0_15px_rgba(57,255,20,0.4)]"
          >
            ESTABLISH LINK
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-gray-400">
          Already enlisted? <Link to="/login" className="text-cyber-neonBlue hover:underline">Login here</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
