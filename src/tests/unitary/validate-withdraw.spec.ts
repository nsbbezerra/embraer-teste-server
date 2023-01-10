import { countBankNotesInMemory } from '../../repositories/in-memory/InMemoryBanknotesRepository';
import { validateBalanceInMemory } from '../../repositories/in-memory/InMemoryClientsRepository';
import {
  haveBalance,
  isValidValueToWithdraw,
  proccessWithdraw,
} from '../../services/WithdrawServices';

describe('Withdraw Tests', () => {
  it('should be that i have balance for withdraw', async () => {
    const response = await haveBalance({
      value: 3000,
      repository: validateBalanceInMemory,
      id: 1,
    });

    expect(response).toBeTruthy();
  });

  it('should be not able to withdraw whithout a valid client', async () => {
    const response = await haveBalance({
      value: 3000,
      repository: validateBalanceInMemory,
      id: 0,
    });

    expect(response).toBeFalsy();
  });

  it('is not possible to withdraw without balance', async () => {
    const response = await haveBalance({
      value: 30000,
      repository: validateBalanceInMemory,
      id: 1,
    });

    expect(response).toBeFalsy();
  });

  it('is possible to withdraw an amount that has valid banknotes for the withdrawal', () => {
    const validate = isValidValueToWithdraw(50);
    expect(validate).toBeTruthy();
  });

  it('is not possible to withdraw an amount that does not have valid banknotes for the withdrawal', () => {
    const validate = isValidValueToWithdraw(50.65);
    expect(validate).toBeFalsy();
  });

  it('should be able to proccess the withdraw', async () => {
    const response = await proccessWithdraw({
      value: 1000,
      repository: countBankNotesInMemory,
    });

    expect(response.status).toBe('success');
  });
});
