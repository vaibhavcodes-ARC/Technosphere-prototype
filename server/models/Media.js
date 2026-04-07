import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    originalName: String,
    url: {
      type: String,
      required: true,
    },
    publicId: String, // For Cloudinary
    type: {
      type: String,
      enum: ['image', 'video'],
      default: 'image',
    },
    size: Number,
    mimetype: String,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
    usedIn: [
      {
        section: String,
        field: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Media = mongoose.model('Media', mediaSchema);
export default Media;
