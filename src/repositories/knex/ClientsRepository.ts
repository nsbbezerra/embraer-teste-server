import { database } from '../../database/pg';
import { ClientsProps } from '../../types';

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
  const clientBalance = await database<ClientsProps>('clients')
    .where({ id })
    .first()
    .select('balance');

  if (!clientBalance || value > Number(clientBalance?.balance)) {
    return false;
  } else {
    return true;
  }

  return false;
};
