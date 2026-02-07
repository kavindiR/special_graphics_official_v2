import { Request, Response, NextFunction } from 'express';
import Earnings from '../models/Earnings.model';
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

// Get designer's earnings
export const getMyEarnings = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const designerId = parseInt(req.user!.id);
    const { status, type } = req.query;
    const where: any = { designerId };

    if (status) where.status = status;
    if (type) where.type = type;

    const earnings = await Earnings.findAll({
      where,
      include: [
        {
          model: Contest,
          as: 'contest',
          attributes: ['id', 'title', 'category']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    // Calculate totals
    const totalEarnings = await Earnings.sum('amount', {
      where: { designerId, status: 'completed' }
    });

    const pendingEarnings = await Earnings.sum('amount', {
      where: { designerId, status: 'pending' }
    });

    res.status(200).json({
      success: true,
      data: {
        earnings,
        totals: {
          total: totalEarnings || 0,
          pending: pendingEarnings || 0
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Request withdrawal
export const requestWithdrawal = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const designerId = parseInt(req.user!.id);
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      const error = new Error('Invalid withdrawal amount') as AppError;
      error.statusCode = 400;
      throw error;
    }

    // Get pending earnings
    const pendingEarnings = await Earnings.sum('amount', {
      where: { designerId, status: 'pending' }
    });

    if (!pendingEarnings || pendingEarnings < amount) {
      const error = new Error('Insufficient pending earnings') as AppError;
      error.statusCode = 400;
      throw error;
    }

    // Create withdrawal request (this would typically integrate with payment gateway)
    // For now, we'll just mark some earnings as processing
    const earningsToProcess = await Earnings.findAll({
      where: {
        designerId,
        status: 'pending'
      },
      order: [['createdAt', 'ASC']],
      limit: 10
    });

    let remainingAmount = amount;
    for (const earning of earningsToProcess) {
      if (remainingAmount <= 0) break;
      const processAmount = Math.min(remainingAmount, parseFloat(earning.amount.toString()));
      await earning.update({ status: 'processing' });
      remainingAmount -= processAmount;
    }

    res.status(200).json({
      success: true,
      message: 'Withdrawal request submitted successfully',
      data: {
        requestedAmount: amount,
        status: 'processing'
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get earnings statistics
export const getEarningsStats = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const designerId = parseInt(req.user!.id);

    const stats = {
      totalEarnings: await Earnings.sum('amount', {
        where: { designerId, status: 'completed' }
      }) || 0,
      pendingEarnings: await Earnings.sum('amount', {
        where: { designerId, status: 'pending' }
      }) || 0,
      processingEarnings: await Earnings.sum('amount', {
        where: { designerId, status: 'processing' }
      }) || 0,
      totalContestWins: await Earnings.count({
        where: { designerId, type: 'contest_win', status: 'completed' }
      }),
      totalProjects: await Earnings.count({
        where: { designerId, type: 'project_payment', status: 'completed' }
      })
    };

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};

