import { Request, Response, NextFunction } from 'express';
import { KnexBanknotesRepository } from '../../repositories/knex/BanknotesRepository';
import { getBanknotesStock } from '../../services/BanknotesServices';

export const GetBanknotesStock = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const banknotes = await getBanknotesStock({
      repository: new KnexBanknotesRepository(),
    });

    return response.status(200).json(banknotes);
  } catch (error) {
    next(error);
  }
};
