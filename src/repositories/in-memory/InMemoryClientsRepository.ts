import { clientMock } from '../../mocks/clients';
import { ClientsProps } from '../../types';

interface ValidateBalanceProps {
  value: number;
  id: number;
}

interface ReturningClientProps {
  id: number;
  name: string;
  balance: number;
}

/**
 * @param value number
 * @param id number
 * @returns boolean
 */

export const validateBalanceInMemory = async ({
  value,
  id,
}: ValidateBalanceProps): Promise<boolean> => {
  const result = clientMock.find((obj) => obj.id === id);

  if (!result || value > Number(result?.balance)) {
    return false;
  } else {
    return true;
  }
};

export const proccessToStoreClientInMemory = async (
  client: ClientsProps
): Promise<ClientsProps | boolean> => {
  const searchForDuplicate = clientMock.find((obj) => obj.name === client.name);
  if (searchForDuplicate) {
    return false;
  }

  const newClient: ReturningClientProps = {
    id: Math.floor(Math.random() * 10),
    balance: client.balance,
    name: client.name,
  };

  return newClient;
};
