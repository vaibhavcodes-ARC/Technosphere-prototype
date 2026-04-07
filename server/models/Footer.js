import mongoose from 'mongoose';

const footerSchema = new mongoose.Schema(
  {
    copyright: {
      type: String,
      default: '© 2026 Technosphere, Netaji Subhas University',
    },
    quickLinks: [
      {
        label: String,
        url: String,
        order: Number,
      },
    ],
    socialLinks: [
      {
        platform: String,
        url: String,
        icon: String,
        order: Number,
      },
    ],
    sections: [
      {
        title: String,
        links: [
          {
            label: String,
            url: String,
          },
        ],
        order: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Footer = mongoose.model('Footer', footerSchema);
export default Footer;
