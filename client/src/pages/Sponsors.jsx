import React, { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Loader } from 'lucide-react';
import api from '../utils/api.js';
import toast from 'react-hot-toast';

const fallbackCategories = [
  { _id: 'diamond', name: 'Diamond' },
  { _id: 'platinum', name: 'Platinum' },
  { _id: 'gold', name: 'Gold' },
  { _id: 'silver', name: 'Silver' },
  { _id: 'bronze', name: 'Bronze' },
];

const Sponsors = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const [categoriesRes, sponsorsRes] = await Promise.all([
          api.get('/cms/sponsor-categories'),
          api.get('/cms/sponsors'),
        ]);
        setCategories(categoriesRes.data);
        setSponsors(sponsorsRes.data.filter((item) => item.isVisible !== false));
      } catch (error) {
        console.error('Error fetching sponsors:', error);
        toast.error('Failed to load sponsors.');
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  const visibleCategories = categories.length > 0 ? categories : fallbackCategories;
  const groupedSponsors = useMemo(() => {
    return visibleCategories.map((category) => {
      const matchedSponsors = sponsors.filter((sponsor) => {
        const sponsorCategory =
          typeof sponsor.category === 'string' ? sponsor.category : sponsor.category?.name;

        return sponsorCategory === category.name || sponsor.category?._id === category._id;
      });

      return {
        ...category,
        sponsors: matchedSponsors,
      };
    });
  }, [categories, sponsors, visibleCategories]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <section className="bg-gradient-to-br from-white/5 via-black to-gray-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.4em] text-blue-400 mb-4">Partner Network</p>
          <h1 className="text-5xl font-bold text-white mb-4">Sponsors</h1>
          <p className="text-lg text-gray-400 max-w-3xl">
            The organizations powering innovation, visibility, and opportunities at Technosphere 2026.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {groupedSponsors.map((category) => (
          <div key={category._id || category.name}>
            <div className="flex items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-white">{category.name}</h2>
              <span className="text-sm text-gray-500">
                {category.sponsors.length} sponsor{category.sponsors.length === 1 ? '' : 's'}
              </span>
            </div>

            {category.sponsors.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-800 bg-gray-900/40 p-6 text-gray-500">
                No sponsors published yet in this category.
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {category.sponsors.map((sponsor) => (
                  <div
                    key={sponsor._id}
                    className="rounded-2xl border border-gray-800 bg-gray-900/70 p-6"
                  >
                    {sponsor.logo?.url ? (
                      <img
                        src={sponsor.logo.url}
                        alt={sponsor.name}
                        className="h-16 w-full object-contain object-left mb-5"
                      />
                    ) : (
                      <div className="h-16 flex items-center text-xl font-semibold text-white mb-5">
                        {sponsor.name}
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-white mb-2">{sponsor.name}</h3>
                    <p className="text-gray-400 leading-relaxed mb-5">
                      {sponsor.description || 'Sponsor details will be updated by the admin team.'}
                    </p>
                    {sponsor.website && (
                      <a
                        href={sponsor.website}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
                      >
                        Visit website <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Sponsors;
