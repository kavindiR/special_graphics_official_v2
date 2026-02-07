import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { Op } from 'sequelize';
import User from '../models/User.model';
import Portfolio from '../models/Portfolio.model';
import ContestSubmission from '../models/ContestSubmission.model';
import Earnings from '../models/Earnings.model';
import Contest from '../models/Contest.model';
import Project from '../models/Project.model';
import { AppError } from '../middleware/errorHandler';

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role?: string;
  };
}

// Get designer profile
export const getDesignerProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const designer = await User.findByPk(id, {
      attributes: {
        exclude: ['password', 'email']
      }
    });

    if (!designer || designer.role !== 'designer') {
      const error = new Error('Designer not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    // Get portfolio items
    const portfolioItems = await Portfolio.findAll({
      where: { designerId: id },
      order: [['createdAt', 'DESC']],
      limit: 12
    });

    // Get portfolio count
    const portfolioCount = await Portfolio.count({
      where: { designerId: id }
    });

    // Get wins count
    const winsCount = await ContestSubmission.count({
      where: { designerId: id, isWinner: true }
    });

    // Get total submissions
    const totalSubmissions = await ContestSubmission.count({
      where: { designerId: id }
    });

    // Get recent wins with earnings
    const recentWins = await ContestSubmission.findAll({
      where: { designerId: id, isWinner: true },
      include: [
        {
          model: Contest,
          as: 'contest',
          attributes: ['id', 'title', 'category', 'prize']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: 5
    });

    // Get recent earnings for wins
    const recentEarnings = await Earnings.findAll({
      where: { designerId: id, type: 'contest_win', status: 'completed' },
      include: [
        {
          model: Contest,
          as: 'contest',
          attributes: ['id', 'title', 'category']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: 5
    });

    res.status(200).json({
      success: true,
      data: {
        ...designer.toJSON(),
        portfolioItems,
        portfolioCount,
        winsCount,
        totalSubmissions,
        recentWins,
        recentEarnings
      }
    });
  } catch (error) {
    next(error);
  }
};

// Update designer profile
export const updateDesignerProfile = async (
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

    const designerId = parseInt(req.user!.id);
    const designer = await User.findByPk(designerId);

    if (!designer || designer.role !== 'designer') {
      const error = new Error('Designer not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    const {
      name,
      bio,
      avatar,
      skills,
      location,
      website,
      designerLevel
    } = req.body;

    await designer.update({
      name: name || designer.name,
      bio: bio !== undefined ? bio : designer.bio,
      avatar: avatar !== undefined ? avatar : designer.avatar,
      skills: Array.isArray(skills) ? skills : (skills ? skills.split(',').map((s: string) => s.trim()) : designer.skills),
      location: location !== undefined ? location : designer.location,
      website: website !== undefined ? website : designer.website,
      designerLevel: designerLevel || designer.designerLevel
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: designer
    });
  } catch (error) {
    next(error);
  }
};

// Get my profile (for settings page)
export const getMyProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const designerId = parseInt(req.user!.id);
    const designer = await User.findByPk(designerId, {
      attributes: {
        exclude: ['password']
      }
    });

    if (!designer || designer.role !== 'designer') {
      const error = new Error('Designer not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: designer
    });
  } catch (error) {
    next(error);
  }
};

// Get designer dashboard stats
export const getDesignerStats = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const designerId = parseInt(req.user!.id);

    const [
      contestsWon,
      totalEarnings,
      activeContests,
      portfolioItems,
      totalSubmissions,
      rating
    ] = await Promise.all([
      ContestSubmission.count({
        where: { designerId, isWinner: true }
      }),
      Earnings.sum('amount', {
        where: { designerId, status: 'completed' }
      }),
      Contest.count({
        include: [
          {
            model: ContestSubmission,
            as: 'submissions',
            where: {
              designerId
            },
            required: true
          }
        ],
        where: {
          status: {
            [Op.in]: ['open', 'qualifying', 'final_round']
          }
        }
      }),
      Portfolio.count({
        where: { designerId }
      }),
      ContestSubmission.count({
        where: { designerId }
      }),
      User.findByPk(designerId, {
        attributes: ['rating']
      })
    ]);

    res.status(200).json({
      success: true,
      data: {
        contestsWon: contestsWon || 0,
        totalEarnings: totalEarnings || 0,
        activeContests: activeContests || 0,
        portfolioItems: portfolioItems || 0,
        totalSubmissions: totalSubmissions || 0,
        rating: rating?.rating || 0
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get all designers (public)
export const getAllDesigners = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { level, search, minRating } = req.query;
    const where: any = {
      role: 'designer'
    };

    if (level) where.designerLevel = level;
    if (minRating) where.rating = { [Op.gte]: minRating };
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { bio: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const designers = await User.findAll({
      where,
      attributes: {
        exclude: ['password', 'email']
      },
      order: [['rating', 'DESC'], ['contestsWon', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: designers
    });
  } catch (error) {
    next(error);
  }
};

// Get designer's active contests
export const getMyActiveContests = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const designerId = parseInt(req.user!.id);
    const { status, category } = req.query;

    const where: any = {
      status: {
        [Op.in]: ['open', 'qualifying', 'final_round']
      }
    };

    if (status) where.status = status;
    if (category) where.category = category;

    const contests = await Contest.findAll({
      where,
      include: [
        {
          model: ContestSubmission,
          as: 'submissions',
          where: { designerId },
          required: true,
          attributes: ['id', 'imageUrl', 'description', 'isWinner', 'isFinalist', 'createdAt']
        },
        {
          model: User,
          as: 'client',
          attributes: ['id', 'name', 'avatar']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: contests
    });
  } catch (error) {
    next(error);
  }
};

// Get designer's projects
export const getMyProjects = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const designerId = parseInt(req.user!.id);
    const { status } = req.query;

    const where: any = { designerId };
    if (status) where.status = status;

    const projects = await Project.findAll({
      where,
      include: [
        {
          model: User,
          as: 'client',
          attributes: ['id', 'name', 'avatar', 'email']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

