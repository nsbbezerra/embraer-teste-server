import { validateBalanceInMemory } from '../../repositories/in-memory/InMemoryClientsRepository';
import { haveBalance } from '../../services/WithdrawServices';

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

  it('should be not that i have balance for withdraw', async () => {
    const response = await haveBalance({
      value: 30000,
      repository: validateBalanceInMemory,
      id: 1,
    });

    expect(response).toBeFalsy();
  });
});
