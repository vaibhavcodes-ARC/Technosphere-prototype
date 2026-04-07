import mongoose from 'mongoose';

const sponsorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SponsorCategory',
      required: true,
    },
    logo: {
      url: {
        type: String,
        required: true,
      },
      publicId: String, // For Cloudinary
    },
    website: String,
    contact: {
      email: String,
      phone: String,
    },
    description: String,
    order: {
      type: Number,
      default: 0,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
    packageType: String,
  },
  {
    timestamps: true,
  }
);

const Sponsor = mongoose.model('Sponsor', sponsorSchema);
export default Sponsor;
