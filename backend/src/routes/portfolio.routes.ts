import express from 'express';
import { body, param, query } from 'express-validator';
import {
  getPortfolios,
  getPortfolio,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
  getMyPortfolio
} from '../controllers/portfolio.controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', [
  query('category').optional().isString(),
  query('search').optional().isString(),
  query('designerId').optional().isInt()
], getPortfolios);

router.get('/:id', [
  param('id').isInt()
], getPortfolio);

// Protected routes (designer only)
router.get('/my/portfolio', authenticate, getMyPortfolio);

router.post('/', authenticate, [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('imageUrl').notEmpty().isURL().withMessage('Valid image URL is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('tags').optional().isArray(),
  body('isFeatured').optional().isBoolean()
], createPortfolioItem);

router.put('/:id', authenticate, [
  param('id').isInt(),
  body('title').optional().isString(),
  body('description').optional().isString(),
  body('imageUrl').optional().isURL(),
  body('category').optional().isString(),
  body('tags').optional().isArray(),
  body('isFeatured').optional().isBoolean()
], updatePortfolioItem);

router.delete('/:id', authenticate, [
  param('id').isInt()
], deletePortfolioItem);

export default router;








