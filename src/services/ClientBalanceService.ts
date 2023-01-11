import { ClientsRepository } from '../repositories/clientsRepository';

interface FindBalanceRequest {
  id: number;
  repository: ClientsRepository;
}

interface BalanceRequest {
  id: number;
  total: number;
  repository: ClientsRepository;
}

interface Response {
  balance: number;
}

export const findForBalance = async ({
  id,
  repository,
}: FindBalanceRequest): Promise<Response | null> => {
  const balance = await repository.findForBalance(id);

  return balance;
};

export const updateBalance = async ({
  id,
  total,
  repository,
}: BalanceRequest): Promise<void> => {
  await repository.updateBalance(id, total);
};

export const validateBalanceForWithdraw = async ({
  id,
  total,
  repository,
}: BalanceRequest): Promise<{ balance: number }> => {
  const clientBalance = await repository.findForBalance(id);

  if (Number(clientBalance?.balance) < total) {
    throw new Error('You have no balance available for withdrawal');
  }

  return { balance: Number(clientBalance?.balance) };
};
