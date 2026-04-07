import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import api from '../utils/api.js';
import toast from 'react-hot-toast';

const About = () => {
  const [loading, setLoading] = useState(true);
  const [aboutData, setAboutData] = useState({
    title: 'About Technosphere',
    tagline: 'Innovating the Future',
    content: 'Loading...',
    mission: '',
    vision: '',
    image: { url: '' }
  });

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const res = await api.get('/cms/about');
      setAboutData(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching about data:', error);
      setLoading(false);
      toast.error('Failed to load about section');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-gray-900 to-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-transparent bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text mb-4">
            {aboutData.title}
          </h1>
          <p className="text-xl text-gray-400">{aboutData.tagline}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          {/* Content */}
          <div>
            <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
              {aboutData.content}
            </p>
          </div>
          {/* Image */}
          {aboutData.image?.url && (
            <div>
              <img
                src={aboutData.image.url}
                alt="About Technosphere"
                className="rounded-lg shadow-2xl w-full h-96 object-cover"
              />
            </div>
          )}
        </div>

        {/* Mission and Vision */}
        {(aboutData.mission || aboutData.vision) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 border-t border-gray-800 pt-16">
            {aboutData.mission && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-blue-400 mb-4">Our Mission</h3>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {aboutData.mission}
                </p>
              </div>
            )}
            {aboutData.vision && (
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-purple-400 mb-4">Our Vision</h3>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {aboutData.vision}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
