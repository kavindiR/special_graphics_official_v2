import express from 'express';
import { body, param, query } from 'express-validator';
import {
  getMyMessages,
  getConversation,
  sendMessage,
  markAsRead,
  getUnreadCount
} from '../controllers/messages.controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.get('/', authenticate, [
  query('isRead').optional().isBoolean(),
  query('type').optional().isString()
], getMyMessages);

router.get('/conversation', authenticate, [
  query('otherUserId').isInt().withMessage('Other user ID is required'),
  query('contestId').optional().isInt()
], getConversation);

router.post('/', authenticate, [
  body('receiverId').isInt().withMessage('Receiver ID is required'),
  body('content').notEmpty().withMessage('Message content is required'),
  body('subject').optional().isString(),
  body('contestId').optional().isInt()
], sendMessage);

router.put('/:id/read', authenticate, [
  param('id').isInt()
], markAsRead);

router.get('/unread/count', authenticate, getUnreadCount);

export default router;










