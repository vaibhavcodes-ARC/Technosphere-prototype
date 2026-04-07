import mongoose from 'mongoose';

const aboutUsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'About Technosphere',
    },
    content: {
      type: String, // Rich text content (HTML or markdown)
    },
    sections: [
      {
        heading: String,
        content: String,
        order: Number,
        isVisible: {
          type: Boolean,
          default: true,
        },
      },
    ],
    mission: String,
    vision: String,
    highlights: [String],
    tagline: String,
    image: {
      url: String,
      publicId: String, // For Cloudinary
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const AboutUs = mongoose.model('AboutUs', aboutUsSchema);
export default AboutUs;
