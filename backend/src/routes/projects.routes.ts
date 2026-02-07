import express from 'express';
import { body, param, query } from 'express-validator';
import {
  getOpenProjects,
  getMyProjects,
  getProject,
  createProject,
  acceptProject,
  updateProjectStatus
} from '../controllers/projects.controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/open', [
  query('category').optional().isString(),
  query('minBudget').optional().isNumeric(),
  query('maxBudget').optional().isNumeric(),
  query('search').optional().isString()
], getOpenProjects);

router.get('/:id', [
  param('id').isInt()
], getProject);

// Protected routes
router.get('/my/projects', authenticate, [
  query('status').optional().isIn(['open', 'invited', 'in_progress', 'review', 'completed', 'cancelled'])
], getMyProjects);

router.post('/', authenticate, [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('budget').isNumeric().withMessage('Budget must be a number'),
  body('requirements').notEmpty().withMessage('Requirements are required'),
  body('deadline').optional().isISO8601().withMessage('Deadline must be a valid date'),
  body('designerId').optional().isInt().withMessage('Designer ID must be a number'),
  body('relatedContestId').optional().isInt().withMessage('Contest ID must be a number')
], createProject);

router.post('/:id/accept', authenticate, [
  param('id').isInt()
], acceptProject);

router.put('/:id/status', authenticate, [
  param('id').isInt(),
  body('status').isIn(['open', 'invited', 'in_progress', 'review', 'completed', 'cancelled']).withMessage('Invalid status')
], updateProjectStatus);

export default router;

