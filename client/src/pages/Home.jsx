import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Home = () => {
  const [events, setEvents] = useState([]);
  
  const targetDate = new Date('2026-09-15T09:00:00').getTime();
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get('/events');
        setEvents(data.slice(0, 3)); // Top 3 events
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvents();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
      } else {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-6 lg:px-20 pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black -z-10"></div>
        

        <div className="container mx-auto flex flex-col items-center justify-center text-center z-10 w-full">
          {/* Main Hero Content */}
          <div className="flex flex-col items-center justify-center w-full max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-6xl md:text-8xl font-black tracking-tighter text-glow-blue mb-4"
            >
              TECHNOSPHERE <span className="text-cyber-neonGreen text-glow-green">26</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 w-full max-w-2xl px-4"
            >
              Enter the next dimension of technology. The ultimate college tech fest is here.
            </motion.p>
            
            {/* Countdown */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="glass rounded-2xl p-6 flex gap-4 md:gap-8 justify-center items-center box-glow-blue z-10 w-full md:w-max"
            >
              {Object.entries(countdown).map(([unit, value]) => (
                <div key={unit} className="flex flex-col items-center">
                  <span className="text-4xl md:text-6xl font-mono text-white font-bold">{value < 10 ? `0${value}` : value}</span>
                  <span className="text-xs md:text-sm uppercase tracking-widest text-cyber-neonBlue">{unit}</span>
                </div>
              ))}
            </motion.div>
            
            <motion.div
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1.5 }}
               className="mt-12 z-10"
            >
              <Link to="/events" className="px-8 py-4 bg-cyber-neonBlue text-black font-bold uppercase tracking-widest rounded-full hover:bg-white hover:shadow-[0_0_30px_rgba(0,243,255,0.8)] transition duration-300">
                Explore Events
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Events Quick View */}
      <section className="w-full max-w-7xl px-6 py-20 z-10">
        <h2 className="text-4xl font-bold mb-12 text-center text-glow-blue">Featured Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <motion.div 
              key={event._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass p-6 rounded-xl border-t border-cyber-neonBlue/30 hover:-translate-y-2 hover:box-glow-blue transition duration-300 flex flex-col h-full"
            >
              <h3 className="text-2xl font-bold text-cyber-neonBlue mb-2">{event.name}</h3>
              <p className="text-gray-400 mb-4 flex-grow">{event.description.substring(0, 100)}...</p>
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
                 <span className="text-cyber-neonGreen font-mono">₹{event.fee}</span>
                 <Link to={`/events/${event._id}`} className="text-sm border border-cyber-neonBlue px-3 py-1 rounded hover:bg-cyber-neonBlue hover:text-black transition flex items-center justify-center">
                   Details
                 </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/events" className="text-cyber-neonGreen hover:underline tracking-widest uppercase text-sm">
            View All Events &rarr;
          </Link>
        </div>
      </section>
</div>
  );
};

export default Home;
