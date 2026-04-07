import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown, Loader } from 'lucide-react';
import api from '../utils/api.js';
import toast from 'react-hot-toast';

const fallbackFaqs = [
  {
    _id: 'faq-1',
    category: 'General',
    question: 'Who can participate in Technosphere 2026?',
    answer: 'Students from Netaji Subhas University and invited institutions can participate depending on the event rules.',
  },
  {
    _id: 'faq-2',
    category: 'Registration',
    question: 'How do I register for an event?',
    answer: 'Create a student account, open the events page, and complete the registration flow for your selected event.',
  },
  {
    _id: 'faq-3',
    category: 'Support',
    question: 'Where can I get help during the fest?',
    answer: 'Use the contact section for technical, event, faculty, and student coordinator help desks.',
  },
];

const FAQ = () => {
  const [loading, setLoading] = useState(true);
  const [faqs, setFaqs] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const { data } = await api.get('/cms/faqs');
        setFaqs(data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        toast.error('Failed to load FAQs. Showing fallback content.');
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const visibleFaqs = faqs.length > 0 ? faqs : fallbackFaqs;
  const categories = useMemo(
    () => [...new Set(visibleFaqs.map((item) => item.category || 'General'))],
    [visibleFaqs]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <section className="bg-gradient-to-br from-gray-900 via-black to-gray-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.4em] text-blue-400 mb-4">Support Hub</p>
          <h1 className="text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-400 max-w-3xl">
            Everything participants usually ask before registrations, submissions, and event day.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((category) => (
            <span
              key={category}
              className="px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-sm text-blue-300"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="space-y-4">
          {visibleFaqs.map((faq) => {
            const isOpen = openId === faq._id;

            return (
              <div
                key={faq._id}
                className="rounded-2xl border border-gray-800 bg-gray-900/70 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq._id)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">
                      {faq.category || 'General'}
                    </p>
                    <h2 className="text-lg font-semibold text-white">{faq.question}</h2>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-blue-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default FAQ;
