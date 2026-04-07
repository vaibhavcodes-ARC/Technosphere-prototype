import express from 'express';
import {
  getEvents,
  getEventById,
  createEvent,
  registerForEvent,
  getMyRegistrations,
  deleteRegistration,
  updateEvent,
  deleteEvent
} from '../controllers/eventController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/').get(getEvents).post(protect, admin, createEvent);
router.route('/my-registrations').get(protect, getMyRegistrations);
router.route('/registrations/:id').delete(protect, deleteRegistration);
router.route('/:id')
  .get(getEventById)
  .put(protect, admin, updateEvent)
  .delete(protect, admin, deleteEvent);
router.route('/:id/register').post(protect, upload.single('paymentProof'), registerForEvent);

export default router;
