import { banknotesMock } from '../../mocks/banknotes';
import { BanknotesProps } from '../../types';

interface BanknotesRepositoryProps {
  value: number;
}

interface BanknotesValidToWithdrawProps {
  id: number;
  banknoteValue: number;
  quantity: number;
}

type HowBanknotesNeededProps = {
  banknotes: BanknotesProps;
  value: number;
};

function calculateHowBanknotesNeeded({
  banknotes,
  value,
}: HowBanknotesNeededProps) {
  let rest = value;
  let totalBanknotes: BanknotesProps[] = [];
  while (rest >= banknotes.banknoteValue) {
    rest = rest - banknotes.banknoteValue;
    totalBanknotes.push({
      id: banknotes.id,
      amount: 0,
      banknoteValue: banknotes.banknoteValue,
    });
  }
  const amount = totalBanknotes.length;
  return { rest, amount };
}

export const countBankNotesInMemory = async ({
  value,
}: BanknotesRepositoryProps): Promise<
  BanknotesValidToWithdrawProps[] | boolean
> => {
  const banknotes = banknotesMock;

  let validsBanknotes: BanknotesValidToWithdrawProps[] = [];
  let resto = value;

  banknotes.map((banknote) => {
    const { rest, amount } = calculateHowBanknotesNeeded({
      banknotes: banknote,
      value: resto,
    });
    resto = rest;
    if (amount !== 0) {
      validsBanknotes.push({
        id: banknote.id,
        banknoteValue: banknote.banknoteValue,
        quantity: amount,
      });
    }
  });

  /** VERIFY IF EXIST REST */

  const isThereRest = validsBanknotes.reduce((sum, a) => {
    return sum + a.quantity * a.banknoteValue;
  }, 0);

  if (isThereRest < value) {
    return false;
  }

  return validsBanknotes;
};
