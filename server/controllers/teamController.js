import Team from '../models/Team.js';
import User from '../models/User.js';

// @desc    Create a team
// @route   POST /api/team/create
// @access  Private
const createTeam = async (req, res, next) => {
  try {
    const { name } = req.body;

    const teamExists = await Team.findOne({ name });
    if (teamExists) {
      res.status(400);
      throw new Error('Team name already exists');
    }

    // Generate random join code
    const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const team = await Team.create({
      name,
      joinCode,
      leader: req.user._id,
      members: [req.user._id],
    });

    // Update user's teamId
    await User.findByIdAndUpdate(req.user._id, { teamId: team._id });

    res.status(201).json(team);
  } catch (error) {
    next(error);
  }
};

// @desc    Join a team
// @route   POST /api/team/join
// @access  Private
const joinTeam = async (req, res, next) => {
  try {
    const { joinCode } = req.body;

    const team = await Team.findOne({ joinCode });

    if (!team) {
      res.status(404);
      throw new Error('Invalid join code');
    }

    if (team.members.includes(req.user._id)) {
      res.status(400);
      throw new Error('You are already in this team');
    }

    team.members.push(req.user._id);
    await team.save();

    // Update user's teamId
    await User.findByIdAndUpdate(req.user._id, { teamId: team._id });

    res.json(team);
  } catch (error) {
    next(error);
  }
};

export { createTeam, joinTeam };
