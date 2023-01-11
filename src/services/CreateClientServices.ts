import { ClientsRepository } from '../repositories/clientsRepository';
import { ClientsProps } from '../types';

interface Request {
  client: ClientsProps;
  repository: ClientsRepository;
}

type Response = ClientsProps;

/**
 * @param client `id`: number, `name`: string, `balance`: number.
 * @param repository `ClientsRepository` - contains three methods: `create`, `findForBalance`, `updateBalance`.
 * @returns an Promise with a object {`id`: number, `name`: string, `balance`: number}
 */

export const createClient = async ({
  client,
  repository,
}: Request): Promise<Response> => {
  const findIfExists = await repository.findClient(client.name);

  if (findIfExists) {
    throw new Error('This client is already registered');
  }

  const newClient = repository.create(client);

  return newClient;
};
