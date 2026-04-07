import mongoose from 'mongoose';

const sponsorCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ['Diamond', 'Platinum', 'Gold', 'Silver', 'Bronze'],
      required: true,
      unique: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
    description: String,
  },
  {
    timestamps: true,
  }
);

const SponsorCategory = mongoose.model('SponsorCategory', sponsorCategorySchema);
export default SponsorCategory;
