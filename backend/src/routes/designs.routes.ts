import express from 'express';
import { body } from 'express-validator';
import {
  createDesign,
  getAllDesigns,
  getDesignById,
  updateDesign,
  deleteDesign
} from '../controllers/designs.controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Validation rules
const designValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('image').notEmpty().withMessage('Image URL is required'),
  body('tools').trim().notEmpty().withMessage('Tools used is required')
];

// All routes require authentication
router.use(authenticate);

router.post('/', designValidation, createDesign);
router.get('/', getAllDesigns);
router.get('/:id', getDesignById);
router.put('/:id', designValidation, updateDesign);
router.delete('/:id', deleteDesign);

export default router;

