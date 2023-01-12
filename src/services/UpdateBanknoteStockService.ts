import { BanksnotesRepository } from '../repositories/banknotesRepository';

interface Request {
  id: number;
  amount: number;
  repository: BanksnotesRepository;
}

/**
 * @param id number - id of banknote on database
 * @param amount number - total of banknotes withdrawals
 * @param repository type BanknotesRepository
 */

export const updateBanknoteStock = async ({
  id,
  repository,
  amount,
}: Request): Promise<void> => {
  await repository.update(id, amount);
};
