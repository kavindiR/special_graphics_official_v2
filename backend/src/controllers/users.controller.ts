import { Response, NextFunction } from 'express';
import User from '../models/User.model';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

// Get all users
export const getAllUsers = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: { users }
    });
  } catch (error) {
    next(error);
  }
};

// Get user by ID
export const getUserById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      const error = new Error('User not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

// Update user
export const updateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, bio, avatar, role } = req.body;
    const userId = parseInt(req.params.id);
    const currentUserId = parseInt(req.user?.id || '0');

    // Only allow users to update their own profile, or admins to update anyone
    if (userId !== currentUserId && req.user?.role !== 'admin') {
      const error = new Error('Not authorized') as AppError;
      error.statusCode = 403;
      throw error;
    }

    const user = await User.findByPk(userId);
    if (!user) {
      const error = new Error('User not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    // Prepare update data
    const updateData: any = {};
    if (name) updateData.name = name;
    if (bio !== undefined) updateData.bio = bio;
    if (avatar) updateData.avatar = avatar;
    if (role && req.user?.role === 'admin') {
      updateData.role = role;
    }

    await user.update(updateData);

    res.status(200).json({
      success: true,
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

// Delete user
export const deleteUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    const currentUserId = parseInt(req.user?.id || '0');

    // Only allow users to delete their own account, or admins to delete anyone
    if (userId !== currentUserId && req.user?.role !== 'admin') {
      const error = new Error('Not authorized') as AppError;
      error.statusCode = 403;
      throw error;
    }

    const user = await User.findByPk(userId);
    if (!user) {
      const error = new Error('User not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    await user.destroy();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
