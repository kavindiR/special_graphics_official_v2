import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { Op } from 'sequelize';
import Message from '../models/Message.model';
import User from '../models/User.model';
import Contest from '../models/Contest.model';
import { AppError } from '../middleware/errorHandler';

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role?: string;
  };
}

// Get all messages for current user
export const getMyMessages = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = parseInt(req.user!.id);
    const { isRead } = req.query;

    const where: any = {
      [Op.or]: [
        { senderId: userId },
        { receiverId: userId }
      ]
    };

    if (isRead !== undefined) {
      where.isRead = isRead === 'true';
    }

    const messages = await Message.findAll({
      where,
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'name', 'email', 'avatar']
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['id', 'name', 'email', 'avatar']
        },
        {
          model: Contest,
          as: 'contest',
          attributes: ['id', 'title', 'category']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

// Get conversation between two users
export const getConversation = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = parseInt(req.user!.id);
    const { otherUserId, contestId } = req.query;

    if (!otherUserId) {
      const error = new Error('Other user ID is required') as AppError;
      error.statusCode = 400;
      throw error;
    }

    const where: any = {
      [Op.or]: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId }
      ]
    };

    if (contestId) {
      where.contestId = contestId;
    }

    const messages = await Message.findAll({
      where,
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'name', 'email', 'avatar']
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['id', 'name', 'email', 'avatar']
        },
        {
          model: Contest,
          as: 'contest',
          attributes: ['id', 'title', 'category']
        }
      ],
      order: [['createdAt', 'ASC']]
    });

    // Mark messages as read
    await Message.update(
      { isRead: true },
      {
        where: {
          receiverId: userId,
          senderId: parseInt(otherUserId as string),
          isRead: false
        }
      }
    );

    res.status(200).json({
      success: true,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

// Send message
export const sendMessage = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed') as AppError;
      error.statusCode = 400;
      throw error;
    }

    const { receiverId, contestId, subject, content } = req.body;
    const senderId = parseInt(req.user!.id);

    if (senderId === parseInt(receiverId)) {
      const error = new Error('Cannot send message to yourself') as AppError;
      error.statusCode = 400;
      throw error;
    }

    const message = await Message.create({
      senderId,
      receiverId: parseInt(receiverId),
      contestId: contestId ? parseInt(contestId) : undefined,
      subject,
      content
    });

    const messageWithDetails = await Message.findByPk(message.id, {
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'name', 'email', 'avatar']
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['id', 'name', 'email', 'avatar']
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: messageWithDetails
    });
  } catch (error) {
    next(error);
  }
};

// Mark message as read
export const markAsRead = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = parseInt(req.user!.id);

    const message = await Message.findByPk(id);

    if (!message) {
      const error = new Error('Message not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    if (message.receiverId !== userId) {
      const error = new Error('Unauthorized') as AppError;
      error.statusCode = 403;
      throw error;
    }

    await message.update({ isRead: true });

    res.status(200).json({
      success: true,
      message: 'Message marked as read'
    });
  } catch (error) {
    next(error);
  }
};

// Get unread message count
export const getUnreadCount = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = parseInt(req.user!.id);

    const count = await Message.count({
      where: {
        receiverId: userId,
        isRead: false
      }
    });

    res.status(200).json({
      success: true,
      data: { unreadCount: count }
    });
  } catch (error) {
    next(error);
  }
};

