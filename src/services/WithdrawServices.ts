interface ValidateBalanceProps {
  value: number;
  id: number;
}

interface HaveBalanceProps {
  id: number;
  value: number;
  repository: ({ value, id }: ValidateBalanceProps) => Promise<boolean>;
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
