import User from '../models/User.js';
import Registration from '../models/Registration.js';
import Event from '../models/Event.js';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all registrations
// @route   GET /api/admin/registrations
// @access  Private/Admin
const getRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find({})
      .populate('userId', 'name email phone')
      .populate('eventId', 'name description fee');
    res.json(registrations);
  } catch (error) {
    next(error);
  }
};

// @desc    Update registration payment status
// @route   PUT /api/admin/registrations/:id/verify
// @access  Private/Admin
const updateRegistrationStatus = async (req, res, next) => {
  try {
    const { status } = req.body; // 'Verified' or 'Rejected'
    
    const updatedRegistration = await Registration.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: status },
      { new: true }
    );

    if (updatedRegistration) {
      res.json(updatedRegistration);
    } else {
      res.status(404);
      throw new Error('Registration not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRegistrations = await Registration.countDocuments();
    const verifiedRegistrations = await Registration.countDocuments({ paymentStatus: 'Verified' });
    const pendingRegistrations = await Registration.countDocuments({ paymentStatus: 'Pending' });

    const verifiedRegsList = await Registration.find({ paymentStatus: 'Verified' }).populate('eventId', 'fee');
    const totalRevenue = verifiedRegsList.reduce((acc, reg) => acc + (reg.eventId?.fee || 0), 0);

    const recentRegistrations = await Registration.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('userId', 'name email technosphereId')
      .populate('eventId', 'name fee');

    const events = await Event.find({});
    const chartData = await Promise.all(
      events.map(async (event) => {
        const count = await Registration.countDocuments({ eventId: event._id });
        return { name: event.name, registrations: count };
      })
    );

    res.json({
      totalUsers,
      totalRegistrations,
      verifiedRegistrations,
      pendingRegistrations,
      totalRevenue,
      recentRegistrations,
      chartData,
    });
  } catch (error) {
    next(error);
  }
};

export { getUsers, getRegistrations, updateRegistrationStatus, getStats };
