import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import Design from '../models/Design.model';
import User from '../models/User.model';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

// Get all inspirations (designs)
export const getAllInspirations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;

    const { count, rows: designs } = await Design.findAndCountAll({
      include: [{
        model: User,
        as: 'designer',
        attributes: ['id', 'name', 'avatar']
      }],
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });

    res.status(200).json({
      success: true,
      data: {
        designs,
        pagination: {
          page,
          limit,
          total: count,
          pages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get inspiration by ID
export const getInspirationById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const designId = parseInt(req.params.id);
    
    const design = await Design.findByPk(designId, {
      include: [{
        model: User,
        as: 'designer',
        attributes: ['id', 'name', 'avatar', 'bio']
      }]
    });

    if (!design) {
      const error = new Error('Design not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: { design }
    });
  } catch (error) {
    next(error);
  }
};

// Search inspirations
export const searchInspirations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { q, tags, tools } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;

    const where: any = {};

    // Text search
    if (q) {
      const searchTerm = `%${q}%`;
      where[Op.or] = [
        { title: { [Op.iLike]: searchTerm } },
        { description: { [Op.iLike]: searchTerm } },
        { tags: { [Op.contains]: [(q as string).toLowerCase()] } }
      ];
    }

    // Tag filter
    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : [tags];
      where.tags = { [Op.overlap]: tagArray };
    }

    // Tools filter
    if (tools) {
      where.tools = { [Op.iLike]: `%${tools}%` };
    }

    const { count, rows: designs } = await Design.findAndCountAll({
      where,
      include: [{
        model: User,
        as: 'designer',
        attributes: ['id', 'name', 'avatar']
      }],
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });

    res.status(200).json({
      success: true,
      data: {
        designs,
        pagination: {
          page,
          limit,
          total: count,
          pages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Toggle like on inspiration
export const toggleLike = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const designId = parseInt(req.params.id);
    const userId = parseInt((req as AuthRequest).user?.id || '0');

    if (!userId) {
      const error = new Error('Authentication required') as AppError;
      error.statusCode = 401;
      throw error;
    }

    const design = await Design.findByPk(designId);
    if (!design) {
      const error = new Error('Design not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    const likedBy = design.likedBy || [];
    const likedIndex = likedBy.indexOf(userId);
    let isLiked = false;

    if (likedIndex > -1) {
      // Unlike
      likedBy.splice(likedIndex, 1);
      design.likes = Math.max(0, design.likes - 1);
    } else {
      // Like
      likedBy.push(userId);
      design.likes += 1;
      isLiked = true;
    }

    await design.update({ likedBy, likes: design.likes });

    res.status(200).json({
      success: true,
      data: {
        design,
        isLiked
      }
    });
  } catch (error) {
    next(error);
  }
};
