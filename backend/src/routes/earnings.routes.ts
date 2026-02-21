import express from 'express';
import { body, query } from 'express-validator';
import {
  getMyEarnings,
  requestWithdrawal,
  getEarningsStats
} from '../controllers/earnings.controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.get('/my', authenticate, [
  query('status').optional().isIn(['pending', 'processing', 'completed', 'failed']),
  query('type').optional().isIn(['contest_win', 'project_payment', 'bonus', 'refund'])
], getMyEarnings);

router.get('/my/stats', authenticate, getEarningsStats);

router.post('/withdraw', authenticate, [
  body('amount').isNumeric().withMessage('Amount must be a number').custom((value) => {
    if (value <= 0) {
      throw new Error('Amount must be positive');
    }
    return true;
  })
], requestWithdrawal);

export default router;








