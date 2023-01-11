import { StatementsRepository } from '../repositories/statementsRepository';

interface Request {
  clientId: number;
  total: number;
  repository: StatementsRepository;
}

export const createStatement = async ({
  clientId,
  total,
  repository,
}: Request): Promise<void> => {
  await repository.create(clientId, total);
};
