import Event from '../models/Event.js';
import Registration from '../models/Registration.js';
import fs from 'fs';
import path from 'path';

// @desc    Fetch all events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single event
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      res.json(event);
    } else {
      res.status(404);
      throw new Error('Event not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create an event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = async (req, res, next) => {
  try {
    const { name, description, fee, rules, maxTeamSize } = req.body;
    
    const event = new Event({
      name: name || 'Sample Event',
      description: description || 'Sample description',
      fee: fee || 0,
      rules: rules || 'Sample rules',
      maxTeamSize: maxTeamSize || 1,
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    next(error);
  }
};

// @desc    Register for an event
// @route   POST /api/events/:id/register
// @access  Private
const registerForEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      res.status(404);
      throw new Error('Event not found');
    }

    if (!req.file) {
      res.status(400);
      throw new Error('Payment screenshot is required!');
    }

    // Check if already registered
    const alreadyRegistered = await Registration.findOne({
      userId: req.user._id,
      eventId: event._id,
    });

    if (alreadyRegistered) {
      res.status(400);
      throw new Error('Already registered for this event');
    }

    // Generate TS ID if user doesn't have one
    let tsId = req.user.technosphereId;
    if (!tsId) {
      // Loop until unique if necessary
      tsId = 'TS2026-' + Math.random().toString(36).substring(2, 6).toUpperCase();
      req.user.technosphereId = tsId;
      await req.user.save();
    }

    // Create registration (Pending payment verification)
    const registration = await Registration.create({
      userId: req.user._id,
      eventId: event._id,
      paymentProof: `/uploads/${req.file.filename}`,
      paymentStatus: 'Pending',
    });

    res.status(201).json({ registration, technosphereId: tsId });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's registrations
// @route   GET /api/events/my-registrations
// @access  Private
const getMyRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find({ userId: req.user._id }).populate('eventId', 'name description fee');
    res.json(registrations);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a registration
// @route   DELETE /api/events/registrations/:id
// @access  Private
const deleteRegistration = async (req, res, next) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      res.status(404);
      throw new Error('Registration not found');
    }

    if (registration.userId.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this registration');
    }

    if (registration.paymentStatus !== 'Pending') {
      res.status(400);
      throw new Error('Cannot delete a verified or rejected registration');
    }

    if (registration.paymentProof) {
      const filePath = path.join(path.resolve(), registration.paymentProof);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await registration.deleteOne();
    res.json({ message: 'Registration deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      event.name = req.body.name || event.name;
      event.description = req.body.description || event.description;
      event.fee = req.body.fee !== undefined ? req.body.fee : event.fee;
      event.rules = req.body.rules || event.rules;
      event.maxTeamSize = req.body.maxTeamSize || event.maxTeamSize;

      const updatedEvent = await event.save();
      res.json(updatedEvent);
    } else {
      res.status(404);
      throw new Error('Event not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      await event.deleteOne();
      // Optionally delete all related registrations
      await Registration.deleteMany({ eventId: event._id });
      res.json({ message: 'Event removed' });
    } else {
      res.status(404);
      throw new Error('Event not found');
    }
  } catch (error) {
    next(error);
  }
};

export { getEvents, getEventById, createEvent, registerForEvent, getMyRegistrations, deleteRegistration, updateEvent, deleteEvent };
