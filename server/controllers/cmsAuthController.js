import Admin from '../models/Admin.js';
import Settings from '../models/Settings.js';
import generateToken from '../utils/generateToken.js';
import { sendOTPEmail } from '../utils/sendEmail.js';
import crypto from 'crypto';

// Generate random alphanumeric code
const generateAdminCode = (length = 10) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// @route   POST /api/admin-auth/register
// @desc    Register new admin (with email verification)
// @access  Public
export const registerAdmin = async (req, res) => {
  try {
    const { email, name, phone, password } = req.body;

    // Validate email domain
    if (!email.endsWith('@nsuniv.ac.in')) {
      return res.status(400).json({ message: 'Only @nsuniv.ac.in emails are allowed' });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create admin without verification
    const admin = new Admin({
      email,
      name,
      phone,
      password,
      adminCode: undefined,
      otp: {
        code: otp,
        expiresAt: otpExpiresAt,
        verified: false,
      },
    });

    await admin.save();

    // Send OTP email, with console fallback in local development
    const delivery = await sendOTPEmail(email, otp, name);

    res.status(201).json({
      message:
        delivery.delivered
          ? 'Admin registration started. Check your email for OTP.'
          : 'Admin registration started. Email delivery is unavailable, OTP has been generated in server logs.',
      adminId: admin._id,
      delivery,
    });
  } catch (error) {
    console.error('Admin registration error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @route   POST /api/admin-auth/verify-otp
// @desc    Verify OTP and generate admin code
// @access  Public
export const verifyOTP = async (req, res) => {
  try {
    const { adminId, otp } = req.body;

    if (!adminId || !otp) {
      return res.status(400).json({ message: 'Admin ID and OTP required' });
    }

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Check OTP expiry
    if (!admin.otp || new Date() > admin.otp.expiresAt) {
      return res.status(400).json({ message: 'OTP expired. Please request a new one.' });
    }

    // Verify OTP
    if (admin.otp.code !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Generate unique admin code
    let adminCode;
    let codeExists = true;
    while (codeExists) {
      adminCode = generateAdminCode();
      codeExists = await Admin.findOne({ adminCode });
    }

    // Update admin
    admin.adminCode = adminCode;
    admin.otp.verified = true;
    admin.otp.code = null;
    await admin.save();

    res.json({
      message: 'Email verified successfully',
      adminCode,
      admin: {
        _id: admin._id,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @route   POST /api/admin-auth/resend-otp
// @desc    Resend OTP
// @access  Public
export const resendOTP = async (req, res) => {
  try {
    const { adminId } = req.body;

    if (!adminId) {
      return res.status(400).json({ message: 'Admin ID required' });
    }

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (admin.otp.verified) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    admin.otp = {
      code: otp,
      expiresAt: otpExpiresAt,
      verified: false,
    };

    await admin.save();

    const delivery = await sendOTPEmail(admin.email, otp, admin.name);

    res.json({
      message: delivery.delivered
        ? 'OTP resent to your email'
        : 'OTP regenerated. Email delivery is unavailable, check server logs for the OTP.',
      delivery,
    });
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @route   POST /api/admin-auth/login
// @desc    Login admin with admin code
// @access  Public
export const loginAdmin = async (req, res) => {
  try {
    const { adminCode } = req.body;

    if (!adminCode) {
      return res.status(400).json({ message: 'Admin code required' });
    }

    const admin = await Admin.findOne({ adminCode, isActive: true });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid admin code' });
    }

    if (!admin.otp || !admin.otp.verified) {
      return res.status(401).json({ message: 'Admin email not verified' });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate JWT token
    const token = generateToken(admin._id);

    res.json({
      message: 'Admin logged in successfully',
      token,
      admin: {
        _id: admin._id,
        email: admin.email,
        name: admin.name,
        role: 'admin',
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/admin-auth/me
// @desc    Get current admin profile
// @access  Private/Admin
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password -otp');
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   POST /api/admin-auth/logout
// @desc    Logout admin
// @access  Private/Admin
export const logoutAdmin = (req, res) => {
  res.json({ message: 'Admin logged out successfully' });
};
