import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role?: string;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      throw new Error('Authentication token required');
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'fallback-secret'
    ) as { id: string; email: string; role?: string };

    req.user = decoded;
    next();
  } catch (error) {
    const err = error as Error;
    const appError = new Error('Invalid or expired token') as AppError;
    appError.statusCode = 401;
    next(appError);
  }
};

