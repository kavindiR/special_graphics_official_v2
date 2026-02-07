import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { Op } from 'sequelize';
import Project from '../models/Project.model';
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

// Get all open projects (for designers to browse)
export const getOpenProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { category, minBudget, maxBudget, search } = req.query;
    const where: any = {
      status: 'open'
    };

    if (category) where.category = category;
    if (minBudget) where.budget = { ...where.budget, [Op.gte]: minBudget };
    if (maxBudget) where.budget = { ...where.budget, [Op.lte]: maxBudget };
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const projects = await Project.findAll({
      where,
      include: [
        {
          model: User,
          as: 'client',
          attributes: ['id', 'name', 'avatar', 'isVerified']
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
        },
        {
          model: Contest,
          as: 'relatedContest',
          attributes: ['id', 'title']
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

// Get single project
export const getProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id, {
      include: [
        {
          model: User,
          as: 'client',
          attributes: ['id', 'name', 'avatar', 'email', 'isVerified']
        },
        {
          model: User,
          as: 'designer',
          attributes: ['id', 'name', 'avatar', 'designerLevel', 'rating']
        },
        {
          model: Contest,
          as: 'relatedContest',
          attributes: ['id', 'title']
        }
      ]
    });

    if (!project) {
      const error = new Error('Project not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// Create project (client only)
export const createProject = async (
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
      budget,
      deadline,
      requirements,
      deliverables,
      stylePreferences,
      colorPreferences,
      relatedContestId,
      designerId
    } = req.body;

    const project = await Project.create({
      title,
      description,
      category,
      budget,
      clientId: parseInt(req.user!.id),
      deadline,
      requirements,
      deliverables: deliverables || [],
      stylePreferences: stylePreferences || [],
      colorPreferences: colorPreferences || [],
      relatedContestId,
      designerId: designerId || undefined,
      status: designerId ? 'invited' : 'open'
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// Accept project invitation (designer only)
export const acceptProject = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const designerId = parseInt(req.user!.id);

    const project = await Project.findByPk(id);

    if (!project) {
      const error = new Error('Project not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    if (project.status !== 'invited' || project.designerId !== designerId) {
      const error = new Error('You are not invited to this project') as AppError;
      error.statusCode = 403;
      throw error;
    }

    await project.update({
      status: 'in_progress'
    });

    res.status(200).json({
      success: true,
      message: 'Project accepted successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// Update project status
export const updateProjectStatus = async (
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
    const { status } = req.body;
    const userId = parseInt(req.user!.id);

    const project = await Project.findByPk(id);

    if (!project) {
      const error = new Error('Project not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    // Check permissions
    if (project.clientId !== userId && project.designerId !== userId) {
      const error = new Error('Unauthorized') as AppError;
      error.statusCode = 403;
      throw error;
    }

    await project.update({ status });

    res.status(200).json({
      success: true,
      message: 'Project status updated successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

