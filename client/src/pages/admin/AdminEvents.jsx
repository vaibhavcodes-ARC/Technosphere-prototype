import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { Dialog } from '@headlessui/react';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    fee: 150,
    maxTeamSize: 1,
    rules: ''
  });

  const fetchEvents = async () => {
    try {
      const { data } = await api.get('/events');
      setEvents(data);
    } catch (err) {
      toast.error('Failed to load events');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpen = (event = null) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        name: event.name,
        description: event.description,
        fee: event.fee,
        maxTeamSize: event.maxTeamSize,
        rules: event.rules
      });
    } else {
      setEditingEvent(null);
      setFormData({ name: '', description: '', fee: 150, maxTeamSize: 1, rules: '' });
    }
    setIsOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await api.put(`/events/${editingEvent._id}`, formData);
        toast.success('Event updated');
      } else {
        await api.post('/events', formData);
        toast.success('Event created');
      }
      setIsOpen(false);
      fetchEvents();
    } catch (err) {
      toast.error('Failed to save event');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this event and all associated registrations?')) {
      try {
        await api.delete(`/events/${id}`);
        toast.success('Event deleted');
        fetchEvents();
      } catch (err) {
        toast.error('Deletion failed');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-glow-blue">Event Management</h1>
        <button onClick={() => handleOpen()} className="flex items-center gap-2 bg-cyber-neonGreen text-black px-4 py-2 font-bold rounded hover:bg-white transition">
          <Plus size={20} /> Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {events.map((event) => (
          <div key={event._id} className="glass p-6 rounded-xl flex flex-col justify-between border-l-4 border-cyber-neonBlue hover:box-glow-blue transition">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-bold text-cyber-neonBlue">{event.name}</h3>
                <span className="bg-cyber-neonGreen/20 text-cyber-neonGreen px-2 py-1 rounded text-xs font-mono border border-cyber-neonGreen/30">₹{event.fee}</span>
              </div>
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">{event.description}</p>
            </div>
            <div className="flex justify-end gap-3 border-t border-white/10 pt-4 mt-2">
              <button onClick={() => handleOpen(event)} className="text-blue-400 hover:text-blue-300 transition p-2 bg-blue-500/10 rounded">
                <Edit2 size={18} />
              </button>
              <button onClick={() => handleDelete(event._id)} className="text-red-400 hover:text-red-300 transition p-2 bg-red-500/10 rounded">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <Dialog.Panel className="w-full max-w-xl glass p-8 rounded-2xl border border-cyber-neonBlue/30 relative max-h-[90vh] overflow-y-auto">
          <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></button>
          <Dialog.Title className="text-2xl font-bold text-glow-blue mb-6 border-b border-white/10 pb-4">
            {editingEvent ? 'Edit Event' : 'Create New Event'}
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-mono text-gray-400 mb-1">Name</label>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black/50 border border-white/20 text-white p-3 rounded focus:outline-none focus:border-cyber-neonBlue" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-mono text-gray-400 mb-1">Fee (₹)</label>
                <input type="number" value={formData.fee} onChange={e => setFormData({...formData, fee: Number(e.target.value)})} className="w-full bg-black/50 border border-white/20 text-white p-3 rounded focus:outline-none focus:border-cyber-neonBlue" required />
              </div>
              <div>
                <label className="block text-sm font-mono text-gray-400 mb-1">Max Team Size</label>
                <input type="number" value={formData.maxTeamSize} onChange={e => setFormData({...formData, maxTeamSize: Number(e.target.value)})} className="w-full bg-black/50 border border-white/20 text-white p-3 rounded focus:outline-none focus:border-cyber-neonBlue" min="1" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-mono text-gray-400 mb-1">Description</label>
              <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black/50 border border-white/20 text-white p-3 rounded focus:outline-none focus:border-cyber-neonBlue h-24" required></textarea>
            </div>
            <div>
              <label className="block text-sm font-mono text-gray-400 mb-1">Rules</label>
              <textarea value={formData.rules} onChange={e => setFormData({...formData, rules: e.target.value})} className="w-full bg-black/50 border border-white/20 text-white p-3 rounded focus:outline-none focus:border-cyber-neonBlue h-24" required></textarea>
            </div>
            <button type="submit" className="w-full py-3 bg-cyber-neonBlue text-black font-bold uppercase tracking-widest rounded hover:bg-white transition mt-6">
              {editingEvent ? 'Update' : 'Create'}
            </button>
          </form>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default AdminEvents;
