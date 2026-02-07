import express from 'express';
import { body, param, query } from 'express-validator';
import {
  getDesignerProfile,
  updateDesignerProfile,
  getDesignerStats,
  getAllDesigners,
  getMyActiveContests,
  getMyProjects,
  getMyProfile
} from '../controllers/designer.controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', [
  query('level').optional().isIn(['entry', 'mid', 'top']),
  query('search').optional().isString(),
  query('minRating').optional().isNumeric()
], getAllDesigners);

router.get('/:id', [
  param('id').isInt()
], getDesignerProfile);

// Protected routes
router.get('/my/stats', authenticate, getDesignerStats);
router.get('/my/profile', authenticate, getMyProfile);

router.get('/my/contests', authenticate, [
  query('status').optional().isIn(['open', 'qualifying', 'final_round', 'completed', 'cancelled']),
  query('category').optional().isString()
], getMyActiveContests);

router.get('/my/projects', authenticate, [
  query('status').optional().isIn(['open', 'invited', 'in_progress', 'review', 'completed', 'cancelled'])
], getMyProjects);

router.put('/my/profile', authenticate, [
  body('name').optional().isString(),
  body('bio').optional().isString().isLength({ max: 500 }),
  body('avatar').optional().isURL(),
  body('skills').optional().isArray(),
  body('location').optional().isString(),
  body('website').optional().isURL(),
  body('designerLevel').optional().isIn(['entry', 'mid', 'top'])
], updateDesignerProfile);

export default router;

