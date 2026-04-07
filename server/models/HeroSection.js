import mongoose from 'mongoose';

const heroSectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'Technosphere 2026',
    },
    subtitle: {
      type: String,
      default: 'The Ultimate Tech Fest',
    },
    backgroundImage: {
      url: String,
      publicId: String,
    },
    backgroundVideo: {
      url: String,
      publicId: String,
    },
    logo: {
      url: String,
      publicId: String,
      link: String,
    },
    buttons: [
      {
        label: String,
        link: String,
        style: {
          type: String,
          enum: ['primary', 'secondary', 'outline'],
          default: 'primary',
        },
        order: Number,
      },
    ],
    overlayOpacity: {
      type: Number,
      default: 0.5,
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

const HeroSection = mongoose.model('HeroSection', heroSectionSchema);
export default HeroSection;
