import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/stats');
        setStats(data);
      } catch (err) {
        toast.error('Failed to load stats');
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <div className="text-cyber-neonBlue animate-pulse">Loading Stats...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-glow-blue mb-8">System Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
         <div className="glass p-6 rounded-xl border-l-4 border-cyber-neonBlue">
           <p className="text-gray-400 text-sm">Total Revenue</p>
           <p className="text-3xl font-bold text-white">₹{stats.totalRevenue}</p>
         </div>
         <div className="glass p-6 rounded-xl border-l-4 border-cyber-neonGreen">
           <p className="text-gray-400 text-sm">Total Users</p>
           <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
         </div>
         <div className="glass p-6 rounded-xl border-l-4 border-cyber-purple">
           <p className="text-gray-400 text-sm">Registrations</p>
           <p className="text-3xl font-bold text-white">{stats.totalRegistrations}</p>
         </div>
         <div className="glass p-6 rounded-xl border-l-4 border-yellow-400">
           <p className="text-gray-400 text-sm">Pending Verification</p>
           <p className="text-3xl font-bold text-white">{stats.pendingRegistrations}</p>
         </div>
      </div>
      
      <div className="glass p-6 rounded-xl box-glow-blue h-96">
        <h2 className="text-xl font-bold text-cyber-neonBlue mb-6">Registrations by Event</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats.chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis dataKey="name" stroke="#a0aec0" />
            <YAxis stroke="#a0aec0" />
            <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#00f3ff', borderRadius: '8px' }} />
            <Bar dataKey="registrations" fill="#00f3ff" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
