import { BanksnotesRepository } from '../repositories/banknotesRepository';
import { BanknotesProps } from '../types';

interface Request {
  total: number;
  repository: BanksnotesRepository;
}

interface Response {
  banknotes: BanknotesProps[];
}

/**
 * Validates if the banknotes has stock available to withdraw the required amount
 */

function isThereAvailableBanknotes(
  stock: number,
  valueToWithdraw: number,
  banknoteValue: number
): boolean {
  const calculateHowMuchBanknotesNeeded = Math.floor(
    valueToWithdraw / banknoteValue
  );

  return calculateHowMuchBanknotesNeeded > stock ? false : true;
}

/**
 * Calculates how many banknotes of each value are needed to withdraw
 */

function calculateHowMuchBanknotesNeeded(
  banknoteValue: number,
  totalToWithdraw: number
): { restOfValueToWithdraw: number; totalOfBanknotes: number } {
  let restOfValueToWithdraw = totalToWithdraw;

  let totalOfBanknotes: number = 0;

  while (restOfValueToWithdraw >= banknoteValue) {
    restOfValueToWithdraw = restOfValueToWithdraw - banknoteValue;
    totalOfBanknotes++;
  }

  return { restOfValueToWithdraw, totalOfBanknotes };
}

/**
 * @param total number - total for withdraw
 * @param repository type BanksnoteRepository
 * @returns an array `[{ id: number, banknoteValue: number, amount: number }]` or throw an error.
 */

export const withdraw = async ({
  total,
  repository,
}: Request): Promise<Response | null> => {
  if (!Number.isInteger(total) || total === 0) {
    throw new Error('Unable to withdraw this amount');
  }

  const banknotesAvailable = await repository.find();

  let validsWithdrawBanknotes: BanknotesProps[] = [];
  let balanceOfWithdraw = total;

  banknotesAvailable.map((banknote) => {
    if (
      isThereAvailableBanknotes(banknote.amount, total, banknote.banknoteValue)
    ) {
      const { restOfValueToWithdraw, totalOfBanknotes } =
        calculateHowMuchBanknotesNeeded(
          banknote.banknoteValue,
          balanceOfWithdraw
        );

      balanceOfWithdraw = restOfValueToWithdraw;

      totalOfBanknotes !== 0 &&
        validsWithdrawBanknotes.push({
          banknoteValue: banknote.banknoteValue,
          id: banknote.id,
          amount: totalOfBanknotes,
        });
    }
  });

  const thereIsBalanceAfterCounting = validsWithdrawBanknotes.reduce(
    (sum, a) => {
      return sum + a.amount * a.banknoteValue;
    },
    0
  );

  if (thereIsBalanceAfterCounting < total) {
    throw new Error(
      `Unable to process withdrawal, no banknotes available to withdrawal, this value remains: R$ ${
        total - thereIsBalanceAfterCounting
      }`
    );
  }

  return { banknotes: validsWithdrawBanknotes };
};
