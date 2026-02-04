import { Response, NextFunction } from 'express';
import Design from '../models/Design.model';
import User from '../models/User.model';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

// Create new design
export const createDesign = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, description, image, tags, tools } = req.body;
    const userId = parseInt(req.user?.id || '0');

    if (!userId) {
      const error = new Error('Authentication required') as AppError;
      error.statusCode = 401;
      throw error;
    }

    // Get user name for designerName
    const user = await User.findByPk(userId);
    if (!user) {
      const error = new Error('User not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    const design = await Design.create({
      title,
      description,
      image,
      tags: Array.isArray(tags) ? tags : [],
      tools,
      designerId: userId,
      designerName: user.name
    });

    res.status(201).json({
      success: true,
      data: { design }
    });
  } catch (error) {
    next(error);
  }
};

// Get all designs
export const getAllDesigns = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const designs = await Design.findAll({
      include: [{
        model: User,
        as: 'designer',
        attributes: ['id', 'name', 'avatar']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: { designs }
    });
  } catch (error) {
    next(error);
  }
};

// Get design by ID
export const getDesignById = async (
  req: AuthRequest,
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

// Update design
export const updateDesign = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, description, image, tags, tools } = req.body;
    const userId = parseInt(req.user?.id || '0');
    const designId = parseInt(req.params.id);

    const design = await Design.findByPk(designId);
    if (!design) {
      const error = new Error('Design not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    // Check if user owns the design or is admin
    if (design.designerId !== userId && req.user?.role !== 'admin') {
      const error = new Error('Not authorized to update this design') as AppError;
      error.statusCode = 403;
      throw error;
    }

    // Update design
    await design.update({
      title: title || design.title,
      description: description || design.description,
      image: image || design.image,
      tags: Array.isArray(tags) ? tags : design.tags,
      tools: tools || design.tools
    });

    res.status(200).json({
      success: true,
      data: { design }
    });
  } catch (error) {
    next(error);
  }
};

// Delete design
export const deleteDesign = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = parseInt(req.user?.id || '0');
    const designId = parseInt(req.params.id);

    const design = await Design.findByPk(designId);
    if (!design) {
      const error = new Error('Design not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    // Check if user owns the design or is admin
    if (design.designerId !== userId && req.user?.role !== 'admin') {
      const error = new Error('Not authorized to delete this design') as AppError;
      error.statusCode = 403;
      throw error;
    }

    await design.destroy();

    res.status(200).json({
      success: true,
      message: 'Design deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
