import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateLogin, validateRegister } from '../validators/auth.validator.js';

const router = express.Router();

// Register new user
router.post('/register', validateRegister, AuthController.register);

// Login user
router.post('/login', validateLogin, AuthController.login);

// Get current user (protected route)
router.get('/me', authMiddleware, AuthController.getCurrentUser);

export default router;