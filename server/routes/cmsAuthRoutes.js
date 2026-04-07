import express from 'express';
import {
  registerAdmin,
  verifyOTP,
  resendOTP,
  loginAdmin,
  getAdminProfile,
  logoutAdmin,
} from '../controllers/cmsAuthController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerAdmin);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/login', loginAdmin);

// Protected routes
router.get('/me', protectAdmin, getAdminProfile);
router.post('/logout', protectAdmin, logoutAdmin);

export default router;
