import express from 'express';
import { body, param, query } from 'express-validator';
import {
  getContests,
  getContest,
  createContest,
  submitToContest,
  getMySubmissions
} from '../controllers/contests.controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', [
  query('status').optional().isIn(['open', 'qualifying', 'final_round', 'completed', 'cancelled']),
  query('category').optional().isString(),
  query('minPrize').optional().isNumeric(),
  query('maxPrize').optional().isNumeric(),
  query('search').optional().isString()
], getContests);

router.get('/:id', [
  param('id').isInt()
], getContest);

// Protected routes
router.post('/', authenticate, [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('prize').isNumeric().withMessage('Prize must be a number'),
  body('deadline').isISO8601().withMessage('Deadline must be a valid date'),
  body('requirements').notEmpty().withMessage('Requirements are required')
], createContest);

router.post('/:id/submit', authenticate, [
  param('id').isInt(),
  body('imageUrl').notEmpty().isURL().withMessage('Valid image URL is required'),
  body('description').optional().isString()
], submitToContest);

router.get('/my/submissions', authenticate, getMySubmissions);

export default router;






