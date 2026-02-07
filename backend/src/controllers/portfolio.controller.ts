import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { Op } from 'sequelize';
import Portfolio from '../models/Portfolio.model';
import User from '../models/User.model';
import { AppError } from '../middleware/errorHandler';

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role?: string;
  };
}

// Get all portfolios (public)
export const getPortfolios = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { category, search, designerId } = req.query;
    const where: any = {};

    if (category) where.category = category;
    if (designerId) where.designerId = designerId;
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const portfolios = await Portfolio.findAll({
      where,
      include: [
        {
          model: User,
          as: 'designer',
          attributes: ['id', 'name', 'avatar', 'designerLevel', 'rating']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: portfolios
    });
  } catch (error) {
    next(error);
  }
};

// Get single portfolio
export const getPortfolio = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const portfolio = await Portfolio.findByPk(id, {
      include: [
        {
          model: User,
          as: 'designer',
          attributes: ['id', 'name', 'avatar', 'bio', 'designerLevel', 'rating', 'skills', 'location', 'website']
        }
      ]
    });

    if (!portfolio) {
      const error = new Error('Portfolio item not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    // Increment views
    await portfolio.increment('views');
    await User.increment('portfolioViews', {
      where: { id: portfolio.designerId }
    });

    res.status(200).json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    next(error);
  }
};

// Create portfolio item (designer only)
export const createPortfolioItem = async (
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

    const { title, description, imageUrl, category, tags, isFeatured } = req.body;
    const designerId = parseInt(req.user!.id);

    const portfolio = await Portfolio.create({
      title,
      description,
      imageUrl,
      category,
      tags: tags || [],
      designerId,
      isFeatured: isFeatured || false
    });

    res.status(201).json({
      success: true,
      message: 'Portfolio item created successfully',
      data: portfolio
    });
  } catch (error) {
    next(error);
  }
};

// Update portfolio item
export const updatePortfolioItem = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const designerId = parseInt(req.user!.id);

    const portfolio = await Portfolio.findByPk(id);

    if (!portfolio) {
      const error = new Error('Portfolio item not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    if (portfolio.designerId !== designerId) {
      const error = new Error('Unauthorized') as AppError;
      error.statusCode = 403;
      throw error;
    }

    const { title, description, imageUrl, category, tags, isFeatured } = req.body;

    await portfolio.update({
      title: title || portfolio.title,
      description: description || portfolio.description,
      imageUrl: imageUrl || portfolio.imageUrl,
      category: category || portfolio.category,
      tags: tags || portfolio.tags,
      isFeatured: isFeatured !== undefined ? isFeatured : portfolio.isFeatured
    });

    res.status(200).json({
      success: true,
      message: 'Portfolio item updated successfully',
      data: portfolio
    });
  } catch (error) {
    next(error);
  }
};

// Delete portfolio item
export const deletePortfolioItem = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const designerId = parseInt(req.user!.id);

    const portfolio = await Portfolio.findByPk(id);

    if (!portfolio) {
      const error = new Error('Portfolio item not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    if (portfolio.designerId !== designerId) {
      const error = new Error('Unauthorized') as AppError;
      error.statusCode = 403;
      throw error;
    }

    await portfolio.destroy();

    res.status(200).json({
      success: true,
      message: 'Portfolio item deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Get designer's portfolio
export const getMyPortfolio = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const designerId = parseInt(req.user!.id);

    const portfolios = await Portfolio.findAll({
      where: { designerId },
      order: [['isFeatured', 'DESC'], ['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: portfolios
    });
  } catch (error) {
    next(error);
  }
};

