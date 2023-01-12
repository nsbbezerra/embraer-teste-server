import { Request, Response, NextFunction } from 'express';
import { KnexBanknotesRepository } from '../../repositories/knex/BanknotesRepository';
import { KnexClientsRepository } from '../../repositories/knex/ClientsRepository';
import { KnexStatementsRepository } from '../../repositories/knex/StatementsRepository';
import {
  updateBalance,
  validateBalanceForWithdraw,
} from '../../services/ClientBalanceService';
import { createStatement } from '../../services/StatementsServices';
import { updateBanknoteStock } from '../../services/UpdateBanknoteStockService';
import { withdraw } from '../../services/WithdrawServices';

async function setUpdateBanknoteStock(id: number, amount: number) {
  await updateBanknoteStock({
    id,
    amount,
    repository: new KnexBanknotesRepository(),
  });
}

export const WithDraw = async (
  request: Request<{ client: number }, {}, { amount: number }>,
  response: Response,
  next: NextFunction
) => {
  const { client } = request.params;
  const { amount } = request.body;

  try {
    /**
     * Validate balance of client
     */

    await validateBalanceForWithdraw({
      id: client,
      total: amount,
      repository: new KnexClientsRepository(),
    });

    /**
     * Process withdraw
     */

    const processWithdraw = await withdraw({
      total: amount,
      repository: new KnexBanknotesRepository(),
    });

    /** Update banknotes stock */

    await processWithdraw?.banknotes.map((banknote) => {
      setUpdateBanknoteStock(banknote.id, banknote.amount);
    });

    /** Update client balance */

    const newBalance = await updateBalance({
      id: client,
      total: amount,
      repository: new KnexClientsRepository(),
    });

    /** Create a statement of withdraw */

    await createStatement({
      clientId: client,
      repository: new KnexStatementsRepository(),
      total: amount,
    });

    const banknotes = processWithdraw?.banknotes;
    const balance = newBalance.balance;

    return response.status(201).json({ banknotes, balance });
  } catch (error) {
    next(error);
  }
};
