import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import path from 'path';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import cmsAuthRoutes from './routes/cmsAuthRoutes.js';
import cmsContentRoutes from './routes/cmsContentRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Student Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/admin', adminRoutes);

// CMS Admin Routes
app.use('/api/cms-auth', cmsAuthRoutes);
app.use('/api/cms', cmsContentRoutes);

app.get('/', (req, res) => {
  res.send('Technosphere 2026 API is running...');
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
