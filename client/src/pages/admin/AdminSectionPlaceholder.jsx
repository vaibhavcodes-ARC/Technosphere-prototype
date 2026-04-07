import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const AdminSectionPlaceholder = ({ title, description }) => {
  const navigate = useNavigate();

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
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
          <p className="text-gray-300 text-lg mb-4">{description}</p>
          <p className="text-gray-500">
            This route now resolves correctly, so it will not show a blank screen while the full CMS editor is being completed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSectionPlaceholder;
