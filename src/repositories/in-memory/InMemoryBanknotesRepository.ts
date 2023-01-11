import { banknotesMock } from '../../mocks/banknotes';
import { BanknotesProps } from '../../types';
import { BanksnotesRepository } from '../banknotesRepository';

export class InMemoryBanknotesRepository implements BanksnotesRepository {
  private items: BanknotesProps[] = banknotesMock;

  async find(): Promise<BanknotesProps[]> {
    return this.items;
  }

  async update(id: number, amount: number): Promise<void> {
    const banknote = this.items.find((obj) => obj.id === id);
    if (banknote) {
      banknote.amount = banknote.amount - amount;
    }
  }
}
