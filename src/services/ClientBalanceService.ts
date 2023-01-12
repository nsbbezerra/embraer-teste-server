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

/**
 * @param id number
 * @param repository type ClientsRepository
 * @returns an object `{ balance: number }` or `null`
 */

export const findForBalance = async ({
  id,
  repository,
}: FindBalanceRequest): Promise<Response | null> => {
  const balance = await repository.findForBalance(id);

  return balance;
};

/**
 * @param id number
 * @param total number - this is a total for update the client balance
 * @param repository type ClientsRepository
 */

export const updateBalance = async ({
  id,
  total,
  repository,
}: BalanceRequest): Promise<void> => {
  await repository.updateBalance(id, total);
};

/**
 * @param id number
 * @param total number - this is a total for validate the client balance for withdraw
 * @param repository type ClientsRepository
 * @returns an object `{ balance: number }` or throw an error
 */

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
