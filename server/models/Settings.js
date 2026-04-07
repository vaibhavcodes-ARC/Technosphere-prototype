import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    tollFreeNumber: {
      type: String,
      default: '1800-8899-022',
    },
    website: {
      name: {
        type: String,
        default: 'Technosphere 2026',
      },
      description: String,
      keywords: String,
    },
    contact: {
      email: String,
      phone: String,
      address: String,
    },
    otp: {
      expiryMinutes: {
        type: Number,
        default: 10,
      },
    },
    adminCodeLength: {
      type: Number,
      default: 10,
    },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;
