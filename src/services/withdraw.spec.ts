import { InMemoryBanknotesRepository } from '../repositories/in-memory/InMemoryBanknotesRepository';
import { withdraw } from './WithdrawServices';

describe('Withdraw Tests', () => {
  it('should be able to process a withdraw with a valid value', async () => {
    const processWithdraw = withdraw({
      total: 100,
      repository: new InMemoryBanknotesRepository(),
    });

    expect(processWithdraw).resolves.toHaveProperty('banknotes');
  });

  it('should be not able to process a withdraw with a invalid value', async () => {
    const processWithdraw = withdraw({
      total: 100.65,
      repository: new InMemoryBanknotesRepository(),
    });

    expect(processWithdraw).rejects.toThrow();
  });
});
