interface ValidateBalanceProps {
  value: number;
  id: number;
}

interface HaveBalanceProps {
  id: number;
  value: number;
  repository: ({ value, id }: ValidateBalanceProps) => Promise<boolean>;
}

interface BanknotesValidToWithdrawProps {
  id: number;
  banknoteValue: number;
  quantity: number;
}

type CalculateHowMuchBanksnoteNeededResponse = {
  banknotes: BanknotesValidToWithdrawProps[] | null;
  status: 'success' | 'not authorized';
  message: string | undefined;
};

interface ProccessWithdrawProps {
  value: number;
  repository: ({
    value,
  }: {
    value: number;
  }) => Promise<CalculateHowMuchBanksnoteNeededResponse>;
}

/**
 * @param id number
 * @param value number
 * @param  repository ValidateBalanceProps
 * @returns boolean
 */

export const haveBalance = async ({
  repository,
  value,
  id,
}: HaveBalanceProps) => {
  return await repository({ value, id });
};

/**
 * @param value number
 * @returns boolean
 */

export const isValidValueToWithdraw = (value: number): boolean => {
  if (Number.isInteger(value)) {
    return true;
  } else {
    return false;
  }
};

/**
 * @param repository countBankNotesInMemory | countBankNotes
 * @param value number
 * @returns an object with a `banknote`: Array<BanknotesValidToWithdrawProps> | null, `status`: 'success' | 'not authorized', `message`: string | undefined.
 */

export const proccessWithdraw = async ({
  repository,
  value,
}: ProccessWithdrawProps): Promise<CalculateHowMuchBanksnoteNeededResponse> => {
  const data = await repository({ value });

  return data;
};
