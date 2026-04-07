import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const makeAdmin = async () => {
  try {
    const result = await User.updateMany({}, { $set: { isAdmin: true } });
    console.log(`Promoted ${result.modifiedCount} users to Admin.`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
makeAdmin();
