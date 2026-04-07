import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/api';
import { Search } from 'lucide-react';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get('/events');
        setEvents(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-glow-blue mb-12 uppercase tracking-wider">
        Active Events
      </h1>
      
      <div className="max-w-xl mx-auto mb-12 relative">
        <input 
          type="text" 
          placeholder="SEARCH EVENTS..." 
          className="w-full bg-black/50 border border-cyber-neonBlue/50 text-white rounded-full py-3 px-6 pl-12 focus:outline-none focus:border-cyber-neonBlue focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition font-mono"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-4 top-3.5 text-cyber-neonBlue" size={20} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event, i) => (
          <motion.div 
            key={event._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-6 border-l-4 border-l-cyber-neonGreen hover:box-glow-blue transition duration-300 flex flex-col"
          >
            <h2 className="text-2xl font-bold text-cyber-neonGreen mb-3">{event.name}</h2>
            <p className="text-gray-300 mb-6 flex-grow">{event.description.substring(0, 120)}...</p>
            <div className="flex justify-between items-center text-sm font-mono text-gray-400 mb-6 border-t border-white/10 pt-4">
               <span>FEE: ₹{event.fee}</span>
               <span>TEAM MAX: {event.maxTeamSize}</span>
            </div>
            <Link 
              to={`/events/${event._id}`} 
              className="w-full text-center py-2 border border-cyber-neonBlue text-cyber-neonBlue rounded hover:bg-cyber-neonBlue hover:text-black transition uppercase tracking-widest font-bold text-sm"
            >
              INITIATE DETAILS
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Events;
