import { Request, Response, NextFunction } from 'express';
import { KnexBanknotesRepository } from '../../repositories/knex/BanknotesRepository';
import { KnexClientsRepository } from '../../repositories/knex/ClientsRepository';
import { KnexStatementsRepository } from '../../repositories/knex/StatementsRepository';
import {
  updateBalance,
  validateBalanceForWithdraw,
} from '../../services/ClientBalanceService';
import { createStatement } from '../../services/CreateStatementService';
import { updateBanknoteStock } from '../../services/UpdateBanknoteStockService';
import { withdraw } from '../../services/WithdrawServices';

async function setUpdateBanknoteStock(id: number, amount: number) {
  await updateBanknoteStock({
    id,
    amount,
    repository: new KnexBanknotesRepository(),
  });
}

async function WithDraw(
  request: Request<{ client: number }, {}, { amount: number }>,
  response: Response,
  next: NextFunction
) {
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

    await updateBalance({
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

    return response.status(201).json(processWithdraw);
  } catch (error) {
    next(error);
  }
}

export { WithDraw };
