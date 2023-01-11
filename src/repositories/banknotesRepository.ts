import { BanknotesProps } from '../types';

export interface BanksnotesRepository {
  find(): Promise<BanknotesProps[]>;
  update(id: number, amount: number): Promise<void>;
}
