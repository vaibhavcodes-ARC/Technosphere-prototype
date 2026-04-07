import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { Users, UserPlus } from 'lucide-react';

const Team = () => {
  const { user } = useContext(AuthContext);
  const [teamName, setTeamName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [activeTab, setActiveTab] = useState('create');

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/team/create', { name: teamName });
      toast.success(`Team ${data.name} created! Join code: ${data.joinCode}`);
      // Ideally here we'd refresh the user to show their new teamId
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create team');
    }
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/team/join', { joinCode });
      toast.success(`Successfully joined ${data.name}!`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to join team');
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-2xl">
      <h1 className="text-4xl font-bold text-center text-glow-blue mb-12 uppercase">Team Protocol</h1>
      
      <div className="glass rounded-2xl overflow-hidden box-glow-blue">
        <div className="flex border-b border-cyber-neonBlue/30">
          <button 
            className={`flex-1 py-4 font-bold flex items-center justify-center gap-2 ${activeTab === 'create' ? 'bg-cyber-neonBlue/20 text-cyber-neonBlue border-b-2 border-cyber-neonBlue' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('create')}
          >
            <Users size={18} /> CREATE TEAM
          </button>
          <button 
            className={`flex-1 py-4 font-bold flex items-center justify-center gap-2 ${activeTab === 'join' ? 'bg-cyber-neonBlue/20 text-cyber-neonBlue border-b-2 border-cyber-neonBlue' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('join')}
          >
            <UserPlus size={18} /> JOIN TEAM
          </button>
        </div>

        <div className="p-8">
          {activeTab === 'create' ? (
            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <label className="text-cyber-neonBlue font-mono text-sm">TEAM DESIGNATION (NAME)</label>
              <input 
                type="text" 
                value={teamName} 
                onChange={e => setTeamName(e.target.value)} 
                className="w-full bg-black/50 border border-cyber-neonBlue/50 text-white p-3 rounded focus:outline-none focus:border-cyber-neonBlue focus:ring-1 focus:ring-cyber-neonBlue"
                required 
              />
              <button className="mt-4 py-3 bg-cyber-neonBlue text-black font-bold uppercase tracking-widest rounded hover:bg-white hover:shadow-[0_0_20px_rgba(0,243,255,0.6)] transition">
                Initialize Team
              </button>
            </form>
          ) : (
            <form onSubmit={handleJoin} className="flex flex-col gap-4">
              <label className="text-cyber-neonGreen font-mono text-sm">ACCESS KEY (JOIN CODE)</label>
              <input 
                type="text" 
                value={joinCode} 
                onChange={e => setJoinCode(e.target.value)} 
                className="w-full bg-black/50 border border-cyber-neonGreen/50 text-white p-3 rounded focus:outline-none focus:border-cyber-neonGreen focus:ring-1 focus:ring-cyber-neonGreen uppercase text-center tracking-[0.5em]"
                required 
              />
              <button className="mt-4 py-3 bg-cyber-neonGreen text-black font-bold uppercase tracking-widest rounded hover:bg-white hover:shadow-[0_0_20px_rgba(57,255,20,0.6)] transition">
                Authenticate & Join
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Team;
