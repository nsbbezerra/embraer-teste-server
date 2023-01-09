import { clientMock } from '../../mocks/clients';

interface ValidateBalanceProps {
  value: number;
  id: number;
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
