import mongoose from 'mongoose';

const prizeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['Cash Prize', 'Felicitation'],
      required: true,
    },
    description: String,
    value: String, // Can be amount or description
    icon: {
      url: String,
      publicId: String,
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

const Prize = mongoose.model('Prize', prizeSchema);
export default Prize;
