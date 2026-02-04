import { Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.model';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

// Generate JWT Token
const generateToken = (id: number | string, email: string, role: string): string => {
  return jwt.sign(
    { id: id.toString(), email, role },
    process.env.JWT_SECRET || 'fallback-secret',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// Register new user
export const register = async (
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

    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email: email.toLowerCase() } });
    if (existingUser) {
      const error = new Error('User already exists') as AppError;
      error.statusCode = 400;
      throw error;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: (role || 'user') as 'user' | 'designer' | 'admin'
    });

    // Generate token
    const token = generateToken(user.id, user.email, user.role);

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// Login user
export const login = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => err.msg).join(', ');
      const error = new Error(`Validation failed: ${errorMessages}`) as AppError;
      error.statusCode = 400;
      throw error;
    }

    const { email, password } = req.body;

    // Find user with password field (using scope to include password)
    const user = await User.scope('withPassword').findOne({ 
      where: { email: email.toLowerCase() }
    });
    if (!user) {
      const error = new Error('Invalid email or password') as AppError;
      error.statusCode = 401;
      throw error;
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error('Invalid email or password') as AppError;
      error.statusCode = 401;
      throw error;
    }

    // Generate token
    const token = generateToken(user.id, user.email, user.role);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          bio: user.bio,
          isVerified: user.isVerified
        },
        token,
        expiresIn: process.env.JWT_EXPIRE || '7d'
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get current user
export const getCurrentUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = parseInt(req.user?.id || '0');
    if (!userId) {
      const error = new Error('User ID is required') as AppError;
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findByPk(userId);
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

// Update profile
export const updateProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, bio, avatar } = req.body;
    const userId = parseInt(req.user?.id || '0');

    if (!userId) {
      const error = new Error('User ID is required') as AppError;
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findByPk(userId);
    if (!user) {
      const error = new Error('User not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    // Update user
    await user.update({ name, bio, avatar });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

// Logout user (client-side token removal, but provides confirmation)
export const logout = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Since JWT is stateless, logout is handled client-side by removing the token
    // This endpoint provides confirmation and can be used for logging purposes
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Refresh token
export const refreshToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = parseInt(req.user?.id || '0');
    if (!userId) {
      const error = new Error('User not authenticated') as AppError;
      error.statusCode = 401;
      throw error;
    }

    const user = await User.findByPk(userId);
    if (!user) {
      const error = new Error('User not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    // Generate new token
    const token = generateToken(user.id, user.email, user.role);

    res.status(200).json({
      success: true,
      data: {
        token,
        expiresIn: process.env.JWT_EXPIRE || '7d'
      }
    });
  } catch (error) {
    next(error);
  }
};

