import React, { useEffect, useMemo, useState } from 'react';
import { Loader, Trophy } from 'lucide-react';
import api from '../utils/api.js';
import toast from 'react-hot-toast';

const fallbackPrizes = [
  {
    _id: 'prize-1',
    title: 'Champion Award',
    category: 'Cash Prize',
    value: 'Up to Rs. 25,000',
    description: 'Top-performing teams across flagship competitions receive the highest cash awards.',
  },
  {
    _id: 'prize-2',
    title: 'Runner-Up Honors',
    category: 'Cash Prize',
    value: 'Category-wise rewards',
    description: 'Strong finalists receive curated cash awards based on event format and participation.',
  },
  {
    _id: 'prize-3',
    title: 'Special Recognition',
    category: 'Felicitation',
    value: 'Certificates and recognition',
    description: 'Outstanding innovation, presentation, and teamwork will be felicitated on stage.',
  },
];

const Prizes = () => {
  const [loading, setLoading] = useState(true);
  const [prizes, setPrizes] = useState([]);

  useEffect(() => {
    const fetchPrizes = async () => {
      try {
        const { data } = await api.get('/cms/prizes');
        setPrizes(data);
      } catch (error) {
        console.error('Error fetching prizes:', error);
        toast.error('Failed to load prizes. Showing fallback content.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrizes();
  }, []);

  const visiblePrizes = prizes.length > 0 ? prizes : fallbackPrizes;
  const groupedPrizes = useMemo(() => {
    return visiblePrizes.reduce((acc, prize) => {
      const key = prize.category || 'Highlights';
      acc[key] = acc[key] || [];
      acc[key].push(prize);
      return acc;
    }, {});
  }, [visiblePrizes]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <section className="bg-gradient-to-br from-yellow-500/10 via-gray-950 to-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.4em] text-yellow-400 mb-4">Winner Zone</p>
          <h1 className="text-5xl font-bold text-white mb-4">Prizes & Recognition</h1>
          <p className="text-lg text-gray-400 max-w-3xl">
            Compete for cash awards, recognition, and the spotlight at Technosphere 2026.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        {Object.entries(groupedPrizes).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-2xl font-bold text-white mb-6">{category}</h2>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {items.map((prize) => (
                <div
                  key={prize._id}
                  className="rounded-2xl border border-yellow-500/20 bg-gray-900/80 p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/15 text-yellow-400 flex items-center justify-center mb-5">
                    <Trophy size={22} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{prize.title}</h3>
                  {prize.value && (
                    <p className="text-yellow-300 font-medium mb-3">{prize.value}</p>
                  )}
                  <p className="text-gray-400 leading-relaxed">
                    {prize.description || 'Prize details will be published by the admin team.'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Prizes;
