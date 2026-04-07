import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from './models/Event.js';

dotenv.config();

const events = [
  {
    name: 'Hackathon',
    description: 'A 24-hour coding marathon to solve real-world problems. Targeted for CSE branches.',
    fee: 150,
    rules: '1. Bring your own laptops.\n2. Original code only.\n3. Plagiarism leads to disqualification.',
    maxTeamSize: 4
  },
  {
    name: 'Debugging',
    description: 'Find and fix the bugs in complex C++ and Python codebases. Targeted for CSE branches.',
    fee: 150,
    rules: '1. Individual participation.\n2. Time limit of 60 minutes.',
    maxTeamSize: 1
  },
  {
    name: 'Pattern Solving',
    description: 'Test your logical thinking and algorithm creation skills. Targeted for CSE branches.',
    fee: 150,
    rules: '1. Individual participation.\n2. No internet access allowed during the contest.',
    maxTeamSize: 1
  },
  {
    name: 'IoT Projects',
    description: 'Showcase your innovative hardware and IoT solutions. Targeted for EE, EEE, and ECE branches.',
    fee: 150,
    rules: '1. Bring your own components.\n2. Working prototype is mandatory.',
    maxTeamSize: 3
  },
  {
    name: 'Extempore',
    description: 'Speak on the spot on a given topic for 2 minutes. Test your quick thinking and communication skills.',
    fee: 150,
    rules: '1. Topics will be given 1 minute prior.\n2. English or Hindi medium allowed.',
    maxTeamSize: 1
  },
  {
    name: 'Debate',
    description: 'Engage in a fierce war of words on technology and society.',
    fee: 150,
    rules: '1. Teams of 2.\n2. Respect the moderators.\n3. Constructive arguments only.',
    maxTeamSize: 2
  },
  {
    name: 'Open Mic',
    description: 'A platform to express your poetry, standup, or singing talents.',
    fee: 150,
    rules: '1. 5 minutes per performer.\n2. No offensive content.',
    maxTeamSize: 1
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Clear existing events
    await Event.deleteMany();
    
    // Insert new events
    await Event.insertMany(events);
    
    console.log('Events Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
