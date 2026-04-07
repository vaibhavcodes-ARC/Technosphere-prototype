import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Save, Loader, Plus, Trash2, Edit2 } from 'lucide-react';
import api from '../../utils/api.js';
import toast from 'react-hot-toast';

const AdminSponsors = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sponsors, setSponsors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    logo: { url: '', publicId: '' },
    website: '',
    contact: { email: '', phone: '' },
    description: '',
    isVisible: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const [sponsorsRes, categoriesRes] = await Promise.all([
        api.get('/cms/sponsors', { headers: { Authorization: `Bearer ${token}` } }),
        api.get('/cms/sponsor-categories', { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setSponsors(sponsorsRes.data);
      setCategories(categoriesRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      toast.error('Failed to load data');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.category) {
      toast.error('Please fill required fields');
      return;
    }

    const token = localStorage.getItem('adminToken');
    try {
      if (editingId) {
        await api.put(`/cms/sponsors/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Sponsor updated');
      } else {
        await api.post('/cms/sponsors', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Sponsor added');
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({
        name: '',
        category: '',
        logo: { url: '', publicId: '' },
        website: '',
        contact: { email: '', phone: '' },
        description: '',
        isVisible: true,
      });
      fetchData();
    } catch (error) {
      toast.error('Error saving sponsor');
    }
  };

  const handleEdit = (sponsor) => {
    setFormData(sponsor);
    setEditingId(sponsor._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this sponsor?')) return;
    
    const token = localStorage.getItem('adminToken');
    try {
      await api.delete(`/cms/sponsors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Sponsor deleted');
      fetchData();
    } catch (error) {
      toast.error('Error deleting sponsor');
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
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition"
            >
              <ChevronLeft size={24} /> Back
            </button>
            <h1 className="text-3xl font-bold">Manage Sponsors</h1>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setFormData({
                name: '',
                category: '',
                logo: { url: '', publicId: '' },
                website: '',
                contact: { email: '', phone: '' },
                description: '',
                isVisible: true,
              });
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
          >
            <Plus size={20} /> Add Sponsor
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 mb-8 space-y-4">
            <h2 className="text-2xl font-bold">{editingId ? 'Edit' : 'Add'} Sponsor</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Sponsor Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Logo URL</label>
              <input
                type="url"
                value={formData.logo.url}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  logo: { ...prev.logo, url: e.target.value }
                }))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Contact Email</label>
                <input
                  type="email"
                  value={formData.contact.email}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contact: { ...prev.contact, email: e.target.value }
                  }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Contact Phone</label>
                <input
                  type="tel"
                  value={formData.contact.phone}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contact: { ...prev.contact, phone: e.target.value }
                  }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows="3"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="checkbox"
                  name="isVisible"
                  checked={formData.isVisible}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                Visible on website
              </label>
            </div>

            <div className="flex gap-4 pt-4 border-t border-gray-700">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
              >
                <Save size={20} /> Save
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Sponsors List */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          {sponsors.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              No sponsors added yet. Click "Add Sponsor" to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900 border-b border-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Visible</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {sponsors.map(sponsor => (
                    <tr key={sponsor._id} className="hover:bg-gray-700/50">
                      <td className="px-6 py-3">{sponsor.name}</td>
                      <td className="px-6 py-3">
                        {categories.find(c => c._id === sponsor.category)?.name || 'N/A'}
                      </td>
                      <td className="px-6 py-3">{sponsor.contact?.email || '-'}</td>
                      <td className="px-6 py-3">
                        {sponsor.isVisible ? '✓' : '✗'}
                      </td>
                      <td className="px-6 py-3 flex gap-2">
                        <button
                          onClick={() => handleEdit(sponsor)}
                          className="p-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded transition"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(sponsor._id)}
                          className="p-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSponsors;
