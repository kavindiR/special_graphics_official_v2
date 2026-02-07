import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { Op } from 'sequelize';
import Contest from '../models/Contest.model';
import ContestSubmission from '../models/ContestSubmission.model';
import User from '../models/User.model';
import { AppError } from '../middleware/errorHandler';

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role?: string;
  };
}

// Get all contests (with filters)
export const getContests = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { status, category, minPrize, maxPrize, search } = req.query;
    const where: any = {};

    if (status) where.status = status;
    if (category) where.category = category;
    if (minPrize) where.prize = { ...where.prize, [Op.gte]: minPrize };
    if (maxPrize) where.prize = { ...where.prize, [Op.lte]: maxPrize };
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const contests = await Contest.findAll({
      where,
      include: [
        {
          model: User,
          as: 'client',
          attributes: ['id', 'name', 'email', 'avatar']
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

// Get single contest
export const getContest = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const contest = await Contest.findByPk(id, {
      include: [
        {
          model: User,
          as: 'client',
          attributes: ['id', 'name', 'email', 'avatar']
        },
        {
          model: ContestSubmission,
          as: 'submissions',
          include: [
            {
              model: User,
              as: 'designer',
              attributes: ['id', 'name', 'avatar', 'designerLevel', 'rating']
            }
          ]
        }
      ]
    });

    if (!contest) {
      const error = new Error('Contest not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: contest
    });
  } catch (error) {
    next(error);
  }
};

// Create contest (client only)
export const createContest = async (
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

    const {
      title,
      description,
      category,
      prize,
      deadline,
      requirements,
      stylePreferences,
      colorPreferences
    } = req.body;

    const contest = await Contest.create({
      title,
      description,
      category,
      prize,
      clientId: parseInt(req.user!.id),
      deadline,
      requirements,
      stylePreferences: stylePreferences || [],
      colorPreferences: colorPreferences || [],
      status: 'open'
    });

    res.status(201).json({
      success: true,
      message: 'Contest created successfully',
      data: contest
    });
  } catch (error) {
    next(error);
  }
};

// Submit to contest (designer only)
export const submitToContest = async (
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

    const { id } = req.params;
    const contestId = parseInt(id);
    const { imageUrl, description } = req.body;
    const designerId = parseInt(req.user!.id);

    // Check if contest exists
    const contest = await Contest.findByPk(contestId);
    if (!contest) {
      const error = new Error('Contest not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    // Check if already submitted
    const existingSubmission = await ContestSubmission.findOne({
      where: { contestId, designerId }
    });

    if (existingSubmission) {
      const error = new Error('You have already submitted to this contest') as AppError;
      error.statusCode = 400;
      throw error;
    }

    // Create submission
    const submission = await ContestSubmission.create({
      contestId,
      designerId,
      imageUrl,
      description
    });

    // Update designer's total submissions
    await User.increment('totalSubmissions', {
      where: { id: designerId }
    });

    res.status(201).json({
      success: true,
      message: 'Submission created successfully',
      data: submission
    });
  } catch (error) {
    next(error);
  }
};

// Get designer's submissions
export const getMySubmissions = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const designerId = parseInt(req.user!.id);

    const submissions = await ContestSubmission.findAll({
      where: { designerId },
      include: [
        {
          model: Contest,
          as: 'contest',
          include: [
            {
              model: User,
              as: 'client',
              attributes: ['id', 'name', 'avatar']
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: submissions
    });
  } catch (error) {
    next(error);
  }
};

