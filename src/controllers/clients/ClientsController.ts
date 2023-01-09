import { Request, Response, NextFunction } from 'express';
import { ClientsProps } from '../../types';

async function FindForBalance(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const balance = 0;
    return response.status(200).json(balance);
  } catch (error) {
    next(error);
  }
}

export { FindForBalance };
