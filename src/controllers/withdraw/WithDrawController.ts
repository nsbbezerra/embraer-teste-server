import { database } from '../../database/pg';
import { Request, Response, NextFunction } from 'express';
import { BanknotesProps } from '../../types';

async function WithDraw(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const banknotes = await database<BanknotesProps>('banknotes').orderBy(
      'banknoteValue',
      'desc'
    );

    return response.status(200).json(banknotes);
  } catch (error) {
    next(error);
  }
}

export { WithDraw };
