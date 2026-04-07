import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass w-full max-w-md p-8 rounded-2xl box-glow-blue"
      >
        <div className="text-center mb-8">
          <LogIn size={40} className="mx-auto text-cyber-neonBlue mb-4" />
          <h2 className="text-3xl font-bold text-glow-blue">Access Portal</h2>
          <p className="text-gray-400 mt-2">Enter your credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-cyber-neonBlue mb-2 font-mono text-sm">USER_EMAIL</label>
            <input 
              type="email" 
              className="w-full bg-black/50 border border-cyber-neonBlue/30 rounded p-3 text-white focus:outline-none focus:border-cyber-neonBlue focus:ring-1 focus:ring-cyber-neonBlue transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-cyber-neonBlue mb-2 font-mono text-sm">SECURITY_KEY</label>
            <input 
              type="password" 
              className="w-full bg-black/50 border border-cyber-neonBlue/30 rounded p-3 text-white focus:outline-none focus:border-cyber-neonBlue focus:ring-1 focus:ring-cyber-neonBlue transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="mt-4 bg-cyber-neonBlue text-black font-bold py-3 rounded hover:bg-white transition duration-300 shadow-[0_0_15px_rgba(0,243,255,0.4)] hover:shadow-[0_0_25px_rgba(0,243,255,0.8)]"
          >
            INITIALIZE CONNECTION
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an access code? <Link to="/register" className="text-cyber-neonGreen hover:underline">Register here</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
