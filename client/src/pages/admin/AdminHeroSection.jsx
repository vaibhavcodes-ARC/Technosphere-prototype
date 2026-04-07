import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Save, Loader } from 'lucide-react';
import api from '../../utils/api.js';
import toast from 'react-hot-toast';

const defaultHeroData = {
  title: 'Technosphere 2026',
  subtitle: 'The Ultimate Tech Fest',
  backgroundImage: { url: '', publicId: '' },
  logo: { url: '', publicId: '', link: '' },
  buttons: [],
  overlayOpacity: 0.5,
};

const AdminHeroSection = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(defaultHeroData);

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await api.get('/cms/hero', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({
        ...defaultHeroData,
        ...res.data,
        backgroundImage: {
          ...defaultHeroData.backgroundImage,
          ...(res.data?.backgroundImage || {}),
        },
        logo: {
          ...defaultHeroData.logo,
          ...(res.data?.logo || {}),
        },
        buttons: Array.isArray(res.data?.buttons) ? res.data.buttons : [],
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching hero data:', error);
      setLoading(false);
      toast.error('Failed to load hero section');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'overlayOpacity' ? parseFloat(value) : value,
    }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleButtonChange = (idx, field, value) => {
    setFormData(prev => ({
      ...prev,
      buttons: prev.buttons.map((btn, i) =>
        i === idx ? { ...btn, [field]: value } : btn
      ),
    }));
  };

  const addButton = () => {
    setFormData(prev => ({
      ...prev,
      buttons: [...prev.buttons, { label: 'New Button', link: '#', style: 'primary', order: prev.buttons.length }],
    }));
  };

  const removeButton = (idx) => {
    setFormData(prev => ({
      ...prev,
      buttons: prev.buttons.filter((_, i) => i !== idx),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      await api.put('/cms/hero', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Hero section updated successfully');
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to update hero section');
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
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <ChevronLeft size={24} /> Back
          </button>
          <h1 className="text-3xl font-bold">Edit Hero Section</h1>
        </div>

        {/* Form */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 space-y-6">
          {/* Title */}
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

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Background Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Background Image URL</label>
            <input
              type="url"
              value={formData.backgroundImage.url}
              onChange={(e) => handleNestedChange('backgroundImage', 'url', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              placeholder="https://example.com/image.jpg"
            />
            {formData.backgroundImage?.url && (
              <div className="mt-2">
                <img
                  src={formData.backgroundImage.url}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Overlay Opacity */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Overlay Opacity: {formData.overlayOpacity.toFixed(1)}
            </label>
            <input
              type="range"
              name="overlayOpacity"
              min="0"
              max="1"
              step="0.1"
              value={formData.overlayOpacity}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Logo */}
          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-lg font-bold text-white mb-4">Logo Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Logo Image URL</label>
                <input
                  type="url"
              value={formData.logo?.url || ''}
                  onChange={(e) => handleNestedChange('logo', 'url', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="https://example.com/logo.png"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Logo Link</label>
                <input
                  type="url"
              value={formData.logo?.link || ''}
                  onChange={(e) => handleNestedChange('logo', 'link', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="border-t border-gray-700 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Buttons</h3>
              <button
                onClick={addButton}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition"
              >
                Add Button
              </button>
            </div>

            {formData.buttons.length === 0 ? (
              <p className="text-gray-500">No buttons added yet</p>
            ) : (
              <div className="space-y-4">
                {formData.buttons.map((button, idx) => (
                  <div key={idx} className="border border-gray-600 rounded-lg p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Label</label>
                        <input
                          type="text"
                          value={button.label}
                          onChange={(e) => handleButtonChange(idx, 'label', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Style</label>
                        <select
                          value={button.style}
                          onChange={(e) => handleButtonChange(idx, 'style', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                        >
                          <option value="primary">Primary</option>
                          <option value="secondary">Secondary</option>
                          <option value="outline">Outline</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Link</label>
                      <input
                        type="url"
                        value={button.link}
                        onChange={(e) => handleButtonChange(idx, 'link', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <button
                      onClick={() => removeButton(idx)}
                      className="w-full px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition"
                    >
                      Remove Button
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Save Button */}
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

export default AdminHeroSection;
