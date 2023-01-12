import { ClientsRepository } from '../repositories/clientsRepository';
import { ListClientsProps } from '../types';

interface Request {
  name: string;
  repository: ClientsRepository;
}

type Response = ListClientsProps;

/**
 * @param name string
 * @param repository type ClientsRepository
 * @returns an object `{ id: number, name: string, balance: number | string }` or throw an error.
 */

export const login = async ({
  name,
  repository,
}: Request): Promise<Response> => {
  const client = await repository.findClient(name);

  if (!client) {
    throw new Error('Client not found');
  }

  return client;
};
