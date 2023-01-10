import { Request, Response, NextFunction } from 'express';
import { database } from '../../database/pg';
import { countBankNotes } from '../../repositories/knex/BanknotesRepository';
import { validateBalance } from '../../repositories/knex/ClientsRepository';
import { haveBalance, proccessWithdraw } from '../../services/WithdrawServices';
import { BanknotesProps } from '../../types';

async function updateBanknotesStock(id: number, newStock: number) {
  await database<BanknotesProps>('banknotes')
    .where({ id })
    .update({ amount: database.raw(`amount - ${newStock}`) });
}

async function WithDraw(
  request: Request<{ client: number }, {}, { amount: number }>,
  response: Response,
  next: NextFunction
) {
  const { client } = request.params;
  const { amount } = request.body;

  try {
    if (
      !(await haveBalance({
        id: client,
        repository: validateBalance,
        value: amount,
      }))
    ) {
      throw new Error('You have no balance to withdraw');
    }

    const { banknotes, message, status } = await proccessWithdraw({
      value: amount,
      repository: countBankNotes,
    });

    if (status === 'not authorized') {
      throw new Error(message);
    }

    await banknotes?.map((banknote) => {
      updateBanknotesStock(banknote.id, banknote.quantity);
    });

    return response.status(200).json(banknotes);
  } catch (error) {
    next(error);
  }
}

export { WithDraw };
