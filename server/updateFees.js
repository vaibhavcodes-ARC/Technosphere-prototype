import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from './models/Event.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const updateFees = async () => {
  try {
    const result = await Event.updateMany({}, { $set: { fee: 150 } });
    console.log(`Updated ${result.modifiedCount} events to have fee 150`);
    process.exit(0);
  } catch (error) {
    console.error(`Error updating fees: ${error}`);
    process.exit(1);
  }
};

updateFees();
