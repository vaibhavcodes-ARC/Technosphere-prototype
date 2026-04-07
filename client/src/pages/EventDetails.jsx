import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { QRCodeSVG } from 'qrcode.react';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/events/${id}`);
        setEvent(data);
      } catch (err) {
        toast.error('Failed to fetch event details');
      }
    };
    fetchEvent();
  }, [id]);

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentFile, setPaymentFile] = useState(null);

  const handleRegisterClick = () => {
    if (!user) {
      toast.error('You must be logged in to register');
      return navigate('/login');
    }
    setShowPaymentForm(true);
  };

  const handleFileChange = (e) => {
    setPaymentFile(e.target.files[0]);
  };

  const submitRegistration = async () => {
    if (!paymentFile) {
      toast.error('Please upload payment screenshot');
      return;
    }
    const formData = new FormData();
    formData.append('paymentProof', paymentFile);
    try {
      const { data } = await api.post(`/events/${id}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success(`Registration submitted! Your Technosphere ID: ${data.technosphereId}`);
      setShowPaymentForm(false);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  if (!event) return <div className="text-center py-20 text-cyber-neonBlue animate-pulse">Fetching Data Stream...</div>;

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-8 lg:p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-neonBlue/10 rounded-bl-full -z-10 blur-xl"></div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-glow-blue mb-6 uppercase tracking-wider">{event.name}</h1>
        
        <div className="flex gap-4 mb-8">
          <span className="px-3 py-1 bg-cyber-neonGreen/20 text-cyber-neonGreen rounded border border-cyber-neonGreen/50 font-mono text-sm">
            FEE: ₹{event.fee}
          </span>
          <span className="px-3 py-1 bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/50 rounded font-mono text-sm">
            MAX TEAM: {event.maxTeamSize}
          </span>
        </div>

        <div className="mb-8">
          <h3 className="text-xl text-cyber-neonBlue mb-3 font-semibold uppercase tracking-widest border-b border-cyber-neonBlue/30 pb-2">Description</h3>
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">{event.description}</p>
        </div>

        <div className="mb-12">
           <h3 className="text-xl text-cyber-neonBlue mb-3 font-semibold uppercase tracking-widest border-b border-cyber-neonBlue/30 pb-2">Rules & Regulations</h3>
           <p className="text-gray-300 leading-relaxed whitespace-pre-line">{event.rules}</p>
        </div>

          {showPaymentForm ? (
            <div className="mt-6 space-y-4">
              <div className="text-center">
                <p className="text-cyber-neonBlue mb-2">Scan this QR to pay ₹{event.fee}</p>
                <QRCodeSVG value={`upi://pay?pa=technosphere@sbi&pn=Technosphere2026&am=${event.fee}&cu=INR`} size={150} className="mx-auto" />
                <p className="mt-2 text-sm text-gray-300">UPI ID: <span className="font-mono">technosphere@sbi</span></p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Upload payment screenshot</label>
                <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-gray-200" />
              </div>
              <button
                onClick={submitRegistration}
                className="w-full py-3 text-lg font-bold text-black bg-cyber-neonGreen rounded hover:bg-white transition duration-300"
              >
                Submit Registration
              </button>
            </div>
          ) : (
            <button
              onClick={handleRegisterClick}
              className="w-full py-4 text-xl font-bold text-black bg-cyber-neonGreen rounded hover:bg-white hover:shadow-[0_0_20px_rgba(57,255,20,0.6)] transition duration-300 uppercase tracking-widest"
            >
              Register Now
            </button>
          )}
      </motion.div>
    </div>
  );
};

export default EventDetails;
