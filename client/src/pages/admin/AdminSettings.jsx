import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Loader, Save } from 'lucide-react';
import api from '../../utils/api.js';
import toast from 'react-hot-toast';

const defaultSettings = {
  tollFreeNumber: '1800-8899-022',
  website: {
    name: 'Technosphere 2026',
    description: '',
    keywords: '',
  },
  contact: {
    email: '',
    phone: '',
    address: '',
  },
  otp: {
    expiryMinutes: 10,
  },
  adminCodeLength: 10,
};

const AdminSettings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(defaultSettings);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get('/cms/settings');
        setFormData({
          ...defaultSettings,
          ...data,
          website: { ...defaultSettings.website, ...(data.website || {}) },
          contact: { ...defaultSettings.contact, ...(data.contact || {}) },
          otp: { ...defaultSettings.otp, ...(data.otp || {}) },
        });
      } catch (error) {
        console.error('Settings load failed:', error);
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/cms/settings', {
        ...formData,
        adminCodeLength: Number(formData.adminCodeLength) || 10,
        otp: {
          ...formData.otp,
          expiryMinutes: Number(formData.otp.expiryMinutes) || 10,
        },
      });
      toast.success('Settings updated successfully');
    } catch (error) {
      console.error('Settings save failed:', error);
      toast.error('Failed to save settings');
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
          <h1 className="text-3xl font-bold">Website Settings</h1>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Website Name</label>
            <input
              type="text"
              value={formData.website.name}
              onChange={(e) => handleNestedChange('website', 'name', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Website Description</label>
            <textarea
              rows="3"
              value={formData.website.description}
              onChange={(e) => handleNestedChange('website', 'description', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">SEO Keywords</label>
            <input
              type="text"
              value={formData.website.keywords}
              onChange={(e) => handleNestedChange('website', 'keywords', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Toll-Free Number</label>
              <input
                type="text"
                name="tollFreeNumber"
                value={formData.tollFreeNumber}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Admin Code Length</label>
              <input
                type="number"
                min="6"
                max="16"
                name="adminCodeLength"
                value={formData.adminCodeLength}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Support Email</label>
              <input
                type="email"
                value={formData.contact.email}
                onChange={(e) => handleNestedChange('contact', 'email', e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Support Phone</label>
              <input
                type="text"
                value={formData.contact.phone}
                onChange={(e) => handleNestedChange('contact', 'phone', e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
            <textarea
              rows="3"
              value={formData.contact.address}
              onChange={(e) => handleNestedChange('contact', 'address', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">OTP Expiry (Minutes)</label>
            <input
              type="number"
              min="1"
              max="60"
              value={formData.otp.expiryMinutes}
              onChange={(e) => handleNestedChange('otp', 'expiryMinutes', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            />
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

export default AdminSettings;
