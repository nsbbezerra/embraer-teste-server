import { database } from '../../database/pg';
import { BanknotesProps } from '../../types';

interface BanknotesRepositoryProps {
  value: number;
}

interface BanknotesValidToWithdrawProps {
  id: number;
  banknoteValue: number;
  quantity: number;
}

type HowMuchBanknotesNeededProps = {
  banknote: BanknotesProps;
  totalToWithdraw: number;
};

type HowMuchBanknotesNeededResponseProps = {
  rest: number;
  totalOfBanknotes: number;
};

type CalculateHowMuchBanksnoteNeededResponse = {
  banknotes: BanknotesValidToWithdrawProps[] | null;
  status: 'success' | 'not authorized';
  message: string | undefined;
};

type ThereAreAvailableBanknotesProps = {
  stock: number;
  valueToWithdraw: number;
  banknoteValue: number;
};

function ifThereAreAvailableBanknotes({
  stock,
  valueToWithdraw,
  banknoteValue,
}: ThereAreAvailableBanknotesProps): boolean {
  const calculateHowMuchBanknotesNeeded = Math.floor(
    valueToWithdraw / banknoteValue
  );

  if (calculateHowMuchBanknotesNeeded > stock) {
    return false;
  } else {
    return true;
  }
}

function calculateHowMuchBanknotesNeeded({
  banknote,
  totalToWithdraw,
}: HowMuchBanknotesNeededProps): HowMuchBanknotesNeededResponseProps {
  let rest = totalToWithdraw;
  let totalOfBanknotes: number = 0;
  while (rest >= banknote.banknoteValue) {
    rest = rest - banknote.banknoteValue;
    totalOfBanknotes++;
  }
  return { rest, totalOfBanknotes };
}

/**
 * @param value number
 * @returns an object with a `banknote`: Array<BanknotesValidToWithdrawProps> | null, `status`: 'success' | 'not authorized', `message`: string | undefined.
 */

export const countBankNotes = async ({
  value,
}: BanknotesRepositoryProps): Promise<CalculateHowMuchBanksnoteNeededResponse> => {
  const banknotes = await database<BanknotesProps>('banknotes').orderBy(
    'banknoteValue',
    'desc'
  );

  let validsBanknotes: BanknotesValidToWithdrawProps[] = [];
  let balance = value;

  /** Start of banknotes counting */

  banknotes.map((banknote) => {
    if (
      ifThereAreAvailableBanknotes({
        stock: banknote.amount,
        valueToWithdraw: value,
        banknoteValue: banknote.banknoteValue,
      })
    ) {
      const { rest, totalOfBanknotes } = calculateHowMuchBanknotesNeeded({
        banknote,
        totalToWithdraw: balance,
      });
      balance = rest;
      if (totalOfBanknotes !== 0) {
        validsBanknotes.push({
          id: banknote.id,
          banknoteValue: banknote.banknoteValue,
          quantity: totalOfBanknotes,
        });
      }
    }
  });

  /** Check if there is remainder of the withdrawal amount */

  const isThereRest = validsBanknotes.reduce((sum, a) => {
    return sum + a.quantity * a.banknoteValue;
  }, 0);

  if (isThereRest < value) {
    return {
      banknotes: null,
      message:
        'Unable to process withdrawal, no banknotes available to total withdrawal',
      status: 'not authorized',
    };
  }

  return {
    banknotes: validsBanknotes,
    message: 'Successful withdrawal',
    status: 'success',
  };
};
