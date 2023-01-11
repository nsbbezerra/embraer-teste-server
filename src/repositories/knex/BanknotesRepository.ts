import { database } from '../../database/pg';
import { BanknotesProps } from '../../types';
import { BanksnotesRepository } from '../banknotesRepository';

export class KnexBanknotesRepository implements BanksnotesRepository {
  async find(): Promise<BanknotesProps[]> {
    const banknotes = await database<BanknotesProps>('banknotes').orderBy(
      'banknoteValue',
      'desc'
    );
    return banknotes;
  }

  async update(id: number, amount: number): Promise<void> {
    await database<BanknotesProps>('banknotes')
      .where({ id })
      .update({ amount: database.raw(`amount - ${amount}`) });
  }
}
