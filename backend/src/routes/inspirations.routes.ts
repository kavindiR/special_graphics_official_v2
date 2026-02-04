import express from 'express';
import {
  getAllInspirations,
  getInspirationById,
  searchInspirations,
  toggleLike
} from '../controllers/inspirations.controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getAllInspirations);
router.get('/search', searchInspirations);
router.get('/:id', getInspirationById);

// Protected routes (require authentication)
router.post('/:id/like', authenticate, toggleLike);

export default router;

