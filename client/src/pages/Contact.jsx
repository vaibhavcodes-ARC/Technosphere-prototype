import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Loader } from 'lucide-react';
import api from '../utils/api.js';
import toast from 'react-hot-toast';

const Contact = () => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await api.get('/cms/contacts');
      setContacts(res.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (category) => {
    switch (category) {
      case 'Tech Enquiry':
        return <Mail className="text-blue-400" size={24} />;
      case 'Event Enquiry':
        return <Phone className="text-purple-400" size={24} />;
      case 'Faculty Incharge':
        return <MapPin className="text-pink-400" size={24} />;
      case 'Student Coordinator':
        return <Mail className="text-green-400" size={24} />;
      default:
        return <Phone className="text-blue-400" size={24} />;
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
      <div className="relative bg-gradient-to-br from-gray-900 to-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-transparent bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-400">Reach out to us for technical, event, and coordination support</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contacts.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-12">
              <p>Contact information will appear here once the admin publishes it.</p>
            </div>
          ) : (
            contacts.map((contact) => (
              <div
                key={contact._id}
                className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-blue-500/50 transition"
              >
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  {getIcon(contact.category)}
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{contact.category}</h3>
                {contact.role && <p className="text-sm text-blue-300 mb-3">{contact.role}</p>}

                {contact.name && (
                  <p className="text-gray-300 text-sm mb-1">
                    <strong>Name:</strong> {contact.name}
                  </p>
                )}

                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-blue-400 hover:text-blue-300 text-sm mb-1 block"
                  >
                    Email: {contact.email}
                  </a>
                )}

                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-blue-400 hover:text-blue-300 text-sm mb-1 block"
                  >
                    Phone: {contact.phone}
                  </a>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Need urgent help?</h2>
          <p className="text-blue-100 mb-6">Use the official support entries above for the fastest response.</p>
          <a
            href="/faq"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Open FAQ
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
