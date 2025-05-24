import express from 'express';
import { TaskController } from '../controllers/task.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateCreateTask, validateUpdateTask } from '../validators/task.validator.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Get all tasks
router.get('/', TaskController.getAllTasks);

// Get task by ID
router.get('/:id', TaskController.getTaskById);

// Create new task
router.post('/', validateCreateTask, TaskController.createTask);

// Update task
router.put('/:id', validateUpdateTask, TaskController.updateTask);

// Delete task
router.delete('/:id', TaskController.deleteTask);

export default router;