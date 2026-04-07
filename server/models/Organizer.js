import mongoose from 'mongoose';

const organizerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['Core Member', 'Faculty'],
      required: true,
    },
    image: {
      url: {
        type: String,
        required: true,
      },
      publicId: String,
    },
    bio: String,
    socialLinks: {
      linkedin: String,
      github: String,
      twitter: String,
      instagram: String,
    },
    order: {
      type: Number,
      default: 0,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Organizer = mongoose.model('Organizer', organizerSchema);
export default Organizer;
