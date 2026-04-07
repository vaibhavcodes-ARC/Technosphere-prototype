import mongoose from 'mongoose';

const venueSchema = new mongoose.Schema(
  {
    venueName: {
      type: String,
      default: 'Netaji Subhas University',
    },
    address: {
      type: String,
      default: 'Pokhari, Jamshedpur',
    },
    city: {
      type: String,
      default: 'Jamshedpur',
    },
    state: {
      type: String,
      default: 'Jharkhand',
    },
    country: {
      type: String,
      default: 'India',
    },
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
    mapsEmbed: {
      type: String, // iframe embed code
    },
    directionsLink: {
      type: String,
    },
    phone: String,
    email: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Venue = mongoose.model('Venue', venueSchema);
export default Venue;
