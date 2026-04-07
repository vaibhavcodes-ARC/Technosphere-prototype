import React, { useEffect, useState } from 'react';
import { CalendarDays, Loader, Users } from 'lucide-react';
import api from '../utils/api.js';
import toast from 'react-hot-toast';

const Schedule = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get('/events');
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
        toast.error('Failed to load event schedule.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <section className="bg-gradient-to-br from-blue-950/40 via-black to-gray-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.4em] text-blue-400 mb-4">Event Flow</p>
          <h1 className="text-5xl font-bold text-white mb-4">Schedule & Lineup</h1>
          <p className="text-lg text-gray-400 max-w-3xl">
            Detailed timings will be managed by the admin panel. For now, the active event lineup is live below.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {events.length === 0 ? (
          <div className="rounded-2xl border border-gray-800 bg-gray-900/70 p-10 text-center text-gray-400">
            Event schedule will appear here once the admin publishes the event list.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {events.map((event, index) => (
              <div
                key={event._id}
                className="rounded-2xl border border-gray-800 bg-gray-900/70 p-6"
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-xs uppercase tracking-[0.3em] text-blue-400">
                    Slot {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm text-gray-500">Live from CMS events</span>
                </div>
                <h2 className="text-2xl font-semibold text-white mb-3">{event.name}</h2>
                <p className="text-gray-400 leading-relaxed mb-5">{event.description}</p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-2 text-blue-300">
                    <CalendarDays size={16} />
                    Timing to be announced
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 border border-green-500/20 px-4 py-2 text-green-300">
                    <Users size={16} />
                    Team size: {event.maxTeamSize}
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 text-yellow-300">
                    Fee: Rs. {event.fee}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Schedule;
