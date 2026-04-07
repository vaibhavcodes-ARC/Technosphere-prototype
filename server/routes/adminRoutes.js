import express from 'express';
import { getUsers, getRegistrations, updateRegistrationStatus, getStats } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/stats').get(protect, admin, getStats);
router.route('/users').get(protect, admin, getUsers);
router.route('/registrations').get(protect, admin, getRegistrations);
router.route('/registrations/:id/verify').put(protect, admin, updateRegistrationStatus);

export default router;
