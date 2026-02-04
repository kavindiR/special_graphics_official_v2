import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory store for rate limiting
// In production, consider using Redis for distributed systems
const rateLimitStore: RateLimitStore = {};

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(rateLimitStore).forEach((key) => {
    if (rateLimitStore[key].resetTime < now) {
      delete rateLimitStore[key];
    }
  });
}, 5 * 60 * 1000);

/**
 * Rate limiting middleware
 * @param maxRequests - Maximum number of requests allowed
 * @param windowMs - Time window in milliseconds
 * @returns Middleware function
 */
export const rateLimiter = (
  maxRequests: number = 5,
  windowMs: number = 15 * 60 * 1000 // 15 minutes default
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Get client identifier (IP address or user ID)
    const identifier = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    // Get or create rate limit entry
    const entry = rateLimitStore[identifier];

    if (!entry || entry.resetTime < now) {
      // Create new entry or reset expired entry
      rateLimitStore[identifier] = {
        count: 1,
        resetTime: now + windowMs
      };
      return next();
    }

    // Increment count
    entry.count++;

    // Check if limit exceeded
    if (entry.count > maxRequests) {
      const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
      
      res.setHeader('Retry-After', retryAfter.toString());
      res.setHeader('X-RateLimit-Limit', maxRequests.toString());
      res.setHeader('X-RateLimit-Remaining', '0');
      res.setHeader('X-RateLimit-Reset', new Date(entry.resetTime).toISOString());

      const error = new Error(
        `Too many requests. Please try again after ${Math.ceil(retryAfter / 60)} minutes.`
      ) as AppError;
      error.statusCode = 429;
      return next(error);
    }

    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', maxRequests.toString());
    res.setHeader('X-RateLimit-Remaining', (maxRequests - entry.count).toString());
    res.setHeader('X-RateLimit-Reset', new Date(entry.resetTime).toISOString());

    next();
  };
};

/**
 * Specific rate limiter for login attempts
 * Allows 5 attempts per 15 minutes
 */
export const loginRateLimiter = rateLimiter(5, 15 * 60 * 1000);

