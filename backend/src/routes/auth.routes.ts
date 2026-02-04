import express from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  getCurrentUser,
  updateProfile,
  logout,
  refreshToken
} from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth';
import { loginRateLimiter } from '../middleware/rateLimiter';

const router = express.Router();

// Validation rules
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginRateLimiter, loginValidation, login);
router.post('/logout', authenticate, logout);
router.post('/refresh-token', authenticate, refreshToken);
router.get('/me', authenticate, getCurrentUser);
router.put('/profile', authenticate, updateProfile);

export default router;

