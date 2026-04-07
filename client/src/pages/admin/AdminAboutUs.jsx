import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Save, Loader, Plus, Trash2 } from 'lucide-react';
import api from '../../utils/api.js';
import toast from 'react-hot-toast';

const defaultAboutData = {
  title: 'About Technosphere',
  content: '',
  mission: '',
  vision: '',
  tagline: '',
  highlights: [],
  sections: [],
  image: { url: '', publicId: '' },
};

const AdminAboutUs = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(defaultAboutData);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await api.get('/cms/about', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({
        ...defaultAboutData,
        ...res.data,
        image: {
          ...defaultAboutData.image,
          ...(res.data?.image || {}),
        },
        highlights: Array.isArray(res.data?.highlights) ? res.data.highlights : [],
        sections: Array.isArray(res.data?.sections) ? res.data.sections : [],
      });
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      toast.error('Failed to load about section');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      await api.put('/cms/about', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('About Us updated successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-100">
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <ChevronLeft size={24} /> Back
          </button>
          <h1 className="text-3xl font-bold">Edit About Us</h1>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tagline</label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Main Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="6"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              placeholder="Enter main content about Technosphere..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Mission</label>
              <textarea
                name="mission"
                value={formData.mission}
                onChange={handleChange}
                rows="4"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Vision</label>
              <textarea
                name="vision"
                value={formData.vision}
                onChange={handleChange}
                rows="4"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Main Image URL</label>
            <input
              type="url"
              value={formData.image?.url || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                image: { ...prev.image, url: e.target.value }
              }))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              placeholder="https://example.com/image.jpg"
            />
            {formData.image?.url && (
              <img src={formData.image.url} alt="Preview" className="w-full h-40 object-cover rounded-lg mt-2" />
            )}
          </div>

          <div className="flex gap-4 pt-6 border-t border-gray-700">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-white font-bold transition disabled:opacity-50"
            >
              {saving ? <Loader className="animate-spin" size={20} /> : <Save size={20} />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAboutUs;
