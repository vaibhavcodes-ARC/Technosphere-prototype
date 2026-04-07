import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { QRCodeSVG } from 'qrcode.react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const { data } = await api.get('/events/my-registrations');
        setRegistrations(data);
      } catch (err) {
        toast.error('Failed to load registrations');
      }
    };
    fetchRegistrations();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this registration?')) return;
    try {
      await api.delete(`/events/registrations/${id}`);
      toast.success('Registration deleted successfully');
      setRegistrations(registrations.filter((r) => r._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete registration');
    }
  };

  const copyId = () => {
    if (user?.technosphereId) {
      navigator.clipboard.writeText(user.technosphereId);
      toast.success('Technosphere ID copied!');
    }
  };

  const StatusColor = {
    Pending: 'text-yellow-400',
    Verified: 'text-cyber-neonGreen',
    Rejected: 'text-red-500',
  };

  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in">
      <div className="glass rounded-2xl p-8 mb-12 box-glow-blue flex flex-col md:flex-row items-center gap-8">
        <div className="w-24 h-24 rounded-full bg-cyber-neonBlue flex items-center justify-center text-black text-4xl font-bold shadow-[0_0_20px_rgba(0,243,255,0.5)]">
          {user?.name?.charAt(0)}
        </div>
        <div className="text-center md:text-left flex-1">
          <h1 className="text-3xl font-bold text-cyber-neonBlue mb-2">{user?.name}</h1>
          <p className="text-gray-400 font-mono text-sm tracking-wider mb-4">{user?.email} | {user?.phone}</p>
          {user?.technosphereId && (
            <div className="inline-flex items-center gap-4 bg-black/50 px-4 py-2 rounded-lg border border-cyber-neonBlue/30">
              <span className="text-xl font-bold text-glow-blue tracking-widest">{user.technosphereId}</span>
              <button 
                onClick={copyId}
                className="text-xs bg-cyber-neonBlue/20 text-cyber-neonBlue px-3 py-1 rounded hover:bg-cyber-neonBlue hover:text-black transition uppercase font-bold"
              >
                Copy ID
              </button>
            </div>
          )}
        </div>
      </div>

      <h2 className="text-3xl font-bold text-glow-green mb-8 uppercase tracking-widest border-b border-cyber-neonGreen/30 pb-4">My Event Passes</h2>
      
      {registrations.length === 0 ? (
        <div className="text-center py-20 glass rounded-xl border-dashed border-2 border-cyber-neonBlue/30">
          <p className="text-gray-400 mb-4 font-mono text-lg">No event registrations found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {registrations.map(reg => (
            <div key={reg._id} className="glass p-6 rounded-xl flex flex-col items-center hover:-translate-y-2 transition duration-300">
              <h3 className="text-xl font-bold text-cyber-neonBlue mb-6 text-center">{reg.eventId?.name}</h3>
              
              <div className="bg-white p-4 rounded-lg mb-6 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                <QRCodeSVG 
                  value={JSON.stringify({ userId: user._id, eventId: reg.eventId?._id, regId: reg._id })} 
                  size={150} 
                />
              </div>

              <div className="w-full text-center mt-auto border-t border-white/10 pt-4 font-mono space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">PAYMENT STATUS</p>
                  <p className={`font-bold ${StatusColor[reg.paymentStatus] || 'text-white'} text-lg uppercase`}>
                    {reg.paymentStatus === 'Pending' ? '🟡 ' : reg.paymentStatus === 'Verified' ? '🟢 ' : '🔴 '}
                    {reg.paymentStatus}
                  </p>
                </div>
                
                <div className="flex gap-2 justify-center">
                  <a 
                    href={`http://localhost:5000${reg.paymentProof}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 px-2 py-2 bg-cyber-neonBlue/20 text-cyber-neonBlue text-sm font-bold rounded hover:bg-cyber-neonBlue hover:text-black transition tracking-widest uppercase"
                  >
                    View Proof
                  </a>
                  {reg.paymentStatus === 'Pending' && (
                    <button 
                      onClick={() => handleDelete(reg._id)}
                      className="flex-1 px-2 py-2 bg-red-500/20 text-red-500 text-sm font-bold rounded hover:bg-red-500 hover:text-white transition tracking-widest uppercase"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
