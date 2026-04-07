import React, { useEffect, useState } from 'react';
import { ExternalLink, Loader, MapPin, Navigation } from 'lucide-react';
import api from '../utils/api.js';
import toast from 'react-hot-toast';

const fallbackVenue = {
  venueName: 'Netaji Subhas University',
  address: 'Pokhari, Jamshedpur',
  city: 'Jamshedpur',
  state: 'Jharkhand',
  country: 'India',
  directionsLink: 'https://maps.google.com/?q=Netaji+Subhas+University+Pokhari+Jamshedpur',
};

const Venue = () => {
  const [loading, setLoading] = useState(true);
  const [venue, setVenue] = useState(fallbackVenue);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const { data } = await api.get('/cms/venue');
        setVenue({ ...fallbackVenue, ...data });
      } catch (error) {
        console.error('Error fetching venue:', error);
        toast.error('Failed to load venue details. Showing default venue.');
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
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
      <section className="bg-gradient-to-br from-gray-900 via-black to-blue-950/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.4em] text-blue-400 mb-4">On Ground</p>
          <h1 className="text-5xl font-bold text-white mb-4">Venue</h1>
          <p className="text-lg text-gray-400 max-w-3xl">
            Find the fest location, campus access point, and map directions for Technosphere 2026.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-gray-800 bg-gray-900/70 p-8">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/15 text-blue-400 flex items-center justify-center mb-6">
            <MapPin size={26} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">{venue.venueName}</h2>
          <p className="text-lg text-gray-300 mb-3">{venue.address}</p>
          <p className="text-gray-400 mb-8">
            {[venue.city, venue.state, venue.country].filter(Boolean).join(', ')}
          </p>

          <div className="flex flex-wrap gap-4">
            {venue.directionsLink && (
              <a
                href={venue.directionsLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-blue-500 text-white px-5 py-3 font-medium hover:bg-blue-600 transition"
              >
                <Navigation size={18} />
                Get Directions
              </a>
            )}
            {venue.phone && (
              <a
                href={`tel:${venue.phone}`}
                className="inline-flex items-center gap-2 rounded-full border border-gray-700 px-5 py-3 text-gray-300 hover:border-gray-500 transition"
              >
                Call Venue <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-gray-800 bg-gray-900/70 p-4 overflow-hidden min-h-[420px]">
          {venue.mapsEmbed ? (
            <div
              className="w-full h-full min-h-[388px] [&_iframe]:w-full [&_iframe]:h-[388px] [&_iframe]:rounded-2xl"
              dangerouslySetInnerHTML={{ __html: venue.mapsEmbed }}
            />
          ) : (
            <div className="w-full h-full min-h-[388px] rounded-2xl border border-dashed border-gray-700 flex items-center justify-center text-center text-gray-500 px-6">
              Map embed has not been added yet. Admin can publish it from the CMS panel.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Venue;
