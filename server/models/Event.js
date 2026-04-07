import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
      default: 0,
    },
    rules: {
      type: String, // Can be markdown or extensive string
      required: true,
    },
    maxTeamSize: {
      type: Number,
      required: true,
      default: 1, // 1 for solo events
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);

export default Event;
