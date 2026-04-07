import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /@nsuniv\.ac\.in$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    adminCode: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
      minlength: 10,
      maxlength: 10,
      default: undefined,
      set: (value) => (value == null ? undefined : value),
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    otp: {
      code: String,
      expiresAt: Date,
      verified: {
        type: Boolean,
        default: false,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: Date,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
adminSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// Method to compare password
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
