import { BanksnotesRepository } from '../repositories/banknotesRepository';
import { BanknotesProps } from '../types';

interface Request {
  repository: BanksnotesRepository;
}

type Response = BanknotesProps[];

export const getBanknotesStock = async ({
  repository,
}: Request): Promise<Response> => {
  return await repository.find();
};
