import { database } from '../../database/pg';
import { ClientsProps, ListClientsProps } from '../../types';

interface ValidateBalanceProps {
  value: number;
  id: number;
}

/**
 * @param value number
 * @param id number
 * @returns boolean
 */

export const validateBalance = async ({
  id,
  value,
}: ValidateBalanceProps): Promise<boolean> => {
  const clientBalance = await database<ListClientsProps>('clients')
    .where({ id })
    .first()
    .select('balance');

  if (!clientBalance || value > Number(clientBalance?.balance)) {
    return false;
  } else {
    return true;
  }
};

export const proccessToStoreClient = async (
  client: ClientsProps
): Promise<ClientsProps | boolean> => {
  const searchForDuplicate = await database('clients')
    .where({ name: client.name })
    .first();

  if (searchForDuplicate) {
    return false;
  }

  const newClient: ListClientsProps[] = await database('clients')
    .insert({
      balance: client.balance,
      name: client.name,
    })
    .returning('*');

  return newClient[0];
};
