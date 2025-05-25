import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { createTables } from './db/init.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // allow frontend origin
  credentials: true,               // allow cookies if needed
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'TaskHub API is running' });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, '0.0.0.0', async () => {
  console.log(`Server running on port ${PORT}`);
  
  try {
    // Initialize database tables
    await createTables();
    console.log('Database tables initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
});