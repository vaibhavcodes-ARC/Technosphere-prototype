import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';

const Admin = () => {
  const { user } = useContext(AuthContext);
  const [registrations, setRegistrations] = useState([]);
  const [selectedReg, setSelectedReg] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const { data } = await api.get('/admin/registrations');
        setRegistrations(data);
      } catch (err) {
        toast.error('Failed to load registrations');
      }
    };
    fetchRegistrations();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/admin/registrations/${id}/verify`, { status });
      setRegistrations(registrations.map(r => (r._id === id ? { ...r, paymentStatus: status } : r)));
      toast.success(`Registration ${status}`);
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleView = (reg) => {
    setSelectedReg(reg);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedReg(null);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-6 py-12"
      >
        <h1 className="text-4xl font-bold text-glow-blue mb-8">Admin Panel</h1>
        <div className="grid gap-6">
          {registrations.map(reg => (
            <div key={reg._id} className="glass p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="font-mono text-sm text-gray-300">{reg.userId?.name} - {reg.eventId?.name}</p>
                <p className="text-gray-400">Status: {reg.paymentStatus}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusChange(reg._id, 'Verified')}
                  className="px-3 py-1 bg-cyber-neonGreen text-black rounded hover:bg-white"
                >
                  Verify
                </button>
                <button
                  onClick={() => handleStatusChange(reg._id, 'Rejected')}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleView(reg)}
                  className="px-3 py-1 bg-cyber-neonBlue text-white rounded hover:bg-white"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* View Details Modal */}
      <Dialog open={isOpen} onClose={closeModal} className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="w-full max-w-lg bg-gray-900 rounded-lg p-6 glass">
            <Dialog.Title className="text-2xl font-bold text-glow-blue mb-4">Registration Details</Dialog.Title>
            {selectedReg && (
              <div className="space-y-4">
                <p><strong>User:</strong> {selectedReg.userId?.name} ({selectedReg.userId?.email})</p>
                <p><strong>Event:</strong> {selectedReg.eventId?.name}</p>
                <p><strong>Status:</strong> {selectedReg.paymentStatus}</p>
                <p><strong>Payment Proof:</strong></p>
                <img src={`http://localhost:5000${selectedReg.paymentProof}`} alt="Payment Proof" className="w-full rounded border border-white/10" />
              </div>
            )}
            <button onClick={closeModal} className="mt-4 w-full py-2 bg-cyber-neonGreen text-black rounded hover:bg-white">
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default Admin;
