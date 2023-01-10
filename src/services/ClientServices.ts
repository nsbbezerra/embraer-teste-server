import { ClientsProps } from '../types';

interface ProccessToStoreProps {
  client: ClientsProps;
  repository: (client: ClientsProps) => Promise<ClientsProps | boolean>;
}

/**
 * @param client `id`: number, `name`: string, `balance`: number
 * @param repository `proccessToStoreClientInMemory` | `proccessToStoreClient`
 * @returns an object with a `id`: number, `name`: string, `balance`: number
 */

export const storeClient = async ({
  client,
  repository,
}: ProccessToStoreProps): Promise<ClientsProps | boolean> => {
  return await repository(client);
};
