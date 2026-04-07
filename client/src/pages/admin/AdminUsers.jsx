import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get('/admin/users');
        setUsers(data);
      } catch (err) {
        toast.error('Failed to load users');
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-glow-blue mb-6">User Management</h1>
      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-black/50 text-cyber-neonBlue font-mono">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Technosphere ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-white/5 transition">
                <td className="px-6 py-4 font-bold text-white">{u.name}</td>
                <td className="px-6 py-4">{u.email}</td>
                <td className="px-6 py-4">{u.phone}</td>
                <td className="px-6 py-4 font-mono text-cyber-neonGreen">{u.technosphereId || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
