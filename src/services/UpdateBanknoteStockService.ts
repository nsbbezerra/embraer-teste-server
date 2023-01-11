import { BanksnotesRepository } from '../repositories/banknotesRepository';

interface Request {
  id: number;
  amount: number;
  repository: BanksnotesRepository;
}

export const updateBanknoteStock = async ({
  id,
  repository,
  amount,
}: Request): Promise<void> => {
  await repository.update(id, amount);
};
