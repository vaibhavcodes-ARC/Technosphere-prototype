import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { Search, Download, Eye, CheckCircle, XCircle } from 'lucide-react';
import { Dialog } from '@headlessui/react';

const AdminRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [filterQuery, setFilterQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedReg, setSelectedReg] = useState(null);

  const fetchRegs = async () => {
    try {
      const { data } = await api.get('/admin/registrations');
      setRegistrations(data);
    } catch (err) {
      toast.error('Failed to load registrations');
    }
  };

  useEffect(() => {
    fetchRegs();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.put(`/admin/registrations/${id}/verify`, { status });
      toast.success(`Registration ${status}`);
      fetchRegs();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Update failed');
    }
  };

  const filteredData = registrations.filter((reg) => {
    const searchMatch = 
      (reg.userId?.name || '').toLowerCase().includes(filterQuery.toLowerCase()) ||
      (reg.eventId?.name || '').toLowerCase().includes(filterQuery.toLowerCase());
    const statusMatch = statusFilter === 'All' || reg.paymentStatus === statusFilter;
    return searchMatch && statusMatch;
  });

  const downloadCSV = () => {
    const csvRows = [];
    const headers = ['User Name', 'Email', 'Event', 'Fee', 'Status', 'Date'];
    csvRows.push(headers.join(','));

    filteredData.forEach(r => {
      const row = [
        `"${r.userId?.name || ''}"`,
        `"${r.userId?.email || ''}"`,
        `"${r.eventId?.name || ''}"`,
        r.eventId?.fee || 0,
        r.paymentStatus,
        `"${new Date(r.createdAt).toLocaleDateString()}"`
      ];
      csvRows.push(row.join(','));
    });

    const csvData = csvRows.join('\n');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `technosphere_registrations_${new Date().getTime()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-glow-blue">Registrations</h1>
        <button onClick={downloadCSV} className="flex items-center gap-2 bg-black text-cyber-neonBlue border border-cyber-neonBlue px-4 py-2 font-bold rounded hover:bg-cyber-neonBlue hover:text-black transition">
          <Download size={20} /> Export CSV
        </button>
      </div>

      <div className="glass p-4 rounded-xl mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input 
            type="text" placeholder="Search by name or event..." 
            value={filterQuery} onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full bg-black/50 border border-white/20 text-white rounded p-3 pl-10 focus:outline-none focus:border-cyber-neonBlue"
          />
          <Search className="absolute left-3 top-3 text-gray-500" size={20} />
        </div>
        <select 
          value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-black/50 border border-white/20 text-white rounded p-3 focus:outline-none focus:border-cyber-neonBlue min-w-[150px]"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Verified">Verified</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="glass rounded-xl overflow-x-auto flex-1">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-black/50 text-cyber-neonBlue font-mono sticky top-0">
            <tr>
              <th className="px-6 py-4">Participant</th>
              <th className="px-6 py-4">Event</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filteredData.map(reg => (
              <tr key={reg._id} className="hover:bg-white/5 transition">
                <td className="px-6 py-4">
                  <div className="font-bold text-white mb-1">{reg.userId?.name}</div>
                  <div className="text-xs text-gray-400 font-mono">{reg.userId?.email}</div>
                </td>
                <td className="px-6 py-4 font-bold text-cyber-neonGreen">{reg.eventId?.name}</td>
                <td className="px-6 py-4 text-xs font-mono font-bold uppercase tracking-widest">
                  {reg.paymentStatus === 'Pending' && <span className="text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">Pending</span>}
                  {reg.paymentStatus === 'Verified' && <span className="text-cyber-neonGreen bg-cyber-neonGreen/10 px-2 py-1 rounded">Verified</span>}
                  {reg.paymentStatus === 'Rejected' && <span className="text-red-500 bg-red-500/10 px-2 py-1 rounded">Rejected</span>}
                </td>
                <td className="px-6 py-4">{new Date(reg.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 flex gap-2 justify-center">
                  <button onClick={() => setSelectedReg(reg)} className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500 hover:text-white transition group relative" title="View Proof">
                    <Eye size={18} />
                  </button>
                  {reg.paymentStatus === 'Pending' && (
                    <>
                      <button onClick={() => handleUpdateStatus(reg._id, 'Verified')} className="p-2 bg-cyber-neonGreen/20 text-cyber-neonGreen rounded hover:bg-cyber-neonGreen hover:text-black transition" title="Verify">
                        <CheckCircle size={18} />
                      </button>
                      <button onClick={() => handleUpdateStatus(reg._id, 'Rejected')} className="p-2 bg-red-500/20 text-red-500 rounded hover:bg-red-500 hover:text-white transition" title="Reject">
                        <XCircle size={18} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={!!selectedReg} onClose={() => setSelectedReg(null)} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <Dialog.Panel className="w-full max-w-2xl glass p-6 rounded-2xl border border-cyber-neonBlue/30 relative max-h-[90vh] flex flex-col">
          <button onClick={() => setSelectedReg(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><XCircle size={24} /></button>
          <Dialog.Title className="text-2xl font-bold text-glow-blue mb-4">Payment Verification</Dialog.Title>
          {selectedReg && (
            <div className="flex-1 overflow-y-auto pr-2 flex flex-col">
               <div className="flex justify-between items-center bg-black/40 p-4 rounded-lg mb-4 text-sm font-mono">
                 <div><span className="text-gray-400 block mb-1">USER</span> <span className="text-white font-bold">{selectedReg.userId?.name}</span></div>
                 <div className="text-right"><span className="text-gray-400 block mb-1">EVENT FEE</span> <span className="text-cyber-neonGreen font-bold text-lg">₹{selectedReg.eventId?.fee}</span></div>
               </div>
               <div className="border border-white/10 rounded-lg overflow-hidden flex-1 bg-black/50 flex items-center justify-center min-h-[300px]">
                 <img src={`http://localhost:5000${selectedReg.paymentProof}`} alt="Payment Proof" className="max-w-full max-h-full object-contain" />
               </div>
               {selectedReg.paymentStatus === 'Pending' && (
                 <div className="flex gap-4 mt-6">
                   <button onClick={() => { handleUpdateStatus(selectedReg._id, 'Verified'); setSelectedReg(null); }} className="flex-1 py-3 bg-cyber-neonGreen text-black font-bold uppercase tracking-widest rounded hover:bg-white transition flex items-center justify-center gap-2">
                     <CheckCircle size={20} /> Approve
                   </button>
                   <button onClick={() => { handleUpdateStatus(selectedReg._id, 'Rejected'); setSelectedReg(null); }} className="flex-1 py-3 bg-red-600 text-white font-bold uppercase tracking-widest rounded hover:bg-red-500 transition flex items-center justify-center gap-2">
                     <XCircle size={20} /> Reject
                   </button>
                 </div>
               )}
            </div>
          )}
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default AdminRegistrations;
